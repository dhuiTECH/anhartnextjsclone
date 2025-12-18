'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons for Next.js/Webpack
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  title: string;
}

interface MapInnerProps {
  center: [number, number];
  zoom: number;
  markers: MarkerData[];
}

// Component to handle map size invalidation (fixes rendering issues)
// Made defensive for Turbopack Fast Refresh compatibility
function MapSizeHandler() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const timer = setTimeout(() => {
      // Double-check map is still valid before invalidating
      if (map && typeof map.invalidateSize === 'function') {
        map.invalidateSize();
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      // We don't call map.remove() here because MapContainer handles it.
      // This prevents "leaking" map instances during Turbopack hot reloads.
    };
  }, [map]);

  return null;
}

export default function MapInner({ center, zoom, markers }: MapInnerProps) {
  // Generate a stable unique key for MapContainer based on center and zoom
  // This prevents Turbopack Fast Refresh from reusing a DOM node with an existing map
  const containerKey = `leaflet-${center[0]}-${center[1]}-${zoom}`;

  return (
    <MapContainer
      key={containerKey}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', borderRadius: '8px' }}
      className="leaflet-container"
    >
      <MapSizeHandler />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker) => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]}>
          <Popup>
            <div>
              <strong>{marker.title}</strong>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

