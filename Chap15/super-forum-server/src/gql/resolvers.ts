import { IResolvers } from "apollo-server-express";
import { QueryArrayResult, QueryOneResult } from "../repo/QueryArrayResult";
import { Thread } from "../repo/Thread";
import { ThreadItem } from "../repo/ThreadItem";
import { getThreadItemsByThreadId } from "../repo/ThreadItemRepo";
import { createThread, getThreadById, getThreadsByCategoryId } from "../repo/ThreadRepo";
import { GqlContext } from "./GqlContext";

const STANDARD_ERROR = "An error has occurred";
interface EntityResult {
    messages: Array<string>;
}
const resolvers: IResolvers = {
    UserResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "User";
        },
    },

    ThreadResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "Thread";
        },
    },

    ThreadItemResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "ThreadItem";
        },
    },

    ThreadArrayResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "ThreadArray";
        },
    },

    ThreadItemArrayResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "ThreadItemArray";
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
        getThreadsByCategoryId: async (
            obj: any,
            args: { categoryId: string },
            ctx: GqlContext,
            info: any
        ): Promise<{ threads: Array<Thread> } | EntityResult> => {
            let threads: QueryArrayResult<Thread>;
            try {
                threads = await getThreadsByCategoryId(args.categoryId);
                if (threads.entities) {
                    return {
                        threads: threads.entities,
                    };
                }
                return {
                    messages: threads.messages ? threads.messages : [STANDARD_ERROR],
                };
            } catch (ex) {
                throw ex;
            }
        },
        getThreadItemByThreadId: async (
            obj: any,
            args: { threadId: string },
            ctx: GqlContext,
            info: any
        ): Promise<{ threadItems: Array<ThreadItem> } | EntityResult> => {
            let threadItems: QueryArrayResult<ThreadItem>;
            try {
                threadItems = await getThreadItemsByThreadId(args.threadId);
                if (threadItems.entities) {
                    return {
                        threadItems: threadItems.entities,
                    };
                }
                return {
                    messages: threadItems.messages
                        ? threadItems.messages
                        : [STANDARD_ERROR],
                };
            } catch (ex) {
                throw ex;
            }
        },
    },
    Mutation: {
        createThread: async (
            obj: any,
            args: { userId: string; categoryId: string; title: string; body: string },
            ctx: GqlContext,
            info: any
        ): Promise<EntityResult> => {
            let result: QueryOneResult<Thread>;
            try {
                result = await createThread(
                    args.userId,
                    args.categoryId,
                    args.title,
                    args.body
                );
                return {
                    messages: result.messages ? result.messages : ["An error has occurred"],
                };
            } catch (ex) {
                throw ex;
            }
        },
    },
};
export default resolvers;