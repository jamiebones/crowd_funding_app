import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPH_ENDPOINT_LOCAL!); 

export default client;