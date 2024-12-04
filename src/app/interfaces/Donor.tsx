
import Campaign from "./Campaign";

interface Donor {
    date: number;
    donor: string;
    amount: number;
    donatingTo: Campaign
}

export default Donor;


