// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebaseCollections: {
    user: 'user-collection',
  },
  firebaseConfig: {
    apiKey: 'AIzaSyBye4lws_IgmPZfS5F5IpNe_uDp3z19WnY',
    authDomain: 'angularformworking.firebaseapp.com',
    databaseURL: 'https://angularformworking-default-rtdb.firebaseio.com',
    projectId: 'angularformworking',
    storageBucket: 'angularformworking.appspot.com',
    messagingSenderId: '364056266455',
    appId: '1:364056266455:web:2a947d561d032b3e9d9292',
    measurementId: 'G-QTVMCJRHV9',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
