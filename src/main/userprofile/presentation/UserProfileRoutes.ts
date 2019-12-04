import * as express from 'express';
import RestApiException from "../../sharedkernel/presentation/rest/RestApiException";
import {NextFunction} from "express";
import RegisterUserRequestBody from "./RegisterUserRequestBody";
import uuid from "uuid";
import validationMiddleware from "../../sharedkernel/presentation/rest/ValidationMiddleware";
import {ErrorCode} from "../../sharedkernel/domain/ErrorCode";
import {UserProfileService} from "../application/UserProfileService";

export default (userProfileService: UserProfileService) => {
    const router: express.Router = express.Router();

    router.get('/', async (req, res, next) => {
        const username = req.query.username;
        return userProfileService.findUserProfileByUsername(username)
            .then(foundUser => res.send(foundUser))
            .catch(e => next(new RestApiException(404, `User profile for username: ${username} not found!`, ErrorCode.USER_PROFILE_NOT_FOUND)));
    });

    router.get('/:id', async (req, res, next) => {
        const id = req.params.id;
        return userProfileService.findUserProfileById(id)
            .then(foundUser => res.send(foundUser))
            .catch(e => next(new RestApiException(404, `User profile for id: ${id} not found!`, ErrorCode.USER_PROFILE_NOT_FOUND)));
    });

    router.post('/', validationMiddleware(RegisterUserRequestBody), async (req, res, next) => {
        const requestBody: RegisterUserRequestBody = req.body;
        const newUserId = uuid.v4();
        const result = await userProfileService.execute(
            {
                id: newUserId,
                username: requestBody.username,
                email: requestBody.email
            }
        );
        result.process(
            () => res.status(201).send({id: newUserId}),
            failure => next(new RestApiException(400, failure.reason, ErrorCode.USER_ALREADY_EXISTS))
        );
    });

    /*
    TODO: Delete after, only for demonstration!
     */
    router.get('/error', async (req, res, next: NextFunction) => {
        next(new RestApiException(404, "User profile not found", ErrorCode.USER_PROFILE_NOT_FOUND));
    });

    return router;
};

export const ROUTE_URL = '/user-profiles';
