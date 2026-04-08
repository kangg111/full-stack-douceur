// lib/use-form-validation.ts
import { useState } from "react";

type Rules<T> = {
  [K in keyof T]?: {
    required?: boolean;
    label?: string;
    minLength?: number;
    pattern?: { regex: RegExp; message: string };
  };
};

export function useFormValidation<T extends Record<string, any>>(
  rules: Rules<T>,
) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = (form: T): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};

    for (const key in rules) {
      const rule = rules[key];
      const value = form[key]?.trim() ?? "";
      const label = rule?.label ?? key;

      if (rule?.required && !value) {
        newErrors[key] = `${label} is required`;
        continue;
      }
      if (
        rule?.minLength &&
        value.length > 0 &&
        value.length < rule.minLength
      ) {
        newErrors[key] =
          `${label} must be at least ${rule.minLength} characters`;
        continue;
      }
      if (rule?.pattern && value && !rule.pattern.regex.test(value)) {
        newErrors[key] = rule.pattern.message;
        continue;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof T) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const clearAll = () => setErrors({});

  return { errors, validate, clearError, clearAll };
}

// ── Shared validation rules ──
export const VALIDATION = {
  email: {
    required: true,
    label: "Email",
    pattern: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  },
  phone: {
    label: "Phone number",
    pattern: {
      regex: /^(\+?6?0)[0-9]{8,10}$/,
      message:
        "Please enter a valid Malaysian phone number (e.g. +60123456789)",
    },
  },
  phoneRequired: {
    required: true,
    label: "Phone number",
    pattern: {
      regex: /^(\+?6?0)[0-9]{8,10}$/,
      message:
        "Please enter a valid Malaysian phone number (e.g. +60123456789)",
    },
  },
  name: {
    required: true,
    label: "Full name",
    minLength: 2,
  },
  firstName: {
    required: true,
    label: "First name",
    minLength: 1,
  },
  lastName: {
    required: true,
    label: "Last name",
    minLength: 1,
  },
  message: {
    required: true,
    label: "Message",
    minLength: 10,
  },
  address: {
    required: true,
    label: "Address",
  },
  postcode: {
    required: true,
    label: "Postcode",
    pattern: {
      regex: /^\d{5}$/,
      message: "Postcode must be 5 digits",
    },
  },
  city: {
    required: true,
    label: "City",
  },
};
