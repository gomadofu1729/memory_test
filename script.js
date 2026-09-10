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

function getWeight(history) {
    if (history.length === 0) {
        return 2;
    }
    const correct= history.filter(x => x === 1).length;
    const correct_rate = correct / history.length;
    return 1+ (1 - correct_rate);
}
