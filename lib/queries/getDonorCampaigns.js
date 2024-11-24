import client from '../graphQLClient';
import { gql } from "graphql-request";

export const getDonorCampaigns = async (address) => {
    const query = gql`
        query CampaignsByDonor($donorId: ID!) {
            donations(donor: $donorId) {
                date
                amount
              donatingTo {
                  id
                  category
                  contractAddress
                  active
                  projectDuration
                  currentMilestone
                  dateCreated
                  campaignRunning
                  amountSought
                  amountRaised
                  milestone{
                    id
                    details
                    milestoneCID
                    periodToVote
                    milestonestatus
                    dateCreated
                    content{
                          media
                          title
                          details
                      }
                  }
              }
    }
}
`;
    // Pass the variable in the request
    const variables = { donorId: address };
    const data = await client.request(query, variables);
    return data;
};




