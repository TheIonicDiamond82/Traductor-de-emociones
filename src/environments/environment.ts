// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initialize } from "@ionic/core";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


export const environment = {
  firebaseConfig: {
  apiKey: "AIzaSyBhBYlWWVo6IbtpBp1P90lMnVKnlyo8wqU",
  authDomain: "emokids-translator.firebaseapp.com",
  projectId: "emokids-translator",
  storageBucket: "emokids-translator.firebasestorage.app",
  messagingSenderId: "686513720254",
  appId: "1:686513720254:web:0c5f2385cacf17d28d87ef",
  measurementId: "G-NEEWFT4SZY"
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
