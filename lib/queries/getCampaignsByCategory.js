"use client";
import client from '../graphQLClient';
import { gql } from "graphql-request"

export const getCampaignsByCategory = async (category) => {
    const query = gql`
         query CampaignsByCategory($category: String!) {
                    campaigns(where: { category: $category }, 
                    orderBy: dateCreated, orderDirection: desc){
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
                        donors{
                            donor
                        }
                        id
                        owner{
                        id
                        }
                    }
                
        }`
    const variables = { category: category };
    const data = await client.request(query, variables);
    return data;
}