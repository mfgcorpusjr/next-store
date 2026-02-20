"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FormInput from "@/components/form/FormInput";
import FormInputFile from "@/components/form/FormInputFile";
import FormTextarea from "@/components/form/FormTextarea";
import FormCheckbox from "@/components/form/FormCheckbox";
import SubmitButton from "@/components/form/SubmitButton";

import {
  createProductSchema,
  CreateProductFormData,
} from "@/features/product/utils/schemas";
import useCreateProduct from "@/features/product/hooks/useCreateProduct";

export default function CreateProductForm() {
  const { isPending, handleCreateProduct } = useCreateProduct();

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      company: "",
      price: undefined,
      image: undefined,
      description: "",
      isFeatured: false,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleCreateProduct)}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput name="name" control={form.control} label="Name" />

            <FormInput name="company" control={form.control} label="Company" />

            <FormInput
              name="price"
              control={form.control}
              label="Price ($)"
              type="number"
            />

            <FormInputFile
              name="image"
              control={form.control}
              label="Image"
              accept="image/*"
            />
          </div>

          <FormTextarea
            name="description"
            control={form.control}
            label="Description"
          />

          <FormCheckbox
            name="isFeatured"
            control={form.control}
            label="Featured"
          />

          <SubmitButton isPending={isPending}>Submit</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
