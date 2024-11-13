"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const FundAccount = () => {
  const [funding, setFunding] = useState(false);

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

  return (
    <div>
      <button
        disabled={funding}
        onClick={fundNode}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Fund Account
      </button>
    </div>
  );
};

export default FundAccount;
