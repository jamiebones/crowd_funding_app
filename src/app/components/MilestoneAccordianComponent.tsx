"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import MilestoneStatusBadge from "./MilestoneStatusBadge";
import Milestone from "../interfaces/Milestone";
import { getDaysBetweenEpochAndCurrent } from "@/utils/utility";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import CrowdFundingABI from "../../../abis/CrowdFundingImplementation.json";
import LoadingComponent from "./LoadingComponent";
import ImageDisplayComponent from "./ImageDisplayComponent";
import { toast } from "react-toastify";

const MilestonesAccordion = ({
  milestones,
  currentMilestone,
  contractAddress,
}: {
  milestones: Milestone[];
  currentMilestone: string;
  contractAddress: string;
}) => {
  const [openMilestone, setOpenMilestone] = useState<string | null>(null);

  const { address } = useAccount();
  const filteredMilestone: Milestone[] = milestones.filter((milestone) => {
    return milestone.id === currentMilestone;
  });

  const {
    data,
    isLoading,
    error: error,
  } = useReadContract({
    address: contractAddress as any,
    abi: CrowdFundingABI,
    functionName: "hasVotedOnMilestone",
  });

  const {
    data: hash,
    error: writeError,
    writeContract,
    isSuccess,
    isPending,
    isError,
  } = useWriteContract();

  const toggleMilestone = (milestoneId: string) => {
    setOpenMilestone(openMilestone === milestoneId ? null : milestoneId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Transaction hash: ${hash}`, {
        position: "top-right",
      });
      window.location.reload();
    }
  }, [hash, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log("Error from mutation ",);
      toast.error(`Error sending transaction:`, {
        position: "top-right",
      });
    }
  }, [isError]);

  const handleMilestoneVote = (vote: boolean) => {
    try {
      console.log("sending transaction to Rootstock");
      writeContract({
        address: contractAddress as any,
        abi: CrowdFundingABI,
        functionName: "voteOnMilestone",
        args: [vote],
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="space-y-2 mt-4 border-t pt-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-2 text-center">
        Project Milestones
      </h2>
      {filteredMilestone.map((milestone) => (
        <div key={milestone.id} className="border rounded-lg overflow-hidden">
          <div
            className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleMilestone(milestone.id)}
          >
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm">
                {milestone?.content?.title ||
                  "Milestone Capone Project Summary"}
              </span>
              <MilestoneStatusBadge status={milestone.milestonestatus} />
            </div>
            {openMilestone === milestone.id ? <ChevronUp /> : <ChevronDown />}
          </div>

          {openMilestone === milestone.id && (
            <div className="p-3 bg-gray-50 text-sm">
              <p className="mb-2">
                {milestone?.content?.title || "Mile stone details"}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div>
                  <strong>Title:</strong>{" "}
                  {milestone?.content?.title || "Milestone title"}
                </div>

                <div>
                  <strong>Details:</strong>{" "}
                  {milestone?.content?.details ||
                    "The day is a new one we pray for"}
                </div>
                <div>
                  <strong>Period to Vote:</strong>
                  <br />
                  {getDaysBetweenEpochAndCurrent(+milestone.periodToVote)} days
                  Left
                </div>
                <div>
                  <strong>Date Created:</strong>{" "}
                  {new Date(+milestone.dateCreated * 1000).toDateString()}
                </div>
              </div>

              <div className="mt-2">
                <ImageDisplayComponent images={milestone?.content?.media} />
              </div>

              <div className="mt-4 p-2">
                <p className="text-center mb-1">Vote on Milestone</p>

                {isLoading && <LoadingComponent />}


                {getDaysBetweenEpochAndCurrent(+milestone.periodToVote) > 0 && (
                  <div className="flex justify-center items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => handleMilestoneVote(true)}
                      className="flex items-center gap-2"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Yes
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleMilestoneVote(false)}
                      className="flex items-center gap-2"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      No
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MilestonesAccordion;
