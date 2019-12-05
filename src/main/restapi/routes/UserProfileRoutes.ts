import * as express from 'express';
import RestApiException from "../exception/RestApiException";
import {NextFunction} from "express";
import RegisterUserRequestBody from "../request/RegisterUserRequestBody";
import uuid from "uuid";
import validationMiddleware from "../middleware/ValidationMiddleware";
import {ErrorCode} from "../../sharedkernel/domain/ErrorCode";
import {UserProfileService} from "../../userprofile/application/UserProfileService";
import {isDefined, isNotDefined} from "../../utils";
import UpdateUserProfileRequestBody from "../request/UpdateUserProfileRequestBody";

export default (userProfileService: UserProfileService) => {
    const router: express.Router = express.Router();

    router.get('/', async (req, res, next) => {
        const username = req.query.username;
        if (isNotDefined(username)) {
            next(new RestApiException(400, `Query param username have to be defined!`, ErrorCode.BAD_REQUEST))
        }
        const foundUser = await userProfileService.findUserProfileByUsername(username);
        res.send(foundUser)
    });

    router.get('/:id', async (req, res, next) => {
        const id = req.params.id;
        const foundUser = await userProfileService.findUserProfileById(id);
        if (isDefined(foundUser)) {
            res.send(foundUser)
        } else {
            next(new RestApiException(404, `User profile for id: ${id} not found!`, ErrorCode.USER_PROFILE_NOT_FOUND))
        }
    });

    //TODO: Invoke UserCredentialsService and save user data for authorization purposes
    router.post('/', validationMiddleware(RegisterUserRequestBody), async (req, res, next) => {
        const requestBody: RegisterUserRequestBody = req.body;
        const newUserId = uuid.v4();
        const result = await userProfileService.registerUserProfile(
            {
                _id: newUserId,
                username: requestBody.username,
                email: requestBody.email,
                firstName: requestBody.firstName,
                lastName: requestBody.lastName
            }
        );
        result.process(
            () => res.status(201).send({id: newUserId}),
            failure => next(new RestApiException(400, failure.reason, ErrorCode.USER_ALREADY_EXISTS))
        );
    });

    router.put('/:id', validationMiddleware(UpdateUserProfileRequestBody), async (req, res, next) => {
        const requestBody: RegisterUserRequestBody = req.body;
        const id = req.params.id;
        const result = await userProfileService.updateUserProfile(
            {
                _id: id,
                email: requestBody.email,
                firstName: requestBody.firstName,
                lastName: requestBody.lastName
            }
        );
        result.process(
            () => res.status(200).end(),
            failure => next(new RestApiException(404, failure.reason, ErrorCode.USER_PROFILE_NOT_FOUND))
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
