
import Campaign from "./Campaign";

interface Donor {
    date: number;
    amount: number;
    donatingTo: Campaign
}

export default Donor;