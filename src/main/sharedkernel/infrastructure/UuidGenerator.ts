import {DomainObjectIdGenerator} from "../domain/DomainObjectIdGenerator";
import uuid from "uuid";

export class UuidGenerator implements DomainObjectIdGenerator {

    generate(): string {
        return uuid.v4();
    }

}
