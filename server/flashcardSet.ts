import Flashcard from './flashcard'; //imports Flashcard-class from flashcard.js

export default class FlashcardSet {

    private flashcardSet: Flashcard [];

    constructor(){
        this.flashcardSet = [];
    }
    
    //using push() to add a flashcard to the flashcardSet list
    addFlashcard(question: string, answer: string) {
        const flashcard = new Flashcard(question, answer);
        this.flashcardSet.push(flashcard);
    }

    //deletes a flashcard based on the index
    removeFlashcard(index: number) {
        if (index >= 0 && index < this.flashcardSet.length){
            this.flashcardSet.splice(index,1);
        } else {
            throw new Error("Not valid index for removing flashcard");
        }
    }
    //edits a flashcard in the set by updating the question and answer based on the index
    editFlashcard(index: number, newQuestion: string, newAnswer: string) {
        if (index >= 0 && index < this.flashcardSet.length){
            const flashcard = this.flashcardSet[index];
            flashcard.setQuestion(newQuestion);
            flashcard.setAnswer(newAnswer);
        } else {
            throw new Error("Not valid index for editing flashcard");
        }
    }

}

export { FlashcardSet }
