"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Clock, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Milestone from "../interfaces/Milestone";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import {
  formatRelativeTime,
  getDaysBetweenEpochAndCurrent,
} from "@/utils/utility";
import CrowdFundingABI from "../../../abis/CrowdFundingImplementation.json";
import { toast } from "react-toastify";

const MilestoneDisplayComponent = ({
  milestones = [],
  showVoteButton,
  contractAddress,
  votes = [],
}: {
  milestones: Milestone[];
  showVoteButton: boolean;
  contractAddress: string;
  votes: string[];
}) => {
  const {
    data: hash,
    error: writeError,
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
      window.location.reload();
    }
  }, [hash, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log("Error from mutation ");
      toast.error(`Error sending transaction`, {
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

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "decline":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Render message if no milestones
  if (milestones.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No milestones to display
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full p-4">
      {milestones.map((milestone) => (
        <Card key={milestone.id} className="overflow-hidden shadow-lg">
          <CardHeader className="bg-gray-50 p-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">
                {milestone.content?.title || "Untitled Milestone"}
              </CardTitle>
              <Badge
                className={`${getStatusColor(
                  milestone.milestonestatus
                )} px-3 py-1`}
              >
                {milestone.milestonestatus}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Created: {formatRelativeTime(+milestone.dateCreated)}
            </p>
          </CardHeader>
          <div className="p-4 flex flex-col md:flex-row gap-4">
            <CardContent className="">
              {/* Media Carousel */}
              {milestone.content?.media &&
                milestone.content.media.length > 0 && (
                  <Carousel className="w-full max-w-md mx-auto md:w-1/2">
                    <CarouselContent>
                      {milestone.content.media.map((mediaUrl, index) => (
                        <CarouselItem key={index}>
                          <img
                            src={`https://arweave.net/${
                              mediaUrl.split(":")[0]
                            }`}
                            alt={`Milestone media ${index + 1}`}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {milestone.content.media.length > 1 && (
                      <>
                        <CarouselPrevious />
                        <CarouselNext />
                      </>
                    )}
                  </Carousel>
                )}

              {/* Milestone Details */}
              <div className="space-y-4 md:w-full">
                <p className="text-gray-700 mt-4">
                  {milestone.content?.details || "No details available"}
                </p>

                {/* <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-600">
                      Voting Period:
                    </span>
                    <span className="text-gray-800">
                      {getDaysBetweenEpochAndCurrent(+milestone.periodToVote)}{" "}
                      days left
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-600">
                      Supporting :
                    </span>
                    <span className="text-gray-800">
                      {votes[0].toString()} vote(s)
                      
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-600">
                      Against:
                    </span>
                    <span className="text-gray-800">
                      {votes[1].toString()} vote(s)
                    </span>
                  </div>
                </div> */}

                <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500 max-w-sm mx-auto">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <span className="font-bold text-gray-700">
                          Voting Period
                        </span>
                        <p className="text-sm text-gray-500">
                          {getDaysBetweenEpochAndCurrent(
                            +milestone.periodToVote
                          )}{" "}
                          days remaining
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ThumbsUp className="w-5 h-5 mr-3 text-green-600" />
                          <div>
                            <span className="font-bold text-gray-700">
                              Supporting
                            </span>
                            <p className="text-sm text-gray-500">
                              {votes && votes[0]?.toString()} vote(s)
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <ThumbsDown className="w-5 h-5 mr-3 text-red-600" />
                          <div>
                            <span className="font-bold text-gray-700">
                              Against
                            </span>
                            <p className="text-sm text-gray-500">
                              {votes && votes[1]?.toString()} vote(s)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {votes && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{
                            width: `${
                              +votes[0]?.toString() + +votes[1]?.toString() > 0
                                ? (+votes[0]?.toString() /
                                    (+votes[0]?.toString() +
                                      +votes[1]?.toString())) *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>

                {getDaysBetweenEpochAndCurrent(+milestone.periodToVote) > 0 &&
                  showVoteButton && (
                    <div className="bg-slate-100 p-2 mx-auto">
                      <p className="text-center mb-4 text-lg">
                        Cast your vote on milestone
                      </p>
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
                    </div>
                  )}
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MilestoneDisplayComponent;
