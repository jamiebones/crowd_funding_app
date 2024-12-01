"use client";
import client from '../graphQLClient';
import { gql } from "graphql-request"

export const getAllCampaignStats = async () => {
    const query =
        gql`{
            campaigns{
            category
            amountRaised
            donors{
                donor
            }
            donorsRecall{
                donor
            }
        }
    }`
    const data = await client.request(query);
    return data;
}