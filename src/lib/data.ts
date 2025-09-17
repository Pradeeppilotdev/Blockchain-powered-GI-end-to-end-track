import { Produce, SupplyChainEvent } from './types';

export const mockProduce: Produce = {
  id: 'prod-12345',
  name: 'Organic Honeycrisp Apples',
  harvestDate: '2024-07-15',
  imageUrl: 'https://picsum.photos/seed/apple/800/800',
  qualityMetrics: [
    'Weight: 15kg batch',
    'Size: Medium to Large',
    'Color: Vibrant Red with Yellow hues',
    'USDA Grade: U.S. Extra Fancy',
  ],
};

export const mockTraceData: SupplyChainEvent[] = [
  {
    type: 'FARM',
    title: 'Harvested',
    location: "Green Valley Orchards, WA",
    timestamp: '2024-07-15T08:00:00Z',
    actor: 'Farmer John',
  },
  {
    type: 'PROCESSING',
    title: 'Washed and Packed',
    location: "Green Valley Packing House, WA",
    timestamp: '2024-07-15T14:30:00Z',
    actor: 'Processor Unit 5',
  },
  {
    type: 'TRANSPORT',
    title: 'In Transit',
    location: "Interstate 90, en route to Midwest",
    timestamp: '2024-07-16T10:00:00Z',
    actor: 'FreshHaul Logistics',
  },
  {
    type: 'RETAIL',
    title: 'Received at Retail',
    location: "Fresh Market, Chicago, IL",
    timestamp: '2024-07-18T09:15:00Z',
    actor: 'Retail Manager Sarah',
  },
  {
    type: 'PURCHASE',
    title: 'Purchased by Consumer',
    location: "Fresh Market, Chicago, IL",
    timestamp: '2024-07-19T17:45:00Z',
    actor: 'A Happy Customer',
  },
];
