"use client";

interface MapProps {
  center?: { lat: number; lng: number } | null;
  onLocationChange?: (result: any) => void;
  onMarkerSelect?: (result: any) => void;
}

const Map = ({ center, onLocationChange, onMarkerSelect }: MapProps) => {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden">
      <img
        src="/map/nt.png"
        alt="NT Map"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Map;