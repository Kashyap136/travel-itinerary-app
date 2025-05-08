import type { FC } from 'react';
import type { ItineraryEvent } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from 'next/image';
import { CalendarDays, MapPin, Info, X, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface DetailsPaneProps {
  event: ItineraryEvent | null;
  onClose: () => void;
  className?: string;
}

const DetailsPane: FC<DetailsPaneProps> = ({ event, onClose, className }) => {
  const { toast } = useToast();

  if (!event) {
    return null;
  }

  const handleAddToCalendar = () => {
    toast({
      title: "Calendar Integration",
      description: `"${event.title}" would be added to your calendar (mocked).`,
    });
  };

  return (
    <Card className={`h-full flex flex-col shadow-xl rounded-none lg:rounded-xl border-l ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <CardTitle className="text-xl font-semibold text-primary truncate pr-2">{event.title}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close details pane">
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="p-4 space-y-6">
          {event.image && (
            <div className="relative h-60 w-full rounded-lg overflow-hidden shadow-md">
              <Image
                src={event.image}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint="event detail"
              />
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-accent" />
              Date & Time
            </h3>
            <p className="text-sm text-muted-foreground">
              {format(new Date(event.startTime), "EEEE, MMMM d, yyyy")}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(event.startTime), "p")}
              {event.endTime && ` - ${format(new Date(event.endTime), "p")}`}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-accent" />
              Location
            </h3>
            <p className="text-sm text-muted-foreground">{event.location}</p>
          </div>
          
          {event.mapPlaceholder && (
            <div className="space-y-2">
               <h3 className="text-lg font-medium text-foreground">Map</h3>
               <div className="relative h-48 w-full rounded-lg overflow-hidden border shadow-sm">
                <Image
                    src={event.mapPlaceholder}
                    alt={`Map for ${event.title}`}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="map location"
                />
               </div>
            </div>
           )}

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Info className="mr-2 h-5 w-5 text-accent" />
              Description
            </h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{event.description}</p>
          </div>

          {event.details && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">Additional Details</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{event.details}</p>
            </div>
          )}

          <Button onClick={handleAddToCalendar} variant="outline" className="w-full mt-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            Add to Calendar (Mock)
          </Button>
          
          <Button variant="link" className="w-full text-primary" asChild>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`} target="_blank" rel="noopener noreferrer">
              Open in Google Maps <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>

        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default DetailsPane;
