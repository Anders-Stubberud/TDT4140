"use client";

import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '../firebase.js';
import { Button } from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons";

export const Login = () => {

    const [user] = useAuthState(auth);

	const loginGoogle = async () => {
		provider.setCustomParameters({ prompt: 'select_account' });
		signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential ? credential.accessToken : null;
			const user = result.user; // user.uid gives local id
		}).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.customData.email;
			const credential = GoogleAuthProvider.credentialFromError(error);
		});
	}

	const email = () => {
		createUserWithEmailAndPassword(auth, "test@gmail.com", "test")
		.then((userCredential) => {
			const user = userCredential.user;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
	}

	const googleStyle = {
		backgroundColor: "#ffffff",
		color: "#000000",
		borderRadius: '15px'
	}

	const activeGoogleStyle = {
		backgroundColor: "#cccccc"
	}

	const githubStyle = {
		backgroundColor: "#ffffff",
		color: "#000000",
		borderRadius: '15px'
	};

	const activeGithubStyle = {
		backgroundColor: "#cccccc"
	};

    return (
		<div className="flex justify-center">
			<Card className="m-10 w-3/4">
				<CardBody>
					<div className="m-4">
						<Input type="email" label="Email"/>
					</div>
					<div className="mt-1 mr-4 ml-4 mb-4">
						<Input type="password" label="password"/>
					</div>
					<div className="flex justify-center mb-10">
						<Button  className="w-32" onClick={email}>
							Login
						</Button>
					</div>
					<div className="m-4 mb-2">
						<GoogleLoginButton
							onClick={loginGoogle} style={googleStyle} activeStyle={activeGoogleStyle}
						></GoogleLoginButton>
					</div>
					<div className="m-4 mt-2">
						<GithubLoginButton 
							iconColor="#000000" style={githubStyle} activeStyle={activeGithubStyle}>
						</GithubLoginButton>
					</div>
				</CardBody>
			</Card>
		</div>
    );

}
