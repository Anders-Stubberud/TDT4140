"use client";

import { title } from "@/components/primitives";
import { useUserStore } from "@/state/zustand";
import { useEffect, useState } from "react";
import { serverEndpoint } from "@/state/zustand";
import {ScrollShadow} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import ScrollArea from 'react-scrollbar';
import UserIcon from "@/icons/userIcon";
import AdminIcon from "@/icons/adminIcon";
import {Chip} from "@nextui-org/react";

export default function AboutPage() {

	const [users, setUsers] = useState<any []>([]);

	const { isAdmin } = useUserStore();
	if ((! isAdmin) && (! localStorage.getItem('admin'))) {
		return (
			<div>
				<h1>403 Forbidden</h1>
				<p>Sorry, you do not have permission to access this page.</p>
				<img src="https://media.giphy.com/media/yCaHgADVGxjiYLBlTQ/giphy.gif" alt="Forbidden" />
			</div>
		);
	}

	const fetchUsers = async () => {
		const response = await fetch(`${serverEndpoint}/api/getAllUsers`);
		const data = await response.json();
		setUsers(data);
	}

	useEffect(() => {
		fetchUsers();
	}, [])

	const makeAdmin = async (userID: string) => {
		try {
			const response = await fetch(serverEndpoint + '/api/updateUser', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({userID: userID, data: {admin : true}})
			});
			
			if (!response.ok) {
			  throw new Error('Failed to edit user');
			}
		
			const responseData = await response.json();
			fetchUsers();
			return responseData;
		  } catch (error: any) {
			console.error('Error editing user:', error.message);
			throw error;
		  }
	}

	const banUser = async (userID: string) => {
		try {
			const response = await fetch(serverEndpoint + '/api/updateUser', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({userID: userID, data: {banned : true}})
			});
			
			if (!response.ok) {
			  throw new Error('Failed to edit user');
			}
		
			const responseData = await response.json();
			fetchUsers();
			return responseData;
		  } catch (error: any) {
			console.error('Error editing user:', error.message);
			throw error;
		  }
	}

	const unBanUser = async (userID: string) => {
		try {
			const response = await fetch(serverEndpoint + '/api/updateUser', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json'
			  },
			  body: JSON.stringify({userID: userID, data: {banned : false}})
			});
			
			if (!response.ok) {
			  throw new Error('Failed to edit user');
			}
		
			const responseData = await response.json();
			fetchUsers();
			return responseData;
		  } catch (error: any) {
			console.error('Error editing user:', error.message);
			throw error;
		  }
	}

	return (
		<div>
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Adminpage
            </h2>
			<ScrollArea style={{ height: '600px' }}> {/* Adjust the height as needed */}
			<div style={{ padding: '15px 20px' }}>
			{users.map((user) => (
				<div key={user} className="mb-2">
				<Card className="max-w-[400px]">
					<CardHeader className="flex gap-3">
					<Image
						alt="nextui logo"
						radius="sm"
						src={user.profilePictureURL ? user.profilePictureURL : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png'}
						width={user.profilePictureURL ? 200 : 100}
					/>
					<div className="flex flex-col">
						<p className="text-lg font-bold">{user.userName}</p>
					</div>
					</CardHeader>
					<Divider />
					<CardBody>
						{
						user.banned ? 
						<Button onClick={() => unBanUser(user.userID)} fullWidth className="ml-2" color="warning" variant="bordered" startContent={<UserIcon></UserIcon>}>
							Unban user
						</Button>
						:
						!user.admin ?
						<div className="flex">
							<Button onClick={() => makeAdmin(user.userID)} fullWidth color="success" variant="bordered" className="mr-2" startContent={<AdminIcon/>}>
								Make admin
							</Button>  
							<Button onClick={() => banUser(user.userID)} fullWidth className="ml-2" color="danger" variant="bordered" startContent={<UserIcon></UserIcon>}>
								Ban user
							</Button>
						</div>
						:
						<Chip
							startContent={<AdminIcon/>}
							variant="solid"
							color="success"
						>
							Admin
						</Chip>
						}
					</CardBody>
				</Card>
				</div>
			))}
			</div>
		</ScrollArea>
	  </div>
	);

}
