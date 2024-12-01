

interface CampaignStats {
    category: string;
    amountRaised: string;
    donors: { donor: string}[]
    donorsRecall: {donor: string}[]
}


export default CampaignStats;