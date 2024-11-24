import React from "react";
import Campaign from "../interfaces/Campaign";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { clipTextToWords, countUniqueBackers } from "../../utils/utility";
import Link from "next/link";
import Donor from "../interfaces/Donor";


interface CampaignDisplayProps {
  campaigns: Campaign[];
}


const CampaignDisplay: React.FC<CampaignDisplayProps> = ({ campaigns }) => {

  console.log("campaigns::: ", (campaigns))
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {campaigns.map((campaign) => (
        <Card key={campaign.contractAddress}>
          {/* <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              /> */}
          <CardHeader>
            <CardTitle>{campaign.content?.title}</CardTitle>
            <span className="text-sm text-gray-500">{campaign.category}</span>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              {clipTextToWords(campaign?.content?.details, 30)}
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Raised: {+campaign.amountRaised/ 1e18}</span>
                  <span>
                    {Math.round(
                      ((+campaign.amountRaised) / (+campaign.amountSought)) * 100)}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (+(campaign.amountRaised) / +campaign.amountSought) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                
                <span>Goal: {+campaign?.amountSought?.toLocaleString() / 1e18} RBTC</span>
                <span>{countUniqueBackers(campaign.donors as any)} backers</span>
              </div>
              <Link
                href={`/projects/${campaign.id}`}
                target="_blank"
                className="text-blue-500 underline"
              >
                <Button className="w-full">Back this project</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CampaignDisplay;
