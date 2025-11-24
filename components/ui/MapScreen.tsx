import { useState } from "react";
import { ArrowLeft, MapPin, Navigation, Compass, Minus, Plus, Bus, Train } from "lucide-react";
import { Badge } from "./ui/badge";

interface MapScreenProps {
  onBack: () => void;
}

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: "bus" | "train" | "landmark";
  name: string;
  description: string;
}

export function MapScreen({ onBack }: MapScreenProps) {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  // Mock map markers
  const markers: MapMarker[] = [
    {
      id: "1",
      lat: 6.9271,
      lng: 79.8612,
      type: "bus",
      name: "Fort Bus Station",
      description: "Main bus terminal"
    },
    {
      id: "2",
      lat: 6.9344,
      lng: 79.8428,
      type: "train",
      name: "Colombo Fort Railway",
      description: "Central railway station"
    },
    {
      id: "3",
      lat: 6.9270,
      lng: 79.8653,
      type: "landmark",
      name: "Galle Face Green",
      description: "Popular destination"
    }
  ];

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "bus":
        return "#8D153A";
      case "train":
        return "#FDB913";
      case "landmark":
        return "#00534E";
      default:
        return "#8D153A";
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "bus":
        return <Bus className="w-4 h-4" />;
      case "train":
        return <Train className="w-4 h-4" />;
      case "landmark":
        return <MapPin className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-primary text-primary-foreground px-6 pt-12 pb-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-white">Map View</h2>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <Compass className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Map placeholder - Google Maps style */}
      <div className="flex-1 relative bg-gradient-to-br from-[#e8f4f8] to-[#d4e8ed]">
        {/* Simplified map illustration */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Roads */}
          <div className="absolute top-1/4 left-0 right-0 h-2 bg-white/80 transform -rotate-12"></div>
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-white/80 transform rotate-6"></div>
          <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-white/80"></div>
          <div className="absolute top-0 bottom-0 left-2/3 w-2 bg-white/80"></div>
          
          {/* Map markers */}
          {markers.map((marker, index) => (
            <button
              key={marker.id}
              onClick={() => setSelectedMarker(marker)}
              className="absolute w-10 h-10 rounded-full shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform animate-bounce"
              style={{
                backgroundColor: getMarkerColor(marker.type),
                top: `${30 + index * 20}%`,
                left: `${30 + index * 15}%`,
                animationDelay: `${index * 200}ms`,
                animationDuration: '2s',
                animationIterationCount: '3'
              }}
            >
              <div className="text-white">
                {getMarkerIcon(marker.type)}
              </div>
            </button>
          ))}
          
          {/* Current location indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 rounded-full bg-[#4285F4] border-4 border-white shadow-lg"></div>
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-[#4285F4] opacity-30 animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute right-6 top-32 z-10 flex flex-col gap-2">
        <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-muted transition-colors">
          <Plus className="w-5 h-5 text-foreground" />
        </button>
        <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-muted transition-colors">
          <Minus className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Location button */}
      <div className="absolute right-6 bottom-32 z-10">
        <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-muted transition-colors">
          <Navigation className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Bottom sheet for selected marker */}
      {selectedMarker && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-card rounded-t-3xl shadow-2xl border-t border-border animate-slide-up">
          <div className="w-12 h-1 rounded-full bg-border mx-auto mt-3 mb-4"></div>
          
          <div className="px-6 pb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: getMarkerColor(selectedMarker.type) }}
                  >
                    {getMarkerIcon(selectedMarker.type)}
                  </div>
                  <Badge
                    className="capitalize"
                    style={{ backgroundColor: getMarkerColor(selectedMarker.type), color: "white" }}
                  >
                    {selectedMarker.type}
                  </Badge>
                </div>
                <h3 className="mb-1">{selectedMarker.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedMarker.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedMarker(null)}
                className="text-muted-foreground hover:text-foreground ml-2"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-3 mt-4">
              <button className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Get Directions
              </button>
              <button className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
