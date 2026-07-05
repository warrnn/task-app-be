export const taskSchema = `
    type Task {
        id: ID!
        title: String!
        description: String
        isDone: Boolean!
        startedAt: String
        endAt: String
        userId: ID!
        createdAt: String
        updatedAt: String
    }

    type TaskResponse {
        message: String!
        task: Task
    }

    type TasksResponse {
        message: String!
        task: [Task]
    }

    type Query {
        getTasks: TasksResponse!
    }

    type Mutation {
        createTask(
            title: String!
            description: String
            startedAt: String
            endAt: String
        ): TaskResponse!

        updateTask(
            id: ID!
            title: String!
            description: String
            startedAt: String
            endAt: String
        ): TaskResponse!

        deleteTask(
            id: ID!
        ): TaskResponse!

        toggleTaskCompletion(
            id: ID!
        ): TaskResponse!
    }
`;