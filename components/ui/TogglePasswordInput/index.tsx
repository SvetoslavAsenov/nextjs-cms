"use client";

import { useState } from "react";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface TogglePasswordInputProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const TogglePasswordInput = ({
  inputProps,
  buttonProps,
}: TogglePasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-100">
      <Input
        type={showPassword ? "text" : "password"}
        className="pr-8"
        {...inputProps}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 top-0 right-0 flex items-center px-2 hover:bg-transparent"
        {...buttonProps}
      >
        {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
      </Button>
    </div>
  );
};

export default TogglePasswordInput;
