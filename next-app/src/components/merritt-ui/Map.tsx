'use client';

import { useEffect, useState } from 'react';

// Import Leaflet CSS at the top level
import 'leaflet/dist/leaflet.css';

// Create a client-only map component
function MapComponent({
  center,
  zoom,
  markers,
  className
}: {
  center: [number, number];
  zoom: number;
  markers: Array<{ id: string; lat: number; lng: number; title: string }>;
  className: string;
}) {
  const [MapContainer, setMapContainer] = useState<any>(null);
  const [TileLayer, setTileLayer] = useState<any>(null);
  const [Marker, setMarker] = useState<any>(null);
  const [Popup, setPopup] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import leaflet components only on client side
    const loadComponents = async () => {
      try {
        // Fix for default markers in Next.js/Webpack
        const L = (await import('leaflet')).default;
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        const leaflet = await import('react-leaflet');
        setMapContainer(() => leaflet.MapContainer);
        setTileLayer(() => leaflet.TileLayer);
        setMarker(() => leaflet.Marker);
        setPopup(() => leaflet.Popup);
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to load map components:', error);
      }
    };

    loadComponents();
  }, []);

  if (!isLoaded) {
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
    <div className={className}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]}>
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-[#14312C]">{marker.title}</h3>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

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

export default function Map({
  center = [50.1128, -120.7860], // Merritt, BC coordinates
  zoom = 13,
  markers = [],
  className = "h-96 w-full"
}: MapProps) {
  return <MapComponent center={center} zoom={zoom} markers={markers} className={className} />;
}
