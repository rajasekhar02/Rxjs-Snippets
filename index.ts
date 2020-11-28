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
      if (index & 1) resolve(index);
      else reject(index);
    }, 1000);
  });
const observable = from(
  new Array(10).fill(promise(2)).map((_, index) => promise(index))
);

const debugSource = $D(observable, {
  id: "Special" // an optional id to easily identify the Observable in the console

  // addDelay: 500, // add delay before every operator to slow down things
  // hideOutputs: true, // hide all the ouputs for less noise in the console
  // noStyling: true // disables styling, helpful when debugging unit tests
});

// apply operators on it (optional)
const debugSourcePiped = debugSource.pipe(concatMap(x => of(x)));

// activate the stream
debugSourcePiped.subscribe();
