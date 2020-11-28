import { from, merge, of } from "rxjs";
import {
  catchError,
  concatMap,
  delay,
  mergeMap,
  switchMap
} from "rxjs/operators";
import { $D } from "rxjs-debug";
const promise = index =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (index & 1) reject(index);
      else resolve(Date.now());
    }, 1000);
  });
const observable = from(
  new Array(10).fill(promise(2)).map((_, index) => promise(index))
);
//
// Resolve Promises Parallel
// observable
//   .pipe(
//     mergeMap(x =>
//       from(x).pipe(
//         delay(1000),
//         catchError(x => of(`Caught Error ${Date.now()} merge`))
//       )
//     )
//   )
//   .subscribe(x => {
//     console.log(x);
//   });

// Resolve Promises Sequentially
// observable
//   .pipe(
//     concatMap(x =>
//       from(x).pipe(
//         delay(1000),
//         catchError(x => of(`Caught Error ${Date.now()} concat`))
//       )
//     )
//   )
//   .subscribe(x => {
//     console.log(x);
//   });

// Resolves only the latest Promises
// observable
//   .pipe(
//     switchMap(x =>
//       from(x).pipe(
//         delay(1000),
//         catchError(x => of(`Caught Error ${Date.now()} concat`))
//       )
//     )
//   )
//   .subscribe(x => {
//     console.log(x);
//   });
