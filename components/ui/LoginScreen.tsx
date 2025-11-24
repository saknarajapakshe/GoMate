import { useState } from "react";
import { Mail, Lock, ArrowRight, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface LoginScreenProps {
  onLogin: (username: string) => void;
  onNavigateToRegister: () => void;
}

export function LoginScreen({ onLogin, onNavigateToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // Extract username from email
    const username = email.split('@')[0];
    onLogin(username);
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col p-6">
      {/* Hero illustration */}
      <div className="flex-1 flex items-center justify-center mb-8">
        <div className="w-full max-w-sm">
          <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-[#8D153A] to-[#FDB913] flex items-center justify-center mb-8">
            <LogIn className="w-20 h-20 text-white" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-center mb-2">Welcome Back</h1>
          <p className="text-center text-muted-foreground">Login to continue your journey</p>
        </div>
      </div>

      {/* Login form */}
      <div className="w-full max-w-sm mx-auto space-y-4">
        <div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-12 h-14 rounded-xl bg-input-background border-border"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive mt-1 ml-1">{errors.email}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12 h-14 rounded-xl bg-input-background border-border"
            />
          </div>
          {errors.password && (
            <p className="text-sm text-destructive mt-1 ml-1">{errors.password}</p>
          )}
        </div>

        <button className="text-sm text-primary hover:underline ml-1">
          Forgot Password?
        </button>

        <Button
          onClick={handleLogin}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-14 mt-6"
        >
          Login
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

        <div className="text-center mt-6">
          <span className="text-sm text-muted-foreground">Don't have an account? </span>
          <button
            onClick={onNavigateToRegister}
            className="text-sm text-primary hover:underline"
          >
            Register here
          </button>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
}
