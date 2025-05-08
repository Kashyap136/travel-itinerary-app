"use client";

import type { FC } from 'react';
import { useState, useMemo, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import ItineraryList from '@/components/ItineraryList';
import DetailsPane from '@/components/DetailsPane';
import DestinationTitler from '@/components/DestinationTitler';
import type { ItineraryEvent, ItineraryEventType } from '@/types';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";


interface ItineraryViewProps {
  initialEvents: ItineraryEvent[];
}

const ItineraryView: FC<ItineraryViewProps> = ({ initialEvents }) => {
  const [events, setEvents] = useState<ItineraryEvent[]>(initialEvents);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ItineraryEventType | "all">("all");
  const [isDetailsPaneOpen, setIsDetailsPaneOpen] = useState(false);
  const [isTitlerOpen, setIsTitlerOpen] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    // Close details pane if screen size changes and it was open as a sheet
    if (!isMobile && isDetailsPaneOpen && selectedEventId) {
      // If we move to desktop and sheet was open, ensure it's treated as part of layout
    } else if (isMobile && selectedEventId) {
      // If we move to mobile and an event is selected, ensure pane is open
      setIsDetailsPaneOpen(true);
    }
  }, [isMobile, selectedEventId]);


  const handleSelectEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsDetailsPaneOpen(true);
  };

  const handleCloseDetailsPane = () => {
    setSelectedEventId(null);
    setIsDetailsPaneOpen(false);
  };

  const selectedEvent = useMemo(() => {
    return events.find(event => event.id === selectedEventId) || null;
  }, [events, selectedEventId]);

  const filteredEvents = useMemo(() => {
    if (filter === "all") {
      return events;
    }
    return events.filter(event => event.type === filter);
  }, [events, filter]);

  const toggleTitler = () => setIsTitlerOpen(prev => !prev);

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar currentFilter={filter} onFilterChange={setFilter} />
      <SidebarInset>
        <div className="flex flex-col h-screen overflow-hidden">
          <AppHeader onToggleTitler={toggleTitler} />
          <main className="flex flex-1 overflow-hidden">
            <ItineraryList
              events={filteredEvents}
              onSelectEvent={handleSelectEvent}
              className={`flex-1 transition-all duration-300 ease-in-out ${selectedEvent && isDetailsPaneOpen && !isMobile ? 'lg:w-2/3' : 'w-full'}`}
            />
            {/* Desktop Details Pane (part of layout) */}
            {selectedEvent && isDetailsPaneOpen && !isMobile && (
              <div className="hidden lg:block lg:w-1/3 border-l">
                 <DetailsPane event={selectedEvent} onClose={handleCloseDetailsPane} />
              </div>
            )}
          </main>
        </div>
      </SidebarInset>
      
      {/* Mobile/Tablet Details Pane (Sheet) */}
      {isMobile && (
        <Sheet open={isDetailsPaneOpen && !!selectedEvent} onOpenChange={(open) => { if (!open) handleCloseDetailsPane(); else setIsDetailsPaneOpen(true);}}>
          <SheetContent side="right" className="w-full max-w-md p-0 sm:max-w-lg">
            <DetailsPane event={selectedEvent} onClose={handleCloseDetailsPane} className="h-full" />
          </SheetContent>
        </Sheet>
      )}
      <DestinationTitler isOpen={isTitlerOpen} onClose={toggleTitler} />
    </SidebarProvider>
  );
};

export default ItineraryView;
