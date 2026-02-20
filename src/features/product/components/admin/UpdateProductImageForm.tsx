"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInputFile from "@/components/form/FormInputFile";
import SubmitButton from "@/components/form/SubmitButton";

import {
  updateProductImageSchema,
  UpdateProductImageFormData,
} from "@/features/product/utils/schemas";
import useUpdateProductImage from "@/features/product/hooks/useUpdateProductImage";
import { Product } from "@/generated/prisma/client";

type UpdateProductImageFormProps = {
  product: Product;
};

export default function UpdateProductImageForm({
  product,
}: UpdateProductImageFormProps) {
  const { isPending, handleUpdateProductImage } = useUpdateProductImage();

  const form = useForm<UpdateProductImageFormData>({
    resolver: zodResolver(updateProductImageSchema),
    defaultValues: {
      image: undefined,
    },
  });

  return (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={form.handleSubmit((formData: UpdateProductImageFormData) =>
        handleUpdateProductImage({ id: product.id, formData }),
      )}
    >
      <Image
        src={product.image}
        alt={product.name}
        width={192}
        height={192}
        className="size-48 object-cover rounded"
      />

      <div className="w-full max-w-96">
        <FormInputFile
          name="image"
          control={form.control}
          label="Image"
          accept="image/*"
        />
      </div>

      <SubmitButton isPending={isPending}>Update Image</SubmitButton>
    </form>
  );
}
