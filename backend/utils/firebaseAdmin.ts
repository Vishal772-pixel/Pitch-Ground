import {initializeApp, applicationDefault} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";

initializeApp({credential:applicationDefault()});


export const firebaseAminAuth=getAuth();