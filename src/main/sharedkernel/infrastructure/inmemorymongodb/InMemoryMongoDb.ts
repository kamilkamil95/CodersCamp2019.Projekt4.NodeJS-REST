import * as mongodbMemoryServer from 'mongodb-memory-server';
import config from "config";

export const newDatabase = () => {
    const server = new mongodbMemoryServer.MongoMemoryServer({
        instance: {
            port: config.get<number>("database.embedded_mongo.port"),
            dbName: config.get<string>("database.embedded_mongo.dbName"),
            debug: config.get<boolean>("database.embedded_mongo.debug")
        },
        debug: config.get<boolean>("database.embedded_mongo.debug")
    });
    return server.getConnectionString();
};
