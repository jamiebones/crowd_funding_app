import Milestone from "./Milestone";
import Donor from "./Donor";
import DonationWithdrawn from "./DonationWithdrawn";

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
    donors: Donor[]
    donorsRecall: DonationWithdrawn[]
    backers: number;
    id: string;
    milestone: Milestone[];
    campaignRunning: boolean;
}


export default Campaign