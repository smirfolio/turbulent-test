import { graphqlHTTP } from 'express-graphql'
import playerScoreSchema from "./playerScore.graphQl";
import playerScoreRoot from "./playerScore.controller";

const playerScoreGraphQl = graphqlHTTP(
    {
        schema: playerScoreSchema,
        rootValue: playerScoreRoot,
        graphiql: true,
    }
);



export default playerScoreGraphQl;
