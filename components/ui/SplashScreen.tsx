import { Bus } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  // Auto-navigate after 2 seconds
  setTimeout(onComplete, 2000);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#8D153A] via-[#a01847] to-[#FDB913] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Lion silhouette representation with transport icon */}
        <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 animate-pulse">
          <Bus className="w-16 h-16 text-white" strokeWidth={1.5} />
        </div>
      </div>
      
      <h1 className="text-white text-5xl tracking-wider mb-2">GoMate</h1>
      <p className="text-white/80 text-sm tracking-wide">Your Travel Companion</p>
      
      {/* Loading indicator */}
      <div className="mt-12 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}
