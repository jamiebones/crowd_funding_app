import Milestone from "./Milestone";

interface CampaignContent {
    media: string[];
    title: string;
    details: string;
}

interface CampaignOwner {
    id: string;
}

interface Campaign {
    content: CampaignContent;
    category: string;
    owner: CampaignOwner;
    dateCreated: string;
    projectDuration: string;
    contractAddress: string;
    amountSought:string;
    amountRaised: string;
    currentMilestone: string;
    donors: string[]
    backers: number;
    id: string;
    milestone: Milestone[];
    campaignRunning: boolean;
}





export default Campaign