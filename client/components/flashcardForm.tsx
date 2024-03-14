import {Button, Select, SelectItem} from "@nextui-org/react";
import {CameraIcon} from '../icons/cameraIcon';
import * as Separator from '@radix-ui/react-separator';
import {Divider} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import { changeUserInfo } from "@/state/zustand";
import { useRef } from "react";
import { TrashCanIcon } from "@/icons/trashcan";

interface AreaProps {
  flashcardNumberInLine: number;
}

export function FlashcardForm({flashcardNumberInLine}: AreaProps) {

  const { profilePic, setProfilePic } = changeUserInfo();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    (fileInputRef.current as HTMLInputElement | null)?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
  if (selectedFile != undefined) {
    setProfilePic(selectedFile);
  }
  };

  return (
        <div className="w-1/2 mt-8">
        <div className="flex justify-between items-center space-y-1 mb-4">
            <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
              Flashcard {flashcardNumberInLine}
            </h2>
            <Button isIconOnly color="warning" variant="faded" aria-label="Take a photo">
              <TrashCanIcon></TrashCanIcon>
            </Button>
        </div>

        <div className="flex flex-row items-center justify-center">
            <Input label='Question' placeholder="Insert question" className="h-14 mr-4"></Input>
            <Button isIconOnly color="warning" variant="faded" aria-label="Take a photo"
              onClick={handleButtonClick}
            >
              <CameraIcon></CameraIcon>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

        <Divider className="my-4" />

        <div className="flex flex-row items-center justify-center">
            <Input label='Answer' placeholder="Insert answer" className="h-14 mr-4"></Input>
            <Button isIconOnly color="warning" variant="faded" aria-label="Take a photo"
              onClick={handleButtonClick}
            >
              <CameraIcon></CameraIcon>
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

        <Divider className="my-4" />
      </div>
  )
}


{/* <div className="border border-red-600 flex flex-row">
<Textarea placeholder="Type your message here." />
<Textarea placeholder="Type your message here." />
</div>
<Button color="black">Send message</Button> */}
