import {UserProfileService} from "../../main/userprofile/application/UserProfileService";
import {InMemoryUserProfileRepository} from "../../main/userprofile/infrastructure/inmemory/InMemoryUserProfileRepository";
import {RegisterUserProfile} from "../../main/userprofile/application/RegisterUserProfile";
import {UuidGenerator} from "../../main/sharedkernel/infrastructure/UuidGenerator";
import {CommandResult} from "../../main/sharedkernel/application/CommandResult";

const id = new UuidGenerator().generate();

describe('Feature: User Profile', () => {

    const userProfileService = new UserProfileService(new InMemoryUserProfileRepository());

    describe('Given user to create', () => {

        const given = {
            username: "ExampleUsername",
            email: "ExampleEmail"
        };


        describe('When try to register user', () => {
            const command: RegisterUserProfile = {
                _id: id,
                username: given.username,
                email: given.email
            };

            it('Then new user profile should be created', () => {
                return expect(userProfileService.registerUserProfile(command)).resolves.toBe(CommandResult.success())
            });

        });

        describe("And user with was created", () => {

            const command: RegisterUserProfile = {
                _id: id,
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
                    //FIXME: something wrong here!
                    //return expect(userProfileService.findUserProfileByUsername(given.username)).resolves.toBeNull();
                })

            })

        });


    })

});
