'use client';

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MarkerData[];
  className?: string;
  propertyLocation?: [number, number]; // Red pinpoint for property location
}

// Direct import - no SSR issues with direct Leaflet usage
import MapInner from './MapInner';

export default function Map({
  center = [50.1128, -120.7860], // Merritt, BC default
  zoom = 13,
  markers = [],
  className = 'h-96 w-full',
  propertyLocation, // Red pinpoint for 3757 De Wolf Way
}: MapProps) {
  // Use a stable key since we handle marker updates manually in MapInner
  // This prevents unnecessary remounting while still handling React strict mode
  const mapKey = `map-${center[0]}-${center[1]}-${zoom}`;

  return (
    <div className={className}>
      <MapInner 
        key={mapKey} 
        center={center} 
        zoom={zoom} 
        markers={markers}
        propertyLocation={propertyLocation}
      />
    </div>
  );
}
