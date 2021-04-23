import { gql } from "apollo-server-express";

const typeDefs = gql`
    scalar Date

    type EntityResult {
        messages: [String!]
    }
    type User {
        id: ID!
        email: String!
        userName: String!
        password: String!
        confirmed: Boolean!
        isDisabled: Boolean!
        threads: [Thread!]
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    union UserResult = User | EntityResult

    type Thread {
        id: ID!
        views: Int!
        isDisabled: Boolean!
        title: String!
        body: String!
        user: User!
        threadItems: [ThreadItem!]
        category: ThreadCategory
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    union ThreadResult = Thread | EntityResult
    type ThreadArray {
        threads: [Thread!]
    }
    union ThreadArrayResult = ThreadArray | EntityResult

    type ThreadItem {
        id: ID!
        views: Int!
        isDisabled: Boolean!
        body: String!
        user: User!
        thread: Thread!
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }
    union ThreadItemResult = ThreadItem | EntityResult
    
    type ThreadItemArray {
      threadItems: [ThreadItem!]
    }
    
    union ThreadItemArrayResult = ThreadItemArray | EntityResult

    type ThreadCategory {
        id: ID!
        name: String!
        description: String
        threads: [Thread!]!
        createdBy: String!
        createdOn: Date!
        lastModifiedBy: String!
        lastModifiedOn: Date!
    }

    type CategoryThread {
        threadId: ID!
        categoryId: ID!
        categoryName: String!
        title: String!
        titleCreatedOn: Date!
    }

    type Query {
        getThreadById(id: ID!): ThreadResult
        getThreadsByCategoryId(categoryId: ID!): ThreadArrayResult!
        getThreadItemByThreadId(ThreadId: ID!): ThreadItemArrayResult!
    }
    
    type Mutation {
        createThread(
            userId: ID!
            categoryId: ID!
            title: String!
            body: String!
        ): EntityResult
    }

    `;

export default typeDefs;