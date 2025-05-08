import ItineraryView from '@/components/ItineraryView';
import itineraryData from '@/data/itinerary.json';
import type { ItineraryEvent } from '@/types';

// Force dynamic rendering to ensure data is fresh on each request if it were from a DB
// For local JSON, this isn't strictly necessary but good practice for data-driven pages.
// export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // In a real app, this data would be fetched from an API
  // const response = await fetch('/api/itinerary'); // Example
  // const events: ItineraryEvent[] = await response.json();
  
  // For this mock, we directly use the JSON data.
  // Ensure type assertion for safety if JSON structure is not guaranteed.
  const events: ItineraryEvent[] = itineraryData as ItineraryEvent[];

  return <ItineraryView initialEvents={events} />;
}
