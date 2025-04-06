/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../Components/ui/dialog";
import { Button } from "../../Components/ui/Button";
import { MapPin, Loader2, Navigation } from "lucide-react";

interface LeafletMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (address: string, lat: number, lng: number) => void;
}

// Define Leaflet type
declare global {
  interface Window {
    L: any;
  }
}

export default function LeafletMapModal({
  isOpen,
  onClose,
  onSelectLocation,
}: LeafletMapModalProps) {
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 31.9539, lng: 35.9106 }); // Default to Amman
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [address, setAddress] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const leafletLoadedRef = useRef(false);

  // Load Leaflet scripts and styles
  useEffect(() => {
    if (!isOpen) return;

    const loadLeaflet = async () => {
      if (leafletLoadedRef.current) {
        setLoading(false);
        initializeMap();
        return;
      }

      // Load Leaflet CSS
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        link.crossOrigin = "";
        document.head.appendChild(link);
      }

      // Load Leaflet JS
      if (!window.L) {
        try {
          const leafletScript = document.createElement("script");
          leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          leafletScript.integrity =
            "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
          leafletScript.crossOrigin = "";
          document.head.appendChild(leafletScript);

          await new Promise<void>((resolve) => {
            leafletScript.onload = () => {
              leafletLoadedRef.current = true;
              resolve();
            };
            leafletScript.onerror = () => {
              console.error("Failed to load Leaflet");
              alert("Could not load map. Please try again later.");
              resolve();
            };
          });
        } catch (error) {
          console.error("Error loading Leaflet:", error);
        }
      } else {
        leafletLoadedRef.current = true;
      }

      setLoading(false);
      getUserLocation();
    };

    loadLeaflet();
  }, [isOpen]);

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setSelectedLocation({ lat: latitude, lng: longitude });
          reverseGeocode(latitude, longitude);

          // If map is already initialized, update its view
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 15);
            if (markerRef.current) {
              markerRef.current.setLatLng([latitude, longitude]);
            }
          } else {
            initializeMap({ lat: latitude, lng: longitude });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setSelectedLocation(currentLocation);
          reverseGeocode(currentLocation.lat, currentLocation.lng);
          initializeMap(currentLocation);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      setSelectedLocation(currentLocation);
      reverseGeocode(currentLocation.lat, currentLocation.lng);
      initializeMap(currentLocation);
    }
  };

  // Initialize map with a specific location
  const initializeMap = (location = currentLocation) => {
    if (!mapRef.current || !window.L || mapInstanceRef.current) return;

    console.log("Initializing map with location:", location);

    try {
      // Create map instance
      const map = window.L.map(mapRef.current, {
        center: [location.lat, location.lng],
        zoom: 15,
        zoomControl: true,
        attributionControl: true,
      });

      // Add tile layer (OpenStreetMap)
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Add marker for selected location
      const marker = window.L.marker([location.lat, location.lng], {
        draggable: true,
        autoPan: true,
      }).addTo(map);

      // Add popup to marker
      marker.bindPopup("Drag me to adjust your location").openPopup();

      // Handle marker drag events
      marker.on("dragend", () => {
        const position = marker.getLatLng();
        setSelectedLocation({ lat: position.lat, lng: position.lng });
        reverseGeocode(position.lat, position.lng);
      });

      // Handle map click events
      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setSelectedLocation({ lat, lng });
        reverseGeocode(lat, lng);
        marker.openPopup();
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;

      // Trigger a resize event after the modal is fully visible
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 300);
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };

  // Fix map size when modal is opened
  useEffect(() => {
    if (isOpen && mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current.invalidateSize();
      }, 300);
    }
  }, [isOpen]);

  // Cleanup when component unmounts or modal closes
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current && !isOpen) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [isOpen]);

  // Reverse geocode to get address from coordinates
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      // Using Nominatim OpenStreetMap service for reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();

      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }
  };

  // Handle confirm location
  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onSelectLocation(address, selectedLocation.lat, selectedLocation.lng);
      onClose();
    }
  };

  // Handle "Use My Location" button click
  const handleUseMyLocation = () => {
    getUserLocation();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            Select Your Location
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-textPrm">Loading map...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleUseMyLocation}
                className="text-xs flex items-center gap-1 border-gray-400"
              >
                <Navigation className="h-3 w-3" />
                Use My Location
              </Button>
            </div>

            <div
              ref={mapRef}
              className="w-full h-[350px] rounded-md border border-gray-300 relative z-10"
              aria-label="Map for selecting location"
              style={{ zIndex: 0 }}
            ></div>

            <div className="mt-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-sm text-textPrm">
                  {address || "Click on the map to select a location"}
                </p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-gray-400"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmLocation}
                  disabled={!selectedLocation}
                  className="bg-secondary text-primary hover:bg-secondary hover:text-textPrm"
                >
                  Confirm Location
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
