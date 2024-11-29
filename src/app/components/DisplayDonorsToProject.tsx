import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, CopyIcon, ExternalLinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Donor from '../interfaces/Donor';
import DonationWithdrawn from '../interfaces/DonationWithdrawn';

import { formatRelativeTime, trimAddress, countUniqueDonors } from '@/utils/utility';



interface DonationTrackerProps {
    donors: Donor[]
    donorsRecall: DonationWithdrawn[]
}

const DisplayDonorsToProject: React.FC<DonationTrackerProps> = ({donors, donorsRecall}) => {
  

  const calculateTotalContributions = (contributions: Donor[]) => 
    contributions.reduce((sum, contrib) => sum + +contrib.amount, 0);

  const calculateTotalWithdrawals = (withdrawals: DonationWithdrawn[]) => 
    withdrawals.reduce((sum, withdrawal) => sum + +withdrawal.amount, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold flex items-center">
            <ArrowUpCircle className="mr-3 h-6 w-6 text-green-600" />
            Donor Contributions & Funds Recall
          </CardTitle>
          <Badge variant="secondary">
          {countUniqueDonors(donors as any, donorsRecall as any)} Contributors
          </Badge>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contributions Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <ArrowUpCircle className="mr-2 h-5 w-5" />
                Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Contributions:</span>
                  <span className="text-green-600 font-bold">
                    {calculateTotalContributions(donors)/1e18} RBTC
                  </span>
                </div>
                {donors.map((contribution, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-3 flex justify-between items-center hover:bg-green-50 transition-colors"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">
                          {trimAddress(contribution.donor)}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => navigator.clipboard.writeText(contribution.donor)}
                        >
                          <CopyIcon className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => window.open(`https://etherscan.io/address/${contribution.donor}`, '_blank')}
                        >
                          <ExternalLinkIcon className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(+contribution.date)}
                      </span>
                    </div>
                    <span className="font-bold text-green-600">
                      {+contribution?.amount.toString()/ 1e18} RBTC
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Withdrawals Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <ArrowDownCircle className="mr-2 h-5 w-5" />
                Withdrawals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Funds Recalled:</span>
                  <span className="text-red-600 font-bold">
                    {calculateTotalWithdrawals(donorsRecall)/1e18} RBTC
                  </span>
                </div>
                {donorsRecall.map((withdrawal, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-3 flex justify-between items-center hover:bg-red-50 transition-colors"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">
                          {trimAddress(withdrawal.donor)}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => navigator.clipboard.writeText(withdrawal.donor)}
                        >
                          <CopyIcon className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => window.open(`https://etherscan.io/address/${withdrawal.donor}`, '_blank')}
                        >
                          <ExternalLinkIcon className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(withdrawal.date)}
                      </span>
                    </div>
                    <span className="font-bold text-red-600">
                      {+withdrawal?.amount?.toString()/ 1e18} RBTC
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisplayDonorsToProject;


