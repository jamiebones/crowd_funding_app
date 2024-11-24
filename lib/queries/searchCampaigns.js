import client from '../graphQLClient';
import { gql } from "graphql-request";


export const searchCampaignsByContent = async (searchText) => {

    if (!searchText || typeof searchText !== "string") {
        throw new Error("searchText must be a non-empty string");
    }

    const formattedSearchText = searchText.includes(" ")
        ? `'${searchText}'`
        : searchText;
    const query = gql`
        query campaignSearch($text: String!) {
            campaignSearch(text: $text) {
              campaign{
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
    }
}
`;

    const variables = { text: formattedSearchText };
    const data = await client.request(query, variables);
    return data;
};

