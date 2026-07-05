import { buildSchema } from "graphql";
import { taskSchema } from "./task/task.schema.js";
import { taskResolver } from "./task/task.resolver.js";

export const schema = buildSchema(`
    ${taskSchema}
`);

export const rootValue = {
    ...taskResolver
}