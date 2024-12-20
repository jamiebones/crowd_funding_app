"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, ImageIcon, ExternalLink } from "lucide-react";
import Campaign from "../interfaces/Campaign";
import {
  getDaysBetweenEpochAndCurrent,
  isPdf,
  countUniqueDonors,
  userDonatedToCause
} from "@/utils/utility";
import { toast } from "react-toastify";
import { useWriteContract, useAccount, useReadContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { ethers } from "ethers";
import DisplayDonorsToProject from "./DisplayDonorsToProject";
import ShareButton from "./ShareButton";

import CrowdFundingContractABI from "../../../abis/CrowdFundingImplementation.json";
import MilestoneDisplayComponent from "./MilestoneDisplayComponent";

interface ProjectDetailsProps {
  campaign: Campaign;
  id: string;
}

// Rest of the component remains exactly the same
const ProjectDetails: React.FC<ProjectDetailsProps> = ({ campaign, id }) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [displayVoteButton, setDisplayVoteButton ] = useState(false);
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const {
    data: hash,
    error,
    writeContract,
    isSuccess,
    isPending,
    isError,
  } = useWriteContract();

  const { data: hasVoted, isLoading, error:readError } = useReadContract({
    address: campaign?.contractAddress as any,
    abi: CrowdFundingContractABI,
    functionName: "hasVotedOnMilestone",
    args: [ address]
  });

  const { data: totalVotes, isLoading: totalLoading, error:totalError } = useReadContract({
    address: campaign?.contractAddress as any,
    abi: CrowdFundingContractABI,
    functionName: "totalVotesOnMilestone"
  });


  useEffect(()=> {
    if ( hasVoted !== undefined && !isLoading && hasVoted === false && userDonatedToCause(campaign.donors, campaign.donorsRecall, address) ){
        setDisplayVoteButton(true);
    }
  }, [hasVoted, address])

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Transaction hash: ${hash}`, {
        position: "top-right",
      });
      queryClient.invalidateQueries({
        queryKey: ["projectDetails", id],
      });
    }
  }, [hash, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log("Error from mutation ", error);
      toast.error(`Error sending transaction: ${error?.message}`, {
        position: "top-right",
      });
    }
  }, [isError]);

  const handleDonate = (amount: string) => {
    try {
      const conData = `You are donating ${amount} RBTC`;
      if (!confirm(conData)) return;
      console.log("start writing to Rootstock");
      writeContract({
        address: campaign.contractAddress as any,
        abi: CrowdFundingContractABI,
        functionName: "giveDonationToCause",
        args: [],
        value: ethers.parseEther(amount),
      });
    } catch (error) {
      console.log("Error sending transaction ", error);
      toast.error("Error sending transaction", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={campaign?.content?.title} />
        <meta name="twitter:description" content={campaign?.content?.details} />
        <meta
          name="twitter:image"
          content={`https://arweave.net/${
            campaign?.content?.media[0].split(":")[0]
          }`}
        />
        <title>{campaign?.content?.title}</title>
      </Head>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                  <div>
                    <Badge variant="secondary">{campaign.category}</Badge>
                    <Badge variant="outline">
                      {getDaysBetweenEpochAndCurrent(
                        +campaign.projectDuration / 1000
                      )}{" "}
                      day(s) left
                    </Badge>
                  </div>
                  <div>
                    <ShareButton
                      title={campaign?.content?.title}
                      url={`${window.location.host}/projects/${id}`}
                    />
                  </div>
                </div>
                <CardTitle className="text-3xl mb-2">
                  {campaign?.content?.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {countUniqueDonors(campaign.donors, campaign.donorsRecall)}{" "}
                  backers
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Media Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {campaign?.content?.media?.map((url, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-32 relative hover:bg-gray-100"
                        >
                          {!isPdf(url) ? (
                            <div className="relative w-full h-full">
                              <img
                                src={`https://arweave.net/${url.split(":")[0]}`}
                                alt="project image"
                                className="object-cover rounded-md w-full h-full"
                              />
                              <ImageIcon className="absolute top-2 right-2 w-5 h-5" />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center space-y-2">
                              <FileText className="w-8 h-8" />
                              <span className="text-sm text-center">PDF</span>
                            </div>
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Project Media</DialogTitle>
                        </DialogHeader>
                        {!isPdf(url) ? (
                          <img
                            src={`https://arweave.net/${url.split(":")[0]}`}
                            alt="project image"
                            className="w-full rounded-lg"
                          />
                        ) : (
                          <div className="flex items-center justify-center p-8">
                            {/* <Button>
                              <FileText className="mr-2" />
                              View PDF
                              <ExternalLink className="ml-2 w-4 h-4" />
                            </Button> */}
                            <embed
                              src={`https://arweave.net/${url.split(":")[0]}`}
                              type="application/pdf"
                              className="w-full h-500 object-contain"
                            />
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>

                {/* Project Content */}
                <div className="prose max-w-none">
                  {campaign?.content?.details &&
                    campaign.content.details
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col">
              {campaign?.milestone && (
                <MilestoneDisplayComponent milestones={campaign?.milestone} 
                showVoteButton={displayVoteButton} 
                contractAddress={campaign?.contractAddress} votes={totalVotes as string[]}/>
              )}
            </div>
            <DisplayDonorsToProject
              donors={campaign.donors}
              donorsRecall={campaign.donorsRecall}
            />
          </div>

          {/* Donation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Support this project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">
                        {+campaign.amountRaised.toString() / 1e18} RBTC
                      </span>
                      <span className="text-gray-500">
                        of {+campaign.amountSought.toString() / 1e18} RBTC
                      </span>
                    </div>
                    <Progress
                      value={
                        (+campaign.amountRaised / +campaign.amountSought) * 100
                      }
                      className="h-3"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>
                        {Math.round(
                          (+campaign.amountRaised / +campaign.amountSought) *
                            100
                        )}
                        % funded
                      </span>
                      <span>
                        {getDaysBetweenEpochAndCurrent(
                          +campaign.projectDuration / 1000
                        )}{" "}
                        day(s) left
                      </span>
                    </div>
                  </div>

                  {/* Quick Donation Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    {[0.01, 0.1, 0.25, 1].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => setDonationAmount(amount.toString())}
                      >
                        {amount} RBTC
                      </Button>
                    ))}
                  </div>

                  {/* Custom Donation Input */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="pl-8"
                        placeholder="Enter amount"
                      />
                      <span className="absolute left-3 top-2.5 text-gray-500"></span>
                    </div>
                    {!address ? (
                      <p>Connect your wallet to make a donation</p>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => handleDonate(donationAmount)}
                        disabled={
                          isPending ||
                          !donationAmount ||
                          parseFloat(donationAmount) <= 0
                        }
                      >
                        Back this project
                      </Button>
                    )}
                  </div>

                  {/* Project Stats */}
                  <div className="pt-6 border-t space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Backers</span>
                      <span className="font-medium">
                        {countUniqueDonors(
                          campaign.donors,
                          campaign.donorsRecall
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time left</span>
                      <span className="font-medium">
                        {getDaysBetweenEpochAndCurrent(
                          +campaign.projectDuration / 1000
                        )}{" "}
                        days
                      </span>
                    </div>
                  </div>
                 
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
