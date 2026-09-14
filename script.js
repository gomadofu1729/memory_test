class CardSet {
    constructor(name, cards, methods) {
        this.name = name;
        this.cards = cards;
        this.methods = methods;
    }
}
class Card {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }
}
class Method {
    constructor(id, question_field, answer_field, question_text = "", answer_text = "") {
        this.id = id;
        this.question_field = question_field;
        this.answer_field = answer_field;
        this.question_text = question_text;
        this.answer_text = answer_text;
    }
}
