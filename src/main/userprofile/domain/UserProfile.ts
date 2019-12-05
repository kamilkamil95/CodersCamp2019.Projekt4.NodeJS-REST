export class UserProfile {

    constructor(public _id: string,
                public username: string,
                public email: string,
                public firstName?: string,
                public lastName?: string) {
    }

}
