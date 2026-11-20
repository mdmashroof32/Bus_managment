from __future__ import annotations

import base64
import binascii
import os
import re
from io import BytesIO

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image, UnidentifiedImageError
from ultralytics import YOLO

MODEL_PATH = os.getenv("YOLO_MODEL", "yolov8n.pt")
CONFIDENCE = float(os.getenv("YOLO_CONFIDENCE", "0.35"))
model = YOLO(MODEL_PATH)

app = FastAPI(title="Bus Passenger YOLO Vision Service")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)


class DetectRequest(BaseModel):
    image: str


@app.get("/health")
def health():
    return {"status": "ready", "model": MODEL_PATH}


@app.post("/detect")
def detect(request: DetectRequest):
    encoded = request.image.split(",", 1)[-1]
    try:
        image_bytes = base64.b64decode(encoded, validate=True)
        if len(image_bytes) > 8 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="Image is too large")
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
    except (binascii.Error, ValueError, UnidentifiedImageError):
        raise HTTPException(status_code=400, detail="image must be a valid base64-encoded image") from None

    result = model.predict(image, conf=CONFIDENCE, classes=[0], verbose=False)[0]
    detections = []
    if result.boxes is not None:
        for box in result.boxes:
            coords = box.xyxy[0].tolist()
            detections.append({
                "box": [round(float(value), 2) for value in coords],
                "confidence": round(float(box.conf[0]), 4),
                "class": "person",
            })

    return {
        "count": len(detections),
        "detections": detections,
        "width": image.width,
        "height": image.height,
        "model": MODEL_PATH,
    }
