
export type ItineraryEventType = "flight" | "hotel" | "landmark" | "restaurant" | "activity" | "travel";

export interface ItineraryEvent {
  id: string;
  type: ItineraryEventType;
  title: string;
  startTime: string; // ISO Date string
  endTime?: string; // ISO Date string
  location: string;
  description: string;
  details?: string;
  image?: string; // URL to an image
  mapPlaceholder?: string; // URL to a map placeholder image
  icon?: React.ElementType; // For specific icons if needed, otherwise derived from type
}
