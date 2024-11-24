import React from 'react';
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";
import { Card } from "@/components/ui/card";

const EmptyCampaigns = ({message}: {message?: string}) => {
  return (
    <Card className="w-full p-12">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-gray-100 p-4 mb-6">
          <FileSearch className="w-12 h-12 text-gray-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          No Campaigns Found
        </h3>
        
        <p className="text-gray-500 mb-6 max-w-md">
            { message ? message : `We couldn't find any campaigns matching your criteria. 
            Try adjusting your search terms or browse all campaigns`
          }
        
        </p>

        <div className="flex gap-4">
          <Button variant="outline">
            Browse All
          </Button>
          <Button>
            Create Campaign
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EmptyCampaigns;