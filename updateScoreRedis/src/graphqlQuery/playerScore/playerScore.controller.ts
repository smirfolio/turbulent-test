import PlayerScore from './playerScore.model';
import setCache from '../../lib/cache'
import { MongoClient } from 'mongodb';
const { mongoUri } = require('../../configApp');


const client = new MongoClient(mongoUri);
const getScorePlayers = async ():Promise<PlayerScore[] | null> => {
    const scoreToReturn:PlayerScore[] = [];
    try{
        const database = MongoClient.connect(mongoUri)
        await database.then(async (client) => {
            const db = client.db("users_game_play")
            const result =  await db.collection("scores").find({}).toArray();
            result.map((score) => {
                scoreToReturn.push({id: score.id, score: score.score})
            })

        }).catch((error) => {
            console.log("Faulty system | MongoDb Error===>", error)
            return null;
        })
    }
    finally {
        await client.close();
    }
    return scoreToReturn;
}

const  playerScoreRoot = {
    getScore:  ({id}): PlayerScore => {
        console.log("id score", id)
        return {id: 222, score: 343444};
    },
    scorePlayers:  async ():Promise<PlayerScore [] | null> => {
        const score = await getScorePlayers();
        return score;
    },
    createPlayerScore: async ({input}) => {
        try {
            await setCache(input)
            return input;
        } catch (e) {
            console.log("Faulty system | GraphQl set Error===>", e)

        }
    }
};

export default playerScoreRoot;

