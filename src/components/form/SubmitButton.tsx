import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type SubmitButtonProps = {
  isPending?: boolean;
} & ComponentProps<typeof Button>;

export default function SubmitButton({
  isPending,
  ...rest
}: SubmitButtonProps) {
  return (
    <Button {...rest} type="submit" disabled={isPending}>
      {isPending && <Spinner data-icon="inline-start" />}

      {rest.children}
    </Button>
  );
}
