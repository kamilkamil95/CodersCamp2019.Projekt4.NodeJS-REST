import {UserProfileService} from "../../main/userprofile/application/UserProfileService";
import {InMemoryUserProfileRepository} from "../../main/userprofile/infrastructure/inmemory/InMemoryUserProfileRepository";
import {RegisterUser} from "../../main/userprofile/application/RegisterUser";
import {DomainObjectIdGenerator} from "../../main/sharedkernel/domain/DomainObjectIdGenerator";
import {UuidGenerator} from "../../main/sharedkernel/infrastructure/UuidGenerator";
import {CommandResult} from "../../main/sharedkernel/application/CommandResult";

describe('Feature: User Profile', () => {

    const idGenerator: DomainObjectIdGenerator = new UuidGenerator();
    const userProfileService = new UserProfileService(new InMemoryUserProfileRepository());

    describe('Given user to create', () => {

        const given = {
            username: "ExampleUsername",
            email: "ExampleEmail"
        };


        describe('When try to register user', () => {
            const command: RegisterUser = {
                _id: idGenerator.generate(),
                username: given.username,
                email: given.email
            };

            it('Then new user profile should be created', () => {
                return expect(userProfileService.registerUserProfile(command)).resolves.toBe(CommandResult.success())
            });

        });

        describe("And user with was created",  () => {

            const command: RegisterUser = {
                _id: idGenerator.generate(),
                username: given.username,
                email: given.email
            };


            describe("When try to find user by username", () => {

                it("Then created user should be found", async () => {
                    await userProfileService.registerUserProfile(command);
                    return expect(userProfileService.findUserProfileByUsername(given.username)).resolves.toStrictEqual({
                        _id: command._id,
                        username: command.username,
                        email: command.email
                    })
                })

            });

            describe("When try to find user by another username", () => {

                it("Then user should not be found", () => {
                    //TODO: Parsing mongo exception!
                    //expect(userProfileService.findUserProfileByUsername(given.username)).rejects.
                })

            })

        });


    })

});
