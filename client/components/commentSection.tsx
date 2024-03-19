import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import CommentIcon from "@/icons/commentIcon";
import { useUserStore, serverEndpoint } from "@/state/zustand";

interface props {
    comments: any
    setID: string
}

export default function CommentSection({ comments, setID }: props) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [cmt, setCmt] = useState<string>('');
  const { username, profileImageURL } = useUserStore();
  const [localComments, setLocalComments] = useState<any>(comments);

  const handleCmtChange = (event: any) => {
    setCmt(event.target.value);
  }

  const sendComment = () => {
    const newComment = {
        username: username,
        commentText: cmt,
        profileImageURL: profileImageURL,
        setID: setID
    }
    setLocalComments([...localComments, newComment]);
    fetch(serverEndpoint + '/api/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            newComment
        )
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Handle response data
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
      setCmt('');
  }

  return (
    <>
    <button className="ml-3" onClick={onOpen}>
        <CommentIcon></CommentIcon>
        <p className="invisible">.</p>
        </button>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900/10 to-zinc-900/10 backdrop-opacity-0"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Comments</ModalHeader>
              <ModalBody>
                {localComments.map((comment: any) => (
                <div key={comment.commentText} className="mb-3">
                    <Card className="max-w-[400px]">
                        <CardHeader className="flex gap-3">
                            <Image
                            alt="nextui logo"
                            height={100}
                            radius="sm"
                            src={comment.profileImageURL}
                            width={100}
                            />
                            <div className="flex flex-col">
                            <p className="text-lg font-bold">{comment.username}</p>
                            </div>
                        </CardHeader>
                        <Divider/>
                        <CardBody>
                            <p>{comment.commentText}</p>
                        </CardBody>
                    </Card>
                </div>
                ))}
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button color="primary" onClick={sendComment} className="h-14">
                  Add
                </Button>
                <Input value={cmt} onChange={handleCmtChange} variant={'bordered'} label="Add comment" />
                <Button className="mt-2" color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
