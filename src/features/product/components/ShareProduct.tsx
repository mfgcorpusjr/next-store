"use client";

import { LucideShare2 } from "lucide-react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type ShareProductProps = {
  id: string;
  name: string;
};

export default function ShareProduct({ id, name }: ShareProductProps) {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/products/${id}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <LucideShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex items-center w-auto gap-4">
        <FacebookShareButton url={url} name={name}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <EmailShareButton url={url} name={name}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  );
}
