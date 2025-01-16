"use client";

import { signIn } from "next-auth/react";
import { CardFooter } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import Image from "next/image";
import { OAUTH_PROVIDERS } from "@/constants/oauthProviders";

import type { AuthCardFooterProps } from "../AuthCard.types";

export const AuthCardFooter = ({ translations }: AuthCardFooterProps) => {
  const btnHandler = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const target = ev.target as HTMLButtonElement;
    const provider = target.getAttribute("data-provider");
    if (provider) {
      signIn(provider);
    }
  };

  return (
    <CardFooter className="flex flex-col">
      <div className="relative w-full flex flex-col justify-center items-center mb-6">
        <hr className="w-full self-center absolute" />
        <p className="bg-background px-4 text-muted-foreground z-10">
          {translations.or}
        </p>
      </div>
      <div className="flex flex-col w-full gap-4">
        {OAUTH_PROVIDERS.map((provider) => {
          return (
            <Button
              data-provider={provider.name}
              variant="outline"
              className="text-base h-12"
              onClick={btnHandler}
              key={provider.name}
            >
              <Image src={provider.icon} alt={provider.name} className="w-4" />
              {translations.providerButtonLabel} {translations.google}
            </Button>
          );
        })}
      </div>
    </CardFooter>
  );
};
