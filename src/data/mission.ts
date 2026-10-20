import cansatImg from '../assets/cansat.png';
import cansatAnnotatedImg from '../assets/cansat_annotated.png';
import droneImg from '../assets/drone.png';
import droneAnnotatedImg from '../assets/drone_annotated.png';

export const PROJECT_INFO = {
  name: 'AeroSync',
  tagline: 'Hybrid CanSat Telemetry & Launch Vehicle System',
  team: 'VAYU9',
  teamId: '0007',
  event: 'Ignisia × IncubeX 2026',
  track: 'Prototype Expo Track',
  theme: 'Aerospace & Space Technology / Hardware',
  videoFolderUrl: 'https://drive.google.com/drive/folders/12sinTi2cqTp08u40LJMLwo98TNp7EeID',
  buildCostTarget: 'Under ₹8,000 (Reported Prototype Target)',
  videoRemoteUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_104303_0c6d60b2-9353-408e-9449-585108a22fb5.mp4',
  posterRemoteUrl: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/130837c4-0244-4f37-9c61-8d801d93fd29.jpg'
};

export interface WorkflowStep {
  step: string;
  title: string;
  icon: string;
  summary: string;
  details: string[];
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Power On & Initialize',
    icon: 'Power',
    summary: 'Hardware boots, onboard sensor buses are probed, and GNSS navigation fix is attempted.',
    details: [
      'Teensy 4.1 executes bootloader self-test and verifies I2C / SPI peripheral communication.',
      'Sensors (BME280, SHT31, VEML6030, LSM9DS1) run zero-level calibration routines.',
      'u-blox NEO-6M attempts satellite acquisition for 3D navigation fix (GPS variant).',
      'System status LED confirms ground-check readiness before loading onto quadcopter carrier.'
    ]
  },
  {
    step: '02',
    title: 'Sense & Process',
    icon: 'Cpu',
    summary: 'High-speed 600 MHz Cortex-M7 collects, cross-validates, and formats telemetry frames.',
    details: [
      'Multi-sensor polling runs at deterministic sample rates without blocking the main loop.',
      'Sensirion SHT31 temperature and humidity are cross-checked with Bosch BME280 readings.',
      '9-DOF inertial readings (accel, gyro, magnetic) are converted into engineering units.',
      'High-precision timestamp (Mission Elapsed Time - MET) and packet CRC are appended.'
    ]
  },
  {
    step: '03',
    title: 'Transmit Over 433 MHz LoRa',
    icon: 'Radio',
    summary: 'Airborne AS32-TTL-100 radio transmits modulated LoRa packets to ground receiver.',
    details: [
      'Airborne transmitter operates at 433 MHz with robust chirp spread-spectrum modulation.',
      'Design telemetry broadcast cycle runs at approximately ~2.0 second packet intervals.',
      'Ground-side high-sensitivity E32-433T30D receiver captures airborne telemetry packets.',
      'Designed to maintain packet delivery integrity (>95% reported target) over line-of-sight.'
    ]
  },
  {
    step: '04',
    title: 'Ground Display & Logging',
    icon: 'Monitor',
    summary: 'Ground station decodes payload stream for live mapping, charting, and CSV archiving.',
    details: [
      'Mission Planner integration receives NMEA stream and plots CanSat coordinates in real-time.',
      'Real-time atmospheric curves (altitude, temperature, humidity, lux) are visualized.',
      'All incoming packets are preserved to synchronized CSV files for post-flight scientific study.',
      'Inertial vectors assist in descending attitude profile and trajectory reconstruction.'
    ]
  }
];

export interface PipelineNode {
  label: string;
  category: 'airborne' | 'radio' | 'ground' | 'output';
  detail: string;
  icon: string;
}

export const TELEMETRY_PIPELINE: PipelineNode[] = [
  { label: 'Multi-Domain Sensors', category: 'airborne', detail: 'BME280, SHT31, VEML, LSM9DS1, NEO-6M', icon: 'Activity' },
  { label: 'Teensy 4.1 MCU', category: 'airborne', detail: '600 MHz ARM Cortex-M7 Packetizer', icon: 'Cpu' },
  { label: 'AS32-TTL-100 TX', category: 'radio', detail: '433 MHz Airborne LoRa Transmitter', icon: 'Radio' },
  { label: 'E32-433T30D RX', category: 'ground', detail: '433 MHz Ground Station Receiver', icon: 'Wifi' },
  { label: 'Mission Planner UI', category: 'ground', detail: 'Ground Station Live Mapping & Graphs', icon: 'Laptop' },
  { label: 'CSV Telemetry Logs', category: 'output', detail: 'Timestamped Mission Archive', icon: 'FileSpreadsheet' }
];

export interface GalleryItem {
  id: string;
  title: string;
  type: 'actual' | 'annotated';
  entity: 'cansat' | 'carrier';
  image: string;
  badge: string;
  caption: string;
  annotations: string[];
  dimensions?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'cansat-actual',
    title: 'CanSat Telemetry Enclosure — Prototype Photograph',
    type: 'actual',
    entity: 'cansat',
    image: cansatImg,
    badge: 'ACTUAL PROTOTYPE PHOTO',
    caption:
      'Actual physical prototype of the AeroSync CanSat telemetry enclosure. Shows the lightweight cylindrical/hexagonal white protective housing, top electronics stack, external RF antenna, service access cutouts, and status LED indicator.',
    annotations: [
      'White protective 3D/polymer cylindrical enclosure',
      'External 433 MHz omnidirectional antenna',
      'Top-mounted status LED indicator',
      'Upper electronics compartment and wiring harness',
      'Lower service opening for PCB and battery maintenance'
    ],
    dimensions: 'Approx. 18–20 cm (H) × 5–6 cm (W) × 5–6 cm (D)'
  },
  {
    id: 'cansat-annotated',
    title: 'CanSat Telemetry Enclosure — Technical Reference Diagram',
    type: 'annotated',
    entity: 'cansat',
    image: cansatAnnotatedImg,
    badge: 'ANNOTATED REFERENCE DIAGRAM',
    caption:
      'Detailed engineering reference diagram of the CanSat enclosure with highlighted callouts. Explains internal packaging, sensor placement, wire routing, front retaining strap, and service openings with approximate prototype dimensions.',
    annotations: [
      'External RF Antenna (433 MHz Telemetry Link)',
      'Status LED indicator for visual health check',
      'Top electronics stack (Teensy 4.1 & Sensor Bus)',
      'Upper service opening for quick probing',
      'Internal wiring harness routed through chassis',
      'Protective polymer chassis housing',
      'Front retaining strap securing core electronics',
      'Side cover panel with structural ribbing',
      'Lower PCB access bay for battery / sensor breakout'
    ],
    dimensions: 'Chassis Reference: ~18–20 cm Height | ~5–6 cm Width/Depth'
  },
  {
    id: 'drone-actual',
    title: 'Quadcopter Carrier Platform — Prototype Photograph',
    type: 'actual',
    entity: 'carrier',
    image: droneImg,
    badge: 'ACTUAL PROTOTYPE PHOTO',
    caption:
      'Actual hardware prototype of the custom quadcopter carrier / launch vehicle. Features four brushless motors, robust white X-frame arms, high-visibility yellow landing floats for amphibious/field recovery, central flight controller stack, and elevated GPS mast.',
    annotations: [
      '4× High-efficiency brushless motors & matched propellers',
      'Sturdy white composite X-frame arm configuration',
      'High-buoyancy yellow protective floats for rough/water landing protection',
      'Central flight controller and power distribution board',
      'Elevated GPS module mast reducing electromagnetic motor interference'
    ],
    dimensions: 'Standard 450–550 mm class quadcopter airframe'
  },
  {
    id: 'drone-annotated',
    title: 'Quadcopter Carrier Platform — Exploded Technical Diagram',
    type: 'annotated',
    entity: 'carrier',
    image: droneAnnotatedImg,
    badge: 'ANNOTATED EXPLODED DIAGRAM',
    caption:
      'Exploded component diagram of the quadcopter launch carrier vehicle from project materials. Details structural layout, propulsion system, flight avionics, elevated GPS module, and payload attachment interface.',
    annotations: [
      'Matched counter-rotating propellers (4 units)',
      'Brushless outrunner motors (4 units)',
      'Elevated GNSS navigation antenna and compass module',
      'Multi-axis flight controller & autopilot stack',
      'Sensor & power regulation electronics module',
      'Pre-routed high-current wiring harness',
      'High-capacity LiPo flight battery pack',
      'White high-strength structural X-frame arms',
      'Yellow high-visibility buoyant landing floats'
    ],
    dimensions: 'Launch Carrier Vehicle (Payload Release Capable)'
  }
];

export const TECHNICAL_SPECS_TABLES = {
  flightHardware: [
    { component: 'Teensy 4.1', role: 'Main Flight Computer', spec: '600 MHz ARM Cortex-M7, 1024 KB RAM, 35+ I/O pins, high-speed hardware UART/SPI/I2C buses' },
    { component: 'Bosch BME280', role: 'Atmospheric Sensor', spec: 'Barometric pressure (300–1100 hPa), Temperature (-40°C to +85°C), Humidity (0–100% RH)' },
    { component: 'Sensirion SHT31', role: 'Environmental Cross-Check', spec: 'Dual redundant temperature (±0.2°C) & relative humidity (±2% RH) cross-validation' },
    { component: 'Vishay VEML6030', role: 'Illumination Sensor', spec: 'High-accuracy 16-bit ambient light sensor, 0.0036 lx to 120,000 lx dynamic range' },
    { component: 'ST LSM9DS1', role: '9-DOF Inertial Dynamics', spec: '3-axis accelerometer (up to ±16g), 3-axis gyroscope (up to ±2000 dps), 3-axis magnetometer' },
    { component: 'u-blox NEO-6M', role: 'GNSS Positioning (GPS Variant)', spec: '50-channel receiver, 5 Hz update rate, NMEA stream with position, velocity, altitude, satellites, HDOP' }
  ],
  commsSoftware: [
    { component: 'AS32-TTL-100', role: 'Airborne LoRa Transmitter', spec: '433 MHz SX1278-based transceiver, UART transparent transmission, ~+20 dBm (100mW) output' },
    { component: 'E32-433T30D', role: 'Ground Station Receiver', spec: '433 MHz LoRa transceiver with SMA antenna, high sensitivity (-130 dBm), low packet error rate' },
    { component: 'Firmware Architecture', role: 'Embedded Flight Stack', spec: 'C++ / Arduino core with non-blocking cooperative state machine and hardware timer interrupts' },
    { component: 'TinyGPS++', role: 'GPS Stream Parser', spec: 'High-reliability NMEA 0183 object-oriented parsing for position, course, speed, and time' },
    { component: 'Mission Planner', role: 'Ground Station Interface', spec: 'Real-time telemetry decoding, GPS track visualization, terrain map plotting, and CSV logging' }
  ],
  physicalSpecs: [
    { parameter: 'CanSat Chassis Height', value: '~18–20 cm (approximate prototype dimension)' },
    { parameter: 'CanSat Chassis Width/Depth', value: '~5–6 cm × ~5–6 cm' },
    { parameter: 'Nominal Packet Rate', value: '~2.0 seconds telemetry cycle' },
    { parameter: 'Packet Delivery Target', value: '>95% line-of-sight packet reception rate' },
    { parameter: 'Synchronized Parameters', value: '9 sensor channels logged simultaneously' },
    { parameter: 'Target Build Cost', value: 'Under ₹8,000 (Reported prototype target from presentation)' }
  ]
};

export const MISSION_TIMELINE = [
  {
    phase: 'Phase 1',
    name: 'Power On & Ground Pre-Check',
    badge: 'PRE-FLIGHT',
    desc: 'CanSat power is engaged. Sensor buses perform self-test; NEO-6M GPS searches for 3D fix. Base telemetry packets begin transmission to verify ground receiver lock.',
    metrics: 'Sensors: OK | GPS: Acquiring | Telemetry: 433 MHz Active'
  },
  {
    phase: 'Phase 2',
    name: 'Carrier Ascent & Ejection',
    badge: 'LAUNCH',
    desc: 'The quadcopter carrier platform carries the CanSat to target altitude. Upon command or altitude threshold, the release mechanism separates the CanSat and mission timer begins.',
    metrics: 'Max Target Altitude: 100–300 m | Carrier: Quadcopter Hover'
  },
  {
    phase: 'Phase 3',
    name: 'Controlled Parachute Descent',
    badge: 'DESCENT',
    desc: 'Parachute deploys to stabilize descent rate. The Teensy 4.1 logs pressure drop, temperature gradients, ambient lux, and 3-axis attitude while streaming live packets to the ground.',
    metrics: 'Descent Rate: Controlled | Telemetry: ~2s Interval | IMU: Active'
  },
  {
    phase: 'Phase 4',
    name: 'Touchdown & Post-Mission Analysis',
    badge: 'RECOVERY',
    desc: 'CanSat lands safely. Final GPS coordinates, mission elapsed time, and battery telemetry are transmitted. Ground station closes CSV telemetry logs for scientific review.',
    metrics: 'Final Fix Transmitted | Mission Planner CSV Log Saved'
  }
];

export interface SimulatedDataPoint {
  time: number;
  altitude: number;
  temperature: number;
  pressure: number;
  humidity: number;
  lux: number;
}

// Illustrative / Simulated telemetry dataset matching slide 5 description
export const SIMULATED_MISSION_DATA: SimulatedDataPoint[] = [
  { time: 0, altitude: 0, temperature: 28.5, pressure: 1013.2, humidity: 58.2, lux: 42000 },
  { time: 10, altitude: 45, temperature: 28.2, pressure: 1008.1, humidity: 58.0, lux: 43500 },
  { time: 20, altitude: 110, temperature: 27.8, pressure: 1000.4, humidity: 57.5, lux: 45200 },
  { time: 30, altitude: 195, temperature: 27.1, pressure: 991.0, humidity: 56.8, lux: 47800 },
  { time: 40, altitude: 275, temperature: 26.4, pressure: 981.8, humidity: 55.9, lux: 50100 },
  { time: 50, altitude: 310, temperature: 26.0, pressure: 978.2, humidity: 55.2, lux: 51200 }, // Ejection peak
  { time: 60, altitude: 280, temperature: 26.2, pressure: 981.4, humidity: 55.6, lux: 50400 }, // Parachute deployed
  { time: 70, altitude: 235, temperature: 26.7, pressure: 986.5, humidity: 56.1, lux: 49100 },
  { time: 80, altitude: 180, temperature: 27.2, pressure: 992.8, humidity: 56.9, lux: 47500 },
  { time: 90, altitude: 125, temperature: 27.6, pressure: 999.0, humidity: 57.4, lux: 46100 },
  { time: 100, altitude: 70, temperature: 28.0, pressure: 1005.3, humidity: 57.8, lux: 44300 },
  { time: 110, altitude: 20, temperature: 28.3, pressure: 1011.0, humidity: 58.1, lux: 42900 },
  { time: 120, altitude: 0, temperature: 28.5, pressure: 1013.2, humidity: 58.2, lux: 42100 }
];

export const PROBLEMS_AND_SOLUTIONS = [
  {
    icon: 'Clock',
    problemTitle: 'Delayed Data Recovery',
    problemDesc: 'Traditional school & lab rockets store readings only on internal SD cards, requiring full physical payload recovery before any data can be inspected. If the payload is lost, all data vanishes.',
    solutionTitle: 'Real-Time 433 MHz LoRa Telemetry',
    solutionDesc: 'AeroSync transmits every packet at ~2s intervals straight to a ground station receiver. Even if terrain complicates payload retrieval, mission datasets are safely logged in real time.'
  },
  {
    icon: 'DollarSign',
    problemTitle: 'Prohibitive Aerospace Costs',
    problemDesc: 'Commercial cubesat hardware and high-altitude sounding payloads cost tens of thousands of dollars, placing aerospace education out of reach for most colleges, labs, and research teams.',
    solutionTitle: 'Under ₹8,000 Target Prototype Cost',
    solutionDesc: 'Built around modular, widely accessible microelectronics (Teensy 4.1, Bosch BME280, LoRa RF), achieving student-friendly accessibility without compromising sensor precision.'
  },
  {
    icon: 'Layers',
    problemTitle: 'Fragmented Sensing Systems',
    problemDesc: 'Collecting atmospheric pressure, dual-calibrated temperature, humidity, illumination, 9-axis dynamics, and GNSS coordinates typically requires multiple disparate data loggers.',
    solutionTitle: 'Integrated 9-Parameter Core',
    solutionDesc: 'Single compact cylindrical payload orchestrates environmental, inertial, solar, and navigational telemetry in one synchronized time-stamped packet stream.'
  },
  {
    icon: 'Compass',
    problemTitle: 'Stationary Lab Instruments',
    problemDesc: 'Ground weather stations and stationary bench equipment cannot capture altitude-varying atmospheric gradients or dynamic drop physics through real vertical profiles.',
    solutionTitle: 'Airborne Hybrid Quadcopter Carrier',
    solutionDesc: 'Custom drone carrier platform provides vertical flight lift, hovering capability, and repeatable drop-test testing, bridging aerial flight dynamics with ground-station analytics.'
  }
];

export const IMPACT_USE_CASES = [
  {
    icon: 'CloudSun',
    title: 'Environmental & Microclimate Research',
    desc: 'Capture continuous vertical temperature lapse rates, pressure variation, and humidity strata to study boundary-layer meteorology, heat islands, and urban microclimates.'
  },
  {
    icon: 'Sprout',
    title: 'Precision Agriculture',
    desc: 'Altitude-indexed environmental and ambient solar illumination data enables agricultural researchers to analyze thermal stress, canopy moisture retention, and localized weather dynamics.'
  },
  {
    icon: 'ShieldAlert',
    title: 'Disaster Reconnaissance & Observation',
    desc: 'Rapid aerial deployment over floodplains, industrial leaks, or wildfire boundaries provides low-cost atmospheric awareness with live GPS breadcrumb tracking and telemetry downlinks.'
  },
  {
    icon: 'GraduationCap',
    title: 'Accessible Aerospace Education',
    desc: 'Hands-on practical training for engineering students in embedded systems, RF link budgets, attitude kinematics, telemetry parsing, and Mission Planner ground station workflows.'
  }
];

export const RISKS_AND_MITIGATIONS = [
  {
    risk: 'GPS Navigation Signal Loss',
    type: 'Navigation',
    mitigation: 'System flags invalid GNSS fix in telemetry packets, continuing uninterrupted transmission of BME280, SHT31, VEML6030, and 9-DOF IMU parameters.'
  },
  {
    risk: 'Radio Telemetry Link Interruption',
    type: 'RF Downlink',
    mitigation: 'Monotonic packet sequence counters identify packet drops. The ground receiver automatically re-syncs to the 433 MHz LoRa chirp preamble upon line-of-sight recovery.'
  },
  {
    risk: 'Power & Sensor Reliability',
    type: 'Power & Bus',
    mitigation: 'Dual environmental sensors (BME280 and SHT31) provide real-time cross-validation. Planned future revisions incorporate onboard LiPo voltage telemetry.'
  },
  {
    risk: 'Sensor Bus Faults',
    type: 'Hardware Bus',
    mitigation: 'Firmware isolates I2C timeouts, sending explicit null/error codes instead of generating fabricated data, ensuring data integrity for researchers.'
  }
];

export const FUTURE_ROADMAP = [
  { title: 'Web-Based Ground Station Dashboard', status: 'In Development', desc: 'Browser-native WebSerial/WebUSB live visualization eliminating heavy desktop software dependencies.' },
  { title: 'Autonomous Event & Apogee Detection', status: 'Planned', desc: 'Barometric rate-of-climb filtering for automated carrier release and descent parachute deployment.' },
  { title: 'Extended Sensor Fusion (EKF)', status: 'Planned', desc: 'Onboard Extended Kalman Filter combining 9-DOF IMU and GPS for real-time 6-DOF orientation estimation.' },
  { title: 'Integrated Drone Payload Release Mechanism', status: 'Prototype Phase', desc: 'Active servo-latch drop mechanism controlled via carrier telemetry for high-precision deployment.' }
];

export const RESEARCH_REFERENCES = [
  {
    id: 1,
    title: 'Design of Trash Can Sized Satellite for Air Quality Monitoring at an Altitude of 300m Above Ground Level',
    source: 'IEEE Xplore',
    url: 'https://ieeexplore.ieee.org/document/10245113/'
  },
  {
    id: 2,
    title: 'Design and development of a CanSat for air pollution monitoring with RSSI based position retrieval system',
    source: 'Advances in Space Research, Vol. 75, Issue 9, 2025',
    url: 'https://www.sciencedirect.com/science/article/pii/S0273117724001856?via%3Dihub'
  },
  {
    id: 3,
    title: 'CanSat suborbital launch experiment—university educational space program using can sized pico-satellite',
    source: 'Acta Astronautica, Vol. 48, Issues 5–12, pp. 767–776, 2001',
    url: 'https://linkinghub.elsevier.com/retrieve/pii/S009457650100039X'
  },
  {
    id: 4,
    title: 'A pico-satellite assembled and tested during the 6th CanSat Leader Training Program',
    source: 'Journal of Applied Research and Technology, Vol. 15, Issue 1, pp. 83–91, 2017',
    url: 'https://doi.org/10.1016/j.jart.2016.10.003'
  }
];
