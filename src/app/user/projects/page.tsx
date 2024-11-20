"use client";
import React, { useState, useEffect } from "react";
import UserProjects from "@/app/components/UserProjects";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getUserCampaigns } from "../../../../lib/queries/getUserCampaigns";




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

      console.log("user projects ", data)
      console.log("error fetching projects ", error);


    return (
      <div>
       { data && error === null &&
        <UserProjects projects={data.campaignCreator} />
       }
    </div>
    )
}

export default UserProjectsPage;