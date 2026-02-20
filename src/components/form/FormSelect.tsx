import { ComponentProps } from "react";
import { Control, Controller } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type FormSelectProps = {
  name: string;
  control: Control<any>;
  label?: string;
  items: { value: string; label: string }[];
} & ComponentProps<typeof SelectValue>;

export default function FormSelect({
  name,
  control,
  label,
  items,
  ...rest
}: FormSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

          <Select
            {...field}
            value={field.value ?? ""}
            onValueChange={field.onChange}
          >
            <SelectTrigger id={name} aria-invalid={fieldState.invalid}>
              <SelectValue {...rest} />
            </SelectTrigger>

            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="-mt-1 text-xs" />
          )}
        </Field>
      )}
    />
  );
}
