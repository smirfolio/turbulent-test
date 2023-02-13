import { buildSchema } from 'graphql';

const playerScoreSchema = buildSchema(`
  input PlayerScoreInput {
    id: Int
    score: Int
  }

  type PlayerScore {
    id: Int
    score: Int
  }

  type ScorePlayers {
    scores: [PlayerScore]
  }
  
  type Query {
     scorePlayers(limit: Int): [PlayerScore]
     getScore(id: ID!): PlayerScore
  }
  
  type Mutation {
    createPlayerScore(input: PlayerScoreInput): PlayerScore
  }
`);

export default playerScoreSchema;
