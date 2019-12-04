import * as express from 'express';
import RestApiException, {ErrorCode} from "../../sharedkernel/presentation/rest/RestApiException";
import {NextFunction} from "express";
import RegisterUserRequestBody from "./RegisterUserRequestBody";
import {UserProfileRepository} from "../domain/UserProfileRepository";
import uuid from "uuid";
import validationMiddleware from "../../sharedkernel/presentation/rest/ValidationMiddleware";

export default (userProfileRepository: UserProfileRepository) => {
    const router: express.Router = express.Router();

    router.get('/', async (req, res, next) => {
        const username = req.query.username;
        try {
            const foundUser = await userProfileRepository.findByUsername(username);
            res.send({
                id: foundUser.id,
                username: foundUser.username,
                email: foundUser.email
            });
        } catch (e) {
            next(new RestApiException(404, `User profile for username: ${username} not found!`, ErrorCode.USER_PROFILE_NOT_FOUND))
        }
    });

    router.post('/', validationMiddleware(RegisterUserRequestBody), async (req, res, next) => {
        const requestBody: RegisterUserRequestBody = req.body;
        try {
            const createdUser = await userProfileRepository.save({
                id: uuid.v4(),
                username: requestBody.username,
                email: requestBody.email
            });
            res.status(201)
                .send({
                    id: createdUser.id
                });
        } catch (e) {
            next(new RestApiException(400, "User already exists", ErrorCode.USER_ALREADY_EXISTS))
        }
    });

    router.get('/error', async (req, res, next: NextFunction) => {
        next(new RestApiException(404, "User profile not found", ErrorCode.USER_PROFILE_NOT_FOUND));
    });

    return router;
};

export const ROUTE_URL = '/user-profiles';
