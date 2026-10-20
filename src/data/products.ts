import { Product } from '../types/product';
import cansatImg from '../assets/cansat.png';
import cansatAnnotatedImg from '../assets/cansat_annotated.png';
import droneImg from '../assets/drone.png';
import droneAnnotatedImg from '../assets/drone_annotated.png';

export { cansatImg, cansatAnnotatedImg, droneImg, droneAnnotatedImg };

export const PRODUCTS: Product[] = [
  {
    id: 'aerosync-gps',
    name: 'AeroSync GPS',
    subtitle: 'Hybrid CanSat + Launch Vehicle System',
    price: 9500,
    badge: 'FLAGSHIP',
    accentColor: '#3b82f6',
    image: cansatImg,
    annotatedImage: cansatAnnotatedImg,
    highlight: 'Full GPS navigation + real-time 3D trajectory tracking via Mission Planner',
    description:
      'Complete airborne telemetry payload paired with quadcopter carrier release compatibility. Integrates a u-blox NEO-6M GPS module for live coordinates, velocity, satellite lock count, and altitude profiles alongside 8 environmental and inertial parameters.',
    features: [
      'u-blox NEO-6M GNSS receiver with active patch antenna & NMEA parsing via TinyGPS++',
      'Dual environmental cross-checking via Bosch BME280 and Sensirion SHT31',
      'High-dynamic 9-DOF IMU (LSM9DS1) with 3-axis gyro, accelerometer & magnetometer',
      'High-precision ambient illumination sensing via Vishay VEML6030 (up to 120k lx)',
      'Long-range 433 MHz LoRa telemetry link (AS32-TTL-100 airborne transmitter)',
      'Carrier vehicle integration hook for quadcopter high-altitude drop deployment',
      'Mission Planner ground station map visualization and synchronized CSV logging'
    ],
    specs: [
      { label: 'Flight Computer', value: 'Teensy 4.1 (600 MHz ARM Cortex-M7, 1024 KB RAM)' },
      { label: 'GPS / Navigation', value: 'u-blox NEO-6M (50 channels, 5 Hz update, ~2.5m CEP)' },
      { label: 'Pressure & Altitude', value: 'Bosch BME280 (300–1100 hPa, ±1 hPa accuracy)' },
      { label: 'Dual Temp / Humidity', value: 'BME280 + Sensirion SHT31 (±2% RH, ±0.2°C cross-check)' },
      { label: 'Ambient Light', value: 'Vishay VEML6030 (16-bit I2C, 0.0036 to 120,000 lx)' },
      { label: 'Inertial Motion (IMU)', value: 'ST LSM9DS1 (±2/±4/±8/±16g accel, ±245/±500/±2000 dps gyro)' },
      { label: 'Airborne Radio TX', value: 'AS32-TTL-100 (433 MHz LoRa, UART interface, +20 dBm)' },
      { label: 'Ground Radio RX', value: 'E32-433T30D (433 MHz LoRa, high-sensitivity receiver)' },
      { label: 'Firmware Stack', value: 'Embedded C++ / Arduino core with non-blocking scheduler' },
      { label: 'Dimensions (Prototype)', value: 'Height: ~18–20 cm | Width: ~5–6 cm | Depth: ~5–6 cm' },
      { label: 'Telemetry Interval', value: '~2.0 seconds nominal packet transmission' },
      { label: 'Power Supply', value: 'Regulated LiPo battery pack with top service port' }
    ],
    outputs: [
      'Latitude, Longitude & GPS Altitude (WGS84 format)',
      'Ground Speed & Heading Angle',
      'Satellite Count (SIV) & Horizontal Dilution of Precision (HDOP)',
      'Barometric Pressure & Calculated Pressure Altitude (MSL)',
      'Dual Ambient Temperatures (Primary & SHT31 Cross-Check)',
      'Relative Humidity (% RH)',
      'Ambient Light Intensity (Lux)',
      '3-Axis Acceleration (Ax, Ay, Az in g)',
      '3-Axis Angular Velocity (Gx, Gy, Gz in °/s)',
      '3-Axis Magnetic Heading (Mx, My, Mz in gauss)',
      'Mission Elapsed Time (MET) & Packet Sequence Counter'
    ],
    sensors: [
      { sensor: 'u-blox NEO-6M', parameters: 'Position, Altitude, Speed, Satellites, HDOP', interface: 'UART (TinyGPS++)', role: 'GNSS Navigation' },
      { sensor: 'Bosch BME280', parameters: 'Barometric Pressure, Temperature, Humidity', interface: 'I2C (0x76)', role: 'Atmospheric Profiling' },
      { sensor: 'Sensirion SHT31', parameters: 'Temperature, Relative Humidity', interface: 'I2C (0x44)', role: 'Environmental Cross-Check' },
      { sensor: 'Vishay VEML6030', parameters: 'Ambient Illumination (Lux)', interface: 'I2C (0x10)', role: 'Solar / Radiation Flux' },
      { sensor: 'ST LSM9DS1', parameters: '3-Axis Accel, 3-Axis Gyro, 3-Axis Mag', interface: 'SPI / I2C', role: 'Inertial Dynamics' },
      { sensor: 'AS32-TTL-100', parameters: '433 MHz LoRa Telemetry Packets', interface: 'Hardware UART', role: 'Airborne Downlink' }
    ]
  },
  {
    id: 'aerosync-standard',
    name: 'AeroSync Standard',
    subtitle: 'Hybrid CanSat Telemetry System',
    price: 9000,
    badge: 'CORE',
    accentColor: '#8b5cf6',
    image: cansatImg,
    annotatedImage: cansatAnnotatedImg,
    highlight: 'Multi-domain atmospheric & motion sensing optimized for indoor/controlled flights',
    description:
      'Identical high-performance flight computer, dual temperature cross-checking, humidity, pressure, ambient lux, and 9-DOF IMU dynamics without the NEO-6M GPS receiver. Engineered for wind-tunnel trials, enclosed lab drops, and budget-conscious aerospace training.',
    features: [
      'High-speed Teensy 4.1 600 MHz ARM Cortex-M7 real-time computing core',
      'Dual environmental cross-checking via Bosch BME280 and Sensirion SHT31',
      'High-dynamic 9-DOF IMU (LSM9DS1) with 3-axis gyro, accelerometer & magnetometer',
      'High-precision ambient illumination sensing via Vishay VEML6030 (up to 120k lx)',
      'Airborne 433 MHz LoRa transmitter (AS32-TTL-100) with robust packet formatting',
      'Lower PCB service slot and front retaining strap for rapid sensor module swaps',
      'Ground-station CSV telemetry logging and real-time terminal charting'
    ],
    specs: [
      { label: 'Flight Computer', value: 'Teensy 4.1 (600 MHz ARM Cortex-M7, 1024 KB RAM)' },
      { label: 'GPS / Navigation', value: 'Not included (dedicated non-GPS atmospheric payload)' },
      { label: 'Pressure & Altitude', value: 'Bosch BME280 (300–1100 hPa, barometric altitude calculation)' },
      { label: 'Dual Temp / Humidity', value: 'BME280 + Sensirion SHT31 (independent sensor cross-validation)' },
      { label: 'Ambient Light', value: 'Vishay VEML6030 (16-bit I2C, 0.0036 to 120,000 lx)' },
      { label: 'Inertial Motion (IMU)', value: 'ST LSM9DS1 (9-DOF dynamic attitude sensing)' },
      { label: 'Airborne Radio TX', value: 'AS32-TTL-100 (433 MHz LoRa, UART interface, +20 dBm)' },
      { label: 'Ground Radio RX', value: 'E32-433T30D (433 MHz LoRa receiver module)' },
      { label: 'Firmware Stack', value: 'Embedded C++ / Arduino core with modular driver layer' },
      { label: 'Dimensions (Prototype)', value: 'Height: ~18–20 cm | Width: ~5–6 cm | Depth: ~5–6 cm' },
      { label: 'Telemetry Interval', value: '~2.0 seconds nominal packet transmission' },
      { label: 'Power Supply', value: 'Standard internal LiPo battery pack with status LED indicator' }
    ],
    outputs: [
      'Barometric Pressure (hPa) & Estimated Pressure Altitude (MSL)',
      'Primary Temperature (BME280, °C)',
      'Secondary Cross-Check Temperature (SHT31, °C)',
      'Relative Humidity (% RH)',
      'Ambient Illumination Level (Lux)',
      'Linear Accelerations (X, Y, Z in g)',
      'Angular Rates (Roll, Pitch, Yaw in °/s)',
      'Magnetic Field Strengths (X, Y, Z in gauss)',
      'Packet Sequence ID & Mission Elapsed Time (MET)'
    ],
    sensors: [
      { sensor: 'Bosch BME280', parameters: 'Barometric Pressure, Temperature, Humidity', interface: 'I2C (0x76)', role: 'Atmospheric Profiling' },
      { sensor: 'Sensirion SHT31', parameters: 'Temperature, Relative Humidity', interface: 'I2C (0x44)', role: 'Environmental Cross-Check' },
      { sensor: 'Vishay VEML6030', parameters: 'Ambient Illumination (Lux)', interface: 'I2C (0x10)', role: 'Solar / Radiation Flux' },
      { sensor: 'ST LSM9DS1', parameters: '3-Axis Accel, 3-Axis Gyro, 3-Axis Mag', interface: 'SPI / I2C', role: 'Inertial Dynamics' },
      { sensor: 'AS32-TTL-100', parameters: '433 MHz LoRa Telemetry Packets', interface: 'Hardware UART', role: 'Airborne Downlink' }
    ]
  }
];
