const Flashcard = require('./flashcard'); //imports Flashcard-class from flashcard.js

class FlashcardSet {
    constructor(){
        this.flashcardSet = [];
    }
    
    //using push() to add a flashcard to the flashcardSet list
    addFlashcard(question, answer) {
        const flashcard = new Flashcard(question, answer);
        this.flashcardSet.push({question, answer});
    }

    //deletes a flashcard based on the index
    removeFlashcard(index) {
        if (index >= 0 && index < this.flashcardSet.length){
            this.flashcardSet.splice(index,1);
        } else {
            throw new Error("Not valid index for removing flashcard");
        }
    }
    //edits a flashcard in the set by updating the question and answer based on the index
    editFlashcard(index, newQuestion, newAnswer) {
        if (index >= 0 && index < this.flashcardSet.length){
            const flashcard = this.flashcardSet[index];
            flashcard.question = newQuestion;
            flashcard.answer = newAnswer;
        } else {
            throw new Error("Not valid index for editing flashcard");
        }
    }

}
