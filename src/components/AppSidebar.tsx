import type { FC } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ItineraryEventType } from "@/types";
import { Plane, Hotel, MapPin, Utensils, Activity, Train, Car, Sparkles, LayoutGrid } from "lucide-react";
import Link from "next/link";

interface AppSidebarProps {
  currentFilter: ItineraryEventType | "all";
  onFilterChange: (filter: ItineraryEventType | "all") => void;
}

const eventTypeIcons: Record<ItineraryEventType | "all", React.ElementType> = {
  all: LayoutGrid,
  flight: Plane,
  hotel: Hotel,
  landmark: MapPin,
  restaurant: Utensils,
  activity: Activity,
  travel: Train, // Default for travel, can be more specific
};

const eventTypeLabels: Record<ItineraryEventType | "all", string> = {
  all: "All Events",
  flight: "Flights",
  hotel: "Hotels",
  landmark: "Landmarks",
  restaurant: "Restaurants",
  activity: "Activities",
  travel: "Travel",
};

const filters: (ItineraryEventType | "all")[] = ["all", "flight", "hotel", "landmark", "restaurant", "activity", "travel"];

const AppSidebar: FC<AppSidebarProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <Sidebar collapsible="icon" defaultOpen={true} className="border-r shadow-lg">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-sidebar-primary hover:text-sidebar-primary/80 transition-colors">
          <Sparkles className="h-7 w-7" />
          <span>WanderTrack</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          <SidebarGroup>
            <SidebarGroupLabel>Filters</SidebarGroupLabel>
            <SidebarMenu>
              {filters.map((filter) => {
                const Icon = eventTypeIcons[filter];
                return (
                  <SidebarMenuItem key={filter}>
                    <SidebarMenuButton
                      onClick={() => onFilterChange(filter)}
                      isActive={currentFilter === filter}
                      tooltip={{ children: eventTypeLabels[filter], side: "right", align: "center" }}
                      className="justify-start"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="group-data-[collapsible=icon]:hidden">{eventTypeLabels[filter]}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="p-2 text-xs text-sidebar-foreground/60">
         <div className="group-data-[collapsible=icon]:hidden text-center">
           © {new Date().getFullYear()} WanderTrack
         </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
