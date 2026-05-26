"use client";

import { useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google || !mapRef.current) {
        setTimeout(initAutocomplete, 100);
        return;
      }

      initMap();
    };

    //ฟังก์ชั่นหลักmap
    const initMap = () => {
      const bangkok = new google.maps.LatLng(13.736717, 100.523186);

      const infowindow = new google.maps.InfoWindow();

      const map = new google.maps.Map(mapRef.current!, {
        center: bangkok,
        zoom: 15,
        streetViewControl: false
      });

      const request = {
        query: "ตึกใบหยก",
        fields: ["name", "geometry"],
      };

      const service = new google.maps.places.PlacesService(map);

      type PlaceCallback = (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => void;

      service.findPlaceFromQuery(request,(results, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            results
          ) {
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i], map, infowindow);
            }
            map.setCenter(results[0].geometry!.location!);
            console.log()
          }
        }
      );
    };

    const createMarker = (
      place: google.maps.places.PlaceResult,
      map: google.maps.Map,
      infowindow: google.maps.InfoWindow
    ) => {
      if (!place.geometry || !place.geometry.location) return;

      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      });

      //อันนี้เอาไว้ดูละติจูดกับลองติจูดเฉยๆ
      const lag = marker.getPosition();
      console.log('Marker Lat:', lag.lat());
      console.log('Marker Lng:', lag.lng());


      google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(place.name || "");
        infowindow.open(map);
      });
    };

    initAutocomplete();
  }, []);

  return (
    <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
  );
};

export default Map;