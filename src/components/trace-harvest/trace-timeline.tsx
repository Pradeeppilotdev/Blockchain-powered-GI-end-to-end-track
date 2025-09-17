import { type SupplyChainEvent } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tractor, Factory, Truck, Store, User, Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const eventIcons: Record<SupplyChainEvent['type'], React.ElementType> = {
  FARM: Tractor,
  PROCESSING: Factory,
  TRANSPORT: Truck,
  RETAIL: Store,
  PURCHASE: User,
};

const eventColors: Record<SupplyChainEvent['type'], string> = {
  FARM: 'border-green-500/30 bg-green-500/20 text-green-400',
  PROCESSING: 'border-blue-500/30 bg-blue-500/20 text-blue-400',
  TRANSPORT: 'border-yellow-500/30 bg-yellow-500/20 text-yellow-400',
  RETAIL: 'border-purple-500/30 bg-purple-500/20 text-purple-400',
  PURCHASE: 'border-orange-500/30 bg-orange-500/20 text-orange-400',
};

interface TraceTimelineProps {
  events: SupplyChainEvent[];
}

export default function TraceTimeline({ events }: TraceTimelineProps) {
  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-10 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>

      <div className="space-y-12">
        {events.map((event, index) => {
          const Icon = eventIcons[event.type] || Tractor;
          const colorClasses =
            eventColors[event.type] ||
            'border-gray-500/30 bg-gray-500/20 text-gray-400';

          return (
            <div key={index} className="relative flex items-start gap-6">
              <div className="relative z-10">
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-full border-2',
                    colorClasses
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="flex-1 pt-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{event.actor}</p>
                    <h4 className="font-semibold text-lg">{event.title}</h4>
                  </div>
                  {event.price && (
                    <div className="text-right mt-2 sm:mt-0">
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-semibold text-lg">₹{event.price.toFixed(2)}</p>
                    </div>
                  )}
                </div>
                <p className="text-base text-muted-foreground mt-1">{event.location}</p>
                <time className="block text-sm text-muted-foreground mt-2">
                  {new Date(event.timestamp).toLocaleString()}
                </time>

                <div className="mt-4">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-accent transition-colors">
                    <Hash className="w-3 h-3 mr-2" />
                    Tx: {event.transactionHash}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
