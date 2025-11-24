import { useState } from "react";
import { ArrowLeft, Search, MapPin, TrendingUp, Clock, Compass, Navigation2 } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { RouteItem } from "./HomeScreen";

interface SearchScreenProps {
  onBack: () => void;
  onNavigateToDetails: (item: RouteItem) => void;
  onNavigateToMap: () => void;
}

export function SearchScreen({ onBack, onNavigateToDetails, onNavigateToMap }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: "All", icon: Compass },
    { id: "popular", label: "Popular", icon: TrendingUp },
    { id: "nearby", label: "Nearby", icon: MapPin },
    { id: "timetables", label: "Timetables", icon: Clock }
  ];

  // Mock search results
  const searchResults: RouteItem[] = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1761760178065-f45ba583a014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXMlMjB0cmFuc3BvcnRhdGlvbnxlbnwxfHx8fDE3NjM5MTY0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Route 138 - Colombo → Fort",
      description: "Express service",
      tag: "Active",
      type: "bus"
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1651696067434-61faf50c6fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMHJhaWx3YXklMjBzdGF0aW9ufGVufDF8fHx8MTc2MzkyNDk4OHww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Colombo → Kandy Express",
      description: "First class available",
      tag: "Popular",
      type: "train"
    },
    {
      id: "7",
      image: "https://images.unsplash.com/photo-1561426802-392f5b6290cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJvJTIwc3JpJTIwbGFua2F8ZW58MXx8fHwxNzYzOTY1Mjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Colombo City Centre",
      description: "Shopping & entertainment",
      tag: "Popular",
      type: "destination"
    }
  ];

  const filteredResults = searchQuery
    ? searchResults.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchResults;

  return (
    <div className="min-h-screen w-full bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white">Search</h1>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
          <Input
            type="text"
            placeholder="Search routes, destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-xl bg-white text-foreground border-0"
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map preview section */}
      <div className="px-6 pb-4">
        <div
          onClick={onNavigateToMap}
          className="bg-gradient-to-br from-[#00534E] to-[#8D153A] rounded-2xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-white mb-1">View Map</h3>
              <p className="text-white/80 text-sm">
                See all routes and stops on the map
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Navigation2 className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick search results */}
      <div className="px-6">
        <h3 className="mb-4">
          {searchQuery ? "Search Results" : "Quick Results"}
        </h3>
        <div className="space-y-3">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigateToDetails(item)}
                className="bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="line-clamp-1">{item.title}</h4>
                      <Badge
                        className={`flex-shrink-0 ${
                          item.tag === "Active"
                            ? "bg-[#00534E] text-white"
                            : "bg-[#FDB913] text-[#1a1a1a]"
                        }`}
                      >
                        {item.tag}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
