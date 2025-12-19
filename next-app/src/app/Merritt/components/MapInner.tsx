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

  // Inject styles for property icon
  const STYLE_ID = 'merritt-property-icon-styles';
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .merritt-property-icon {
        background: transparent !important;
        border: none !important;
      }
    `;
    document.head.appendChild(style);
  }
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
  propertyLocation?: [number, number]; // Red pinpoint for property location
}

// Create red pinpoint icon for property location
const createPropertyIcon = (): L.DivIcon => {
  return L.divIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
        <path fill="#DC2626" stroke="#FFFFFF" stroke-width="2" d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24C24 5.4 18.6 0 12 0z"/>
        <circle cx="12" cy="12" r="6" fill="#FFFFFF"/>
        <circle cx="12" cy="12" r="3" fill="#DC2626"/>
      </svg>
    `,
    className: 'merritt-property-icon',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
};

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

export default function MapInner({ center, zoom, markers, propertyLocation }: MapInnerProps) {
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
      {/* Red property location marker */}
      {propertyLocation && (
        <Marker position={propertyLocation} icon={createPropertyIcon()}>
          <Popup>
            <div>
              <strong style={{ color: '#DC2626' }}>3757 De Wolf Way</strong>
              <p style={{ fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>Property Location</p>
            </div>
          </Popup>
        </Marker>
      )}
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

