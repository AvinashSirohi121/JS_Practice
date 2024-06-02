/*
 Problem Statement:
 Implement a function in JavaScript that takes a list of async functions 
 as input and a callback function and executes the async tasks in parallel 
 that is all at once and invokes the callback after every task is executed.
 */

// Solution

// This function helps us to create Async Task that will mimic the Network calls that take random time
function createAsync() {
  let value = Math.floor(Math.random() * 10);
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (value < 5) rej(`Promise rejected ${value}`);
      else res(`Promise resolved ${value}`);
    }, value * 1000);
  });
}

// Here we store the all Async task in an List
let list = [
  createAsync(),
  createAsync(),
  createAsync(),
  createAsync(),
  createAsync(),
  createAsync(),
];

// This is a function that executes all Async tasks in parallel
//and when all tasks are executed then we call the callback function
function executeAsyncParallel(list, callback) {
  let success = [];
  let failure = [];
  let allexecuted = 0;

  list.forEach((l) => {
    l.then((res) => {
      success.push(res);
    })
      .catch((err) => {
        failure.push(err);
      })
      .finally(() => {
        allexecuted++;
        if (allexecuted >= list.length) {
          callback(success, failure);
        }
      });
  });
}

// Execution the function
executeAsyncParallel(list, (success, failure) => {
  console.log("Success =>", success);
  console.log("Failure =>", failure);
});
