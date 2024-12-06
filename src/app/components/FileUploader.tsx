// "use client";
// import { useState, useRef, useEffect} from 'react';

// interface FileUploaderProps {
//   onFilesChange: (files: File[]) => void;
// }

// interface FileURL {
//    url: string;
//    type: string
// }

// const FileUploader: React.FC<FileUploaderProps> = ({ onFilesChange }) => {
//   const [fileUrls, setFileUrls] = useState<FileURL[]>([]);
//   const [fileCount, setFileCount] = useState<number>(0);
//   const filesRef = useRef<File[]>([]); // Tracks files for accurate file count

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(event.target.files || []);
//     const validFiles: File[] = [];
//     const newUrls: FileURL[] = [];

//     selectedFiles.forEach((file) => {
//       const isImage = file.type.startsWith('image/');
//       const isPDF = file.type === 'application/pdf';

//       if (isImage || isPDF) {
//         validFiles.push(file);
//         newUrls.push({url: URL.createObjectURL(file), type: isPDF ? ".pdf": ""}); // Create object URLs for previews
//       }
//     });

//     // Add new files to the reference
//     filesRef.current = [...filesRef.current, ...validFiles];
//     setFileUrls([...fileUrls, ...newUrls]);
//     setFileCount(filesRef.current.length); // Update file count display
//     onFilesChange(filesRef.current);
//   };

//   const removeFile = (index: number) => {
//     const updatedFiles = filesRef.current.filter((_, i) => i !== index);
//     filesRef.current = updatedFiles; // Update files reference

//     // Clean up the object URL for the removed file
//     URL.revokeObjectURL(fileUrls[index].url);
//     setFileUrls(fileUrls.filter((_, i) => i !== index));
//     setFileCount(filesRef.current.length);
//     onFilesChange(filesRef.current);
//   };

//   const removeFilePreview = () => {
//      setFileUrls([]);
//      setFileCount(0);
//   }

 



//   return (
//     <div className='flex flex-col md:flex-row'>

   
//     <div className="space-y-2 w-full md:w-1/2 md:mr-2">
//       <label className="block text-gray-700 font-semibold" htmlFor="fileInput">
//         Upload PDFs or Images
//       </label>
//       <div className="relative">
//         <input
//           id="fileInput"
//           type="file"
//           accept=".pdf,image/*"
//           multiple
//           onChange={handleFileChange}
//           className="w-full p-2 border border-gray-300 rounded shadow-sm"
//         />
//         <span className="text-sm text-gray-600 mt-1">
//           {fileCount} file(s) selected
//         </span>
//       </div>

//       </div>

//       {/* Preview Section */}
//       <div className="w-full md:ml-2 md:w-1/2 overflow-y-auto max-h-[400px] space-y-4 border border-gray-300 rounded-lg p-4 bg-white">
//         {fileUrls.map((ele, index) => (
          
//           <div key={index} className="relative border border-gray-300 rounded-lg p-2">
//             <div className="flex items-center">
         
//               {ele.type.endsWith('.pdf') ? (
//                 <embed src={ele.url} type="application/pdf" className="w-full h-32 object-contain" />
//               ) : (
//                 <img src={ele.url} alt="Selected file" className="w-full h-32 object-cover rounded" />
//               )}
//               <button
//                 onClick={() => removeFile(index)}
//                 className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
//               >
//                 &times;
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
  
//   );
// };

// export default FileUploader



"use client";
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, FileText, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFilesChange: (files: File[]) => void;
}

interface FileURL {
   url: string;
   type: string
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesChange }) => {
  const [fileUrls, setFileUrls] = useState<FileURL[]>([]);
  const [fileCount, setFileCount] = useState<number>(0);
  const filesRef = useRef<File[]>([]); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const newUrls: FileURL[] = [];

    selectedFiles.forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const isPDF = file.type === 'application/pdf';

      if (isImage || isPDF) {
        validFiles.push(file);
        newUrls.push({url: URL.createObjectURL(file), type: isPDF ? ".pdf": ""}); 
      }
    });

    filesRef.current = [...filesRef.current, ...validFiles];
    setFileUrls([...fileUrls, ...newUrls]);
    setFileCount(filesRef.current.length);
    onFilesChange(filesRef.current);
  };

  const removeFile = (index: number) => {
    const updatedFiles = filesRef.current.filter((_, i) => i !== index);
    filesRef.current = updatedFiles;

    URL.revokeObjectURL(fileUrls[index].url);
    setFileUrls(fileUrls.filter((_, i) => i !== index));
    setFileCount(filesRef.current.length);
    onFilesChange(filesRef.current);

    // Reset input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="fileInput">Upload PDFs or Images</Label>
        <div className="relative">
          <Input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            accept=".pdf,image/*"
            multiple
            onChange={handleFileChange}
            className="file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium"
          />
          <span className="text-sm text-muted-foreground mt-1">
            {fileCount} file(s) selected
          </span>
        </div>
      </div>

      {/* Preview Section */}
      <div className={cn(
        "border rounded-lg p-4 bg-secondary/20",
        "max-h-[400px] overflow-y-auto",
        fileUrls.length === 0 && "flex items-center justify-center text-muted-foreground"
      )}>
        {fileUrls.length === 0 ? (
          <p className="text-center">No files uploaded</p>
        ) : (
          <div className="grid gap-4">
            {fileUrls.map((ele, index) => (
              <div 
                key={index} 
                className="relative border rounded-lg p-2 group"
              >
                <div className="flex items-center">
                  {ele.type.endsWith('.pdf') ? (
                    <div className="flex items-center gap-2 w-full">
                      <FileText className="h-8 w-8 text-primary" />
                      <span className="text-sm truncate flex-grow">
                        PDF File
                      </span>
                    </div>
                  ) : (
                    <img 
                      src={ele.url} 
                      alt="Selected file" 
                      className="w-full h-32 object-cover rounded" 
                    />
                  )}
                  <Button
                    onClick={() => removeFile(index)}
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;



