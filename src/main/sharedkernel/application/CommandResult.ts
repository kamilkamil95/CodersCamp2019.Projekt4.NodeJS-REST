import {isNotDefined} from "../../utils";
import Success = CommandResult.Success;
import Failure = CommandResult.Failure;

export interface CommandResult {
    isSuccess(): boolean

    process(onSuccess: (success: Success) => void, onFailure: (failure: Failure) => void): void
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

        process(onSuccess: (success: CommandResult.Success) => void, onFailure: (failure: CommandResult.Failure) => void): void {
            if (isFailure(this)) {
                onFailure(this)
            } else {
                onSuccess(this)
            }
        }

    }

    export class Failure implements CommandResult {
        constructor(public readonly reason: string = "Unknown reason.") {
        }

        isSuccess(): boolean {
            return false;
        }

        process(onSuccess: (success: CommandResult.Success) => void, onFailure: (failure: CommandResult.Failure) => void): void {
            if (isFailure(this)) {
                onFailure(this)
            } else {
                onSuccess(this)
            }
        }
    }

    export const success = () => Success.instance;

    export const failureDueTo = (reason: any = 'unknown') => new Failure(reason);

    export function isSuccess(x: CommandResult): x is Success {
        return x.isSuccess();
    }

    export function isFailure(x: CommandResult): x is Failure {
        return !x.isSuccess();
    }

}
