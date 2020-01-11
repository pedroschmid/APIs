const {MongoClient} = require('mongodb');

async function main(){
    const uri = 'mongodb+srv://root:root@cluster0-zp9uk.mongodb.net/test?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        createListening(
            client,
            {
                name: "Elvis",
                age: 28,
                gender: "Shemale"
            }
        );
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};

main().catch(console.err);

async function createListening(client, newListing) {
    const result = await client.db('Users').collection('Data').insertOne(newListing);
    console.log(`New listing created with the followind id: ${result.insertedId}`);
}

async function listDatabases(client)  {
    const databasesList = await client.db().admin().listDatabases();

    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};