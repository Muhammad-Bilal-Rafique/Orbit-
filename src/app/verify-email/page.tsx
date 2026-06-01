"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!email) router.push("/register");
  }, [email]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const onSubmit = async () => {
    if (code.length < 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("/api/auth/verify-email", { email, code });
      toast.success("Email verified successfully!");
      router.push("/login");
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error("Invalid or expired code. Please try again.");
      } else if (error.response?.status === 404) {
        toast.error("Account not found.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onResend = async () => {
    if (cooldown > 0) return;
    setIsResending(true);
    try {
      await axios.post("/api/auth/email-verification", { email });
      toast.success("New code sent! Check your inbox.");
      setCooldown(60);
    } catch (error) {
      toast.error("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent a 6-digit code to{" "}
            <span className="text-foreground font-medium">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <Label htmlFor="code">Verification code</Label>
            <Input
              id="code"
              placeholder="Enter 6-digit code"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            />
          </div>

          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Verifying..." : "Verify email"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Didn't receive the code?{" "}
            <button
              onClick={onResend}
              disabled={isResending || cooldown > 0}
              className="text-primary hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cooldown > 0
                ? `Resend in ${cooldown}s`
                : isResending
                ? "Sending..."
                : "Resend code"}
            </button>
          </p>

        </CardContent>
      </Card>
    </div>
  );
}