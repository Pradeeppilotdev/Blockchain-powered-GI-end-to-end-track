import { Produce, SupplyChainEvent } from './types';

export const mockProduce: Produce = {
  id: 'prod-KH2024-07',
  name: 'Kandhamal Haladi',
  harvestDate: '2024-07-21',
  imageUrl: 'https://picsum.photos/seed/turmeric/800/800',
  qualityMetrics: [
    'GI-Tagged Product',
    'Curcumin Content: 5.2%',
    'Weight: 20kg batch',
    'Grade: A (Organic)',
    'Origin: Kandhamal, Odisha',
  ],
};

export const mockTraceData: SupplyChainEvent[] = [
  {
    type: 'FARM',
    title: 'Harvested & Authenticated',
    location: 'Daringbadi, Kandhamal, Odisha',
    timestamp: '2024-07-21T09:00:00Z',
    actor: 'Local Farming Cooperative',
    transactionHash: '0xabc...123',
    price: 150.0,
  },
  {
    type: 'PROCESSING',
    title: 'Cleaned, Dried, and Polished',
    location: 'Phulbani Processing Unit, Odisha',
    timestamp: '2024-07-22T16:00:00Z',
    actor: 'Odisha Agro Processing',
    transactionHash: '0xdef...456',
    price: 180.0,
  },
  {
    type: 'TRANSPORT',
    title: 'In Transit to Distributor',
    location: 'En route to Bhubaneswar Hub',
    timestamp: '2024-07-23T11:00:00Z',
    actor: 'State Logistics Service',
    transactionHash: '0xghi...789',
    price: null,
  },
  {
    type: 'RETAIL',
    title: 'Received at Retail Market',
    location: 'Unit-1 Haat, Bhubaneswar, Odisha',
    timestamp: '2024-07-24T10:20:00Z',
    actor: 'Local Retail Vendor',
    transactionHash: '0xjkl...abc',
    price: 250.0,
  },
  {
    type: 'PURCHASE',
    title: 'Purchased by Consumer',
    location: 'Unit-1 Haat, Bhubaneswar, Odisha',
    timestamp: '2024-07-25T18:15:00Z',
    actor: 'A Happy Customer',
    transactionHash: '0x mno...def',
    price: 300.0,
  },
];
