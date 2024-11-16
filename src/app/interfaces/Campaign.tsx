
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
    contractAddress: string;
    amountSought:string;
    amountRaised: string;
    backers: string;
}


export default Campaign