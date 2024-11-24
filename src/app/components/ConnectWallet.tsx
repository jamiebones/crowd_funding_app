import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, ShieldCheck, ArrowRight } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const ConnectWalletComponent = () => {
  return (
    <Card className="max-w-2xl mx-auto">
      <div className="p-8">
        <div className="flex flex-col items-center text-center">
          {/* Icon with gradient background */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl" />
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-4 mb-6">
              <Wallet className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Connect Your Wallet
          </h2>
          
          <p className="text-gray-500 mb-8 max-w-md">
            Connect your wallet to create a project or donate RBTC to a project. 
          </p>

          {/* Security features section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8 w-full max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Rootstock</span>
            </div>
            <p className="text-sm text-gray-500 text-left">
              Created projects are deployed to Rootstock network
            </p>
          </div>

          {/* Connect button */}
          {/* <Button size="lg" className="px-8 py-6 text-lg gap-2">
            Connect Wallet
            <ArrowRight className="w-5 h-5" />
          </Button> */}

          <ConnectButton />

         
        </div>
      </div>
    </Card>
  );
};

export default ConnectWalletComponent;