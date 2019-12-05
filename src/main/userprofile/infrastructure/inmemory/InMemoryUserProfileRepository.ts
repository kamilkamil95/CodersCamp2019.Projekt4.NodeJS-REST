import {UserProfileRepository} from "../../domain/UserProfileRepository";
import {UserProfile} from "../../domain/UserProfile";
import {isDefined} from "../../../utils";
import * as _ from 'lodash';

export class InMemoryUserProfileRepository implements UserProfileRepository {

    private repository: UserProfile[] = [];

    findByUsername(username: string): Promise<UserProfile | null> {
        const found = this.repository.find(it => it.username === username);
        return isDefined(found)
            ? Promise.resolve(found)
            : Promise.resolve(null);
    }

    findById(id: string): Promise<UserProfile | null> {
        const found = this.repository.find(it => it._id === id);
        return isDefined(found)
            ? Promise.resolve(found)
            : Promise.resolve(null);
    }

    save(userProfile: UserProfile): Promise<UserProfile> {
        const alreadyExists = this.repository.find(it => it._id === userProfile._id || it.username === userProfile.username || it.email === userProfile.email)
        if (alreadyExists) {
            return Promise.reject(new Error("Already saved!"));
        } else {
            this.repository.push(userProfile);
            return Promise.resolve(userProfile);
        }
    }

    async update(userProfile: UserProfile): Promise<UserProfile> {
        const foundUser = await this.findById(userProfile._id);
        if (isDefined(foundUser)) {
            _.remove(this.repository, p => p._id === userProfile._id);
            return this.save(userProfile);
        } else {
            return Promise.reject(new Error("Not found!"));
        }
    }


}




