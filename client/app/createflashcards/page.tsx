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
import { changeUserInfo, editTheSet, serverEndpoint, tagsAvailable } from "@/state/zustand";
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
import {Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import { json } from "stream/consumers";

export default function CreateflashcardsPage(navigationData: any) {

  const [coverImage, setCoverImage] = useState<any>();
  const { tags, setTags } = tagsAvailable();
  const [coverImageURL, setCoverImageURL] = useState<string | null>(null);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { idOfSetToEdit, setIdOfSetToEdit } = editTheSet();
  const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
  const [localSetID, setLocalSetID] = useState<string | null>(null);
  const [cardIDToURLMapper, setItems] = useState({});
  const [selectedPrivacy, setSelectedPrivacy] = useState<string []>([]);
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
          const cveImageURL = data.coverImage;
          const public_edit = data.public_edit;
          const public_use = data.public_use;
          console.log(data);
          const statusArr = public_edit && public_use ? ['public_edit', 'public_use'] : public_edit && (! public_use) ? ['public_edit'] : (! public_edit) && public_use ? ['public_use'] : [];
          setSelectedValues(statusArr);
          addKeyValuePair(idOfSetToEdit, cveImageURL);
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

          const newCardInformation = flashcards.map((flashcardItem: any) => ({
            cardID: flashcardItem.flashcardID,
            cardQuestion: flashcardItem.question,
            cardAnswer: flashcardItem.answer,
            questionImage: flashcardItem.questionImage,
            answerImage: flashcardItem.answerImage
          }));
          
          newCardInformation.forEach((cardInfo: any) => {
            addKeyValuePair(`question-${cardInfo.cardID}`, cardInfo.questionImage);
            addKeyValuePair(`answer-${cardInfo.cardID}`, cardInfo.answerImage);
          });
          

          setCardInformation(prevCardInformation => [...prevCardInformation, ...newCardInformation]);
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

      if (coverImage && typeof coverImage !== 'string') {
        const fileType: string = coverImage.data.type.split('/')[1]
        const fileExtension = mimeToExt[fileType];
        const newCoverImage:any = new File([coverImage.data], `${flashcardSetID}.${fileExtension}`, { type: coverImage.type });
        formData.append("file", newCoverImage);
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

        if (isQuestionImage && typeof flashycardy.questionImage !== 'string') {
          console.log('c');
          const fileType: string = isQuestionImage.type.split('/')[1]
          const fileExtension = mimeToExt[fileType];
          const newQuestionImage:any = new File([isQuestionImage], `${'QUESTION-IMAGE'}${flashycardy.flashcardID}_.${fileExtension}`, { type: isQuestionImage.type });
          formData.append('file', newQuestionImage);
        }
      })
      console.log(cardIDToURLMapper);
      formData.append('cardIDToURLMapper', JSON.stringify(cardIDToURLMapper));
      formData.append('textRelatedToFlashcards', JSON.stringify(textRelatedToFlashcards));
      formData.append('public_use', JSON.stringify(selectedValues.includes('public_use')));
      formData.append('public_edit', JSON.stringify(selectedValues.includes('public_edit')));

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

  const [newTagBame, setNewTagName] = useState('');

  const handleChangeTitle = (event: any) => {
    setSetTitle(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleNewTagname = (event: any) => {
    setNewTagName(event.target.value);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleAddTag = async (event: any) => {
    const response = await fetch(`${serverEndpoint}/api/newTag/${newTagBame}`);
    const taggiesRAW = await fetch(`${serverEndpoint}/api/getTags`);
    const taggies = await taggiesRAW.json();
    const tagsArr = taggies.tagsArr;
    setIsOpen(false);
    setTags(tagsArr);
  };

  const handleOutsideDropdownClick = () => {
    setIsOpen(false); // Close the popover
    return true; // Always return true to close the popover when interacting outside
  };

  const [selectedValues, setSelectedValues] = useState<string []>([]);

  const handleCheckboxChange = (values: any) => {
    setSelectedValues(values);
  };

  useEffect(() => {
    console.log(selectedValues);
  }, [selectedValues])

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
            className="h-full w-full"
          />
          <Divider orientation="vertical" className="mx-4"/>
          <div className="">
            <div className="flex">
              <Button
                color="primary"
                className="w-full mb-1"
                endContent={<CameraIcon />}
                onClick={handleButtonClick}
              >
                Upload cover image
              </Button>
              <Popover shouldCloseOnInteractOutside={handleOutsideDropdownClick} placement="bottom" showArrow offset={10} isOpen={isOpen}>
                <PopoverTrigger>
                <Button
                  color="primary"
                  className="ml-1 mb-2"
                  onClick={() => setIsOpen(true)}
                >
                  Add tag
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                  {(titleProps) => (
                    <div className="px-1 py-2 w-full">
                      <p className="text-small font-bold text-foreground" {...titleProps}>
                        New tag
                      </p>
                      <div className="mt-2 flex flex-col gap-2 w-full">
                        <Input value={newTagBame} onChange={handleNewTagname} label="New tag name" size="sm" variant="bordered" />
                        <Button
                        color="primary"
                        onClick={handleAddTag}
                        className="ml-1 mb-2"
                      >
                        Add
                      </Button>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div >
            <Select
              label="Tags"
              placeholder="Select tags"
              selectionMode="multiple"
              fullWidth
              selectedKeys={selectedItems}
              onChange={handleSelectionChange}
            >
      {tags.map((item) => (
        <SelectItem key={item} value={item}>{item}</SelectItem>
      ))}
    </Select>
            </div>
          </div>
        </div>
        <CheckboxGroup
          className="mt-2"
          orientation="horizontal"
          color="success"
          value={selectedValues}
          onChange={handleCheckboxChange}
        >
          <Checkbox value="public_edit" className="mr-12">
            Allow other users to modify this set
          </Checkbox>
          <Checkbox value="public_use">
            Allow other users to play this set
          </Checkbox>
        </CheckboxGroup>
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
