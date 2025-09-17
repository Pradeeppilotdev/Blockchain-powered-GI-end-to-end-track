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
  FARM: 'bg-green-500/20 text-green-400 border-green-500/30',
  PROCESSING: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  TRANSPORT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  RETAIL: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  PURCHASE: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

interface TraceTimelineProps {
  events: SupplyChainEvent[];
}

export default function TraceTimeline({ events }: TraceTimelineProps) {
  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-[1.1rem] top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>

      <div className="space-y-10">
        {events.map((event, index) => {
          const Icon = eventIcons[event.type] || Tractor;
          const colorClasses = eventColors[event.type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';

          return (
            <div key={index} className="relative flex items-start">
              <div
                className={cn(
                  'absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border -translate-x-1/2',
                  colorClasses
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="ml-8 flex-1">
                <h4 className="font-semibold text-lg">{event.title}</h4>
                <p className="text-base text-muted-foreground">{event.location}</p>
                <time className="block text-sm text-muted-foreground mt-1">
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
