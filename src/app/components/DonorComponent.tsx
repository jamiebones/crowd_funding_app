"use client";
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, Wallet } from 'lucide-react';
import Donor from '../interfaces/Donor';
import { getDaysBetweenEpochAndCurrent } from '@/utils/utility';
import { useWriteContract } from "wagmi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import MilestonesAccordion from './MilestoneAccordianComponent';


import CrowdFundingImplementationABI from "../../../abis/CrowdFundingImplementation.json";

interface DonationProps {
    donations: Donor[]
}

const DonorCampaigns: React.FC<DonationProps> = ({ donations }) => {

  const router = useRouter();

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
      //handleRemoveFilePreview();
      window.location.reload();
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

  const handleRetrieveDonationContract = (contractAddress: string) => {
    try {
      console.log("writing to rootstock");
      writeContract({
        address: contractAddress as any,
        abi: CrowdFundingImplementationABI,
        functionName: "retrieveDonatedAmount",
        args: [],
     
      });
      console.log("finishing writing to Rootstock");
    } catch (error) {
      console.log("Error sending transaction ", error);
      toast.error("Error sending transaction", {
        position: "top-right",
      });
    }
  };


  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-6 w-6" />
          <span>My Donations</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {donations.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No donations found
          </div>
        ) : (
          <div className="space-y-4">
            {donations.map((donation: Donor, index) => {
              const { donatingTo } = donation;

              return (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start cursor-pointer" 
                    onClick={() => router.push(`/projects/${donatingTo.id}`)}>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {donatingTo?.content?.title || "The day the suspect came to roast"}
                      </h3>
                      <div className="mt-2 flex items-center space-x-2">
                        <Badge variant="secondary">
                          <Activity className="h-4 w-4 mr-1" />
                          {donatingTo?.category}
                        </Badge>
                        <Badge variant={donatingTo.campaignRunning ? 'default' : 'destructive'}>
                          {donatingTo.campaignRunning ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div >
                        <p><span>Your donation: </span>
                        <span className="font-bold text-green-600">{+donation.amount.toLocaleString()/ 1e18} RBTC</span></p>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Donated {new Date(+donation.date * 1000 ).toDateString()}
                      </div>
                     
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center border-t pt-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {getDaysBetweenEpochAndCurrent(+donatingTo.dateCreated)} days remaining
                    </div>
                    <a 
                      href={`https://etherscan.io/address/${donatingTo.contractAddress}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Contract
                    </a>
                  </div>
                  

                     {/* Milestones Accordion */}
                {donatingTo?.milestone && donatingTo.milestone.length > 0 && (
                  <MilestonesAccordion milestones={donatingTo.milestone} 
                  currentMilestone={donation.donatingTo.currentMilestone} 
                  contractAddress={donatingTo.contractAddress}/>
                )}

                {/*button to withdraw your donation */}

                <div className='mt-3 text-center'>
                  <Button size="sm" color='info' 
                    disabled={isPending}
                    onClick={()=>handleRetrieveDonationContract(donatingTo.contractAddress)}>
                    Retrieve Donation
                  </Button>
                </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DonorCampaigns;