import {RegisterUserCommand} from "./RegisterUserCommand";
import {CommandResult} from "../../sharedkernel/application/CommandResult";
import {UserProfileRepository} from "../domain/UserProfileRepository";
import {isDefined} from "../../utils";
import {UserProfile} from "../domain/UserProfile";

export class UserProfileService {

    constructor(private userProfileRepository: UserProfileRepository) {
    }

    execute(command: RegisterUserCommand): Promise<CommandResult> {
        return this.userProfileRepository.save({...command})
            .then(() => CommandResult.success())
            .catch((e) => CommandResult.failureDueTo(isDefined(e.message) ? e.message : e));
    }

    findUserProfileByUsername(username: string): Promise<UserProfile> {
        return this.userProfileRepository.findByUsername(username);
    }

    findUserProfileById(id: string): Promise<UserProfile> {
        return this.userProfileRepository.findById(id);
    }

}
