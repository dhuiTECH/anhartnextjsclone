'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker icons (Next.js)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

interface MapProps {
  center: [number, number];
  zoom: number;
  markers: MarkerData[];
  className?: string;
}

// Component to update map center when props change
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
}

export default function Map({
  center,
  zoom,
  markers,
  className = 'h-full w-full',
}: MapProps) {
  // Map functionality disabled - returning placeholder
  return (
    <div className={`${className} bg-[#F9F7F2] rounded-lg flex items-center justify-center border-2 border-dashed border-[#14312C]/20`}>
      <div className="text-center">
        <div className="text-4xl mb-4">🗺️</div>
        <p className="text-[#14312C]/60 font-medium">Map temporarily disabled</p>
        <p className="text-[#14312C]/40 text-sm mt-2">
          {markers.length > 0 && `${markers.length} location${markers.length > 1 ? 's' : ''} available`}
        </p>
      </div>
    </div>
  );
  
  /* Map functionality disabled - uncomment below to re-enable
  const [mapKey, setMapKey] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  
  // Generate a unique key only once on mount
  useEffect(() => {
    setMapKey(`map-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
    setIsMounted(true);
  }, []);

  if (!isMounted || !mapKey) {
    return (
      <div className={`${className} bg-[#F9F7F2] rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <p className="text-[#14312C]/60">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div key={mapKey} className={className}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <MapUpdater center={center} zoom={zoom} />
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]}>
            <Popup>
              <strong>{marker.title}</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
  */
}