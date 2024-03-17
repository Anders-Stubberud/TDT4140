"use client";

import { useEffect, useState } from "react";
import { CreateflashcardForm } from "@/components/createflashcardForm";
import { FlashcardCreated } from "@/components/flashcardCreated";
import { FlashcardProvider } from "@/app/context/flashcardcontext";
import { FlashcardForm } from "@/components/flashcardForm";
import { Textarea } from "@nextui-org/input";
import { Divider } from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { changeUserInfo, editTheSet, serverEndpoint } from "@/state/zustand";
import { useRef } from "react";
import { CameraIcon } from "../../icons/cameraIcon";
import { AvatarDemo } from "@/components/avatar";
import { TabsDemo } from "@/components/tabs";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import {Card, CardBody} from "@nextui-org/react";
import React from "react";
import { changeCardsForm } from "@/state/zustand";
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/navigation'
import { MultiStepLoaderDemo } from "@/components/multisteploader";
import { flashcard, flashcardSet } from "@/state/zustand";
import { title } from "process";
import axios from "axios";

export default function CreateflashcardsPage(navigationData: any) {

  const [coverImage, setCoverImage] = useState<any>();
  const [coverImageURL, setCoverImageURL] = useState<string | null>(null);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { idOfSetToEdit, setIdOfSetToEdit } = editTheSet();
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
  const [localSetID, setLocalSetID] = useState<string | null>(null);
  const [cardIDToURLMapper, setItems] = useState({});
  const addKeyValuePair = (key: any, value: any) => {
    setItems(prevItems => ({ ...prevItems, [key]: value }));
  };

  const handleButtonClick = () => {
    (fileInputRef.current as HTMLInputElement | null)?.click();
  };

  const handleFileChange = (e: any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setCoverImage(img);
  };

  const { cardFormArr, setCardFormArr } = changeCardsForm();

  const [cardInformation, setCardInformation] = useState<any []>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (idOfSetToEdit) {
        try {
          const response = await fetch(`${serverEndpoint}/api/getFlashcard/${idOfSetToEdit}`);
          const data = await response.json();
          const flashcards = data.flashcards
          const title = data.setTitle;
          const description = data.description;
          const tags = data.tags;
          const coverImageURL = data.coverImageURL;
          setCoverImageURL(coverImageURL);
          setSetTitle(title);
          setSelectedItems(tags);
          setDescription(description);
          const newCardFormArr = flashcards.map((value: any, index: number) => (
            <FlashcardForm 
              handleAnswerImageChange={handleAnswerImageChange}
              handleQuestionImageChange={handleQuestionImageChange}
              handleAnswerChange={handleAnswerChange}
              handleQuestionChange={handleQuestionChange}
              id={value.flashcardID}
              defaultAnswer={value.answer} 
              defaultQuestion={value.question} 
              remove={removeCard} 
              numberInLine={index + 1} 
            />
          ));

          flashcards.forEach((flashcardItem: any) => {
            const newCardInfo = {
              cardID: flashcardItem.flashcardID,
              cardQuestion: flashcardItem.question,
              cardAnswer: flashcardItem.answer,
              questionImage: flashcardItem.questionImage,
              answerImage: flashcardItem.answerImage
            };
          
            setCardInformation(prevCardInformation => [...prevCardInformation, newCardInfo]);
          });
  
          setCardFormArr(newCardFormArr);
          setLocalSetID(idOfSetToEdit);
          setIdOfSetToEdit(null);
        } catch (error) {
          console.error('Error fetching flashcard:', error);
        }
      } else {
        const fetchedQuestions = [""];
        const fetchedAnswers = [""];
        const uuidID = uuidv4();
        setCardInformation(prevCardInformation => [
          ...prevCardInformation,
          {
            cardID: uuidID,
            cardQuestion: "",
            cardAnswer: "",
            questionImage: null,
            answerImage: null
          }
        ]);
    
        const newCardFormArr = fetchedQuestions.map((question, index) => (
          <FlashcardForm 
            handleAnswerImageChange={handleAnswerImageChange}
            handleQuestionImageChange={handleQuestionImageChange}
            handleAnswerChange={handleAnswerChange}
            handleQuestionChange={handleQuestionChange}
            id={uuidID}
            defaultAnswer={fetchedAnswers[index]} 
            defaultQuestion={question} 
            remove={removeCard} 
            numberInLine={index + 1} 
          />
        ));
        setCardFormArr(newCardFormArr);
      }
    };
  
    fetchData();
  }, []);
  

  const handleQuestionChange = (id: string, question: string) => {
    setCardInformation(cardInformation.map((card) =>
      card.cardID === id ? { ...card, cardQuestion: question } : card
    ));
  } 

  const handleAnswerChange = (id: string, answer: string) => {
    setCardInformation(cardInformation.map((card) =>
      card.cardID === id ? { ...card, cardAnswer: answer } : card
    ));
  } 

  const handleAnswerImageChange = (id: string, answerImage: File) => {
    setCardInformation(cardInformation.map((card) =>
      card.cardID === id ? { ...card, answerImage: answerImage } : card
    ));
  } 

  const handleQuestionImageChange = (id: string, questionImage: File) => {
    setCardInformation(cardInformation.map((card) =>
      card.cardID === id ? { ...card, questionImage: questionImage } : card
    ));
  } 

  const addCard = () => {
    const uuidID = uuidv4();
    setCardInformation([... cardInformation,         {
      cardID: uuidID,
      cardQuestion: "",
      cardAnswer: "",
      questionImage: null,
      answerImage: null
    }]);
    setCardFormArr([...cardFormArr, <FlashcardForm handleAnswerImageChange={handleAnswerImageChange} handleQuestionImageChange={handleQuestionImageChange} handleAnswerChange={handleAnswerChange} handleQuestionChange={handleQuestionChange} id={ uuidID } defaultAnswer="" defaultQuestion="" remove={removeCard} key={uuidv4()} numberInLine={cardFormArr.length + 1} />]);
  }
  
  const removeCard = (id: string) => {
    if (cardFormArr.length == 1) {
      return
    }
    setCardInformation(cardInformation.filter((card) => card.cardID !== id));
    const updatedArr: any[] = cardFormArr.filter((card) => card.props.id !== id);
    setCardFormArr(updatedArr);
  };

  // Gotta fill this out if we find more image file types, google only accepts certain
  const mimeToExt: Record<string, string> = {
    "jpeg": "jpg",
    "png": "png",
  };

  const sendCardsToDatabase = async () => {
    try {

      const textRelatedToFlashcards: any[] = [];
      const flashcardSetID = uuidv4();
      const userID = localStorage.getItem('userID');
      const flashcards = cardFormArr.map((card) => ({
          flashcardID: card.props.id,
          question: cardInformation.find((info) => info.cardID === card.props.id).cardQuestion,
          answer: cardInformation.find((info) => info.cardID === card.props.id).cardAnswer,
          answerImage: cardInformation.find((info) => info.cardID === card.props.id).answerImage,
          questionImage: cardInformation.find((info) => info.cardID === card.props.id).questionImage
      }))

      let formData = new FormData();

      if (coverImage) {
        const fileType: string = coverImage.data.type.split('/')[1]
        const fileExtension = mimeToExt[fileType];
        const newCoverImage:any = new File([coverImage.data], `${flashcardSetID}.${fileExtension}`, { type: coverImage.type });
        formData.append("file", newCoverImage);
      }
      if (coverImageURL) {
        addKeyValuePair(localSetID, coverImageURL);
      }
      if ( localSetID) {
        formData.append('flashcardSetID', localSetID);
      }
      else {
        formData.append('flashcardSetID', flashcardSetID);
      }
      if (userID) {
        formData.append('creatorID', userID);
      }
      formData.append('setTitle', setTitle);
      formData.append('numberOfLikes', numberOfLikes.toString());
      formData.append('description', description);
      formData.append('tags', selectedItems.length != 0 ? JSON.stringify(selectedItems) : "");
      flashcards.forEach((flashycardy) => {
        const associatedInformation = {
          flashcardID: flashycardy.flashcardID,
          answer: flashycardy.answer,
          question: flashycardy.question
        };

        textRelatedToFlashcards.push(associatedInformation);
        
        const isAnswerImage = flashycardy.answerImage;
        const isQuestionImage = flashycardy.questionImage;

        if (isAnswerImage && typeof flashycardy.answerImage !== 'string') {
          console.log('a');
          const fileType: string = isAnswerImage.type.split('/')[1]
          const fileExtension = mimeToExt[fileType];
          const newAnswerImage:any = new File([isAnswerImage], `${'ANSWER-IMAGE'}${flashycardy.flashcardID}_.${fileExtension}`, { type: isAnswerImage.type });
          formData.append('file', newAnswerImage);
        }
        else if (isAnswerImage && typeof flashycardy.answerImage == 'string') {
          console.log('b');
          addKeyValuePair(flashycardy.flashcardID, flashycardy.answerImage);
        }

        if (isQuestionImage) {
          console.log('c');
          const fileType: string = isQuestionImage.type.split('/')[1]
          const fileExtension = mimeToExt[fileType];
          const newQuestionImage:any = new File([isQuestionImage], `${'QUESTION-IMAGE'}${flashycardy.flashcardID}_.${fileExtension}`, { type: isQuestionImage.type });
          formData.append('file', newQuestionImage);
        }
        else if (isQuestionImage && typeof flashycardy.questionImage == 'string') {
          console.log('d');
          addKeyValuePair(flashycardy.flashcardID, flashycardy.questionImage);
        }
      })

      formData.append('cardIDToURLMapper', JSON.stringify(cardIDToURLMapper));
      formData.append('textRelatedToFlashcards', JSON.stringify(textRelatedToFlashcards));

      const response = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        body: formData,
      });

    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
  
  const [selectedItems, setSelectedItems] = useState<string []>([]);

  const handleSelectionChange = (event: any) => {
    const selectedItems = event.target.value;
    const arr = selectedItems.split(",");
    setSelectedItems(arr);
  };  

  const [setTitle, setSetTitle] = useState('');

  const [description, setDescription] = useState('');

  const handleChangeTitle = (event: any) => {
    setSetTitle(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-1/2">
        <div className="space-y-1 flex flex-row justify-between items-center">
            <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
              Create new flashcard-set
            </h2>
            <MultiStepLoaderDemo clicked={sendCardsToDatabase}></MultiStepLoaderDemo>
        </div>
        <Input label='Title' placeholder="The title of your set" value={setTitle} onChange={handleChangeTitle} className="h-14 my-4"></Input>
        <Divider className="my-4" />
        <div className="flex flex-row">
            <Textarea
            fullWidth={true}
            label="Description"
            value={description} 
            onChange={handleDescriptionChange}
            placeholder="Include short description"
            className="h-full"
          />
          <Divider orientation="vertical" className="mx-4"/>
          <div className="">
            <Button
              color="primary"
              className="w-full mb-1"
              endContent={<CameraIcon />}
              onClick={handleButtonClick}
            >
              Upload cover image
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div className="w-56">
            <Select
              label="Tags"
              placeholder="Select tag"
              selectionMode="multiple"
              className="max-w-xs"
              selectedKeys={selectedItems}
              onChange={handleSelectionChange}
            >
      {[
        { value: 'math', label: 'Mathematics' },
        { value: 'science', label: 'Natural Sciences' },
        { value: 'english', label: 'English Language Arts' },
        { value: 'history', label: 'History' },
        { value: 'geography', label: 'Geography' },
        { value: 'foreign_languages', label: 'Foreign Languages' },
        { value: 'art', label: 'Art' },
        { value: 'music', label: 'Music' },
        { value: 'physical_education', label: 'Physical Education' },
        { value: 'computer_science', label: 'Computer Science' }
      ].map((item) => (
        <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
      ))}
    </Select>
            </div>
          </div>
        </div>
        <Divider className="my-4" />
      </div>
      {cardFormArr.map((card, index) => (
        <FlashcardForm
          handleAnswerImageChange={ handleAnswerImageChange }
          handleQuestionImageChange={ handleQuestionImageChange }
          handleAnswerChange={handleAnswerChange}
          handleQuestionChange={handleQuestionChange}
          key={card.props.id}
          id={card.props.id}
          defaultAnswer={card.props.defaultAnswer}
          defaultQuestion={card.props.defaultQuestion}
          remove={removeCard}
          numberInLine={index + 1}
        />
      ))}
      <Button color="primary" className="mt-10 mb-10" onClick={addCard}>
        New card
      </Button>
    </div>
  );
}
