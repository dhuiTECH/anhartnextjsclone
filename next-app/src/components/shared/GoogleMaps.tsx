'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openGoogleMapsDirections } from '@/utils/externalLinks';

// Google Maps API type declarations
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        InfoWindow: new (options: any) => any;
        Geocoder: new () => {
          geocode: (request: { address: string }, callback: (results: any[], status: string) => void) => void;
        };
        MapTypeId: {
          ROADMAP: string;
        };
        Animation: {
          DROP: number;
        };
      };
    };
  }
}

/**
 * GoogleMapEmbed Component
 * 
 * A reusable Google Maps component that displays an interactive map
 * with a marker for the specified address. Features fallback display
 * when Google Maps API is not available.
 * 
 * @param address - The address to display on the map
 * @param height - Height of the map container (default: h-64)
 * @param className - Additional CSS classes
 * @param showDirections - Whether to show a "Get Directions" button
 */
interface GoogleMapEmbedProps {
  address: string;
  height?: string;
  className?: string;
  showDirections?: boolean;
}

export const GoogleMapEmbed: React.FC<{
  children?: React.ReactNode;
}> = ({
  address,
  height = "h-64",
  className = "",
  showDirections = true,
  children
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Google Maps API key
  const GOOGLE_MAPS_API_KEY = "AIzaSyBT_vIEBDc4lid1TLLs_7dTj1shGy-kxZY";

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
      initializeMap();
    };
    
    script.onerror = () => {
      console.error('Failed to load Google Maps API');
      setMapError(true);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [address]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    // Use Geocoding API to get coordinates from address
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 15,
          center: location,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        // Add marker with info window
        const marker = new window.google.maps.Marker({
          position: location,
          map: map,
          title: address,
          animation: window.google.maps.Animation.DROP
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">Anhart Affordable Housing</h3>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">${address}</p>
            </div>
          `
        });

        // Show info window on marker click
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        // Show info window by default
        infoWindow.open(map, marker);

      } else {
        console.error('Geocoding failed:', status);
        setMapError(true);
      }
    });
  };

  const handleGetDirections = () => {
    openGoogleMapsDirections(address);
  };

  // Fallback display when map fails to load
  if (mapError) {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-0">
          <div className={`bg-muted ${height} flex items-center justify-center`}>
            <div className="text-center p-6">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Our Location</h3>
              <p className="text-muted-foreground mb-4">{address}</p>
              {showDirections && (
                <Button 
                  onClick={handleGetDirections}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Get Directions
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="relative">
          <div 
            ref={mapRef} 
            className={`w-full ${height} ${!isLoaded ? 'bg-muted' : ''}`}
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-muted-foreground">Loading map...</p>
              </div>
            </div>
          )}
          {showDirections && isLoaded && (
            <div className="absolute top-4 right-4">
              <Button 
                onClick={handleGetDirections}
                size="sm"
                className="bg-white hover:bg-gray-50 text-gray-700 shadow-lg"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Directions
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};