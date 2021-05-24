"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const typeorm_1 = require("typeorm");
const UserRepo_1 = require("./repo/UserRepo");
const body_parser_1 = __importDefault(require("body-parser"));
const ThreadRepo_1 = require("./repo/ThreadRepo");
const ThreadItemRepo_1 = require("./repo/ThreadItemRepo");
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = __importDefault(require("./gql/typeDefs"));
const resolvers_1 = __importDefault(require("./gql/resolvers"));
const cors_1 = __importDefault(require("cors"));
const envLoader_1 = require("./common/envLoader");
envLoader_1.loadEnv();
require("dotenv").config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cors_1.default({
        credentials: true,
        origin: process.env.CLIENT_URL,
    }));
    const router = express_1.default.Router();
    yield typeorm_1.createConnection();
    const redis = new ioredis_1.default({
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    });
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redisStore = new RedisStore({
        client: redis,
    });
    app.use(body_parser_1.default.json());
    app.use(express_session_1.default({
        store: redisStore,
        name: process.env.COOKIE_NAME,
        sameSite: "Strict",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
        },
    }));
    app.use(router);
    router.get("/", (req, res, next) => {
        req.session.test = "hello";
        res.send("hello");
    });
    router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("params", req.body);
            const userResult = yield UserRepo_1.register(req.body.email, req.body.userName, req.body.password);
            if (userResult && userResult.user) {
                res.send(`new user created, userId: ${userResult.user.id}`);
            }
            else if (userResult && userResult.messages) {
                res.send(userResult.messages[0]);
            }
            else {
                next();
            }
        }
        catch (ex) {
            res.send(ex.message);
        }
    }));
    router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            console.log("params", req.body);
            const userResult = yield UserRepo_1.login(req.body.userName, req.body.password);
            if (userResult && userResult.user) {
                req.session.userId = (_a = userResult.user) === null || _a === void 0 ? void 0 : _a.id;
                res.send(`user logged in, userId:
        ${req.session.userId}`);
            }
            else if (userResult && userResult.messages) {
                res.send(userResult.messages[0]);
            }
            else {
                next();
            }
        }
        catch (ex) {
            res.send(ex.message);
        }
    }));
    router.post("/logout", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("params", req.body);
            const msg = yield UserRepo_1.logout(req.body.userName);
            if (msg) {
                req.session.userId = null;
                res.send(msg);
            }
            else {
                next();
            }
        }
        catch (ex) {
            console.log(ex);
            res.send(ex.message);
        }
    }));
    router.post("/createthread", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("userId", req.session);
            console.log("body", req.body);
            const msg = yield ThreadRepo_1.createThread(req.session.userId, req.body.categoryId, req.body.title, req.body.body);
            res.send(msg);
        }
        catch (ex) {
            console.log(ex);
            res.send(ex.message);
        }
    }));
    router.post("/threadbycategory", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const threadResult = yield ThreadRepo_1.getThreadsByCategoryId(req.body.categoryId);
            if (threadResult && threadResult.entities) {
                let items = "";
                threadResult.entities.forEach((th) => {
                    items += th.title + ", ";
                });
                res.send(items);
            }
            else if (threadResult && threadResult.messages) {
                res.send(threadResult.messages[0]);
            }
        }
        catch (ex) {
            console.log(ex);
            res.send(ex.message);
        }
    }));
    router.post("/createthreaditem", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const msg = yield ThreadItemRepo_1.createThreadItem(req.session.userId, req.body.threadId, req.body.body);
            res.send(msg);
        }
        catch (ex) {
            console.log(ex);
            res.send(ex.message);
        }
    }));
    router.post("/threadsitemsbythread", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const threadItemResult = yield ThreadItemRepo_1.getThreadItemsByThreadId(req.body.threadId);
            if (threadItemResult && threadItemResult.entities) {
                let items = "";
                threadItemResult.entities.forEach((ti) => {
                    items += ti.body + ", ";
                });
                res.send(items);
            }
            else if (threadItemResult && threadItemResult.messages) {
                res.send(threadItemResult.messages[0]);
            }
        }
        catch (ex) {
            console.log(ex);
            res.send(ex.message);
        }
    }));
    const schema = apollo_server_express_1.makeExecutableSchema({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen({ port: process.env.SERVER_PORT }, () => {
        console.log(`Server ready on port
        ${process.env.SERVER_PORT}`);
    });
});
main();
//# sourceMappingURL=index.js.map