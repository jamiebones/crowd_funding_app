"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { getDonorCampaigns } from "../../../lib/queries/getDonorCampaigns";
import DonorCampaigns from "../components/DonorComponent";
import NoDonationsState from "../components/NoDonationYet";
import LoadingComponent from "../components/LoadingComponent";
import { useRouter } from "next/navigation";

const DonationPage = () => {
  const { address } = useAccount();
  const router = useRouter();

  const onExplore = () => {
    router.push("/");
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["donorCampaigns", address?.toLowerCase().toString()],
    queryFn: ({ queryKey }) => {
      const [, address] = queryKey;
      return getDonorCampaigns(address);
    },
    enabled: !!address,
  });

  console.log("data ", data)

  if (error) {
    return toast.error(
      `There was an error loading donation. Please refresh the page`,
      {
        position: "top-right",
      }
    );
  }

  if (isLoading) {
    return <LoadingComponent message="Loading your donations" />;
  }

  if (!isLoading && data?.donations?.length > 0) {
    return <DonorCampaigns donations={data.donations} />;
  }

  
  if (!isLoading && data?.donations?.length === 0) {
    return <NoDonationsState onExplore={onExplore} />
  }

};

export default DonationPage;
