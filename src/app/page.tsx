"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, Users, Target } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { useQuery } from '@tanstack/react-query';
import { getCampaigns } from "../../lib/queries/fetchCampaign";
import CampaignDisplay from './components/CampaignDisplay';

const CrowdfundingLanding = () => {

    const [campaigns, setCampaigns ] = useState([]);

    const { data, error, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns
  });

   console.log("data ", data);

   

  //  useEffect(()=> {
  //   if (!isLoading && data ){
  //     console.log("data ", data);
  //     setCampaigns(data);
  //   }

  //  }, [data, isLoading])
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center mb-16">
            <h1 className="text-2xl font-bold text-blue-600">CrowdFund</h1>
            <div className="hidden md:flex space-x-6">
              <Button variant="ghost">How it Works</Button>
              <Button variant="ghost">Browse Projects</Button>
    
            </div>
            <div className="space-x-4">
              <ConnectButton/>
              <Button>Start Project</Button>
            </div>
          </nav>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Bring Your Ideas to Life
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Join our community of creators and backers. Fund innovative projects
                and help shape the future.
              </p>
              <div className="space-x-4">
                <Button size="lg">Start a Project</Button>
                <Button size="lg" variant="outline">
                  Explore Projects
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/crowdfunding-1.png"
                alt="Crowd funding image"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <Target className="w-12 h-12" />
              <div>
                <h3 className="text-3xl font-bold">$2.5M+</h3>
                <p>Total Funded</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="w-12 h-12" />
              <div>
                <h3 className="text-3xl font-bold">15K+</h3>
                <p>Active Backers</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <TrendingUp className="w-12 h-12" />
              <div>
                <h3 className="text-3xl font-bold">500+</h3>
                <p>Successful Projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">New Projects</h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>

         
             {isLoading && <p>Loading ......</p>}
              {!isLoading && data && error == null && <CampaignDisplay campaigns={data.campaigns} /> } 
        
        </div>
      </section>
    </div>
  );
};

export default CrowdfundingLanding;










