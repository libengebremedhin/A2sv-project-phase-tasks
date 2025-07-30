"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNextAuth } from "@/contexts/NextAuthContext";
import {
  emailVerificationSchema,
  type EmailVerificationFormData,
} from "@/lib/validationSchemas";

export default function VerifyEmailPage() {
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const { verifyEmail, isLoading, login } = useNextAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EmailVerificationFormData>({
    resolver: yupResolver(emailVerificationSchema),
    mode: "onChange",
  });

  const otpValue = watch("otp") || "";

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const currentOtp = otpValue;
    const newOtp = currentOtp.split("");
    newOtp[index] = value;
    const updatedOtp = newOtp.join("").slice(0, 4);

    setValue("otp", updatedOtp, { shouldValidate: true });

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValue[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const onSubmit = async (data: EmailVerificationFormData) => {
    try {
      const result = await verifyEmail(email, data.otp);

      if (result.success) {
        toast({
          title: "Success",
          description: "Email verified successfully!",
        });
        router.push("/signin");
      } else {
        toast({
          title: "Error",
          description: result.message || "Verification failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };
// console.log(email)
  const handleResendCode = async () => {
    if (!canResend) return;


    try {
    await login(email, "abebe");
      toast({
        title: "Info",
        description: "Verification code resent to your email",
      });

    setCanResend(false);
    setResendTimer(30);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend code",
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Verify Email
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
            We&apos;ve sent a verification code to the email address you
            provided. To complete the verification process, please enter the
            code here.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otpValue[index] || ""}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-16 h-16 text-center text-xl font-semibold border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.otp ? "border-red-500" : "border-gray-200"
                  }`}
                />
              ))}
            </div>
            {errors.otp && (
              <p className="text-sm text-red-600 text-center">
                {errors.otp.message}
              </p>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              You can request to{" "}
              <button
                type="button"
                onClick={handleResendCode}
                disabled={!canResend}
                className={`font-medium ${
                  canResend
                    ? "text-indigo-600 hover:text-indigo-700 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                Resend code
              </button>
              {!canResend && (
                <span className="text-gray-500">
                  {" "}
                  in {formatTime(resendTimer)}
                </span>
              )}
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || isLoading || otpValue.length !== 4}
            className="w-full bg-indigo-300 hover:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting || isLoading ? "Verifying..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
