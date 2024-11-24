import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageOff } from "lucide-react";

const ImageDisplayComponent = ({ images = [] }: { images?: string[] }) => {
  if (!images.length) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-8 text-gray-500">
          <ImageOff className="w-12 h-12 mb-2" />
          <p className="text-lg font-medium">No images to display</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageDisplayComponent;
