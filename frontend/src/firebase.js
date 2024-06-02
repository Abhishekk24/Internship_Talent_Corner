import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3HSLIpnHK64RpNm2tTOEPhmoO52WPeow",
  authDomain: "talentcorner-52465.firebaseapp.com",
  projectId: "talentcorner-52465",
  storageBucket: "talentcorner-52465.appspot.com",
  messagingSenderId: "171253343100",
  appId: "1:171253343100:web:440a205c1ef8dae2347af9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };
