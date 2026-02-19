import { ComponentProps } from "react";
import { Controller, Control } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FormInputFileProps = {
  name: string;
  control: Control<any>;
  label?: string;
} & ComponentProps<typeof Input>;

export default function FormInputFile({
  name,
  control,
  label,
  ...rest
}: FormInputFileProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

          <Input
            {...rest}
            id={name}
            aria-invalid={fieldState.invalid}
            type="file"
            onChange={(e) => field.onChange(e.target.files?.[0])}
          />

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="-mt-1 text-xs" />
          )}
        </Field>
      )}
    />
  );
}
