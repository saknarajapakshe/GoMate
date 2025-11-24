import { ArrowLeft, Heart, MapPin, Clock, Navigation } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RouteItem } from "./HomeScreen";
import { useState } from "react";

interface DetailsScreenProps {
  item: RouteItem;
  onBack: () => void;
}

export function DetailsScreen({ item, onBack }: DetailsScreenProps) {
  const [isFavourite, setIsFavourite] = useState(false);

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Active":
        return "bg-[#00534E] text-white";
      case "Popular":
        return "bg-[#FDB913] text-[#1a1a1a]";
      case "Upcoming":
        return "bg-[#E57200] text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Mock stops data
  const stops = item.type !== "destination" ? [
    { name: "Starting Point", time: "06:00 AM", status: "departed" },
    { name: "Stop 1", time: "06:15 AM", status: "departed" },
    { name: "Stop 2", time: "06:30 AM", status: "current" },
    { name: "Stop 3", time: "06:45 AM", status: "upcoming" },
    { name: "Final Destination", time: "07:00 AM", status: "upcoming" }
  ] : [];

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header with image */}
      <div className="relative h-80">
        <ImageWithFallback
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Favorite button */}
        <button
          onClick={() => setIsFavourite(!isFavourite)}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${isFavourite ? 'fill-primary text-primary' : 'text-foreground'}`}
          />
        </button>

        {/* Tag badge */}
        <Badge className={`absolute bottom-6 left-6 ${getTagColor(item.tag)}`}>
          {item.tag}
        </Badge>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        <div>
          <h1 className="mb-2">{item.title}</h1>
          <p className="text-muted-foreground">{item.description}</p>
        </div>

        {/* Route info */}
        {item.route && (
          <div className="bg-muted/50 rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Route</p>
                <p>{item.route}</p>
              </div>
            </div>
            {item.time && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#00534E] mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Schedule</p>
                  <p>{item.time}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stops list / Timetable */}
        {stops.length > 0 && (
          <div>
            <h3 className="mb-4">Stops & Timetable</h3>
            <div className="space-y-4">
              {stops.map((stop, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        stop.status === "departed"
                          ? "bg-[#00534E] border-[#00534E]"
                          : stop.status === "current"
                          ? "bg-primary border-primary"
                          : "bg-transparent border-border"
                      }`}
                    />
                    {index < stops.length - 1 && (
                      <div className="w-0.5 h-12 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p
                      className={
                        stop.status === "current" ? "text-primary" : ""
                      }
                    >
                      {stop.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{stop.time}</p>
                  </div>
                  {stop.status === "current" && (
                    <Badge className="bg-primary text-primary-foreground">
                      Current
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Destination info */}
        {item.type === "destination" && (
          <div>
            <h3 className="mb-4">Getting There</h3>
            <div className="space-y-3">
              <div className="bg-muted/50 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p>View on Map</p>
                  <p className="text-sm text-muted-foreground">
                    See nearby transport options
                  </p>
                </div>
                <Navigation className="w-5 h-5 text-[#00534E]" />
              </div>
            </div>
          </div>
        )}

        {/* Add to Favourites button */}
        <Button
          onClick={() => setIsFavourite(!isFavourite)}
          className={`w-full h-14 rounded-xl ${
            isFavourite
              ? "bg-muted text-foreground hover:bg-muted/80"
              : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          }`}
        >
          <Heart
            className={`w-5 h-5 mr-2 ${isFavourite ? "fill-primary" : ""}`}
          />
          {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </Button>
      </div>
    </div>
  );
}
