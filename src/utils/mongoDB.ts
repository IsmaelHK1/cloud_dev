import { MongoClient  } from 'mongodb';

const uri =  'mongodb+srv://ismaelhacquin:RyQllQCv8KEofO1x@cluster0.vk2ndfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName =  'smallParadise';


async function connectToMongo(): Promise<MongoClient> {
     let client = new MongoClient(uri);
    await client.connect();
    return client;
}

async function disconnectMongo(client : MongoClient): Promise<void> {
    if (client) {
        await client.close();
    }
}

export async function addSentimentData( sentiment: string): Promise<void> {
    const database = await connectToMongo();
    const db = database.db(dbName);
    const collection = db.collection('sentiments');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await collection.insertOne({ data: today, sentiment });
    await disconnectMongo(database);
}