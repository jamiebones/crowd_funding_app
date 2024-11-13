"use client";
import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import FileUploader from "../components/FileUploader";
import { toast } from "react-toastify";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { ethers } from "ethers";
import CrowdFundingFactoryABI from "../../../abis/CrowdFundingFactory.json";
const factoryContractAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS || "0x";

//interfaces
import CreateProjectInterface from "../interfaces/CreateProjectInterface";

const CreateProject = () => {
  const [formData, setFormData] = useState<CreateProjectInterface>({
    markdownContent: "",
    date: "",
    amount: 0,
  });
  const [selFiles, setSelFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const { address } = useAccount();

  const {
    data: hash,
    error,
    writeContract,
    isSuccess,
    isPending,
    isError,
  } = useWriteContract();

//   const { data: fee, isLoading: isLoadingFee } = useReadContract({
//     address: factoryContractAddress as any,
//     abi: CrowdFundingFactoryABI,
//     functionName: "getOptionsCount",
//   });


  const loadProjectCreationFee = async () => {

  }

  const handleMarkdownChange = (content: string | undefined) => {
    setFormData((prevData) => ({
      ...prevData,
      markdownContent: content || "",
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Transaction hash: ${hash}`, {
        position: "top-right",
      });
    }
  }, [hash, isSuccess]);

  useEffect(() => {
    if (isError) {
        console.log("Error from mutation ", error)
      toast.error(`Error sending transaction`, {
        position: "top-right",
      });
    }
  }, [isError]);

  

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, date: event.target.value }));
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      amount: isNaN(value) ? 0 : value,
    }));
  };

  const handleonFilesChange = (files: File[]) => {
    setSelFiles(files);
  };

  const handleWriteContract = (args: any) => {
    try {
     console.log("writing to rootstock")
      writeContract({
        address: factoryContractAddress as any,
        abi: CrowdFundingFactoryABI,
        functionName: "createNewCrowdFundingContract",
        args: [args.fundingDetailsId, args.amount, BigInt(args.duration)],
        value: ethers.parseEther("0.001")
      });
      console.log("finishing writing to Rootstock")
    } catch (error) {
      console.log("Error sending transaction ", error);
      toast.error("Error sending transaction", {
        position: "top-right",
      });
    }
  };

  const handleNewProjectCreation = async () => {
    if (
      selFiles.length === 0 &&
      formData.markdownContent === "" &&
      formData.amount === 0 &&
      formData.date === ""
    )
      return;
    try {
      setUploadingFiles(true);
      const formdata = new FormData();
      selFiles.forEach((file) => {
        formdata.append("files", file);
      });
      formdata.append("projectDetails", JSON.stringify(formData));
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formdata
      });
      setUploadingFiles(false);
      if (response.ok) {
        const transID = await response.json();
        //save the stuff at Rootstock
        const args = {
          fundingDetailsId: transID,
          amount: ethers.parseEther(formData.amount.toString()),
          duration: Date.parse(formData.date),
        };
        handleWriteContract(args);
      } else {
        toast.error("Error uploading documents", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error calling method", {
        position: "top-right",
      });
      console.error(error);
    }
  };

  return (
    <div>
      {address ? (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md width-full mx-auto space-y-4">
          {/* Markdown Editor */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">
              Project Details
            </label>
            <MDEditor
              value={formData.markdownContent}
              onChange={handleMarkdownChange}
              className="w-full bg-white rounded-md shadow-sm border border-gray-300"
            />
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Date Picker */}
            <div className="space-y-2 w-full md:w-1/2 md:mr-2">
              <label className="block text-gray-700 font-semibold">
                Project Duration
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={handleDateChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {/* Amount Input */}
            <div className="space-y-2 w-full md:w-1/2 md:ml-2">
              <label className="block text-gray-700 font-semibold">
                Amount Sought ( in RBTC)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* File Uploader */}
          <FileUploader onFilesChange={handleonFilesChange} />

          <div className="text-center">
            <button
              disabled={uploadingFiles || isPending}
              onClick={handleNewProjectCreation}
              className="mt-2
         bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!uploadingFiles && !isPending && "Create new project "}
              {uploadingFiles && "Uploading Files to Arweave"}
              {isPending && "Sending transaction to Rootstock"}
            </button>
          </div>
        </div>
      ) : (
        <div>Connect your wallet to create a project</div>
      )}
    </div>
  );
};

export default CreateProject;
