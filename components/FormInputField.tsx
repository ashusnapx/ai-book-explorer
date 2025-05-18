"use client";

import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";

interface FormInputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  isNumber?: boolean;
  step?: number | string;
  min?: number;
  max?: number;
}

export function FormInputField({
  control,
  name,
  label,
  placeholder,
  type = "text",
  isNumber = false,
  step,
  min,
  max,
}: FormInputFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              step={step}
              min={min}
              max={max}
              {...field}
              onChange={(e) => {
                if (isNumber) {
                  // Number type hone par parse kar ke bheje
                  const val = e.target.value;
                  field.onChange(val === "" ? undefined : Number(val));
                } else {
                  field.onChange(e);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
