import express, {NextFunction, Request, Response} from 'express';
import * as UserProfile from "../../userprofile/presentation/UserProfileRoutes";
import RestApiException from "../presentation/rest/RestApiException";
import {InMemoryUserProfileRepository} from "../../userprofile/infrastructure/inmemory/InMemoryUserProfileRepository";
import {UserProfileService} from "../../userprofile/application/UserProfileService";
import {MongoUserProfileRepository} from "../../userprofile/infrastructure/mongodb/MongoUserProfileRepository";
import {newDatabase} from "./inmemorymongodb/InMemoryMongoDb";
import mongoose from "mongoose";

export enum DatabaseMode {
    IN_MEMORY_LISTS,
    IN_MEMORY_MONGODB,
    EXTERNAL_MONGODB
}

export namespace ExpressServer {

    const DEFAULT_PORT_NUMBER: number = 3000;

    const databaseMode = DatabaseMode.IN_MEMORY_MONGODB;

    const inMemoryRepositories = false;//databaseMode === DatabaseMode.IN_MEMORY_LISTS; //TODO: Exclude to configuration: mongodb / in-memory

    if (databaseMode === DatabaseMode.IN_MEMORY_MONGODB) {
        newDatabase()
            .then(connectionString => {
                mongoose.connect(connectionString)
                    .then(() => console.log(`MongoDb Connected on: ${connectionString}`));
            })
    }

    const userProfileService = new UserProfileService(
        inMemoryRepositories ? new InMemoryUserProfileRepository() : new MongoUserProfileRepository()
    );

    const routes: { endpoint: string, router: express.Router }[] = [
        {
            endpoint: UserProfile.ROUTE_URL,
            router: UserProfile.default(userProfileService)
        }
    ];

    export function start(port: number = DEFAULT_PORT_NUMBER) {
        const app = express();
        app.use(express.json());
        routes.forEach(it => app.use(`/api${it.endpoint}`, it.router));
        app.use(errorMiddleware);
        app.listen(port, () => console.log(`Express server listening on port ${port}`));
        return app;
    }

    const DEFAULT_ERROR_MESSAGE = 'Something went wrong';
    const DEFAULT_ERROR_CODE = 500;

    function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
        if (error instanceof RestApiException) {
            const status = error.status || DEFAULT_ERROR_CODE;
            const message = error.message || DEFAULT_ERROR_MESSAGE;
            const code = error.errorCode;
            response
                .status(status)
                .send({
                    code,
                    message,
                })
        } else {
            const message = DEFAULT_ERROR_MESSAGE;
            response
                .status(DEFAULT_ERROR_CODE)
                .send({
                    message,
                })
        }
    }

}
