"use client";

import React, { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { Address } from 'viem';

interface ContractData {
    address: Address;
    data: any;
    isLoading: boolean;
    error: Error | null;
  }

  export const useMultiContractRead = (
    contractAddresses: Address[], 
    abi: any, 
    functionName: string, 
    functionArgs?: any[]
  ) => {
    const [contractsData, setContractsData] = useState<ContractData[]>([]);
    const contractReads = contractAddresses.map((address) => 
      useReadContract({
        address,
        abi,
        functionName,
        args: functionArgs,
      })
    );
  
    // Effect to aggregate contract read results
    useEffect(() => {
      const aggregatedData: ContractData[] = contractAddresses.map((address, index) => ({
        address,
        data: contractReads[index].data,
        isLoading: contractReads[index].isLoading,
        error: contractReads[index].error,
      }));
  
      setContractsData(aggregatedData);
    }, [contractReads]);
  
    // Determine overall loading and error states
    const isLoading = contractReads.some(read => read.isLoading);
    const error = contractReads.find(read => read.error)?.error || null;
  
    return { 
      contractsData, 
      isLoading, 
      error 
    };
  };