"use client";

import React from "react";

import ProjectDetailsComponent from "@/app/components/ProjectDetails";
import { useQuery } from "@tanstack/react-query";
import { getCampaignDetails } from "../../../../lib/queries/getCampaignDetails";

interface ProjectDetailsProps {
  params: { id: string };
}

const ProjectDetailsPage: React.FC<ProjectDetailsProps> = ({ params }) => {
  const { id } = params;

  const { data, error, isLoading } = useQuery({
    queryKey: ["projectDetails", id],
    queryFn: ({ queryKey }) => {
      const [, campaignId] = queryKey;
      return getCampaignDetails(campaignId as string);
    },
    enabled: !!id,
  });

  
  return (
    <div className="p-4">
      {isLoading && <p>Loading......</p>}

      {data && error == null && (
        <ProjectDetailsComponent campaign={data.campaign} id={id}/>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
