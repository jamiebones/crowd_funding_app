"use client";
import React from "react";
import UserProjects from "@/app/components/UserProjects";
import { useQuery } from "@tanstack/react-query";
import {  useAccount } from "wagmi";
import { getUserCampaigns } from "../../../../lib/queries/getUserCampaigns";
import LoadingComponent from "../../components/LoadingComponent";
import EmptyCampaigns from "@/app/components/EmptyCampaign";
import ConnectWalletComponent from "@/app/components/ConnectWallet";

const UserProjectsPage = () => {
  const { address } = useAccount();

  const { data, error, isLoading } = useQuery({
    queryKey: ["userProjects", address?.toLowerCase().toString()],
    queryFn: ({ queryKey }) => {
      const [, address] = queryKey;
      return getUserCampaigns(address);
    },
    enabled: !!address,
  });

  


  if (isLoading) {
    return <LoadingComponent message="Loading your projects" size="large" />;
  }

  if (!address) {
    return <ConnectWalletComponent />;
  }

  return (
    <div>
      {data && error === null && (
        <UserProjects projects={data.campaignCreator} />
      )}

    </div>
  );
};

export default UserProjectsPage;
