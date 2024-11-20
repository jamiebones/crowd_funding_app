import Campaign from "./Campaign";
  
  interface CampaignCreator {
    id: string;
    fundingGiven: number;
    fundingWithdrawn: number;
    createdCampaigns: Campaign[];
  }

  export default CampaignCreator;