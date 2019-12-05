import {UserProfileRepository} from "../../domain/UserProfileRepository";
import {UserProfile} from "../../domain/UserProfile";
import * as mongoose from "mongoose";

/**
 * EXPLANATION
 * TypeScript with Mongoose: https://brianflove.com/2016/10/04/typescript-declaring-mongoose-schema-model/
 */
export class MongoUserProfileRepository implements UserProfileRepository {

    findById(id: string): Promise<UserProfile | null> {
        return MongoUser.findById(id).then()
    }

    async findByUsername(username: string): Promise<UserProfile | null> {
        return MongoUser.findOne({username: username}).then()
    }

    save(userProfile: UserProfile): Promise<UserProfile> {
        const {_id, username, email} = userProfile;
        return new MongoUser({
            _id: _id,
            username,
            email
        }).save()
    }

    update(userProfile: UserProfile): Promise<UserProfile> {
        return MongoUser.findByIdAndUpdate(userProfile._id, {
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            email: userProfile.email
        }).then()
    }

}

type MongoUser = UserProfile & mongoose.Document

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
    },
    firstName: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 64,
        unique: false
    },
    lastName: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 64,
        unique: false
    }
});

const MongoUser = mongoose.model<MongoUser>('UserProfile', userProfileSchema);




