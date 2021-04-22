import { IResolvers } from "apollo-server-express";
import { QueryOneResult } from "../repo/QueryArrayResult";
import { Thread } from "../repo/Thread";
import { getThreadById } from "../repo/ThreadRepo";
import { GqlContext } from "./GqlContext";

const STANDARD_ERROR = "An error has occurred";
interface EntityResult {
    messages: Array<string>;
}
const resolvers: IResolvers = {
    ThreadResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "Thread";
        },
    },
    Query: {
        getThreadById: async (
            obj: any,
            args: { id: string },
            ctx: GqlContext,
            info: any
        ): Promise<Thread | EntityResult> => {
            let thread: QueryOneResult<Thread>;
            try {
                thread = await getThreadById(args.id);
                if (thread.entity) {
                    return thread.entity;
                }
                return {
                    messages: thread.messages ? new Array(thread.messages[0]) : new Array(STANDARD_ERROR),
                };
            } catch (ex) {
                throw ex;
            }
        },
    },
};
export default resolvers;