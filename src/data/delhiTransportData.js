// Official Delhi Transport Corporation (DTC) & DIMTS System Dataset
export const delhiStats = {
  activeBuses: 7420,
  electricEVBuses: 2150,
  cngBuses: 5270,
  dailyPassengers: '4.35 Million',
  todayRevenue: '₹ 7.82 Crores',
  pinkPassIssuedToday: '1.48 Million',
  pinkPassSubsidyGovt: '₹ 1.48 Crores',
  aqiDelhi: 284,
  connectedDepots: 42,
  evChargingStationsActive: 128
};

export const delhiDepots = [
  { id: 'dep-1', name: 'Millennium Park EV Depot', code: 'MPD', totalBuses: 1100, evChargers: 45, status: 'OPTIMAL', location: 'Near Sarai Kale Khan / Nizamuddin', lat: 28.5878, lng: 77.2588 },
  { id: 'dep-2', name: 'Anand Vihar ISBT Depot', code: 'AVD', totalBuses: 480, evChargers: 20, status: 'OPTIMAL', location: 'Anand Vihar ISBT Hub', lat: 28.6469, lng: 77.3155 },
  { id: 'dep-3', name: 'Kashmere Gate ISBT Depot', code: 'KGD', totalBuses: 520, evChargers: 24, status: 'OPTIMAL', location: 'Kashmere Gate ISBT', lat: 28.6675, lng: 77.2285 },
  { id: 'dep-4', name: 'Sukhdev Vihar EV Depot', code: 'SVD', totalBuses: 350, evChargers: 35, status: 'CHARGING_HIGH', location: 'Mathura Road Okhla', lat: 28.5583, lng: 77.2750 },
  { id: 'dep-5', name: 'Rajghat DTC Depot', code: 'RGD', totalBuses: 610, evChargers: 28, status: 'OPTIMAL', location: 'Ring Road Rajghat', lat: 28.6415, lng: 77.2503 },
  { id: 'dep-6', name: 'Rohini Sector-22 EV Depot', code: 'RND', totalBuses: 420, evChargers: 30, status: 'OPTIMAL', location: 'Rohini Sector 22', lat: 28.7180, lng: 77.0650 },
  { id: 'dep-7', name: 'Nehru Place Bus Terminal', code: 'NPD', totalBuses: 390, evChargers: 18, status: 'OPTIMAL', location: 'Nehru Place Outer Ring Rd', lat: 28.5494, lng: 77.2530 }
];

export const delhiRoutes = [
  { 
    code: '534-A', 
    name: 'Anand Vihar ISBT ➔ Mehrauli Terminal', 
    color: '#2563eb',
    via: 'Laxmi Nagar • AIIMS • Malviya Nagar', 
    distanceKm: 28.5, 
    activeBuses: 42, 
    frequencyMins: 4,
    coordinates: [
      [28.6469, 77.3155], // Anand Vihar
      [28.6304, 77.2772], // Laxmi Nagar
      [28.6180, 77.2450], // ITO / Nizamuddin
      [28.5878, 77.2588], // Sarai Kale Khan
      [28.5672, 77.2100], // AIIMS
      [28.5400, 77.2050], // Hauz Khas
      [28.5200, 77.1800]  // Mehrauli
    ]
  },
  { 
    code: 'AIRPORT-EXP', 
    name: 'ISBT Kashmere Gate ➔ IGI Airport T3', 
    color: '#16a34a',
    via: 'CP • Dhaula Kuan • Aerocity', 
    distanceKm: 24.8, 
    activeBuses: 24, 
    frequencyMins: 10,
    coordinates: [
      [28.6675, 77.2285], // Kashmere Gate
      [28.6401, 77.2403], // Delhi Gate
      [28.6315, 77.2167], // Connaught Place
      [28.5918, 77.1616], // Dhaula Kuan
      [28.5562, 77.1200], // Aerocity
      [28.5562, 77.0850]  // IGI Airport T3
    ]
  },
  { 
    code: 'RING-SEWA', 
    name: 'Ring Road Mudrika Express', 
    color: '#7c3aed',
    via: 'Kashmere Gate • Rajghat • Ashram • AIIMS • Dhaula Kuan', 
    distanceKm: 48.0, 
    activeBuses: 65, 
    frequencyMins: 3,
    coordinates: [
      [28.6675, 77.2285], // Kashmere Gate
      [28.6415, 77.2503], // Rajghat
      [28.5878, 77.2588], // Sarai Kale Khan
      [28.5700, 77.2500], // Ashram
      [28.5672, 77.2100], // AIIMS
      [28.5918, 77.1616], // Dhaula Kuan
      [28.6400, 77.1400], // Rajouri Garden
      [28.6850, 77.1700], // Azadpur
      [28.6675, 77.2285]  // Back to Kashmere Gate
    ]
  },
  { 
    code: '419', 
    name: 'Old Delhi Railway Station ➔ Ambedkar Nagar', 
    color: '#d97706',
    via: 'Delhi Gate • ITPO • Ashram • Khanpur', 
    distanceKm: 22.0, 
    activeBuses: 36, 
    frequencyMins: 5,
    coordinates: [
      [28.6580, 77.2290], // Old Delhi Railway
      [28.6401, 77.2403], // Delhi Gate
      [28.6150, 77.2480], // Pragati Maidan
      [28.5700, 77.2500], // Ashram
      [28.5494, 77.2530], // Nehru Place
      [28.5150, 77.2350]  // Ambedkar Nagar
    ]
  }
];

export const delhiBusFleet = [
  { 
    id: 'dtc-1001', 
    regNo: 'DL-01-PC-1001', 
    depot: 'Millennium Park', 
    type: 'TATA STARBUS ELECTRIC EV', 
    route: '534-A (Anand Vihar ➔ Mehrauli)', 
    routeCode: '534-A',
    driver: 'Rajesh Kumar (ID: DTC-8812)', 
    speed: 42, 
    occupancy: 44, 
    capacity: 55, 
    batterySoc: '84%', 
    nextStop: 'AIIMS Metro Station', 
    fatigueScore: 0.12, 
    status: 'ON_ROUTE', 
    lat: 28.5672, 
    lng: 77.2100,
    heading: 'South-West',
    isEV: true
  },
  { 
    id: 'dtc-1002', 
    regNo: 'DL-01-PC-2045', 
    depot: 'Sukhdev Vihar EV', 
    type: 'JBM ECO-LIFE ELECTRIC AC', 
    route: 'RING-SEWA (Clockwise)', 
    routeCode: 'RING-SEWA',
    driver: 'Sunil Verma (ID: DTC-4491)', 
    speed: 48, 
    occupancy: 52, 
    capacity: 55, 
    batterySoc: '68%', 
    nextStop: 'Dhaula Kuan Flyover', 
    fatigueScore: 0.15, 
    status: 'ON_ROUTE', 
    lat: 28.5918, 
    lng: 77.1616,
    heading: 'North-East',
    isEV: true
  },
  { 
    id: 'dtc-1003', 
    regNo: 'DL-01-GC-3380', 
    depot: 'Kashmere Gate', 
    type: 'DTC LOW FLOOR CNG AC', 
    route: 'AIRPORT-EXP (T3 Express)', 
    routeCode: 'AIRPORT-EXP',
    driver: 'Manish Tyagi (ID: DTC-1104)', 
    speed: 64, 
    occupancy: 46, 
    capacity: 50, 
    batterySoc: 'CNG 92%', 
    nextStop: 'Aerocity Metro Hub', 
    fatigueScore: 0.84, 
    status: 'FRAUD_FLAG', 
    lat: 28.5562, 
    lng: 77.1200,
    heading: 'West',
    isEV: false
  },
  { 
    id: 'dtc-1004', 
    regNo: 'DL-01-PC-4102', 
    depot: 'Rohini Sector-22', 
    type: 'TATA STARBUS ELECTRIC EV', 
    route: '534-A (Anand Vihar ➔ Mehrauli)', 
    routeCode: '534-A',
    driver: 'Dharmendra Sharma (ID: DTC-9921)', 
    speed: 38, 
    occupancy: 36, 
    capacity: 55, 
    batterySoc: '91%', 
    nextStop: 'Laxmi Nagar Metro', 
    fatigueScore: 0.08, 
    status: 'ON_ROUTE', 
    lat: 28.6304, 
    lng: 77.2772,
    heading: 'West',
    isEV: true
  },
  { 
    id: 'dtc-1005', 
    regNo: 'DL-01-GC-5512', 
    depot: 'Rajghat Depot', 
    type: 'DTC LOW FLOOR CNG AC', 
    route: '419 (Old Delhi ➔ Ambedkar Nagar)', 
    routeCode: '419',
    driver: 'Gurpreet Singh (ID: DTC-7711)', 
    speed: 28, 
    occupancy: 38, 
    capacity: 55, 
    batterySoc: 'CNG 78%', 
    nextStop: 'Delhi Gate ISBT', 
    fatigueScore: 0.14, 
    status: 'ON_ROUTE', 
    lat: 28.6401, 
    lng: 77.2403,
    heading: 'South',
    isEV: false
  },
  { 
    id: 'dtc-1006', 
    regNo: 'DL-01-PC-7789', 
    depot: 'Nehru Place Depot', 
    type: 'TATA STARBUS ELECTRIC EV', 
    route: 'RING-SEWA (Clockwise)', 
    routeCode: 'RING-SEWA',
    driver: 'Vikram Negi (ID: DTC-6632)', 
    speed: 44, 
    occupancy: 41, 
    capacity: 55, 
    batterySoc: '79%', 
    nextStop: 'Ashram Flyover Node', 
    fatigueScore: 0.10, 
    status: 'ON_ROUTE', 
    lat: 28.5700, 
    lng: 77.2500,
    heading: 'North',
    isEV: true
  },
  { 
    id: 'dtc-1007', 
    regNo: 'DL-01-PC-8820', 
    depot: 'Anand Vihar Depot', 
    type: 'JBM ECO-LIFE ELECTRIC AC', 
    route: 'AIRPORT-EXP (T3 Express)', 
    routeCode: 'AIRPORT-EXP',
    driver: 'Amit Kumar (ID: DTC-3341)', 
    speed: 52, 
    occupancy: 48, 
    capacity: 55, 
    batterySoc: '86%', 
    nextStop: 'Connaught Place Central', 
    fatigueScore: 0.11, 
    status: 'ON_ROUTE', 
    lat: 28.6315, 
    lng: 77.2167,
    heading: 'South-West',
    isEV: true
  }
];
