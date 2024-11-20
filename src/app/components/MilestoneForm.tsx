import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import { useWriteContract, useAccount } from "wagmi";
import ImagePreview from "./ImagePreview";

import CrowdFundingImplementationABI from "../../../abis/CrowdFundingImplementation.json";

interface MilestoneFormInterface {
  title: string;
  markdownContent: string;
}

interface MilestoneProps {
  contractAddress: string;
  closeDialog: () => void;
}

const MilestoneForm: React.FC<MilestoneProps> = ({
  contractAddress,
  closeDialog,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const { address } = useAccount();

  const [formData, setFormData] = useState<MilestoneFormInterface>({
    markdownContent: "",
    title: "",
  });

  const {
    data: hash,
    error,
    writeContract,
    isSuccess,
    isPending,
    isError,
  } = useWriteContract();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files) as File[];
    setSelectedFiles((prevFiles: File[]) => [...prevFiles, ...files]);
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls: string[]) => [...prevUrls, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prevFiles: File[]) =>
      prevFiles.filter((_, i) => i !== index)
    );
    setPreviewUrls((prevUrls: string[]) => {
      URL.revokeObjectURL(prevUrls[index]);
      return prevUrls.filter((_, i) => i !== index);
    });
  };

  const handleDetailsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      markdownContent: value || "",
    }));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      title: value || "",
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Milestone created transaction hash: ${hash}`, {
        position: "top-right",
      });
      closeDialog();
      window.location.reload();
    }
  }, [hash, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log("Error from mutation ", error);
      toast.error(`Error creating milestone`, {
        position: "top-right",
      });
    }
  }, [isError]);

  const handleCreateMilestone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address) {
      return toast.error(`Connect your wallet`, {
        position: "top-right",
      });
    }
    try {
      console.log("writing to rootstock");
      setUploading(true);
      const conData = `
            Milestone Title: ${formData.title} 
            Milestone Details ${formData.markdownContent.substring(0, 150)}
      `;
      if (!confirm(conData)) return;
      const formdata = new FormData();
      selectedFiles.map((f: File) => {
        formdata.append("files", f);
      });
      formdata.append("projectDetails", JSON.stringify(formData));
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formdata,
      });
      setUploading(false);
      if (response.ok) {
        const transID = await response.json();
        //save the stuff at Rootstock
        writeContract({
          address: contractAddress as any,
          abi: CrowdFundingImplementationABI,
          functionName: "creatNewMilestone",
          args: [transID],
        });
        console.log("finishing writing to Rootstock");
      }
    } catch (error) {
      console.log("Error sending transaction ", error);
      toast.error("Error sending transaction", {
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateMilestone} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            value={formData.title}
            onChange={handleTitleChange}
            required
            placeholder="Milestone title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <Textarea
            value={formData.markdownContent}
            onChange={handleDetailsChange}
            required
            placeholder="Describe this milestone"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Images</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <label className="cursor-pointer">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <ImagePlus className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Click to upload images or drag and drop
                </span>
              </div>
            </label>
          </div>
          {previewUrls.length > 0 && (
            <ImagePreview urls={previewUrls} onRemove={removeImage} />
          )}
        </div>
        <Button
          disabled={!address || isPending || uploading}
          type="submit"
          className="w-full"
        >
          Create Milestone
        </Button>
      </form>
    </div>
  );
};

export default MilestoneForm;
