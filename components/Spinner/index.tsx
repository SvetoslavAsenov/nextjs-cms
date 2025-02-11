import { Loader } from "lucide-react";

type SpinnerProps = {
  spinnerClasses?: string;
  iconClasses?: string;
  overlayClasses?: string;
  withOverlay?: boolean;
};

const SpinnerElement = ({ spinnerClasses, iconClasses }: SpinnerProps) => (
  <div className={`animate-spin${spinnerClasses ? " " + spinnerClasses : ""}`}>
    <Loader {...(iconClasses ? { className: iconClasses } : {})} />
  </div>
);

const Spinner = ({
  spinnerClasses,
  iconClasses,
  overlayClasses,
  withOverlay,
}: SpinnerProps) => {
  return withOverlay ? (
    <div
      className={`flex justify-center items-center w-full h-full bg-foreground/70 text-background${
        overlayClasses ? " " + overlayClasses : ""
      }`}
    >
      <SpinnerElement
        spinnerClasses={spinnerClasses}
        iconClasses={iconClasses}
      />
    </div>
  ) : (
    <SpinnerElement />
  );
};

export default Spinner;
