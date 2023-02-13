import { createClient } from 'redis';
import persistCollectedData from './persistance'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { redisHost, redisPort } = require('../configApp');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { promisify } = require('util');

const  persistBulkCache  = async () => {
    const valuesToPush:any | null = [];
    let safelyDelete = false
    try {
        const redisClient = createClient({legacyMode: true ,url: "redis://" + redisHost + ":" + redisPort});
        redisClient.on('error', err => console.log("Faulty system | Redis Error===>", err));
        await redisClient.connect();
        const allKEys = await promisify(redisClient.keys).bind(redisClient);
        const delValue = await promisify(redisClient.del).bind(redisClient);
        const getValue = await promisify(redisClient.get).bind(redisClient);

        const cachedData = await allKEys("*");
        for(let i = 0, j = cachedData.length; i < j; ++i) {
            const operationData = {
                updateOne: {
                    filter: { id: parseInt(cachedData[i]) },
                    update: { $set:  JSON.parse(await getValue(cachedData[i]))},
                    upsert: true
                },
            };
            valuesToPush.push(operationData);
        }
    await redisClient.disconnect();
        safelyDelete= true
    } catch (e) {
        console.log("Faulty system | Redis Error getCache===>", e)
    }
    try{
        if(safelyDelete) {
            await persistCollectedData(valuesToPush)
        }
    }
    catch (e) {
        console.log("Faulty system | Redis Error mongo persistence===>", e)
    }
}


export default persistBulkCache;
