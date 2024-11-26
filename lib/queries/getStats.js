"use client";
import client from '../graphQLClient';
import { gql } from "graphql-request"

export const getStats = async () => {
    const query =
        gql`{
             statistics{
                id
                totalContracts
                totalFundingRequest
                totalBackers
                totalWithdrawals
        }
    }`
    const data = await client.request(query);
    return data;
}