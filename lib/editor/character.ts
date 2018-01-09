import ParsingNode from '../parsing/parsingNode'

export default class Character {
    private _next: Character
    private _parsingNode: ParsingNode

    get next() { return this._next }

    get parsingNode() { return this._parsingNode }

    appendNext(next: Character) {
        this._next = next
    }

    insertAfter(ch: Character) {
        let next = this.next
        ch.appendNext(next)
        this._next = ch
    }

    static createByText(text: string) {
        let lastCharacter = null
        text.split('').reverse().map(c => {
            let ch = new Character
            ch.appendNext(lastCharacter)
            lastCharacter = ch
        })
        return lastCharacter
    }
}
