"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';

interface NoDonationsStateProps {
    onExplore: ()=> void;
}

const NoDonationsState: React.FC<NoDonationsStateProps> = ({ onExplore }) => {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 space-y-6">
        <div className="bg-gray-100 rounded-full p-6">
          <DollarSign className="h-16 w-16 text-gray-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Donations Yet
          </h2>
          <p className="text-gray-600 mb-4 max-w-md">
            You haven't supported any projects yet. Start making a 
            difference by exploring our active campaigns!
          </p>
          <Button 
            onClick={onExplore}
            className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Explore Campaigns
          </Button>
        </div>
      </div>
    );
  };
  
export default NoDonationsState;