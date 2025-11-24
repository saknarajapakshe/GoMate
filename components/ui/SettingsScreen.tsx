import { ArrowLeft, Moon, Bell, Globe, ChevronRight } from "lucide-react";
import { Switch } from "./ui/switch";
import { useState } from "react";

interface SettingsScreenProps {
  onBack: () => void;
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const languages = [
    { id: "english", name: "English", nativeName: "English" },
    { id: "sinhala", name: "Sinhala", nativeName: "සිංහල" },
    { id: "tamil", name: "Tamil", nativeName: "தமிழ்" }
  ];

  return (
    <div className="min-h-screen w-full bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-white">Settings</h1>
        </div>
      </div>

      {/* Settings sections */}
      <div className="px-6 pt-6 space-y-6">
        {/* Appearance Section */}
        <div>
          <h3 className="mb-3 px-2">Appearance</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00534E]/10 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-[#00534E]" />
                </div>
                <div>
                  <p>Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark theme
                  </p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <h3 className="mb-3 px-2">Notification Preferences</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p>All Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable all notifications
                  </p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            {notifications && (
              <>
                <div className="p-4 flex items-center justify-between pl-16">
                  <div>
                    <p>Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts on your device
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="p-4 flex items-center justify-between pl-16">
                  <div>
                    <p>Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Language Section */}
        <div>
          <h3 className="mb-3 px-2">Language Selection</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => setSelectedLanguage(language.id)}
                className={`w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors ${
                  selectedLanguage === language.id ? "bg-muted/30" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FDB913]/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[#E57200]" />
                  </div>
                  <div className="text-left">
                    <p>{language.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {language.nativeName}
                    </p>
                  </div>
                </div>
                {selectedLanguage === language.id && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="mb-3 px-2">About</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="text-left">
                <p>Terms of Service</p>
                <p className="text-sm text-muted-foreground">
                  Read our terms and conditions
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="text-left">
                <p>Privacy Policy</p>
                <p className="text-sm text-muted-foreground">
                  How we handle your data
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="p-4">
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
