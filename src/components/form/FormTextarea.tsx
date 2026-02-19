import { ComponentProps } from "react";
import { Control, Controller } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

type FormTextareaProps = {
  name: string;
  control: Control<any>;
  label?: string;
} & ComponentProps<typeof Textarea>;

export default function FormTextareaProps({
  name,
  control,
  label,
  ...rest
}: FormTextareaProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

          <Textarea
            {...rest}
            {...field}
            id={name}
            aria-invalid={fieldState.invalid}
          />

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="-mt-1 text-xs" />
          )}
        </Field>
      )}
    />
  );
}
