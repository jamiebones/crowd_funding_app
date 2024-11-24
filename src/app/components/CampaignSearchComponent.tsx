"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import Campaign from "../interfaces/Campaign";



const CampaignSearchComponent = ({ campaigns }: { campaigns: Campaign[] }) => {

  return (
    <div>
      {campaigns.length === 0 ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No Results</AlertTitle>
          <AlertDescription>
            No campaigns match your search criteria.
          </AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-[500px] w-full">
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <CardTitle>{campaign?.content?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-2">
                    <p>
                      <strong>Category:</strong> {campaign.category}
                    </p>
                    <p>
                      <strong>Date Created:</strong>{" "}
                      {new Date(+campaign.dateCreated * 1000).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Amount Sought:</strong> $
                      {+campaign.amountSought/ 1e18} RBTC
                    </p>
                    <p>
                      <strong>Amount Raised:</strong> $
                      {+campaign.amountRaised / 1e18} RBTC
                    </p>
                    <p>
                      <strong>Donors:</strong> {campaign.donors.length}
                    </p>
                    <p>
                      <strong>Contract Address:</strong>{" "}
                      {`${campaign.contractAddress.substring(0, 10)}...`}
                    </p>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    {campaign?.content?.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default CampaignSearchComponent;
