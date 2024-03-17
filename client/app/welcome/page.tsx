"use client";

import { title } from "@/components/primitives";

import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { zustand, useUserStore, user } from "../../state/zustand";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default function WelcomePage() {

	const { setIsLoggedIn } = zustand();
	const { setUserIDZustand, setUserNameZustand, setProfileImageURLZustand } = useUserStore();
	const auth = getAuth();
	const [user] = useAuthState(auth);
	const apiURL = "http://localhost:5001/api";

	const url = 'https://random-words5.p.rapidapi.com/getRandom';
	const options = {
	  method: 'GET',
	  headers: {
		'X-RapidAPI-Key': 'e108f3dd64msh5a63db5dec48255p11fa5djsn82fb3d0f92ec',
		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
	  }
	};
  
	useEffect(() => {
		const fetchData = async () => {
			console.log('inne')
		  if (user) {
			console.log('a');
			try {
			  const response = await fetch(apiURL + `/userExists/${user.uid}`);
			  console.log('b');
			  if (response.ok) {
				const { userExists } = await response.json();
				console.log(userExists);
				if (!userExists) {
				  const randomUsername = await fetch(url, options);
				  const resultRandomUsername = await randomUsername.text();
				  const randomUsername2 = await fetch(url, options);
				  const resultRandomUsername2 = await randomUsername2.text();
				  console.log(resultRandomUsername);
				  const setupResponse = await fetch(apiURL + "/setupUser", {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify({
					  userID: user.uid,
					  userName: `${resultRandomUsername}-${resultRandomUsername2}`,
					  favourites: [],
					  profilePictureURL: null,
					  admin: false
					}),
				  	});
				  if (setupResponse.ok) {
					console.log('new user set up')
				  } else {
					console.error("Failed to setup user:", setupResponse.statusText);
				  }
				} else {
				  console.log("User aluset set upready exists");
				}

				//using zustand and localstorage to manage global user state
				localStorage.setItem('userID', user.uid);
				const res = await fetch(apiURL + `/getUserInformation/${user?.uid}`);
				const data = await res.json();
				setProfileImageURLZustand(data.profilePictureURL);
				setUserNameZustand(data.userName);
				setIsLoggedIn(true);

			  } else {
				console.error("Failed to check if user exists:", response.statusText);
			  }
			} catch (error) {
			  console.error("Error:", error);
			}
		  }
		};
		fetchData();
	  }, [user]);
	  

	return (
		<div>
			<h1 className={title()}>Welcome!</h1>
			<br></br>
			<button>
				knapp
			</button>
		</div>
	);
}
