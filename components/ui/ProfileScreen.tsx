import { ArrowLeft, User, Mail, Edit, Moon, Settings, LogOut, ChevronRight } from "lucide-react";
import { Switch } from "./ui/switch";
import { useState } from "react";

interface ProfileScreenProps {
  username: string;
  onBack: () => void;
  onNavigateToSettings: () => void;
  onLogout: () => void;
}

export function ProfileScreen({ username, onBack, onNavigateToSettings, onLogout }: ProfileScreenProps) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen w-full bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-12 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white">Profile</h1>
        </div>

        {/* User avatar and info */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-4 border-4 border-white/30">
            <User className="w-12 h-12" />
          </div>
          <h2 className="text-white mb-1">{username}</h2>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Mail className="w-4 h-4" />
            <span>{username.toLowerCase()}@gomate.lk</span>
          </div>
        </div>
      </div>

      {/* Profile options */}
      <div className="px-6 pt-6 space-y-4">
        {/* Edit Profile */}
        <button className="w-full bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Edit className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <p>Edit Profile</p>
              <p className="text-sm text-muted-foreground">Update your information</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Dark Mode */}
        <div className="w-full bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00534E]/10 flex items-center justify-center">
                <Moon className="w-5 h-5 text-[#00534E]" />
              </div>
              <div className="text-left">
                <p>Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle dark theme</p>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>
        </div>

        {/* Settings */}
        <button
          onClick={onNavigateToSettings}
          className="w-full bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FDB913]/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#E57200]" />
            </div>
            <div className="text-left">
              <p>Settings</p>
              <p className="text-sm text-muted-foreground">App preferences</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full bg-card rounded-xl p-4 border border-destructive/20 hover:bg-destructive/5 transition-colors flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <div className="text-left">
              <p className="text-destructive">Logout</p>
              <p className="text-sm text-muted-foreground">Sign out of your account</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-destructive" />
        </button>
      </div>

      {/* Stats section */}
      <div className="px-6 pt-8">
        <h3 className="mb-4">Your Activity</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-[#8D153A] to-[#a01847] rounded-xl p-4 text-center text-white">
            <p className="text-3xl mb-1">12</p>
            <p className="text-xs opacity-90">Trips</p>
          </div>
          <div className="bg-gradient-to-br from-[#FDB913] to-[#f5a500] rounded-xl p-4 text-center text-[#1a1a1a]">
            <p className="text-3xl mb-1">8</p>
            <p className="text-xs opacity-90">Routes</p>
          </div>
          <div className="bg-gradient-to-br from-[#00534E] to-[#003d3a] rounded-xl p-4 text-center text-white">
            <p className="text-3xl mb-1">3</p>
            <p className="text-xs opacity-90">Favorites</p>
          </div>
        </div>
      </div>
    </div>
  );
}
