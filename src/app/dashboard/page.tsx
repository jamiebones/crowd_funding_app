// "use client";
// import React, { useState, useEffect } from "react";
// import MDEditor from "@uiw/react-md-editor";
// import FileUploader from "../components/FileUploader";
// import { toast } from "react-toastify";
// import { useReadContract, useWriteContract, useAccount } from "wagmi";
// import { useRouter } from "next/navigation";
// import { ethers } from "ethers";

// import CrowdFundingFactoryABI from "../../../abis/CrowdFundingFactory.json";
// const factoryContractAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS || "0x";

// const eth = 1_000_000_000_000_000_000;
// //interfaces
// import CreateProjectInterface from "../interfaces/CreateProjectInterface";

// const categoryOptions = [
//   { name: "Education", value: "Education" },
//   { name: "Philanthrophy", value: "Philanthrophy" },
//   { name: "Science", value: "Science" },
//   { name: "Music", value: "Music" },
//   { name: "Charity", value: "Charity" },
// ];

// const CreateProject = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState<CreateProjectInterface>({
//     markdownContent: "",
//     title: "",
//     date: "",
//     amount: 0,
//     category: "",
//   });
//   const [selFiles, setSelFiles] = useState<File[]>([]);
//   const [uploadingFiles, setUploadingFiles] = useState(false);
//   const [projectFee, setProjectFee] = useState<undefined | number>(undefined);
//   const { address } = useAccount();

//   const {
//     data: hash,
//     error,
//     writeContract,
//     isSuccess,
//     isPending,
//     isError,
//   } = useWriteContract();

//   const { data: fee, isLoading: isLoadingFee, error:readError } = useReadContract({
//     address: factoryContractAddress as any,
//     abi: CrowdFundingFactoryABI,
//     functionName: "getContractCreationFee",
//   });

//   useEffect(() => {
//     if (fee && !isLoadingFee) {
//       setProjectFee(+fee.toString());
//     }
//   }, [isLoadingFee, fee]);


//   const handleMarkdownChange = (content: string | undefined) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       markdownContent: content || "",
//     }));
//   };

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(`Transaction hash: ${hash}`, {
//         position: "top-right",
//       });
//       //handleRemoveFilePreview();
//       //window.location.reload();
//       router.push("/user/projects");
      
//     }
//   }, [hash, isSuccess]);

//   useEffect(() => {
//     if (isError) {
//       console.log("Error from mutation ", error);
//       toast.error(`Error sending transaction`, {
//         position: "top-right",
//       });
//     }
//   }, [isError]);

//   const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prevData) => ({ ...prevData, date: event.target.value }));
//   };

//   const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseFloat(event.target.value);
//     setFormData((prevData) => ({
//       ...prevData,
//       amount: isNaN(value) ? 0 : value,
//     }));
//   };

//   const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setFormData((prevData) => ({
//       ...prevData,
//       title: value || "",
//     }));
//   };

//   const handleCategoryChange = (event: any) => {
//     const value = event.target.value;
//     setFormData((prevData) => ({
//       ...prevData,
//       category: value,
//     }));
//   };

//   const handleonFilesChange = (files: File[]) => {
//     setSelFiles(files);
//   };

//   const handleWriteContract = (args: any) => {
//     try {
//       console.log("writing to rootstock");
//       const fee = projectFee ? projectFee / eth : 0;
//       writeContract({
//         address: factoryContractAddress as any,
//         abi: CrowdFundingFactoryABI,
//         functionName: "createNewCrowdFundingContract",
//         args: [args.fundingDetailsId, args.amount, args.duration, args.category],
//         value: ethers.parseEther(fee.toFixed(18)),
//       });
//       console.log("finishing writing to Rootstock");
//     } catch (error) {
//       console.log("Error sending transaction ", error);
//       toast.error("Error sending transaction", {
//         position: "top-right",
//       });
//     }
//   };

//   const handleNewProjectCreation = async () => {
//     if (
//       selFiles.length === 0 &&
//       formData.markdownContent === "" &&
//       formData.amount === 0 &&
//       formData.date === "" &&
//       formData.title === "" && formData.category == ""
//     )
//       return;
//     try {
//       const conData = `
//         Title: ${formData.title} 
//         Details ${formData.markdownContent.substring(0, 150)}
//         Amount ${ethers.parseEther(formData.amount.toString())} RBTC
//         Date ${formData.date}
//         Category ${formData.category}
//         Project Creation Fee ${projectFee && projectFee}
//       `;
//       if (!confirm(conData)) return;
//       setUploadingFiles(true);
//       let formdata = new FormData()
//       selFiles.map((f: File) => {
//         formdata.append("files", f);
//       })
//       formdata.append("projectDetails", JSON.stringify(formData));
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formdata,
//       });
//       setUploadingFiles(false);
//       if (response.ok) {
//         const transID = await response.json();
//         //save the stuff at Rootstock
//         const args = {
//           fundingDetailsId: transID,
//           amount: ethers.parseEther(formData.amount.toString()),
//           duration: BigInt(Date.parse(formData.date)),
//           category: formData.category
//         };
//         handleWriteContract(args as unknown);
//       } else {
//         toast.error("Error uploading documents", {
//           position: "top-right",
//         });
//       }
//     } catch (error) {
//       toast.error("Error calling method", {
//         position: "top-right",
//       });
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       {address ? (
//         <div className="p-4 bg-gray-100 rounded-lg shadow-md width-full mx-auto space-y-4">
//           <p>
//             Project creation fee:{" "}
//             {isLoadingFee ? (
//               <span>loading project fee</span>
//             ) : (
//               <span>{(projectFee! / eth).toFixed(18)} RBTC</span>
//             )}
//           </p>

//           <div className="flex flex-col space-y-2">
//             <label
//               htmlFor="category"
//               className="text-sm font-medium text-gray-700"
//             >
//               Select Category
//             </label>
//             <select
//               value={formData.category}
//               onChange={handleCategoryChange}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             >
//               <option value="">select project category</option>
//               {categoryOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="space-y-2 w-full">
//             <label className="block text-gray-700 font-semibold">
//               Project Title
//             </label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={handleTitleChange}
//               className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           {/* Markdown Editor */}
//           <div className="space-y-2">
//             <label className="block text-gray-700 font-semibold">
//               Project Details
//             </label>
//             <MDEditor
//               value={formData.markdownContent}
//               onChange={handleMarkdownChange}
//               className="w-full bg-white rounded-md shadow-sm border border-gray-300"
//             />
//           </div>

//           <div className="flex flex-col md:flex-row">
//             {/* Date Picker */}
//             <div className="space-y-2 w-full md:w-1/2 md:mr-2">
//               <label className="block text-gray-700 font-semibold">
//                 Project Duration
//               </label>
//               <input
//                 type="date"
//                 value={formData.date}
//                 onChange={handleDateChange}
//                 className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>

//             {/* Amount Input */}
//             <div className="space-y-2 w-full md:w-1/2 md:ml-2">
//               <label className="block text-gray-700 font-semibold">
//                 Amount Sought ( in RBTC)
//               </label>
//               <input
//                 type="number"
//                 value={formData.amount}
//                 onChange={handleAmountChange}
//                 placeholder="0.00"
//                 className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>
//           </div>

//           {/* File Uploader */}
//           <FileUploader onFilesChange={handleonFilesChange} />

//           <div className="text-center">
//             <button
//               disabled={uploadingFiles || isPending}
//               onClick={handleNewProjectCreation}
//               className="mt-2
//          bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {!uploadingFiles && !isPending && "Create new project "}
//               {uploadingFiles && "Uploading Files to Arweave"}
//               {isPending && "Sending transaction to Rootstock"}
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div>Connect your wallet to create a project</div>
//       )}
//     </div>
//   );
// };

// export default CreateProject;


"use client";
import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import FileUploader from "../components/FileUploader";
import { toast } from "react-toastify";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import CrowdFundingFactoryABI from "../../../abis/CrowdFundingFactory.json";
const factoryContractAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS || "0x";

const eth = 1_000_000_000_000_000_000;
import CreateProjectInterface from "../interfaces/CreateProjectInterface";

const categoryOptions = [
  { name: "Education", value: "Education" },
  { name: "Philanthrophy", value: "Philanthrophy" },
  { name: "Science", value: "Science" },
  { name: "Music", value: "Music" },
  { name: "Charity", value: "Charity" },
];

const CreateProject = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateProjectInterface>({
    markdownContent: "",
    title: "",
    date: "",
    amount: 0,
    category: "",
  });
  const [selFiles, setSelFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [projectFee, setProjectFee] = useState<undefined | number>(undefined);
  const { address } = useAccount();

  const {
    data: hash,
    error,
    writeContract,
    isSuccess,
    isPending,
    isError,
  } = useWriteContract();

  const { data: fee, isLoading: isLoadingFee, error:readError } = useReadContract({
    address: factoryContractAddress as any,
    abi: CrowdFundingFactoryABI,
    functionName: "getContractCreationFee",
  });

  useEffect(() => {
    if (fee && !isLoadingFee) {
      setProjectFee(+fee.toString());
    }
  }, [isLoadingFee, fee]);

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
      router.push("/user/projects");
    }
  }, [hash, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log("Error from mutation ", error);
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

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      title: value || "",
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  const handleonFilesChange = (files: File[]) => {
    setSelFiles(files);
  };

  const handleWriteContract = (args: any) => {
    try {
      console.log("writing to rootstock");
      const fee = projectFee ? projectFee / eth : 0;
      writeContract({
        address: factoryContractAddress as any,
        abi: CrowdFundingFactoryABI,
        functionName: "createNewCrowdFundingContract",
        args: [args.fundingDetailsId, args.amount, args.duration, args.category],
        value: ethers.parseEther(fee.toFixed(18)),
      });
      console.log("finishing writing to Rootstock");
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
      formData.date === "" &&
      formData.title === "" && formData.category == ""
    )
      return;
    try {
      const conData = `
        Title: ${formData.title} 
        Details ${formData.markdownContent.substring(0, 150)}
        Amount ${ethers.parseEther(formData.amount.toString())} RBTC
        Date ${formData.date}
        Category ${formData.category}
        Project Creation Fee ${projectFee && projectFee}
      `;
      if (!confirm(conData)) return;
      setUploadingFiles(true);
      let formdata = new FormData()
      selFiles.map((f: File) => {
        formdata.append("files", f);
      })
      formdata.append("projectDetails", JSON.stringify(formData));
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formdata,
      });
      setUploadingFiles(false);
      if (response.ok) {
        const transID = await response.json();
        const args = {
          fundingDetailsId: transID,
          amount: ethers.parseEther(formData.amount.toString()),
          duration: BigInt(Date.parse(formData.date)),
          category: formData.category
        };
        handleWriteContract(args as unknown);
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
    <div className="container mx-auto max-w-4xl py-8">
      {address ? (
        <Card>
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between bg-secondary/20 p-4 rounded-lg">
              <span className="text-sm font-medium">
                Project Creation Fee:
              </span>
              {isLoadingFee ? (
                <span className="text-muted-foreground">Loading fee...</span>
              ) : (
                <span className="font-semibold text-primary">
                  {(projectFee! / eth).toFixed(18)} RBTC
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label>Select Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Project Title</Label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <Label>Project Details</Label>
                <MDEditor
                  value={formData.markdownContent}
                  onChange={handleMarkdownChange}
                  className="border rounded-md"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Project Duration</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={handleDateChange}
                  />
                </div>

                <div>
                  <Label>Amount Sought (in RBTC)</Label>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <FileUploader onFilesChange={handleonFilesChange} />

              <div className="flex justify-center">
                <Button 
                  disabled={uploadingFiles || isPending}
                  onClick={handleNewProjectCreation}
                  className="w-full md:w-auto"
                >
                  {(uploadingFiles || isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {!uploadingFiles && !isPending && "Create New Project"}
                  {uploadingFiles && "Uploading Files to Arweave"}
                  {isPending && "Sending Transaction to Rootstock"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center text-muted-foreground">
          Connect your wallet to create a project
        </div>
      )}
    </div>
  );
};

export default CreateProject;