export default class Flashcard {

    private question: string;
    private answer: string;

    constructor(question: string, answer: string){
        this.question = question;
        this.answer = answer;
    }

    setQuestion(newQuestion: string) {
        this.question = newQuestion;
    }
    getQuestion() {
        return this.question;
    }
    getAnswer() {
        return this.answer;
    }
    setAnswer(newAnswer: string) {
        this.answer = newAnswer;
    }
}
