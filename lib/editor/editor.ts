import Character from './character'
import Parser from '../parsing/session'

export default class Editor {
    private _parser: Parser


    append(text: string, ch?: Character) {
        let { head, tail } = Character.createByText(text)
        ch.insertAfter(ch)
        this._parser.insertAfter(ch.parsingNode, head.ParsingNode, tail.ParsingNode)
    }

    prepend(text: string, ch?: Character) {

    }

    remove(ch: Character, count: number) {

    }
}
