import * as taskQuery from "./task.query.js"
import * as taskMutation from "./task.mutation.js"

export const taskResolver = {
    ...taskQuery,
    ...taskMutation
}