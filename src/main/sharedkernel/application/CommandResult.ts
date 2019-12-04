import {isNotDefined} from "../../utils";

export interface CommandResult {
    isSuccess(): boolean
}

export namespace CommandResult {

    export class Success implements CommandResult {
        private static _instance?: Success;

        static get instance(): Success {
            if (isNotDefined(Success._instance)) {
                Success._instance = new Success();
            }
            return Success._instance;
        }

        isSuccess(): boolean {
            return true;
        }
    }

    export class Failure implements CommandResult {
        constructor(public readonly reason: String = "Unknown reason.") {
        }

        isSuccess(): boolean {
            return false;
        }
    }

    export const success = () => Success.instance;

    export const failureDueTo = (reason: String | undefined) => new Failure(reason);

    export function isSuccess(x: CommandResult): x is Success {
        return x.isSuccess();
    }

    export function isFailure(x: CommandResult): x is Failure {
        return !x.isSuccess();
    }

}
