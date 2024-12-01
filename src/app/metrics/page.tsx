"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CampaignMetricsComponent from "../components/CampaignMetrics";
import { getAllCampaignStats } from "../../../lib/queries/getAllCampaignStats";
import LoadingComponent from "../components/LoadingComponent";
import { groupCampaignByCategory } from "../../utils/utility";
import GroupCategory from "../interfaces/GroupCategory";
import CampaignStats from "../interfaces/CampaignStats";

const MetricsPage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["metrics"],
    queryFn: getAllCampaignStats,
  });

  if (isLoading) {
    return <LoadingComponent message="loading metrics" />;
  }

  if (error){
    console.log("error bad market ", error);
  }

  if ( data ){
    const stats: CampaignStats[] = data.campaigns;
    const category: GroupCategory[] = groupCampaignByCategory(stats);
    return <CampaignMetricsComponent metrics={category} />
  }
  return <div>
    <p>No metrics</p>
  </div>;
};

export default MetricsPage;
