"use client";

import { useEffect, useRef } from "react";

interface Location {
  lat: number;
  lng: number;
  name?: string;
  address?: string;
  province?: string;
  district?: string;
}

interface MapProps {
  center?: Location | null;
  onMarkerSelect?: (place: { name: string; address: string; lat: number; lng: number; province?: string; district?: string }) => void;
}

const Map = ({ center = null, onMarkerSelect }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    const init = () => {
      if (!window.google || !mapRef.current) {
        setTimeout(init, 100);
        return;
      }

      const bangkok = new google.maps.LatLng(13.736717, 100.523186);

      const map = new google.maps.Map(mapRef.current!, {
        center: center ? { lat: center.lat, lng: center.lng } : bangkok,
        zoom: 15,
        streetViewControl: false,
      });

      mapInstanceRef.current = map;

      if (center) {
        placeMarker(center, map);
      }
    };

    init();

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
      mapInstanceRef.current = null;
    };
  }, []);

  const placeMarker = (
    place: { lat: number; lng: number; name?: string; address?: string },
    map: google.maps.Map
  ) => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }

    const position = new google.maps.LatLng(place.lat, place.lng);

    const marker = new google.maps.Marker({
      map,
      position,
    });

    const infowindow = new google.maps.InfoWindow({
      content: place.name ?? place.address ?? "",
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });

    // Try reverse-geocoding to extract province/district, then notify parent
    if (window.google && window.google.maps && window.google.maps.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
          const comps = results[0].address_components || [];
          let province = "";
          let district = "";
          for (const c of comps) {
            const types = c.types || [];
            if (types.includes("administrative_area_level_1")) province = c.long_name;
            if (types.includes("administrative_area_level_2")) district = c.long_name;
            if (!district && types.includes("sublocality_level_1")) district = c.long_name;
            if (!district && types.includes("locality")) district = c.long_name;
          }

          if (onMarkerSelect) {
            onMarkerSelect({
              name: place.name ?? "",
              address: place.address ?? results[0].formatted_address ?? "",
              lat: place.lat,
              lng: place.lng,
              province: province || undefined,
              district: district || undefined,
            });
          }
        } else {
          if (onMarkerSelect) {
            onMarkerSelect({ name: place.name ?? "", address: place.address ?? "", lat: place.lat, lng: place.lng });
          }
        }
      });
    } else {
      if (onMarkerSelect) {
        onMarkerSelect({ name: place.name ?? "", address: place.address ?? "", lat: place.lat, lng: place.lng });
      }
    }

    markerRef.current = marker;
    map.setCenter(position);
  };

  // react to center prop changes
  useEffect(() => {
    if (!center || !mapInstanceRef.current) return;
    placeMarker(center, mapInstanceRef.current);
  }, [center]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default Map;