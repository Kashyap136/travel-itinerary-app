import type { FC } from 'react';
import type { ItineraryEvent } from '@/types';
import ItineraryCard from './ItineraryCard';
import { ScrollArea } from "@/components/ui/scroll-area";
import { PackageOpen } from 'lucide-react';

interface ItineraryListProps {
  events: ItineraryEvent[];
  onSelectEvent: (eventId: string) => void;
  className?: string;
}

const ItineraryList: FC<ItineraryListProps> = ({ events, onSelectEvent, className }) => {
  if (events.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center h-full p-8 text-center ${className}`}>
        <PackageOpen className="h-24 w-24 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold text-foreground">No Events Found</h2>
        <p className="text-muted-foreground">Try adjusting your filters or adding new events to your itinerary.</p>
      </div>
    );
  }

  return (
    <ScrollArea className={`h-full ${className}`}>
      <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <ItineraryCard key={event.id} event={event} onSelectEvent={onSelectEvent} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ItineraryList;
