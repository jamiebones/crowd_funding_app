"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CampaignCreator from "../interfaces/CampaignCreator";
import Campaign from "../interfaces/Campaign";
import MilestoneForm from "./MilestoneForm";
import MilestoneCard from "./MilestoneCard";
import { useRouter } from "next/navigation";

interface CampaignCreatorProps {
  projects: CampaignCreator;
}

const UserProjects: React.FC<CampaignCreatorProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Campaign | null>(null);
  const router = useRouter();
 

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const calculateProgress = (raised: number, goal: number): number =>
    Math.round((raised / goal) * 100);

  if (!projects) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Project 
          </h2>
          <p className="text-gray-600 mb-4 max-w-md">
            You haven't created any projects yet
          </p>
          <Button onClick={()=>router.push("/dashboard")}
           className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
            Create a project
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 p-4">
      {/* Projects List - Mobile First Responsive */}
      <div className="w-full md:w-1/2 lg:w-2/5 space-y-4 md:pr-4">
        <h2 className="text-2xl font-bold mb-4">My Projects</h2>

        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">
            <span className="pr-1">Fund received</span>
            {+projects?.fundingGiven?.toString() / 1e18} RBTC
          </p>

          <p className="text-sm text-muted-foreground">
            <span className="pr-1">Fund withdrawn</span>
            {+projects.fundingWithdrawn.toString() / 1e18} RBTC
          </p>
        </div>
        {projects.createdCampaigns.map((project: Campaign) => (
          <Card
            key={project.id}
            className={`cursor-pointer hover:bg-gray-100 transition-colors ${
              selectedProject && selectedProject.id === project.id
                ? "border-primary"
                : ""
            }`}
            onClick={() => setSelectedProject(project)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                {project?.content?.title}
                <Badge variant="secondary">{project.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress
                value={calculateProgress(
                  +project.amountRaised,
                  +project.amountSought
                )}
                className="mb-2"
              />
              <div className="text-sm text-muted-foreground flex justify-between">
                <span>
                  {+project.amountRaised.toLocaleString() / 1e18} RBTC raised
                </span>
                <span>
                  Goal: {+project.amountSought.toLocaleString() / 1e18} RBTC
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Details - Mobile Responsive */}
      <div className="w-full md:w-1/2 lg:w-3/5 mt-4 md:mt-0">
        {selectedProject ? (
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {selectedProject.content?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    {selectedProject.content?.details}
                  </p>
                  <div className="flex flex-row justify-center">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-muted-foreground">
                        Fundraising Goal
                      </h3>
                      <p>
                        {+selectedProject.amountSought.toLocaleString() / 1e18}{" "}
                        RBTC
                      </p>
                    </div>
                    <div className="">
                      <h3 className="text-sm font-semibold text-muted-foreground">
                        Amount Raised
                      </h3>
                      <p>
                        {+selectedProject.amountRaised.toLocaleString() / 1e18}{" "}
                        RBTC
                      </p>
                    </div>
                  </div>
                  <Progress
                    value={calculateProgress(
                      +selectedProject.amountRaised,
                      +selectedProject.amountSought
                    )}
                    className="w-full"
                  />
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">
                      {selectedProject.category}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Deadline:{" "}
                      {new Date(
                        +selectedProject.projectDuration
                      ).toDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {/* <Button className="w-full">Edit Project</Button>
                    <Button variant="outline" className="w-full">
                      Share
                    </Button> */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Milestones Section */}

            <div className="mt-1">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Project Milestones</CardTitle>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>Add Milestone</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Milestone</DialogTitle>
                      </DialogHeader>
                      <MilestoneForm
                        contractAddress={selectedProject?.contractAddress}
                        closeDialog={closeDialog}
                      />
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedProject?.milestone?.length ? (
                      selectedProject?.milestone.map((milestone) => (
                        <MilestoneCard milestone={milestone} />
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground">
                        No milestones created yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center text-muted-foreground">
              Select a project to view details
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserProjects;
