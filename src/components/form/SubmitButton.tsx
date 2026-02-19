import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type SubmitButtonProps = {
  isLoading?: boolean;
} & ComponentProps<typeof Button>;

export default function SubmitButton({
  isLoading,
  ...rest
}: SubmitButtonProps) {
  return (
    <Button {...rest} type="submit" disabled={isLoading}>
      {isLoading && <Spinner data-icon="inline-start" />}

      {rest.children}
    </Button>
  );
}
