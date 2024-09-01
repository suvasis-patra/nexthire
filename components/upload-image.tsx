"use client";
import { Upload } from "lucide-react";
import {
  CldImage,
  CldUploadButton,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

interface UplodaImageProps {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
}

export default function UplodaImage({
  imageUrl,
  setImageUrl,
}: UplodaImageProps) {
  console.log(imageUrl);
  return (
    <div>
      {" "}
      <CldUploadButton
        uploadPreset="r3hlq9kd"
        onSuccess={(result) => {
          const res = result.info as CloudinaryUploadWidgetInfo;
          setImageUrl(res.public_id);
        }}
      />
      {imageUrl ? (
        <CldImage src={imageUrl} alt="some image" height={400} width={400} />
      ) : null}
    </div>
  );
}
