import { useState } from "react";
import { Home, Search, Heart, User, Plus, TrendingUp, Clock, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomeScreenProps {
  username: string;
  onNavigateToDetails: (item: RouteItem) => void;
  onNavigateToSearch: () => void;
  onNavigateToFavourites: () => void;
  onNavigateToProfile: () => void;
}

export interface RouteItem {
  id: string;
  image: string;
  title: string;
  description: string;
  tag: "Active" | "Popular" | "Upcoming";
  type: "bus" | "train" | "destination";
  route?: string;
  time?: string;
}

export function HomeScreen({ 
  username, 
  onNavigateToDetails,
  onNavigateToSearch,
  onNavigateToFavourites,
  onNavigateToProfile
}: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<"buses" | "trains" | "destinations">("buses");
  const [activeNavItem, setActiveNavItem] = useState("home");

  // Mock data for routes
  const mockData: Record<string, RouteItem[]> = {
    buses: [
      {
        id: "1",
        image: "https://images.unsplash.com/photo-1761760178065-f45ba583a014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXMlMjB0cmFuc3BvcnRhdGlvbnxlbnwxfHx8fDE3NjM5MTY0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Route 138 - Colombo → Fort",
        description: "Express service with air conditioning",
        tag: "Active",
        type: "bus",
        route: "Colombo - Fort - Galle Road",
        time: "Every 15 mins"
      },
      {
        id: "2",
        image: "https://images.unsplash.com/photo-1761760178065-f45ba583a014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXMlMjB0cmFuc3BvcnRhdGlvbnxlbnwxfHx8fDE3NjM5MTY0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Route 176 - Nugegoda → Kaduwela",
        description: "Regular service via High Level Road",
        tag: "Popular",
        type: "bus",
        route: "Nugegoda - Battaramulla - Kaduwela",
        time: "Every 20 mins"
      },
      {
        id: "3",
        image: "https://images.unsplash.com/photo-1761760178065-f45ba583a014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXMlMjB0cmFuc3BvcnRhdGlvbnxlbnwxfHx8fDE3NjM5MTY0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Route 245 - Kandy → Peradeniya",
        description: "Scenic route through tea estates",
        tag: "Active",
        type: "bus",
        route: "Kandy - University - Peradeniya",
        time: "Every 30 mins"
      }
    ],
    trains: [
      {
        id: "4",
        image: "https://images.unsplash.com/photo-1651696067434-61faf50c6fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMHJhaWx3YXklMjBzdGF0aW9ufGVufDF8fHx8MTc2MzkyNDk4OHww&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Colombo → Kandy Express",
        description: "First class and second class available",
        tag: "Popular",
        type: "train",
        route: "Colombo Fort - Kandy",
        time: "06:00 AM, 10:30 AM, 3:45 PM"
      },
      {
        id: "5",
        image: "https://images.unsplash.com/photo-1651696067434-61faf50c6fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMHJhaWx3YXklMjBzdGF0aW9ufGVufDF8fHx8MTc2MzkyNDk4OHww&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Colombo → Galle Coast Line",
        description: "Scenic coastal railway journey",
        tag: "Active",
        type: "train",
        route: "Colombo - Mount Lavinia - Galle",
        time: "05:55 AM, 2:30 PM"
      },
      {
        id: "6",
        image: "https://images.unsplash.com/photo-1651696067434-61faf50c6fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMHJhaWx3YXklMjBzdGF0aW9ufGVufDF8fHx8MTc2MzkyNDk4OHww&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Ella → Nuwara Eliya Hill Train",
        description: "Most scenic train ride in Sri Lanka",
        tag: "Upcoming",
        type: "train",
        route: "Ella - Haputale - Nuwara Eliya",
        time: "08:45 AM"
      }
    ],
    destinations: [
      {
        id: "7",
        image: "https://images.unsplash.com/photo-1561426802-392f5b6290cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJvJTIwc3JpJTIwbGFua2F8ZW58MXx8fHwxNzYzOTY1Mjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Colombo City Centre",
        description: "Shopping, dining, and entertainment hub",
        tag: "Popular",
        type: "destination"
      },
      {
        id: "8",
        image: "https://images.unsplash.com/photo-1660315249137-29c09bd829a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGRlc3RpbmF0aW9uJTIwdHJvcGljYWx8ZW58MXx8fHwxNzYzOTY1Mjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Unawatuna Beach",
        description: "Perfect for swimming and water sports",
        tag: "Popular",
        type: "destination"
      },
      {
        id: "9",
        image: "https://images.unsplash.com/photo-1763027850659-9699f6f74bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMGNpdHl8ZW58MXx8fHwxNzYzOTA3MzcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        title: "Sigiriya Rock Fortress",
        description: "Ancient palace and fortress complex",
        tag: "Active",
        type: "destination"
      }
    ]
  };

  const currentData = mockData[activeTab];

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

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case "Active":
        return <MapPin className="w-3 h-3" />;
      case "Popular":
        return <TrendingUp className="w-3 h-3" />;
      case "Upcoming":
        return <Clock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-90">Welcome back,</p>
            <h2 className="text-white mt-1">Hi, {username}</h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
        </div>

        {/* Tab buttons */}
        <div className="flex gap-2 bg-white/10 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("buses")}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              activeTab === "buses"
                ? "bg-white text-primary"
                : "text-white/80 hover:text-white"
            }`}
          >
            Buses
          </button>
          <button
            onClick={() => setActiveTab("trains")}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              activeTab === "trains"
                ? "bg-white text-primary"
                : "text-white/80 hover:text-white"
            }`}
          >
            Trains
          </button>
          <button
            onClick={() => setActiveTab("destinations")}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              activeTab === "destinations"
                ? "bg-white text-primary"
                : "text-white/80 hover:text-white"
            }`}
          >
            Destinations
          </button>
        </div>
      </div>

      {/* Routes list */}
      <div className="flex-1 px-6 pt-6 space-y-4">
        {currentData.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigateToDetails(item)}
            className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="relative h-48">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <Badge className={`absolute top-3 right-3 ${getTagColor(item.tag)} flex items-center gap-1`}>
                {getTagIcon(item.tag)}
                {item.tag}
              </Badge>
            </div>
            <div className="p-4">
              <h3 className="mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              {item.route && (
                <p className="text-xs text-muted-foreground mt-2">Route: {item.route}</p>
              )}
              {item.time && (
                <p className="text-xs text-[#00534E] mt-1">⏱ {item.time}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating action button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg flex items-center justify-center transition-all hover:scale-110">
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around px-6 py-3">
          <button
            onClick={() => setActiveNavItem("home")}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
              activeNavItem === "home" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Home className="w-6 h-6" strokeWidth={activeNavItem === "home" ? 2.5 : 2} />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => {
              setActiveNavItem("search");
              onNavigateToSearch();
            }}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
              activeNavItem === "search" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Search className="w-6 h-6" strokeWidth={activeNavItem === "search" ? 2.5 : 2} />
            <span className="text-xs">Search</span>
          </button>
          <button
            onClick={() => {
              setActiveNavItem("favourites");
              onNavigateToFavourites();
            }}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
              activeNavItem === "favourites" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Heart className="w-6 h-6" strokeWidth={activeNavItem === "favourites" ? 2.5 : 2} />
            <span className="text-xs">Favourites</span>
          </button>
          <button
            onClick={() => {
              setActiveNavItem("profile");
              onNavigateToProfile();
            }}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
              activeNavItem === "profile" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <User className="w-6 h-6" strokeWidth={activeNavItem === "profile" ? 2.5 : 2} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
