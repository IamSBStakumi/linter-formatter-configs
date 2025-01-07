import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import firebaseAuth from "../firebase/client";
import auth from "../firebase/admin";

const authorizeUser = async (
  credentials: Partial<Record<"email" | "password", unknown>>,
) => {
  const parsedCredentials = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .safeParse(credentials);

  if (parsedCredentials.success) {
    const { email, password } = parsedCredentials.data;
    // console.log("ログ", firebaseAuth, email, password);
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password,
    );

    const idToken = await userCredential.user.getIdToken();

    console.log("auth: ", auth.app.name);
    const decoded = await auth.verifyIdToken(idToken);
    console.log(userCredential.user.email);

    return {
      uid: decoded.uid,
      email: decoded.email,
      accessToken: idToken,
    };
  }

  return null;
};

export default authorizeUser;
