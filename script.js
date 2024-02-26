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

///Promise.race

//The Promise.race() static method takes an iterable of promises as input and returns a single Promise.
// This returned promise settles with the eventual state of the first promise that settles.

const myPromiseRace = promiseArray => {
  return new Promise((resolve, reject) => {
    promiseArray.forEach(promise => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};

const test1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const test2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

myPromiseRace([test1, test2])
  .then(value => {
    console.log(value);
  })
  .catch(err => {
    console.error(err);
  });
