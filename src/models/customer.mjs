import { MongoClient, ServerApiVersion} from 'mongodb';

export class customer {
    uri = "mongodb://localhost:27017";
    
    client = new MongoClient(this.uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    constructor(id) {
        this.id = id;
    }

    async find(id) {
        try {
            let cust = await this.client.db("customer-info").collection("customers").findOne({ id: id});
            console.log(id);
            return cust;
        }
        finally {
            await this.client.close();
        }

    }
}

