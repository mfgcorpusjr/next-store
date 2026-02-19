import { ComponentProps } from "react";
import { Control, Controller } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FormInputProps = {
  name: string;
  control: Control<any>;
  label?: string;
} & ComponentProps<typeof Input>;

export default function FormInput({
  name,
  control,
  label,
  ...rest
}: FormInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

          <Input
            {...rest}
            {...field}
            id={name}
            aria-invalid={fieldState.invalid}
            value={field.value ?? ""}
          />

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="-mt-1 text-xs" />
          )}
        </Field>
      )}
    />
  );
}
