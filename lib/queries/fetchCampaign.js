import client from '../graphQLClient';
import { gql } from "graphql-request"

export const getCampaigns = async () => {
    const query =
        gql`{
            campaigns(first: 3, orderBy: dateCreated, orderDirection: desc){
             content{
                media
                title
                details
            }
            dateCreated
            contractAddress
            category
            amountSought
            amountRaised
            owner{
               id
            }
        }
    }`
    const data = await client.request(query);
    return data;
}