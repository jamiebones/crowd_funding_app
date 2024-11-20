interface MilestoneContent {
    media: string[];
    title: string;
    details: string;
}

interface Milestone {
    id: string;
    milestoneCID: string;
    details: String;
    milestonestatus: string;
    periodToVote: string;
    dateCreated: string;
    content: MilestoneContent
}

export default Milestone
