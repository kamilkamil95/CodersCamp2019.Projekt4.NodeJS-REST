import * as mongodbMemoryServer from 'mongodb-memory-server';

export const newDatabase = () => {
    const server = new mongodbMemoryServer.MongoMemoryServer();
    return server.getConnectionString();
};
