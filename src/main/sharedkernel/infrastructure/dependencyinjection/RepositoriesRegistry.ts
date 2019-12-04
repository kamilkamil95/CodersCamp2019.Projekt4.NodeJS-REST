import {DatabaseMode} from "../DatabaseMode";
import {newDatabase} from "../inmemorymongodb/InMemoryMongoDb";
import mongoose from "mongoose";
import {InMemoryUserProfileRepository} from "../../../userprofile/infrastructure/inmemory/InMemoryUserProfileRepository";
import {MongoUserProfileRepository} from "../../../userprofile/infrastructure/mongodb/MongoUserProfileRepository";


export class RepositoriesRegistry {
    constructor(private mode: DatabaseMode) {
    }

    static forMode(mode: DatabaseMode) {
        return new RepositoriesRegistry(mode);
    }

    initializeDb() {
        switch (this.mode) {
            case DatabaseMode.EXTERNAL_MONGODB: {

                break;
            }
            case DatabaseMode.IN_MEMORY_LISTS: {
                console.log(`In memory repositories basen on lists initialized`);
                break;
            }
            case DatabaseMode.IN_MEMORY_MONGODB: {
                newDatabase()
                    .then(connectionString => {
                        mongoose.connect(connectionString)
                            .then(() => console.log(`MongoDb Connected on: ${connectionString}`));
                    });
                break;
            }
        }
    }

    get userProfile() {
        return this.mode === DatabaseMode.IN_MEMORY_LISTS
            ? new InMemoryUserProfileRepository()
            : new MongoUserProfileRepository()
    }


}
