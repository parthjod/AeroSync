export interface ProductSpec {
  label: string;
  value: string;
}

export interface SensorChannel {
  sensor: string;
  parameters: string;
  interface: string;
  role: string;
}

export interface Product {
  id: 'aerosync-gps' | 'aerosync-standard';
  name: string;
  subtitle: string;
  price: number;
  badge: 'FLAGSHIP' | 'CORE';
  features: string[];
  specs: ProductSpec[];
  outputs: string[];
  image: string;
  annotatedImage: string;
  accentColor: string;
  description: string;
  highlight: string;
  sensors: SensorChannel[];
}
