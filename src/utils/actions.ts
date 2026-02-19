import { ZodError } from "zod";

import supabase from "@/lib/supabase";

export const renderError = (error: unknown) => {
  if (error instanceof ZodError) {
    return { status: "FAILED", message: "Validation failed" };
  } else if (error instanceof Error) {
    return { status: "FAILED", message: error.message };
  } else {
    return { status: "FAILED", message: "An unknown error has occurred." };
  }
};

export const uploadImage = async ({
  bucket = "uploads",
  image,
}: {
  bucket?: string;
  image: File;
}) => {
  const filename = `${Date.now()}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, image, {
      cacheControl: "3600",
    });

  if (!error) {
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data?.path);

    return publicUrl;
  }

  throw new Error(error.message);
};
