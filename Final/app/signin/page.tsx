"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNextAuth } from "@/contexts/NextAuthContext";
import { signInSchema, type SignInFormData } from "@/lib/validationSchemas";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login, isLoading } = useNextAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await login(data.email, data.password);

      if (result.success) {
        toast({
          title: "Success",
          description: "Signed in successfully!",
        });
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: result.message || "Sign in failed",
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome Back,
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              {...register("email")}
              className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register("password")}
              className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link 
              href="/signup" 
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
