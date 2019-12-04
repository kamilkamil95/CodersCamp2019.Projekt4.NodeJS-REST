import {ExpressServer} from "./sharedkernel/infrastructure/ExpressServer";
import {isDefined} from "./utils";

const port = isDefined(process.env.PORT) ? parseInt(process.env.PORT) : undefined;
ExpressServer.start(port);
