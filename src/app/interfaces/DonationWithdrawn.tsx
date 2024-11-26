
import Campaign from "./Campaign";

interface DonationWithdrawn {
    date: number;
    amount: number;
    donor: string;
    withdrawingFrom: Campaign
}

export default DonationWithdrawn;
  