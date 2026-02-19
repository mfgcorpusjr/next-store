"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import FormInput from "@/components/form/FormInput";
import FormInputFile from "@/components/form/FormInputFile";
import FormTextarea from "@/components/form/FormTextarea";
import FormCheckbox from "@/components/form/FormCheckbox";
import SubmitButton from "@/components/form/SubmitButton";

import {
  createProductSchema,
  CreateProductFormData,
} from "@/features/product/utils/schemas";
import { createProduct } from "@/features/product/utils/actions";

export default function CreateProductForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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

  const handleCreateProduct = async (formData: CreateProductFormData) => {
    startTransition(async () => {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("company", formData.company);
      data.append("price", String(formData.price));
      data.append("image", formData.image);
      data.append("description", formData.description);
      data.append("isFeatured", String(formData.isFeatured));

      const res = await createProduct(data);

      if (res.status === "SUCCESS") {
        toast.success(res.message);
        router.push("/admin/products");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
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

      <FormCheckbox name="isFeatured" control={form.control} label="Featured" />

      <SubmitButton isPending={isPending}>Submit</SubmitButton>
    </form>
  );
}
