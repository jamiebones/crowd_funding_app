"use client";
import React, { useState, useEffect } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { toast } from "react-toastify";

import { ethers } from "ethers";
import CrowdFundingFactoryABI from "../../../abis/CrowdFundingFactory.json";
const factoryContractAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS || "0x";

const Admin = () => {
  const [funding, setFunding] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { address } = useAccount();

  const {
    data: hash,
    error,
    writeContract,
    isSuccess,
    isPending,
    isError,
  } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Transaction hash: ${hash}`, {
        position: "top-right",
      });
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

  const handleWriteContract = (args: any) => {
    if (inputValue == "") return;
    const confirmData = `You are changing the project fee to ${inputValue} RBTC`;
    if (!confirm(confirmData)) return;
    writeContract({
      address: factoryContractAddress as any,
      abi: CrowdFundingFactoryABI,
      functionName: "changeFundingFee",
      args: [ethers.parseEther(inputValue.toString())],
    });
  };

  const fundNode = async () => {
    try {
      setFunding(true);
      const response = await fetch("/api/fund", {
        method: "POST",
        body: "",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Node funding succesfull", {
          position: "top-right",
        });
      }
    } catch (error: any) {
      toast.error("Node funding failed", {
        position: "top-right",
      });
      console.log("error", error);
    } finally {
      setFunding(false);
    }
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      {address ? (
        <div className="flex flex-col">
          <div className="w-1/3 mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Set Project Fee
            </h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter text"
                className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                disabled={isPending}
                onClick={handleWriteContract}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isPending
                  ? "Sending transaction please wait....."
                  : "Set Project Fee"}
              </button>
            </div>
          </div>
          <div className="w-1/3 mx-auto mt-4 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Fund Bundler Node
            </h2>
            <button
              disabled={funding}
              onClick={fundNode}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Fund Account
            </button>
          </div>
        </div>
      ) : (
        <p>Connect your wallet to continue</p>
      )}
    </div>
  );
};

export default Admin;
