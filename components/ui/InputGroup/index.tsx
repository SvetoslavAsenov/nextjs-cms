import { useState, useEffect } from "react";

import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import TogglePasswordInput from "../TogglePasswordInput";

const InputGroup = ({
  label,
  labelProps,
  errors,
  ...inputProps
}: {
  label?: string;
  labelProps?: React.InputHTMLAttributes<HTMLLabelElement>;
  errors?: string[];
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const Component =
    inputProps?.type === "password" ? TogglePasswordInput : Input;

  const [errorShown, setErrorShown] = useState(false);

  useEffect(() => {
    if (errors?.length) {
      setErrorShown(true);
    }
  }, [errors]);

  const handleOnChange = () => {
    setErrorShown(false);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <Label
          className="mb-1 ml-[1px] text-lg font-semibold"
          htmlFor={inputProps?.id}
          {...labelProps}
        >
          {label}
        </Label>
      )}
      <Component onChange={handleOnChange} {...inputProps} />
      {errors?.length &&
        errorShown &&
        errors.map((error, index) => (
          <p
            className="text-sm text-destructive mt-1 ml-[1px]"
            key={`${inputProps?.id || inputProps?.name}-error-${index}`}
          >
            {error}
          </p>
        ))}
    </div>
  );
};

export default InputGroup;
