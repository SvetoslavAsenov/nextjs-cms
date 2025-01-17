"use client";

import { useState } from "react";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type TogglePasswordInputProps = {
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const iconsStyle = {
  height: "100%",
  width: "100%",
  color: "hsl(var(--muted-foreground))",
};

const TogglePasswordInput = ({
  buttonProps,
  ...rest
}: TogglePasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    console.log("-------------------");
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-100">
      <Input
        className="pr-8"
        {...rest}
        type={showPassword ? "text" : "password"}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 top-0 right-0 flex items-center px-2 hover:bg-transparent h-full"
        {...buttonProps}
      >
        {showPassword ? (
          <EyeOffIcon style={iconsStyle} />
        ) : (
          <EyeIcon style={iconsStyle} />
        )}
      </Button>
    </div>
  );
};

export default TogglePasswordInput;
