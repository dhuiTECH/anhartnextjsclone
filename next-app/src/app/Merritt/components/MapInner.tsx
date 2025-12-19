'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

// Global map instance - single instance for entire app
let globalMap: L.Map | null = null;
let currentMarkers: L.Marker[] = [];
let isInitializing = false;

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
  propertyLocation?: [number, number];
}

// Create property icon
const createPropertyIcon = (): L.DivIcon => {
  return L.divIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
        <path fill="#DC2626" stroke="#FFFFFF" stroke-width="2" d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24C24 5.4 18.6 0 12 0z"/>
        <circle cx="12" cy="12" r="6" fill="#FFFFFF"/>
        <circle cx="12" cy="12" r="3" fill="#DC2626"/>
      </svg>
    `,
    className: 'property-marker',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36],
  });
};

export default function MapInner({ center, zoom, markers, propertyLocation }: MapInnerProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  console.log('DEBUG: MapInner render', {
    markersCount: markers.length,
    markerIds: markers.map(m => m.id),
    center,
    zoom,
    hasGlobalMap: !!globalMap,
    activeLayer: markers.length > 0 ? markers[0]?.category || 'unknown' : 'none'
  });

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined' || isInitializing) return;

    console.log('DEBUG: Map container setup', {
      hasGlobalMap: !!globalMap,
      containerElement: mapRef.current,
      currentMapContainer: globalMap?._container
    });

    // If we already have a map, check if it's attached to the right container
    if (globalMap) {
      // If the map is attached to a different container, we need to reattach it
      if (globalMap._container !== mapRef.current) {
        console.log('DEBUG: Reattaching map to new container');
        try {
          // Remove the map from its current container
          const oldContainer = globalMap._container;
          if (oldContainer && oldContainer.parentNode) {
            oldContainer.parentNode.removeChild(oldContainer);
          }
          // Move the map to the new container
          mapRef.current.appendChild(globalMap._container);
          globalMap.invalidateSize(); // Important: recalculate map size
        } catch (error) {
          console.log('DEBUG: Reattachment error:', error);
          // If reattachment fails, create a new map
          globalMap = null;
        }
      }

      if (globalMap) {
        updateMapMarkers(markers, propertyLocation);
        globalMap.setView(center, zoom);
        return;
      }
    }

    // Create new map instance
    console.log('DEBUG: Creating new map instance');
    isInitializing = true;
    try {
      globalMap = L.map(mapRef.current, {
        center,
        zoom,
        scrollWheelZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(globalMap);

      updateMapMarkers(markers, propertyLocation);
    } catch (error) {
      console.error('DEBUG: Map creation failed:', error);
    } finally {
      isInitializing = false;
    }

  }, []); // Only run once on mount

  useEffect(() => {
    console.log('DEBUG: useEffect triggered for marker updates', {
      markersCount: markers.length,
      markerIds: markers.map(m => m.id),
      hasGlobalMap: !!globalMap
    });

    if (globalMap) {
      updateMapMarkers(markers, propertyLocation);
      globalMap.setView(center, zoom);
    }
  }, [markers, center, zoom, propertyLocation]);

  // Helper function to update markers
  function updateMapMarkers(newMarkers: MarkerData[], propertyLoc?: [number, number]) {
    if (!globalMap) {
      console.log('DEBUG: No globalMap available for marker updates');
      return;
    }

    console.log('DEBUG: Updating markers', {
      oldCount: currentMarkers.length,
      newCount: newMarkers.length,
      hasPropertyMarker: !!propertyLoc
    });

    // Remove existing markers
    currentMarkers.forEach(marker => {
      globalMap!.removeLayer(marker);
    });
    currentMarkers = [];

    // Add property marker
    if (propertyLoc) {
      const propertyMarker = L.marker(propertyLoc, { icon: createPropertyIcon() })
        .addTo(globalMap)
        .bindPopup('<div><strong style="color: #DC2626">3757 De Wolf Way</strong><p style="font-size: 12px; margin-top: 4px; opacity: 0.8">Property Location</p></div>');
      currentMarkers.push(propertyMarker);
      console.log('DEBUG: Added property marker');
    }

    // Add amenity markers
    newMarkers.forEach(marker => {
      const mapMarker = L.marker([marker.lat, marker.lng])
        .addTo(globalMap!)
        .bindPopup(`<div><strong>${marker.title}</strong></div>`);
      currentMarkers.push(mapMarker);
    });

    console.log('DEBUG: Marker update complete', {
      totalMarkers: currentMarkers.length,
      amenityMarkers: newMarkers.length,
      hasPropertyMarker: !!propertyLoc
    });
  }

  return (
    <div
      ref={mapRef}
      style={{ height: '100%', width: '100%', borderRadius: '8px' }}
    />
  );
}

