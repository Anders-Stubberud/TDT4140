"use client"

import { use, useEffect } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { app } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { zustand, useUserStore, user } from "../state/zustand";

export default function Login() {
  const { setIsLoggedIn } = zustand();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(getAuth(app));

    ui.start("#firebaseui-auth-container", {
      signInFlow: "popup",
      signInSuccessUrl: "/welcome",
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

  return (
    <div className="mt-40">
      <div id="firebaseui-auth-container"></div>
      <p className="mt-10">
        Please select <span className="italic">sign in with email</span> if{" "}
        <br></br>you have forgot your credentials.
      </p>
    </div>
  );
}
