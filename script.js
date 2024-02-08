'use strict';

// Promise.all() polyfill

const promiseAll = function (promises) {
  const result = [];

  let promisesCompleted = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then(val => {
          result[index] = val;
          promisesCompleted += 1;

          if (promisesCompleted === promises.length) {
            resolve(result);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  });
};

function task(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

const taskList = [task(1000), task(5000), task(3000)];
//run promise.all
promiseAll(taskList)
  .then(results => {
    console.log('got results', results);
  })
  .catch(console.error);


