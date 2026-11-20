# Local YOLO passenger counting

The AI Vision & IoT page can use a laptop webcam and run person detection with Ultralytics YOLOv8. The vision service runs locally; camera frames are sent to that service on the same machine and are not persisted.

## Start the YOLO service

From the repository root, create a Python environment and install its dependencies:

```bash
python -m venv .venv
# macOS/Linux
source .venv/bin/activate
# Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r vision_service/requirements.txt
uvicorn vision_service.app:app --host 127.0.0.1 --port 8000
```

Ultralytics downloads the `yolov8n.pt` model on first start. The service binds to localhost and exposes `/health` and `/detect`.

## Run the web app

In another terminal, run the usual frontend commands:

```bash
npm install
npm run dev
```

Open the app on `localhost`, go to **AI Vision & IoT**, and select **Start headcount**. Allow browser camera access. The count and person boxes update from YOLO detections and are synchronized to the conductor dashboard in this browser (including other app tabs). Stop the camera when finished.

Set `VITE_YOLO_API_URL` if the vision service is hosted at another URL, and `VITE_BUS_CAPACITY` to adjust the capacity alert threshold. Webcam access requires localhost or HTTPS. The count is the number of people detected in the current frame; use a suitable camera angle and lighting for reliable results. It is not a unique-person trip counter.
