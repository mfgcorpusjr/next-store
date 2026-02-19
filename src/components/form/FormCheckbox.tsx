import { ComponentProps } from "react";
import { Control, Controller } from "react-hook-form";

import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

type FormCheckboxProps = {
  name: string;
  control: Control<any>;
  label?: string;
} & ComponentProps<typeof Checkbox>;

export default function FormCheckbox({
  name,
  control,
  label,
  ...rest
}: FormCheckboxProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation="horizontal" data-invalid={fieldState.invalid}>
          <Checkbox
            {...rest}
            id={name}
            aria-invalid={fieldState.invalid}
            checked={field.value}
            onCheckedChange={field.onChange}
          />

          <FieldLabel htmlFor={name}>{label}</FieldLabel>
        </Field>
      )}
    />
  );
}
