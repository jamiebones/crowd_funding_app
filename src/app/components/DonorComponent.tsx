"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, Wallet } from 'lucide-react';
import Donor from '../interfaces/Donor';
import { getDaysBetweenEpochAndCurrent } from '@/utils/utility';

interface DonationProps {
    donations: Donor[]
}


const DonorCampaigns: React.FC<DonationProps> = ({ donations }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-6 w-6" />
          <span>My Donations</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {donations.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No donations found
          </div>
        ) : (
          <div className="space-y-4">
            {donations.map((donation, index) => {
              const { donatingTo } = donation;

              return (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {donatingTo?.content?.title}
                      </h3>
                      <div className="mt-2 flex items-center space-x-2">
                        <Badge variant="secondary">
                          <Activity className="h-4 w-4 mr-1" />
                          {donatingTo?.category}
                        </Badge>
                        <Badge variant={donatingTo.campaignRunning ? 'default' : 'destructive'}>
                          {donatingTo.campaignRunning ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        {+donation.amount.toLocaleString()/ 1e18} RBTC
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Donated {new Date(+donation.date * 1000 ).toDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center border-t pt-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {getDaysBetweenEpochAndCurrent(+donatingTo.dateCreated)} days remaining
                    </div>
                    <a 
                      href={`https://etherscan.io/address/${donatingTo.contractAddress}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Contract
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DonorCampaigns;