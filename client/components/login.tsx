import { useEffect } from "react";
import { getAuth } from "firebase/auth";
// import { generatePasswordResetLink, sendCustomPasswordResetEmail, getAuth } from "firebase-admin";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { app } from "../firebase.js";

export default function Login() {

  // const forgotPassword = () => {
  //   const userEmail = 'user@example.com';
  // getAuth()
  // .generatePasswordResetLink(userEmail)
  // .then((link: any) => {
  //   // Construct password reset email template, embed the link and send
  //   // using custom SMTP server.
  //   return sendCustomPasswordResetEmail(userEmail, link);
  // })
  // .catch((error: any) => {
  //   // Some error occurred.
  // });
  // }

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(getAuth(app));

    ui.start("#firebaseui-auth-container", {
      signInSuccessUrl: "/",
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          customParameters: {
            prompt: "select_account",
          },
        },
        {
          provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
        },
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    });
  }, []);

  return <div className="mt-40"><div id="firebaseui-auth-container"></div>
  <p className="mt-10">Please select <span className="italic">sign in with email</span> if <br></br>you have forgot your credentials.</p>
  </div>;
}
