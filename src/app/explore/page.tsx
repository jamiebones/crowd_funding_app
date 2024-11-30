"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getCampaignsByCategory } from "../../../lib/queries/getCampaignsByCategory";
import { searchCampaignsByContent } from "../../../lib/queries/searchCampaigns";
import LoadingComponent from "../components/LoadingComponent";
import Campaign from "../interfaces/Campaign";
import SearchCampaignDisplay from "../components/SearchCampaignDisplay";
import CampaignDisplay from "../components/CampaignDisplay";
import EmptyCampaigns from "../components/EmptyCampaign";

const categories = [
  { name: "Education", value: "Education" },
  { name: "Philanthrophy", value: "Philanthrophy" },
  { name: "Science", value: "Science" },
  { name: "Music", value: "Music" },
  { name: "Charity", value: "Charity" },
];

interface SearchResult {
  campaign: Campaign
}



const SearchComponents = () => {
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("Education");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);

  const {
    data,
    error,
    isLoading: loadingCampaigns,
  } = useQuery({
    queryKey: ["campaignsByCategory", categoryFilter],
    queryFn: ({ queryKey }) => {
      const [, categoryFilter] = queryKey;
      return getCampaignsByCategory(categoryFilter);
    },
    enabled: !!categoryFilter,
  });

  const {
    data: dataFromSearching,
    error: errorFromSearching,
    isLoading: loadingFromSearching,
    refetch,
  } = useQuery({
    queryKey: ["campaignsSearch", searchText],
    queryFn: ({ queryKey }) => {
      const [, searchText] = queryKey;
      return searchCampaignsByContent(searchText);
    },
    enabled: false,
  });

  console.log("data", data);

  console.log("error ", errorFromSearching);

  const handleSearch = () => {
    if (searchText !== "") {
      refetch();
      //setSearchText("");
    }
  };

  useEffect(() => {
    if (data) {
      setCampaigns(data.campaigns);
      setSearchResult([]);
    }
  }, [data]);

  useEffect(() => {
    if (dataFromSearching) {
      setSearchText("");
      setCampaigns([]);
      console.log("datafromsearching ", dataFromSearching?.campaignSearch)
      setSearchResult(dataFromSearching?.campaignSearch);
    }
  }, [dataFromSearching]);

  if (loadingCampaigns) {
    return <LoadingComponent message="Loading campaigns" />;
  }

  // if ( loadingFromSearching ){
  //     return <LoadingComponent message="Loading campaigns via content search" />
  // }

  return (
    <div className="p-1 mx-auto">
      <div className="">
        <Card className="mx-auto mb-4">
          <CardHeader>
            <CardTitle>Search Campaigns</CardTitle>
            <CardDescription>
              Search by entering text and clicking search, or filter by category
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 flex space-x-2">
                <Input
                  placeholder="Enter search terms..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleSearch}
                  disabled={loadingFromSearching}
                  className="w-30"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {loadingFromSearching
                    ? "searching......"
                    : " Search Projects"}
                </Button>
              </div>
              <Select
                onValueChange={(value) => {
                  setCategoryFilter(value);
                  // If you want to trigger search immediately on category change:
                  // setCampaigns([]);
                }}
                value={categoryFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.value}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
      {campaigns.length > 0 && <CampaignDisplay campaigns={campaigns} />}

      {searchResult.length > 0 && <SearchCampaignDisplay campaigns={searchResult} />}

      {campaigns.length === 0 || searchResult.length === 0 && <EmptyCampaigns />}
    </div>
  );
};

export default SearchComponents;
