import {Button, Select, SelectItem} from "@nextui-org/react";
import {CameraIcon} from '../icons/cameraIcon';
import * as Separator from '@radix-ui/react-separator';
import {Divider} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import { changeUserInfo } from "@/state/zustand";
import { useRef, useState } from "react";
import { TrashCanIcon } from "@/icons/trashcan";

interface AreaProps {
  numberInLine: number;
  id: string;
  defaultQuestion: string;
  defaultAnswer: string;
  handleQuestionChange: (id: string, question: string) => void;
  handleAnswerChange: (id: string, answer: string) => void;
  handleAnswerImageChange: (id: string, answerImage: File) => void;
  handleQuestionImageChange: (id: string, questionImage: File) => void; 
  remove: (id: string) => void;
}

export function FlashcardForm({ handleAnswerImageChange, handleQuestionImageChange, remove, defaultAnswer, defaultQuestion, id, numberInLine, handleAnswerChange, handleQuestionChange }: AreaProps) {

  const fileInputRefAnswer = useRef(null);
  const fileInputRefQuestion = useRef(null);

  const handleButtonClickAnswer = () => {
    (fileInputRefAnswer.current as HTMLInputElement | null)?.click();
  };

  const handleButtonClickQuestion = () => {
    (fileInputRefQuestion.current as HTMLInputElement | null)?.click();
  };

  const handleFileChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
  if (selectedFile != undefined) {
    handleAnswerImageChange(id, selectedFile);
  }
  };

  const handleFileChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
  if (selectedFile != undefined) {
    handleQuestionImageChange(id, selectedFile)
  }
  };

  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: any) => {
    defaultAnswer = event.target.value;
    handleQuestionChange(id, (event.target.value));
    setInputValue(event.target.value);
  };

  const [inputValue2, setInputValue2] = useState('');

  const handleChange2 = (event: any) => {
    defaultQuestion = event.target.value;
    handleAnswerChange(id, (event.target.value));
    setInputValue2(event.target.value);
  };

  return (
        <div className="w-1/2 mt-8">
        <div className="flex justify-between items-center space-y-1 mb-4">
            <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
              Flashcard {numberInLine}
            </h2>
            <Button isIconOnly color="warning" variant="faded" aria-label="delete"
            onClick={() => remove(id)}
            >
              <TrashCanIcon></TrashCanIcon>
            </Button>
        </div>

        <div className="flex flex-row items-center justify-center">
            <Input label='Question' placeholder="Insert question" value={inputValue} onChange={handleChange} className="h-14 mr-4"></Input>
            <Button isIconOnly color="warning" variant="faded" aria-label="Take a photo"
              onClick={ handleButtonClickQuestion }
            >
              <CameraIcon></CameraIcon>
            </Button>
            <input
              type="file"
              ref={fileInputRefQuestion}
              style={{ display: 'none' }}
              onChange={handleFileChangeQuestion}
            />
          </div>

        <Divider className="my-4" />

        <div className="flex flex-row items-center justify-center">
            <Input label='Answer' placeholder="Insert answer" value={inputValue2} onChange={handleChange2} className="h-14 mr-4"></Input>
            <Button isIconOnly color="warning" variant="faded" aria-label="Take a photo"
              onClick={handleButtonClickAnswer}
            >
              <CameraIcon></CameraIcon>
            </Button>
            <input
              type="file"
              ref={fileInputRefAnswer}
              style={{ display: 'none' }}
              onChange={handleFileChangeAnswer}
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
