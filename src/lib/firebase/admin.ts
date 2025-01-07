import {
  initializeApp,
  cert,
  AppOptions,
  getApps,
  getApp,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const serviceAccount = require("../../../firebaseAdmin.json");

const options: AppOptions = {
  credential: cert(serviceAccount),
};

const firebaseAdmin =
  getApps().length === 0 ? initializeApp(options) : getApp();

const auth = getAuth(firebaseAdmin);

export default auth;
