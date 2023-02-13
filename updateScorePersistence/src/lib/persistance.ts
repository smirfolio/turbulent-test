import { MongoClient,  } from 'mongodb';
import {throws} from "assert";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { mongoUri } = require('../configApp');

const client = new MongoClient(mongoUri);


const  persistCollectedData = async (dataOperations) => {
    try {
        const database = MongoClient.connect(mongoUri)
        await database.then(async (client) => {
            const db = client.db("users_game_play")
            const scores = db.collection("scores");
            if(dataOperations && dataOperations.length > 0) {
                await scores.bulkWrite(dataOperations);
            }
        }).catch((error) => {
            console.log("Faulty system | MongoDb Error===>", error)
         throw new Error("Faulty system | MongoDb Error");
        })
    }
    finally {
        await client.close();
    }
}

export default persistCollectedData;
