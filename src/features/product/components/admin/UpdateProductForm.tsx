"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import FormCheckbox from "@/components/form/FormCheckbox";
import SubmitButton from "@/components/form/SubmitButton";

import { Product } from "@/generated/prisma/client";
import {
  updateProductSchema,
  UpdateProductFormData,
} from "@/features/product/utils/schemas";
import useUpdateProduct from "@/features/product/hooks/useUpdateProduct";

type UpdateProductFormProps = {
  product: Product;
};

export default function UpdateProductForm({ product }: UpdateProductFormProps) {
  const { isPending, handleUpdateProduct } = useUpdateProduct();

  const form = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product.name,
      company: product.company,
      price: product.price,
      description: product.description,
      isFeatured: product.isFeatured,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Product</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((formData: UpdateProductFormData) =>
            handleUpdateProduct({ id: product.id, formData }),
          )}
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
