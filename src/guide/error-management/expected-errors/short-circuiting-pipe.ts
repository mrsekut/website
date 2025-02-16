import { Effect, Console } from "effect"

// Define three effects representing different tasks.
const task1 = Console.log("Executing task1...")
const task2 = Effect.fail(new Error("Something went wrong!"))
const task3 = Console.log("Executing task3...")

// Compose the three tasks using `Effect.flatMap` to run them in sequence.
// The `Effect.flatMap` function allows us to chain effects together.
// If one of the tasks fails, the subsequent tasks won't be executed.
const program = task1.pipe(
  Effect.flatMap(() => task2), // After task1, task2 is executed, but it fails with an error
  Effect.flatMap(() => task3) // This computation won't be executed because the previous one fails
)

// $ExpectType Exit<Error, void>
const result = Effect.runSyncExit(program)

console.log("result: ", result)
/*
Output:
Executing task1...
result: { _tag: 'Failure', cause: { _tag: 'Cause', errors: [ [Object] ] } }
*/
