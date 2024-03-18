"use client";

import { title } from "@/components/primitives";

import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { zustand, useUserStore, user, tagsAvailable } from "../../state/zustand";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { TracingBeam } from "../../components/ui/sticky-scroll-reveal";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function WelcomePage() {

	const { setIsLoggedIn } = zustand();
	const { setUserIDZustand, setUserNameZustand, setProfileImageURLZustand, setIsAdmin } = useUserStore();
	const auth = getAuth();
	const [user] = useAuthState(auth);
	const apiURL = "http://localhost:5001/api";
	const { tags, setTags } = tagsAvailable();

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
		  title: "Kanskje fylle inn hvordan vi har oppfylt brukerhistoriene i de greiene her?",
		  description: (
			<>
			  <p>
				Sit duis est minim proident non nisi velit non consectetur. Esse
				adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
				Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat incididunt
				incididunt enim magna id est qui sunt fugiat. Laboris do duis pariatur
				fugiat Lorem aute sit ullamco. Qui deserunt non reprehenderit dolore
				nisi velit exercitation Lorem qui do enim culpa. Aliqua eiusmod in
				occaecat reprehenderit laborum nostrud fugiat voluptate do Lorem culpa
				officia sint labore. Tempor consectetur excepteur ut fugiat veniam
				commodo et labore dolore commodo pariatur.
			  </p>
			  <p>
				Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
				veniam in commodo id reprehenderit adipisicing. Proident duis
				exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
			  </p>
			  <p>
				Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
				reprehenderit deserunt amet laborum consequat adipisicing officia qui
				irure id sint adipisicing. Adipisicing fugiat aliqua nulla nostrud.
				Amet culpa officia aliquip deserunt veniam deserunt officia
				adipisicing aliquip proident officia sunt.
			  </p>
			</>
		  ),
		  badge: "Filtrering og sortering",
		  image:
			"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
		  title: "Lorem Ipsum Dolor Sit Amet",
		  description: (
			<>
			  <p>
				Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
				deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
				non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
				sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
				velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
				commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
			  </p>
			  <p>
				In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
				veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
				reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
				cillum ut mollit.
			  </p>
			</>
		  ),
		  badge: "Adminprofil",
		  image:
			"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
		  title: "Lorem Ipsum Dolor Sit Amet",
		  description: (
			<>
			  <p>
				Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
				deserunt cupidatat aute. Enim cillum dolor et nulla sunt exercitation
				non voluptate qui aliquip esse tempor. Ullamco ut sunt consectetur
				sint qui qui do do qui do. Labore laborum culpa magna reprehenderit ea
				velit id esse adipisicing deserunt amet dolore. Ipsum occaecat veniam
				commodo proident aliqua id ad deserunt dolor aliquip duis veniam sunt.
			  </p>
			</>
		  ),
		  badge: "Launch Week",
		  image:
			"https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
				setIsAdmin(data.admin);
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
	  }, [user]);
	  

	return (
		<TracingBeam className="px-6">
		<div className="max-w-2xl mx-auto antialiased pt-4 relative">
		  {dummyContent.map((item, index) => (
			<div key={`content-${index}`} className="mb-10">
			  <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
				{item.badge}
			  </h2>
   
			  <p className={`${"font-calsans"} text-xl mb-4`}>
				{item.title}
			  </p>
				
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
