import { useState } from "react";
import { ArrowLeft, Heart, Trash2, Inbox } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RouteItem } from "./HomeScreen";

interface FavouritesScreenProps {
  onBack: () => void;
  onNavigateToDetails: (item: RouteItem) => void;
}

export function FavouritesScreen({ onBack, onNavigateToDetails }: FavouritesScreenProps) {
  // Mock favourite items
  const [favourites, setFavourites] = useState<RouteItem[]>([
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1761760178065-f45ba583a014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXMlMjB0cmFuc3BvcnRhdGlvbnxlbnwxfHx8fDE3NjM5MTY0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Route 138 - Colombo → Fort",
      description: "Express service with air conditioning",
      tag: "Active",
      type: "bus",
      route: "Colombo - Fort - Galle Road"
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1651696067434-61faf50c6fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMHJhaWx3YXklMjBzdGF0aW9ufGVufDF8fHx8MTc2MzkyNDk4OHww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Colombo → Kandy Express",
      description: "First class and second class available",
      tag: "Popular",
      type: "train",
      route: "Colombo Fort - Kandy"
    },
    {
      id: "7",
      image: "https://images.unsplash.com/photo-1561426802-392f5b6290cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJvJTIwc3JpJTIwbGFua2F8ZW58MXx8fHwxNzYzOTY1Mjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Colombo City Centre",
      description: "Shopping, dining, and entertainment hub",
      tag: "Popular",
      type: "destination"
    }
  ]);

  const removeFavourite = (id: string) => {
    setFavourites(favourites.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white">Favourites</h1>
        </div>
        <p className="text-sm text-white/80 ml-14">
          {favourites.length} saved {favourites.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        {favourites.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-6">
              <Inbox className="w-16 h-16 text-muted-foreground" />
            </div>
            <h3 className="mb-2">No Favourites Yet</h3>
            <p className="text-muted-foreground text-center max-w-xs">
              Start adding routes and destinations to your favourites for quick access
            </p>
          </div>
        ) : (
          // Grid of favourites
          <div className="grid grid-cols-1 gap-4">
            {favourites.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-md transition-shadow"
              >
                <div
                  onClick={() => onNavigateToDetails(item)}
                  className="cursor-pointer"
                >
                  <div className="relative h-40">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {item.description}
                    </p>
                    {item.route && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {item.route}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Remove button */}
                <div className="px-4 pb-4 pt-2 border-t border-border">
                  <button
                    onClick={() => removeFavourite(item.id)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove from Favourites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
