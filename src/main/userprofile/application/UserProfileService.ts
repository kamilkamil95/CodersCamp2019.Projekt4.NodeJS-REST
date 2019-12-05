import {CommandResult} from "../../sharedkernel/application/CommandResult";
import {UserProfileRepository} from "../domain/UserProfileRepository";
import {isDefined, isNotDefined} from "../../utils";
import {UserProfile} from "../domain/UserProfile";
import {RegisterUserProfile} from "./RegisterUserProfile";
import {UpdateUserProfile} from "./UpdateUserProfile";

export class UserProfileService {

    constructor(private userProfileRepository: UserProfileRepository) {
    }

    registerUserProfile(command: RegisterUserProfile): Promise<CommandResult> {
        return this.userProfileRepository.save({...command})
            .then(() => CommandResult.success())
            .catch((e) => CommandResult.failureDueTo(isDefined(e.message) ? e.message : e));
    }

    async updateUserProfile(command: UpdateUserProfile): Promise<CommandResult> {
        const foundUser = await this.userProfileRepository.findById(command._id);
        if (foundUser) {
            foundUser.email = command.email;
            foundUser.firstName = command.firstName;
            foundUser.lastName = command.lastName;
            return this.userProfileRepository.update(foundUser)
                .then(() => CommandResult.success())
                .catch((e) => CommandResult.failureDueTo(isDefined(e.message) ? e.message : e));
        } else {
            return Promise.reject(CommandResult.failureDueTo(`User with id: ${command._id} not found!`));
        }
    }

    findUserProfileByUsername(username: string): Promise<UserProfile | null> {
        return this.userProfileRepository.findByUsername(username);
    }

    findUserProfileById(id: string): Promise<UserProfile | null> {
        return this.userProfileRepository.findById(id);
    }

}
