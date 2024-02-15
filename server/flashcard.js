class Flashcard {
    constructor(question, answer){
        this.question = question;
        this.answer = answer;
    }

    setQuestion(newQuestion) {
        this.question = newQuestion;
    }
    getQuestion() {
        return this.question;
    }
    getAnswer() {
        return this.answer;
    }
    setAnswer(newAnswer) {
        this.answer = newAnswer;
    }
}
module.exports = Flashcard;
