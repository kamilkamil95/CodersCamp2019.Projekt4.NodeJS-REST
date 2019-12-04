import express, {NextFunction, Request, Response} from 'express';
import * as UserProfile from "../../userprofile/presentation/UserProfileRoutes";
import RestApiException from "../presentation/rest/RestApiException";
import {UserProfileService} from "../../userprofile/application/UserProfileService";
import {RepositoriesRegistry} from "./dependencyinjection/RepositoriesRegistry";
import config from "config";


export namespace ExpressServer {

    const repositoriesRegistry = RepositoriesRegistry.init();
    const userProfileService = new UserProfileService(repositoriesRegistry.userProfile);

    const routes: { endpoint: string, router: express.Router }[] = [
        {
            endpoint: UserProfile.ROUTE_URL,
            router: UserProfile.default(userProfileService)
        }
    ];

    export function start(port: number = config.get<number>("express.server.port")) {
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
