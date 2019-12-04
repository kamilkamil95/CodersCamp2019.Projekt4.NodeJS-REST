import {UserProfileRepository} from "../../domain/UserProfileRepository";
import {UserProfile} from "../../domain/UserProfile";
import * as mongoose from "mongoose";

export class MongoUserProfileRepository implements UserProfileRepository {

    findById(id: string): Promise<UserProfile> {
        return MongoUser.findById(id)
            .then(it => (it as unknown) as UserProfile)
    }

    findByUsername(username: string): Promise<UserProfile> {
        return MongoUser.findOne({username: username})
            .then(it => (it as unknown) as UserProfile)
    }

    save(userProfile: UserProfile): Promise<UserProfile> {
        const {id, username, email} = userProfile;
        return new MongoUser({
            _id: id,
            username,
            email
        })
            .save()
            .then(it => (it as unknown) as UserProfile);
    }

}

const userProfileSchema = new mongoose.Schema({
    _id: String,
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 64,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    }
});

const MongoUser = mongoose.model('UserProfile', userProfileSchema);




