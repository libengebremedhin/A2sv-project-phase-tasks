import * as yup from "yup";

// Sign In validation schema
export const signInSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .lowercase()
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(1, "Password is required"),
});

// Sign Up validation schema
export const signUpSchema = yup.object({
  name: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .lowercase()
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  role: yup
    .string()
    .required("Role is required")
    .oneOf(["user", "admin"], "Invalid role selected"),
});

// Email Verification validation schema
export const emailVerificationSchema = yup.object({
  otp: yup
    .string()
    .required("Verification code is required")
    .length(4, "Verification code must be exactly 4 digits")
    .matches(/^\d{4}$/, "Verification code must contain only numbers"),
});

// Types for form data
export type SignInFormData = yup.InferType<typeof signInSchema>;
export type SignUpFormData = yup.InferType<typeof signUpSchema>;
export type EmailVerificationFormData = yup.InferType<typeof emailVerificationSchema>;
