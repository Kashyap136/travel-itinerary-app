import type { FC } from 'react';
import type { ItineraryEvent, ItineraryEventType } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, MapPin, Utensils, ActivityIcon, Train, Car, CalendarClock, ChevronRight } from "lucide-react";
import Image from 'next/image';
import { format } from 'date-fns';

interface ItineraryCardProps {
  event: ItineraryEvent;
  onSelectEvent: (eventId: string) => void;
}

const getIconForType = (type: ItineraryEventType): React.ElementType => {
  switch (type) {
    case "flight": return Plane;
    case "hotel": return Hotel;
    case "landmark": return MapPin;
    case "restaurant": return Utensils;
    case "activity": return ActivityIcon;
    case "travel": return Train; // Could be Train, Car, etc.
    default: return CalendarClock;
  }
};

const ItineraryCard: FC<ItineraryCardProps> = ({ event, onSelectEvent }) => {
  const Icon = getIconForType(event.type);

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-xl">
      {event.image && (
        <div className="relative h-40 w-full">
          <Image
            src={event.image}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint="travel destination"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
            <Icon className="mr-2 h-5 w-5 text-accent" />
            {event.title}
          </CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground capitalize flex items-center">
          <CalendarClock className="mr-2 h-4 w-4" />
          {format(new Date(event.startTime), "MMM d, yyyy 'at' h:mm a")}
          {event.endTime && ` - ${format(new Date(event.endTime), "h:mm a")}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-foreground line-clamp-2 mb-3">
          {event.description}
        </p>
        <Button
          onClick={() => onSelectEvent(event.id)}
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          aria-label={`View details for ${event.title}`}
        >
          View Details <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItineraryCard;
