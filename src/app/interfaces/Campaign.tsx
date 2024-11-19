
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
    donors: string[]
    backers: number;
    id: string;
}


export default Campaign