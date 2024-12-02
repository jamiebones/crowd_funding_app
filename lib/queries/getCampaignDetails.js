"use client";
import { isAddress } from 'viem';
import client from '../graphQLClient';
import { gql } from "graphql-request";

export const getCampaignDetails = async (campaignID) => {
    const query = gql`
        query GetCampaignDetails($id: ID!) {
            campaign(id: $id) {
                content {
                    media
                    title
                    details
                }
                milestone{
                    id
                    milestoneCID
                    details
                    milestonestatus
                    periodToVote
                    dateCreated
                    content{
                        media
                        title
                        details
                }
                }
                donors{
                  donor
                  date
                  amount
               }
               donorsRecall{
                 donor
                 date
                 amount
               }
                dateCreated
                projectDuration
                contractAddress
                category
                amountSought
                amountRaised
                owner {
                    id
                }
            }
        }
    `;

    // Pass the variable in the request
    const variables = { id: campaignID };
    const data = await client.request(query, variables);
    return data;
};


