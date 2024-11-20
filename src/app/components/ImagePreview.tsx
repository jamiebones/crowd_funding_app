import React from "react";
import { X } from 'lucide-react';

interface ImagePreviewProps {
    urls: string[];
    onRemove: (index: number)=> void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ urls, onRemove }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {urls.map((url, index) => (
        <div key={index} className="relative group">
          <img
            src={url}
            alt={`Preview ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg"
          />
          <button
            onClick={() => onRemove(index)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full 
                     opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );

  export default ImagePreview;