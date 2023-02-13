import PlayerScore from "../graphqlQuery/playerScore/playerScore.model";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { createClient } from 'redis';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { redisHost, redisPort } = require('../configApp');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { promisify } = require('util');


const  setCache  = async (playerScore: PlayerScore) => {
    try{
        const redisClient = createClient({legacyMode: true ,url: "redis://" + redisHost + ":" + redisPort});
        redisClient.on('error', err => console.log("Faulty system | Redis connection Error===>", err));
        await redisClient.connect();

        const setValue = await promisify(redisClient.set).bind(redisClient);
        // const allKEys = await promisify(redisClient.keys).bind(redisClient);

        await setValue(playerScore.id, JSON.stringify(playerScore));
        await redisClient.disconnect();
    }catch (e){
        console.log("Faulty system | Redis Error setCache===>", e)
    }
}


export default setCache;
