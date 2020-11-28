import { from, of } from "rxjs";
import {
  catchError,
  concatMap,
  delay,
  map,
  mergeMap,
  observeOn,
  switchMap
} from "rxjs/operators";
const promise = index =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (index & 1) resolve(Date.now());
      else reject(Date.now());
    }, 1000);
  });
const observable = from(
  new Array(10).fill(1).map((_, index) => promise(index))
).pipe(
  mergeMap(x =>
    from(x).pipe(
      catchError(x => of("caout")),
      map(x => <number>x * 2)
    )
  ),
  concatMap(x => of(x).pipe(delay(1000)))
);
console.log("just before subscribe");
observable.subscribe({
  next(x) {
    console.log("got value " + JSON.stringify(x));
  },
  error(err) {
    console.error("something wrong occurred: " + err);
  },
  complete() {
    console.log("done");
  }
});
console.log("just after subscribe");
