export interface Produce {
  id: string;
  name: string;
  harvestDate: string;
  imageUrl: string;
  qualityMetrics: string[];
}

export type SupplyChainEventType = 'FARM' | 'PROCESSING' | 'TRANSPORT' | 'RETAIL' | 'PURCHASE';

export interface SupplyChainEvent {
  type: SupplyChainEventType;
  title: string;
  location: string;
  timestamp: string;
  actor: string; // Could be a name, company, or blockchain address
}
