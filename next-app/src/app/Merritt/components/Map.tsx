'use client';

import dynamic from 'next/dynamic';

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
}

// Inner map component that uses react-leaflet
const MapInner = dynamic(
  () => import('./MapInner'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-[#F9F7F2] rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🗺️</div>
          <p className="text-[#14312C]/60">Loading map...</p>
        </div>
      </div>
    ),
  }
);

export default function Map({
  center = [50.1128, -120.7860], // Merritt, BC default
  zoom = 13,
  markers = [],
  className = 'h-96 w-full',
}: MapProps) {
  // Use a string version of the center as a key.
  // If the center changes, React kills the old MapContainer entirely.
  // This prevents Turbopack Fast Refresh from causing "already initialized" errors.
  const mapKey = `map-${center[0]}-${center[1]}-${zoom}`;

  return (
    <div className={className}>
      <MapInner key={mapKey} center={center} zoom={zoom} markers={markers} />
    </div>
  );
}
