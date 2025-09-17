import { type SupplyChainEvent } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tractor, Factory, Truck, Store, User } from 'lucide-react';

const eventIcons: Record<SupplyChainEvent['type'], React.ElementType> = {
  FARM: Tractor,
  PROCESSING: Factory,
  TRANSPORT: Truck,
  RETAIL: Store,
  PURCHASE: User,
};

const eventColors: Record<SupplyChainEvent['type'], string> = {
  FARM: 'bg-green-500',
  PROCESSING: 'bg-blue-500',
  TRANSPORT: 'bg-yellow-500',
  RETAIL: 'bg-purple-500',
  PURCHASE: 'bg-orange-500',
};

interface TraceTimelineProps {
  events: SupplyChainEvent[];
}

export default function TraceTimeline({ events }: TraceTimelineProps) {
  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-9 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>

      <div className="space-y-8">
        {events.map((event, index) => {
          const Icon = eventIcons[event.type] || Tractor;
          const color = eventColors[event.type] || 'bg-gray-500';

          return (
            <div key={index} className="relative flex items-start">
              <div
                className={cn(
                  'absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full -translate-x-1/2',
                  color
                )}
              >
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div className="ml-6 flex-1">
                <h4 className="font-semibold text-base font-headline">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{event.location}</p>
                <time className="block text-xs text-muted-foreground mt-1">
                  {new Date(event.timestamp).toLocaleString()}
                </time>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
