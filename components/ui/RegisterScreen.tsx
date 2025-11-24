import { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface RegisterScreenProps {
  onRegister: (username: string) => void;
  onNavigateToLogin: () => void;
}

export function RegisterScreen({ onRegister, onNavigateToLogin }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string;
  }>({});

  const handleRegister = () => {
    const newErrors: { 
      name?: string; 
      email?: string; 
      password?: string; 
      confirmPassword?: string;
    } = {};

    if (!name) {
      newErrors.name = "Name is required";
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onRegister(name);
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col p-6">
      {/* Header */}
      <div className="mb-8 mt-4">
        <h1 className="mb-2">Create Account</h1>
        <p className="text-muted-foreground">Join GoMate and start your journey</p>
      </div>

      {/* Register form */}
      <div className="w-full max-w-sm mx-auto space-y-4 flex-1">
        <div>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-12 h-14 rounded-xl bg-input-background border-border"
            />
          </div>
          {errors.name && (
            <p className="text-sm text-destructive mt-1 ml-1">{errors.name}</p>
          )}
        </div>

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

        <div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-12 h-14 rounded-xl bg-input-background border-border"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-destructive mt-1 ml-1">{errors.confirmPassword}</p>
          )}
        </div>

        <Button
          onClick={handleRegister}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-14 mt-6"
        >
          Create Account
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

        <div className="text-center mt-6">
          <span className="text-sm text-muted-foreground">Already have an account? </span>
          <button
            onClick={onNavigateToLogin}
            className="text-sm text-primary hover:underline"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}
