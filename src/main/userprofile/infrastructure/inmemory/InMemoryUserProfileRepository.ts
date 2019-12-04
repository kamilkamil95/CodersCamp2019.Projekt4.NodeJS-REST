import {UserProfileRepository} from "../../domain/UserProfileRepository";
import {UserProfile} from "../../domain/UserProfile";
import {isDefined} from "../../../utils";

export class InMemoryUserProfileRepository implements UserProfileRepository {

    private repository: UserProfile[] = [];

    findByUsername(username: string): Promise<UserProfile> {
        const found = this.repository.find(it => it.username === username);
        return isDefined(found)
            ? Promise.resolve(found)
            : Promise.reject(new Error("Not found!"));
    }

    save(userProfile: UserProfile): Promise<UserProfile> {
        const alreadyExists = this.repository.find(it => it.id === userProfile.id || it.username === userProfile.username || it.email === userProfile.email)
        if (alreadyExists) {
            return Promise.reject(new Error("Already saved!"));
        } else {
            this.repository.push(userProfile);
            return Promise.resolve(userProfile);
        }
    }

}




