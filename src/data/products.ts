export type ProductCategory =
  | 'ups'
  | 'inverter'
  | 'batteries'
  | 'accessories'
  | 'refurbished'
  | 'solar';

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  image: string;
  price: number | null;
  originalPrice?: number;
  specs: Spec[];
  featured?: boolean;
  badge?: string;
  condition?: 'A' | 'B' | 'C';
  popular?: boolean;
  description?: string;
  // Extended detail-page fields (optional — fall back to sensible placeholders)
  inputVoltage?: string;
  outputVoltage?: string;
  warranty?: string;
  dimensions?: string;
}

const UPS_IMG = 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=450&fit=crop&auto=format';
const UPS2_IMG = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=450&fit=crop&auto=format';
const INV_IMG = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop&auto=format';
const BAT_IMG = 'https://images.unsplash.com/photo-1620283085439-39620a1e21c4?w=600&h=450&fit=crop&auto=format';
const BAT2_IMG = 'https://images.unsplash.com/photo-1560472354-b33ff0ad5f7a?w=600&h=450&fit=crop&auto=format';
const SOL_IMG = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=450&fit=crop&auto=format';
const SOL2_IMG = 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&h=450&fit=crop&auto=format';
const ACC_IMG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=450&fit=crop&auto=format';
const REF_IMG = 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=450&fit=crop&auto=format';

export const products: Product[] = [
  // UPS - Online
  {
    id: 'ups-001',
    name: 'I.VOLT Pro 1KVA Online UPS',
    category: 'ups',
    subcategory: 'online',
    image: UPS_IMG,
    price: 12500,
    specs: [
      { label: 'Capacity', value: '1 KVA / 800W' },
      { label: 'Type', value: 'Online Double Conversion' },
      { label: 'Backup Time', value: '30–60 min' },
      { label: 'Output Waveform', value: 'Pure Sine Wave' },
    ],
    featured: true,
    popular: true,
    badge: 'Best Seller',
    description: 'Ideal for sensitive equipment, servers, and medical devices.',
  },
  {
    id: 'ups-002',
    name: 'I.VOLT Pro 2KVA Online UPS',
    category: 'ups',
    subcategory: 'online',
    image: UPS_IMG,
    price: 22000,
    specs: [
      { label: 'Capacity', value: '2 KVA / 1800W' },
      { label: 'Type', value: 'Online Double Conversion' },
      { label: 'Backup Time', value: '30–90 min' },
      { label: 'Output Waveform', value: 'Pure Sine Wave' },
    ],
    featured: true,
    badge: 'Popular',
    description: 'Perfect for small server rooms and critical IT infrastructure.',
  },
  {
    id: 'ups-003',
    name: 'I.VOLT Pro 3KVA Online UPS',
    category: 'ups',
    subcategory: 'both',
    image: UPS2_IMG,
    price: 32500,
    specs: [
      { label: 'Capacity', value: '3 KVA / 2700W' },
      { label: 'Type', value: 'Online / Offline Selectable' },
      { label: 'Backup Time', value: '20–60 min' },
      { label: 'Output Waveform', value: 'Pure Sine Wave' },
    ],
    description: 'Enterprise-grade protection for mission-critical workloads.',
  },
  {
    id: 'ups-004',
    name: 'I.VOLT Pro 5KVA Hybrid UPS',
    category: 'ups',
    subcategory: 'both',
    image: UPS2_IMG,
    price: 49500,
    specs: [
      { label: 'Capacity', value: '5 KVA / 4500W' },
      { label: 'Type', value: 'Online / Offline Selectable' },
      { label: 'Backup Time', value: '15–40 min' },
      { label: 'Output Waveform', value: 'Pure Sine Wave' },
    ],
    description: 'Designed for data centers and large server environments.',
  },
  {
    id: 'ups-005',
    name: 'I.VOLT Pro 10KVA Online UPS',
    category: 'ups',
    subcategory: 'online',
    image: UPS_IMG,
    price: null,
    specs: [
      { label: 'Capacity', value: '10 KVA / 9000W' },
      { label: 'Type', value: 'Online Double Conversion' },
      { label: 'Backup Time', value: '10–30 min' },
      { label: 'Output Waveform', value: 'Pure Sine Wave' },
    ],
    badge: 'Enterprise',
    description: 'High-capacity UPS for enterprise data centers.',
  },
  // UPS - Offline
  {
    id: 'ups-006',
    name: 'I.VOLT Home 600VA Offline UPS',
    category: 'ups',
    subcategory: 'offline',
    image: UPS2_IMG,
    price: 3200,
    specs: [
      { label: 'Capacity', value: '600VA / 360W' },
      { label: 'Type', value: 'Offline / Standby' },
      { label: 'Backup Time', value: '15–20 min' },
      { label: 'Output Waveform', value: 'Modified Sine Wave' },
    ],
    popular: true,
    description: 'Ideal for home computers and basic electronics.',
  },
  {
    id: 'ups-007',
    name: 'I.VOLT Home 1KVA Offline UPS',
    category: 'ups',
    subcategory: 'offline',
    image: UPS2_IMG,
    price: 6500,
    specs: [
      { label: 'Capacity', value: '1 KVA / 700W' },
      { label: 'Type', value: 'Offline / Standby' },
      { label: 'Backup Time', value: '20–30 min' },
      { label: 'Output Waveform', value: 'Modified Sine Wave' },
    ],
    featured: true,
    description: 'Cost-effective backup for home and small offices.',
  },
  {
    id: 'ups-008',
    name: 'I.VOLT Home 2KVA Offline UPS',
    category: 'ups',
    subcategory: 'offline',
    image: UPS_IMG,
    price: 11000,
    specs: [
      { label: 'Capacity', value: '2 KVA / 1600W' },
      { label: 'Type', value: 'Offline / Standby' },
      { label: 'Backup Time', value: '25–40 min' },
      { label: 'Output Waveform', value: 'Modified Sine Wave' },
    ],
    description: 'Heavy-duty offline UPS for workshops and offices.',
  },
  // Inverters
  {
    id: 'inv-001',
    name: 'I.VOLT Pure Sine 600VA Inverter',
    category: 'inverter',
    image: INV_IMG,
    price: 3500,
    specs: [
      { label: 'Capacity', value: '600VA / 500W' },
      { label: 'Type', value: 'Pure Sine Wave' },
      { label: 'Battery', value: '12V / 100Ah' },
      { label: 'Efficiency', value: '>90%' },
    ],
    popular: true,
    description: 'Compact inverter for homes with basic power needs.',
  },
  {
    id: 'inv-002',
    name: 'I.VOLT Pure Sine 900VA Inverter',
    category: 'inverter',
    image: INV_IMG,
    price: 5200,
    specs: [
      { label: 'Capacity', value: '900VA / 756W' },
      { label: 'Type', value: 'Pure Sine Wave' },
      { label: 'Battery', value: '12V / 150Ah' },
      { label: 'Efficiency', value: '>91%' },
    ],
    featured: true,
    badge: 'Popular',
    description: 'Most popular choice for 2–3 BHK homes.',
  },
  {
    id: 'inv-003',
    name: 'I.VOLT Pure Sine 1500VA Inverter',
    category: 'inverter',
    image: INV_IMG,
    price: 7800,
    specs: [
      { label: 'Capacity', value: '1500VA / 1200W' },
      { label: 'Type', value: 'Pure Sine Wave' },
      { label: 'Battery', value: '24V / 150Ah' },
      { label: 'Efficiency', value: '>92%' },
    ],
    featured: true,
    description: 'High-capacity home inverter with fast charging.',
  },
  {
    id: 'inv-004',
    name: 'I.VOLT Smart 2000VA Inverter',
    category: 'inverter',
    image: INV_IMG,
    price: 10500,
    specs: [
      { label: 'Capacity', value: '2000VA / 1600W' },
      { label: 'Type', value: 'Pure Sine Wave' },
      { label: 'Battery', value: '24V / 200Ah' },
      { label: 'Efficiency', value: '>93%' },
    ],
    badge: 'New',
    description: 'Smart inverter with Wi-Fi monitoring and auto-switching.',
  },
  {
    id: 'inv-005',
    name: 'I.VOLT Smart 2500VA Inverter',
    category: 'inverter',
    image: INV_IMG,
    price: 13000,
    specs: [
      { label: 'Capacity', value: '2500VA / 2000W' },
      { label: 'Type', value: 'Pure Sine Wave' },
      { label: 'Battery', value: '48V / 150Ah' },
      { label: 'Efficiency', value: '>94%' },
    ],
    description: 'Commercial-grade smart inverter for shops and offices.',
  },
  {
    id: 'inv-006',
    name: 'I.VOLT Max 3500VA Inverter',
    category: 'inverter',
    image: INV_IMG,
    price: 18500,
    specs: [
      { label: 'Capacity', value: '3500VA / 2800W' },
      { label: 'Type', value: 'Pure Sine Wave' },
      { label: 'Battery', value: '48V / 200Ah' },
      { label: 'Efficiency', value: '>94%' },
    ],
    badge: 'Enterprise',
    description: 'High-output inverter for large homes, offices, and retail loads.',
    inputVoltage: '160–280V AC',
    outputVoltage: '230V AC ±1%',
    warranty: '3 Years I.VOLT Warranty',
    dimensions: '520 × 360 × 240 mm',
  },
  // Batteries
  {
    id: 'bat-001',
    name: 'I.VOLT PowerCell 100Ah Tubular Battery',
    category: 'batteries',
    subcategory: 'tubular',
    image: BAT_IMG,
    price: 8500,
    specs: [
      { label: 'Capacity', value: '100 Ah' },
      { label: 'Type', value: 'Tall Tubular' },
      { label: 'Voltage', value: '12V' },
      { label: 'Warranty', value: '3 Years' },
    ],
    featured: true,
    popular: true,
    badge: 'Best Value',
    description: 'Long-life tubular battery for inverters and UPS systems.',
  },
  {
    id: 'bat-002',
    name: 'I.VOLT PowerCell 150Ah Tubular Battery',
    category: 'batteries',
    subcategory: 'tubular',
    image: BAT_IMG,
    price: 12500,
    specs: [
      { label: 'Capacity', value: '150 Ah' },
      { label: 'Type', value: 'Tall Tubular' },
      { label: 'Voltage', value: '12V' },
      { label: 'Warranty', value: '3 Years' },
    ],
    featured: true,
    description: 'High-capacity tubular battery for extended backup.',
  },
  {
    id: 'bat-003',
    name: 'I.VOLT PowerCell 200Ah Tubular Battery',
    category: 'batteries',
    subcategory: 'tubular',
    image: BAT_IMG,
    price: 15000,
    specs: [
      { label: 'Capacity', value: '200 Ah' },
      { label: 'Type', value: 'Tall Tubular' },
      { label: 'Voltage', value: '12V' },
      { label: 'Warranty', value: '4 Years' },
    ],
    badge: 'Premium',
    description: 'Premium large-capacity battery for heavy-duty applications.',
  },
  {
    id: 'bat-004',
    name: 'I.VOLT FlatMax 80Ah Flat Plate Battery',
    category: 'batteries',
    subcategory: 'flat-plate',
    image: BAT2_IMG,
    price: 5800,
    specs: [
      { label: 'Capacity', value: '80 Ah' },
      { label: 'Type', value: 'Flat Plate' },
      { label: 'Voltage', value: '12V' },
      { label: 'Warranty', value: '2 Years' },
    ],
    popular: true,
    description: 'Compact flat plate battery, ideal for frequent power cuts.',
  },
  {
    id: 'bat-005',
    name: 'I.VOLT FlatMax 100Ah Flat Plate Battery',
    category: 'batteries',
    subcategory: 'flat-plate',
    image: BAT2_IMG,
    price: 7200,
    specs: [
      { label: 'Capacity', value: '100 Ah' },
      { label: 'Type', value: 'Flat Plate' },
      { label: 'Voltage', value: '12V' },
      { label: 'Warranty', value: '2 Years' },
    ],
    description: 'Reliable flat plate battery for home inverter systems.',
  },
  {
    id: 'bat-006',
    name: 'I.VOLT FlatMax 150Ah Flat Plate Battery',
    category: 'batteries',
    subcategory: 'flat-plate',
    image: BAT2_IMG,
    price: 9800,
    specs: [
      { label: 'Capacity', value: '150 Ah' },
      { label: 'Type', value: 'Flat Plate' },
      { label: 'Voltage', value: '12V' },
      { label: 'Warranty', value: '2.5 Years' },
    ],
    description: 'High-capacity flat plate battery for extended backup time.',
  },
  // Accessories
  {
    id: 'acc-001',
    name: 'UPS Battery Trolley (Standard)',
    category: 'accessories',
    image: ACC_IMG,
    price: 2500,
    specs: [
      { label: 'Compatibility', value: 'All 100–200Ah Batteries' },
      { label: 'Material', value: 'Heavy-duty Steel' },
      { label: 'Wheels', value: '4 Swivel Castors' },
      { label: 'Load Capacity', value: '80 kg' },
    ],
    popular: true,
    description: 'Durable trolley for easy UPS/inverter battery transportation.',
  },
  {
    id: 'acc-002',
    name: 'UPS Battery Trolley (Heavy Duty)',
    category: 'accessories',
    image: ACC_IMG,
    price: 4500,
    specs: [
      { label: 'Compatibility', value: 'All 150–200Ah Batteries' },
      { label: 'Material', value: 'Powder-coated MS Steel' },
      { label: 'Wheels', value: '6 Industrial Castors' },
      { label: 'Load Capacity', value: '150 kg' },
    ],
    description: 'Industrial-grade trolley for large battery banks.',
  },
  {
    id: 'acc-003',
    name: 'Voltage Stabilizer 5KVA',
    category: 'accessories',
    image: ACC_IMG,
    price: 4200,
    specs: [
      { label: 'Capacity', value: '5 KVA' },
      { label: 'Input Range', value: '140–280V AC' },
      { label: 'Output', value: '220V ±2%' },
      { label: 'Type', value: 'Servo Motor' },
    ],
    featured: true,
    description: 'Servo stabilizer for sensitive equipment protection.',
  },
  {
    id: 'acc-004',
    name: 'UPS Extension Cable Set',
    category: 'accessories',
    image: ACC_IMG,
    price: 850,
    specs: [
      { label: 'Length', value: '3 Meters' },
      { label: 'Rating', value: '16A / 3500W' },
      { label: 'Sockets', value: '4 + 1 Universal' },
      { label: 'Surge Protection', value: 'Yes' },
    ],
    popular: true,
    description: 'Heavy-duty extension cord with surge protection.',
  },
  {
    id: 'acc-005',
    name: 'Battery Interconnect Cable Set',
    category: 'accessories',
    image: ACC_IMG,
    price: 650,
    specs: [
      { label: 'Length', value: '1.5 Meters' },
      { label: 'Wire Gauge', value: '16 SWG Copper' },
      { label: 'Connectors', value: 'Brass Terminals' },
      { label: 'Rating', value: '100A' },
    ],
    description: 'Heavy-gauge copper cables for battery bank connections.',
  },
  {
    id: 'acc-006',
    name: 'Smart Power Conditioner Strip',
    category: 'accessories',
    image: ACC_IMG,
    price: 1200,
    specs: [
      { label: 'Outlets', value: '6 Universal' },
      { label: 'Joule Rating', value: '680J Surge' },
      { label: 'USB Ports', value: '2 x 2.4A' },
      { label: 'Cable Length', value: '2 Meters' },
    ],
    description: 'Surge-protected power strip with USB charging ports.',
  },
  // Solar
  {
    id: 'sol-001',
    name: 'I.VOLT 540W Mono PERC Solar Panel',
    category: 'solar',
    subcategory: 'panel',
    image: SOL_IMG,
    price: 18500,
    specs: [
      { label: 'Wattage', value: '540W' },
      { label: 'Type', value: 'Monocrystalline PERC' },
      { label: 'Efficiency', value: '21.5%' },
      { label: 'Warranty', value: '25 Years Performance' },
    ],
    featured: true,
    badge: 'Top Rated',
    popular: true,
    description: 'High-efficiency panel for residential and commercial rooftops.',
  },
  {
    id: 'sol-002',
    name: 'I.VOLT 400W Polycrystalline Panel',
    category: 'solar',
    subcategory: 'panel',
    image: SOL_IMG,
    price: 12000,
    specs: [
      { label: 'Wattage', value: '400W' },
      { label: 'Type', value: 'Polycrystalline' },
      { label: 'Efficiency', value: '18.2%' },
      { label: 'Warranty', value: '25 Years Performance' },
    ],
    description: 'Cost-effective polycrystalline panel for budget installations.',
  },
  {
    id: 'sol-003',
    name: 'I.VOLT 5KW On-Grid Solar Inverter',
    category: 'solar',
    subcategory: 'inverter',
    image: SOL2_IMG,
    price: 55000,
    specs: [
      { label: 'Capacity', value: '5 KW' },
      { label: 'Type', value: 'On-Grid / Grid-Tied' },
      { label: 'MPPT Trackers', value: '2 Independent' },
      { label: 'Monitoring', value: 'Wi-Fi + App' },
    ],
    featured: true,
    badge: 'New',
    description: 'Smart on-grid inverter with real-time monitoring app.',
  },
  {
    id: 'sol-004',
    name: 'I.VOLT 3KW Off-Grid Solar Inverter',
    category: 'solar',
    subcategory: 'inverter',
    image: SOL2_IMG,
    price: 38000,
    specs: [
      { label: 'Capacity', value: '3 KW' },
      { label: 'Type', value: 'Off-Grid / Standalone' },
      { label: 'Battery Compatible', value: '24V / 48V' },
      { label: 'Output', value: 'Pure Sine Wave' },
    ],
    description: 'Off-grid solar inverter for areas without reliable grid power.',
  },
  {
    id: 'sol-005',
    name: 'I.VOLT 150Ah Solar Battery',
    category: 'solar',
    subcategory: 'battery',
    image: BAT_IMG,
    price: 14500,
    specs: [
      { label: 'Capacity', value: '150 Ah' },
      { label: 'Type', value: 'Tall Tubular Solar' },
      { label: 'Voltage', value: '12V' },
      { label: 'Warranty', value: '5 Years' },
    ],
    description: 'Deep cycle tubular battery optimized for solar applications.',
  },
  {
    id: 'sol-006',
    name: 'I.VOLT 5KW Solar Combo Kit',
    category: 'solar',
    subcategory: 'combo',
    image: SOL_IMG,
    price: 185000,
    specs: [
      { label: 'Panel', value: '10 × 540W Mono PERC' },
      { label: 'Inverter', value: '5KW On-Grid' },
      { label: 'Savings', value: '600–700 units/month' },
      { label: 'Payback', value: '3–4 Years' },
    ],
    badge: 'Complete Kit',
    featured: true,
    description: 'Complete turnkey solar kit with installation support.',
  },
  // Refurbished
  {
    id: 'ref-001',
    name: 'Refurbished 2KVA Online UPS',
    category: 'refurbished',
    image: REF_IMG,
    price: 14000,
    originalPrice: 22000,
    specs: [
      { label: 'Capacity', value: '2 KVA / 1800W' },
      { label: 'Type', value: 'Online Double Conversion' },
      { label: 'Warranty', value: '1 Year I.VOLT' },
      { label: 'Condition', value: 'Grade A – Like New' },
    ],
    badge: 'Refurbished',
    condition: 'A',
    description: 'Factory-tested and certified refurbished UPS, fully functional.',
  },
  {
    id: 'ref-002',
    name: 'Refurbished 3KVA Online UPS',
    category: 'refurbished',
    image: REF_IMG,
    price: 18000,
    originalPrice: 32500,
    specs: [
      { label: 'Capacity', value: '3 KVA / 2700W' },
      { label: 'Type', value: 'Online Double Conversion' },
      { label: 'Warranty', value: '6 Months I.VOLT' },
      { label: 'Condition', value: 'Grade B – Good' },
    ],
    badge: 'Refurbished',
    condition: 'B',
    description: 'Tested and refurbished 3KVA UPS in good working condition.',
  },
  {
    id: 'ref-003',
    name: 'Refurbished 150Ah Tubular Battery',
    category: 'refurbished',
    image: BAT_IMG,
    price: 8500,
    originalPrice: 12500,
    specs: [
      { label: 'Capacity', value: '150 Ah (Reconditioned)' },
      { label: 'Type', value: 'Tall Tubular' },
      { label: 'Warranty', value: '6 Months I.VOLT' },
      { label: 'Condition', value: 'Grade A – Like New' },
    ],
    badge: 'Refurbished',
    condition: 'A',
    description: 'Reconditioned battery with renewed electrolyte and tested capacity.',
  },
  {
    id: 'ref-004',
    name: 'Refurbished 1500VA Inverter',
    category: 'refurbished',
    image: INV_IMG,
    price: 4500,
    originalPrice: 7800,
    specs: [
      { label: 'Capacity', value: '1500VA / 1200W' },
      { label: 'Type', value: 'Pure Sine Wave' },
      { label: 'Warranty', value: '1 Year I.VOLT' },
      { label: 'Condition', value: 'Grade A – Like New' },
    ],
    badge: 'Refurbished',
    condition: 'A',
    popular: true,
    description: 'Certified refurbished inverter, ideal for budget-conscious buyers.',
  },
  {
    id: 'ref-005',
    name: 'Refurbished Voltage Stabilizer 5KVA',
    category: 'refurbished',
    image: ACC_IMG,
    price: 2200,
    originalPrice: 4200,
    specs: [
      { label: 'Capacity', value: '5 KVA' },
      { label: 'Input Range', value: '140–280V AC' },
      { label: 'Warranty', value: '6 Months I.VOLT' },
      { label: 'Condition', value: 'Grade B – Good' },
    ],
    badge: 'Refurbished',
    condition: 'B',
    description: 'Serviced and tested stabilizer at a fraction of the new price.',
  },
  {
    id: 'ref-006',
    name: 'Refurbished 5KW Solar Inverter',
    category: 'refurbished',
    image: SOL2_IMG,
    price: 26500,
    originalPrice: 55000,
    specs: [
      { label: 'Capacity', value: '5 KW' },
      { label: 'Type', value: 'On-Grid / Grid-Tied' },
      { label: 'MPPT Trackers', value: '2 Independent' },
      { label: 'Condition', value: 'Grade B – Good' },
    ],
    badge: 'Refurbished',
    condition: 'B',
    description: 'Tested and recertified solar inverter with monitoring-ready connectivity.',
    inputVoltage: '200–550V DC',
    outputVoltage: '230V AC ±2%',
    warranty: '6 Months I.VOLT Warranty',
    dimensions: '480 × 350 × 190 mm',
  },
];

export const categoryLabels: Record<ProductCategory, string> = {
  ups: 'UPS Systems',
  inverter: 'Inverters',
  batteries: 'Batteries',
  accessories: 'Accessories',
  refurbished: 'Refurbished',
  solar: 'Solar',
};

export const getFeatured = () => products.filter((p) => p.featured);
export const getByCategory = (cat: ProductCategory) =>
  products.filter((p) => p.category === cat);
export const getBySubcategory = (cat: ProductCategory, sub: string) =>
  products.filter((p) => p.category === cat && p.subcategory === sub);
export const getById = (id: string) => products.find((p) => p.id === id);
export const getRelated = (product: Product, limit = 4) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
