'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { logger } from '@/utils/logger';
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
        event: {
          clearInstanceListeners: (instance: any) => void;
        };
      };
    };
  }
}

// Global flag to track if Google Maps script is already loaded
let isGoogleMapsScriptLoaded = false;
let googleMapsLoadPromise: Promise<void> | null = null;

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
  children?: React.ReactNode;
}

export const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  address,
  height = "h-64",
  className = "",
  showDirections = true,
  children
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const [mapError, setMapError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Google Maps API key from environment variable
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!GOOGLE_MAPS_API_KEY) {
    logger.error('Google Maps API key is missing', new Error('Missing API key'), { component: 'GoogleMaps' });
  }

  // Cleanup function
  const cleanupMap = useCallback(() => {
    if (infoWindowRef.current) {
      try {
        infoWindowRef.current.close();
      } catch (e) {
        // Ignore errors during cleanup
      }
      infoWindowRef.current = null;
    }

    if (markerRef.current) {
      try {
        if (window.google?.maps?.event) {
          window.google.maps.event.clearInstanceListeners(markerRef.current);
        }
        markerRef.current.setMap(null);
      } catch (e) {
        // Ignore errors during cleanup
      }
      markerRef.current = null;
    }

    if (mapInstanceRef.current) {
      try {
        if (window.google?.maps?.event) {
          window.google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        }
      } catch (e) {
        // Ignore errors during cleanup
      }
      mapInstanceRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Don't load if API key is missing
    if (!GOOGLE_MAPS_API_KEY) {
      setMapError(true);
      setIsLoaded(false);
      return;
    }

    // Reset loading state
    setIsLoaded(false);
    setMapError(false);

    // Function to load Google Maps script
    const loadGoogleMapsScript = (): Promise<void> => {
      // If already loaded, return resolved promise
      if (isGoogleMapsScriptLoaded && window.google?.maps) {
        return Promise.resolve();
      }

      // If script is already loading, return the existing promise
      if (googleMapsLoadPromise) {
        return googleMapsLoadPromise;
      }

      // Check if script already exists in DOM
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        // Script exists, wait for it to load
        googleMapsLoadPromise = new Promise((resolve, reject) => {
          if (window.google?.maps) {
            isGoogleMapsScriptLoaded = true;
            resolve();
          } else {
            const checkInterval = setInterval(() => {
              if (window.google?.maps) {
                clearInterval(checkInterval);
                isGoogleMapsScriptLoaded = true;
                resolve();
              }
            }, 100);

            existingScript.addEventListener('load', () => {
              clearInterval(checkInterval);
              isGoogleMapsScriptLoaded = true;
              resolve();
            });
            existingScript.addEventListener('error', () => {
              clearInterval(checkInterval);
              reject(new Error('Failed to load Google Maps API'));
            });
          }
        });
        return googleMapsLoadPromise;
      }

      // Create new script
      googleMapsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
          isGoogleMapsScriptLoaded = true;
          resolve();
    };
    
    script.onerror = () => {
      logger.error('Failed to load Google Maps API', new Error('Script load failed'), { component: 'GoogleMaps' });
          googleMapsLoadPromise = null;
          reject(new Error('Failed to load Google Maps API'));
    };

    document.head.appendChild(script);
      });

      return googleMapsLoadPromise;
    };

    // Initialize map function
  const initializeMap = () => {
      if (!mapRef.current || !window.google?.maps) {
        console.log('Map initialization skipped:', { hasRef: !!mapRef.current, hasGoogle: !!window.google?.maps });
        return;
      }

      // Clean up existing map instance if it exists
      if (mapInstanceRef.current) {
        cleanupMap();
      }

    // Use Geocoding API to get coordinates from address
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        
          // Create new map instance
          const map = new window.google.maps.Map(mapRef.current!, {
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

          mapInstanceRef.current = map;

        // Add marker with info window
        const marker = new window.google.maps.Marker({
          position: location,
          map: map,
          title: address,
          animation: window.google.maps.Animation.DROP
        });

          markerRef.current = marker;

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">Anhart</h3>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">${address}</p>
            </div>
          `
        });

          infoWindowRef.current = infoWindow;

        // Show info window on marker click
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        // Show info window by default
        infoWindow.open(map, marker);

          setIsLoaded(true);
          setMapError(false);
      } else {
        logger.error('Geocoding failed', new Error(`Status: ${status}`), { component: 'GoogleMaps', status });
        setMapError(true);
      }
    });
  };

    // Initialize function that handles the full flow
    let timeoutId: NodeJS.Timeout | null = null;
    let retryCount = 0;
    const maxRetries = 10;

    const init = () => {
      if (!mapRef.current) {
        if (retryCount < maxRetries) {
          retryCount++;
          // Retry after a short delay if ref is not ready
          timeoutId = setTimeout(() => {
            init();
          }, 100);
        } else {
          console.warn('Map ref not available after max retries');
          setMapError(true);
        }
        return;
      }

      // Cleanup existing map instance before creating a new one
      cleanupMap();

      // Load Google Maps script and initialize map
      loadGoogleMapsScript()
        .then(() => {
          // Double-check ref is still available after script loads
          if (mapRef.current && window.google?.maps) {
            initializeMap();
          } else {
            console.warn('Map ref or Google Maps not available after script load');
            setMapError(true);
          }
        })
        .catch((error) => {
          logger.error('Failed to load Google Maps', error, { component: 'GoogleMaps' });
          setMapError(true);
        });
    };

    // Start initialization
    init();

    // Cleanup on unmount or when address changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      cleanupMap();
    };
  }, [address, GOOGLE_MAPS_API_KEY, cleanupMap]);

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