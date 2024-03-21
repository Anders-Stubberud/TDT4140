"use client";

import { title } from "@/components/primitives";

import { getAuth } from "firebase/auth";
import { use, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { zustand, useUserStore, user, tagsAvailable } from "../../state/zustand";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { TracingBeam } from "../../components/ui/sticky-scroll-reveal";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase";
import { Logo } from "@/components/icons";
import { signOut } from "firebase/auth";
import { Spinner } from "@nextui-org/react";

export default function WelcomePage() {

	const { setIsLoggedIn } = zustand();
	const { setUserIDZustand, setUserNameZustand, setProfileImageURLZustand, setIsAdmin, setIsBanned } = useUserStore();
	const auth = getAuth();
	const [user] = useAuthState(auth);
	const apiURL = "http://localhost:5001/api";
	const { tags, setTags } = tagsAvailable();
	const [userIsBanned, setUserIsBanned] =useState();
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(true);

    const app = initializeApp(firebaseConfig);

    const logOut = () => {
        signOut(auth)
        localStorage.removeItem('userID')
    }

	const url = 'https://random-words5.p.rapidapi.com/getRandom';
	const options = {
	  method: 'GET',
	  headers: {
		'X-RapidAPI-Key': 'e108f3dd64msh5a63db5dec48255p11fa5djsn82fb3d0f92ec',
		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
	  }
	};

	const dummyContent = [
		{
		  description: (
			<>
			  <p>
				Tired of playing the same sets over and over again? Create your own!
			  </p>
			</>
		  ),
		  badge: "Create custom flashcards",
		  image:
			"https://firebasestorage.googleapis.com/v0/b/flashy-3a502.appspot.com/o/flex1.png?alt=media&token=377bfb84-a140-4316-942e-6107765ad62a",
		},
		{
		  description: (
			<>
			  <p>
				Troubles finding just the set for you? Dont worry, Flashy got you covered!
			  </p>
			</>
		  ),
		  badge: "Searcing, filters, sorting",
		  image:
			"https://firebasestorage.googleapis.com/v0/b/flashy-3a502.appspot.com/o/flex2.png?alt=media&token=5b9ef7b8-badf-4211-a169-bb796ad8b455",
		},
		{
		  description: (
			<>
			  <p>
				Worried about other users abusing Flashy?
				Not with the newly implemented adminpage!
			  </p>
			</>
		  ),
		  badge: "Administer users",
		  image:
			"https://firebasestorage.googleapis.com/v0/b/flashy-3a502.appspot.com/o/flex3.png?alt=media&token=6922c82b-d729-4d7e-817d-0a15c634afd0",
		},
	  ];
  
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
					  admin: false,
					  isBanned: false
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
				setIsAdmin(data.admin);
				const ban = data.banned;
				console.log(ban);
				setUserIsBanned(ban);
				const taggiesRAW = await fetch(`${apiURL}/getTags`);
				const taggies = await taggiesRAW.json();
				const tagsArr = taggies.tagsArr;
				setTags(tagsArr);
				localStorage.setItem('admin', data.admin);
				localStorage.setItem('profilePictureURL', data.profilePictureURL);
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
		setLoading(false);
	  }, [user]);

	  if (loading) {
		return (
			<div className="flex justify-center align-center items-center">
							<Spinner></Spinner>
			</div>
		);
	  }

	  if (userIsBanned) {
		logOut();
		router.push('banned')
	  }

	  return (
			<TracingBeam className="px-6">
			  <div className="max-w-2xl mx-auto antialiased pt-4 relative">
				{dummyContent.map((item, index) => (
				  <div key={`content-${index}`} className="mb-10">
					<h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
					  {item.badge}
					</h2>
					  
					<div className="text-sm  prose prose-sm dark:prose-invert">
					  {item?.image && (
						<Image
						  loading="eager"
						  src={item.image}
						  alt="blog thumbnail"
						  height="1000"
						  width="1000"
						  className="rounded-lg mb-10 object-cover"
						/>
					  )}
					  {item.description}
					</div>
				  </div>
				))}
			  </div>
			</TracingBeam>
	  );
	  
}
