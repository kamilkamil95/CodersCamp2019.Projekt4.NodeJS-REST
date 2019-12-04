import express, {NextFunction, Request, Response} from 'express';
import * as UserProfile from "../../userprofile/presentation/UserProfileRoutes";
import RestApiException from "../presentation/rest/RestApiException";
import {InMemoryUserProfileRepository} from "../../userprofile/infrastructure/inmemory/InMemoryUserProfileRepository";

export namespace ExpressServer {

    const DEFAULT_PORT_NUMBER: number = 3000;

    const routes: { endpoint: string, router: express.Router }[] = [
        {
            endpoint: UserProfile.ROUTE_URL,
            router: UserProfile.default(new InMemoryUserProfileRepository())
        }
    ];

    export function start(port: number = DEFAULT_PORT_NUMBER) {
        const app = express();
        app.use(express.json());
        routes.forEach(it => app.use(`/api${it.endpoint}`, it.router));
        app.use(errorMiddleware);
        app.listen(port, () => console.log(`Express server listening on port ${3000}`));
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
                .send({
                    code,
                    message,
                })
        } else {
            const message = DEFAULT_ERROR_MESSAGE;
            response
                .send({
                    message,
                })
        }
    }

}
