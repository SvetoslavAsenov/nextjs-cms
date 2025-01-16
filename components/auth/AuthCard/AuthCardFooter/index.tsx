import { CardFooter } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import GoogleIcon from "@/assets/icons/google-icon-logo.svg";
import LinkedinLogo from "@/assets/icons/linkedin-icon-logo.svg";
import Image from "next/image";

import type { AuthCardFooterProps } from "../AuthCard.types";

export const AuthCardFooter = ({ translations }: AuthCardFooterProps) => {
  return (
    <CardFooter className="flex flex-col">
      <div className="relative w-full flex flex-col justify-center items-center mb-6">
        <hr className="w-full self-center absolute" />
        <p className="bg-background px-4 text-muted-foreground z-10">
          {translations.or}
        </p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <Button
          data-provider="google"
          variant="outline"
          className="text-base h-12"
        >
          <Image src={GoogleIcon} alt="google" className="w-4" />
          {translations.providerButtonLabel} {translations.google}
        </Button>
        <Button
          data-provider="linkedin"
          variant="outline"
          className="text-base h-12"
        >
          <Image src={LinkedinLogo} alt="linkedin" className="w-4" />
          {translations.providerButtonLabel} {translations.linkedin}
        </Button>
      </div>
    </CardFooter>
  );
};
