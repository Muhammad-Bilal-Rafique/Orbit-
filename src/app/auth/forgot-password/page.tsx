"use client";
import Image from "next/image";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/Logo.png";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, Loader2 } from "lucide-react";

type FormData = {
  email: string;
};

export default function ForgotPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post("/api/auth/email-verification", {
        email: data.email,
        resetPassword: true,
      });

      toast.success("Check your email for the reset code!");
      router.push(
        `/auth/verify-email?email=${encodeURIComponent(data.email)}&forgotPassword=true`
      );
    } catch (error: any) {
      toast.success("If that email exists, you'll receive a reset code");
      router.push(
        `/auth/verify-email?email=${encodeURIComponent(data.email)}&forgotPassword=true`
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        {/* Logo - Properly Sized */}
        <div className="flex flex-col items-center justify-center pt-6 pb-4">
          <div className="relative w-48 h-24">
            <Image
              src={Logo}
              alt="Orbit Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Forgot Password?</CardTitle>
          <CardDescription className="mt-2">
            No worries. Enter your email and we'll send you a code to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-foreground"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive mt-1.5 flex items-center gap-1">
                  ✕ {errors.email?.message as string}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-6"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Reset Code
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center pt-2">
              We'll send a 6-digit code to your email that expires in 15 minutes.
            </p>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t p-4">
          <Link
            href="/auth/login"
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5"
          >
            ← Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}