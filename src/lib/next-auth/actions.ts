"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "./auth";

async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
      redirect: false,
    });

    return redirect("/layoutList");
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("Error: ", error);
      const { type, cause } = error as AuthError;
      switch (type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        case "CallbackRouteError":
          return cause?.err?.toString();
        default:
          return "Something went wrong";
      }
    }

    throw error;
  }
}

export default authenticate;
