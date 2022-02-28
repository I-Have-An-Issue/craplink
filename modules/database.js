const { MongoClient } = require("mongodb");
let client;
let database;

exports.init = (mongoUrl = process.env.MONGO_URL) => {
    return new Promise((resolve, reject) => {
        if (client) {
            return reject("The database has already been initilized.");
        }

        MongoClient.connect(mongoUrl, {
            useUnifiedTopology: true
        }).then(client2 => {
            client = client2;
            setCollections().then(() => {
                resolve()
            });
        }).catch(err => reject(err));
    });
}

exports.read = async (collectionName, filter, projection) => {
    var collection = await database.collection(collectionName)
    return await collection.findOne(filter, {
        projection: projection || {}
    })
}

exports.write = async (collectionName, filter, set) => {
    var collection = await database.collection(collectionName)
    return await collection.updateOne(filter, {
        $set: set
    })
}

exports.insert = async (collectionName, data) => {
    var collection = await database.collection(collectionName)
    return await collection.insertOne(data)
}

exports.delete = async (collectionName, filter) => {
    var collection = await database.collection(collectionName)
    return await collection.deleteOne(filter)
}

exports.readAll = async (collectionName) => {
    var collection = await database.collection(collectionName)
    return await collection.find().toArray()
}

async function setCollections() {
    database = await client.db("polylink")
}