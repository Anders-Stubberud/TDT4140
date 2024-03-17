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
  const apiURL = "http://localhost:5001/api";

  // const url = 'https://random-words5.p.rapidapi.com/getRandom';
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': 'e108f3dd64msh5a63db5dec48255p11fa5djsn82fb3d0f92ec',
  //     'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (user) {
  //       try {
  //         const randomUsername = await fetch(url, options);
  //         const resultRandomUsername = await randomUsername.text();
  //         console.log(resultRandomUsername);
  //         const response = await fetch(apiURL + "/setupUser", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             userID: user.uid,
  //             userName: resultRandomUsername,
  //             favourites: [],
  //           }),
  //         });
  //         console.log('user is set up');
  //         if (response.ok) {
  //           localStorage.setItem('userID', user.uid);
  //           setIsLoggedIn(true);
  //         } else {
  //           console.error("Failed to setup user:", response.statusText);
  //         }
  //       } catch (error) {
  //         console.error("Error:", error);
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [user]);

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
