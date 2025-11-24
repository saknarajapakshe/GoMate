import { useState } from "react";
import { ChevronRight, MapPin, Calendar, Heart } from "lucide-react";
import { Button } from "./ui/button";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: MapPin,
      title: "Explore Public Transport Easily",
      description: "Find buses, trains, and destinations across Sri Lanka with real-time updates",
      color: "#8D153A"
    },
    {
      icon: Calendar,
      title: "Find Routes, Destinations, Schedules",
      description: "Access comprehensive timetables and route information at your fingertips",
      color: "#FDB913"
    },
    {
      icon: Heart,
      title: "Save Your Favorites & Plan Smooth Trips",
      description: "Bookmark your frequent routes and plan journeys with confidence",
      color: "#00534E"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-6">
        <button
          onClick={onComplete}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <div 
            className="w-48 h-48 mx-auto rounded-full flex items-center justify-center mb-8 transition-all duration-500"
            style={{ backgroundColor: `${slides[currentSlide].color}15` }}
          >
            <CurrentIcon 
              className="w-24 h-24 transition-all duration-500" 
              style={{ color: slides[currentSlide].color }}
              strokeWidth={1.5}
            />
          </div>

          <h2 className="text-center mb-4 px-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-center text-muted-foreground px-8">
            {slides[currentSlide].description}
          </p>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-border'
            }`}
          />
        ))}
      </div>

      {/* Get Started button */}
      <div className="p-6">
        <Button
          onClick={handleNext}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-14"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
