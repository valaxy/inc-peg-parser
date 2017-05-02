import Form from './form'
import ParseProgress from './parseProgress'
import Session from '../session'
import ParsingNode from '../parsingNode'

class ChunkProgress extends ParseProgress {
    private _choice = -1
    private _step = -1
    private _text: string

    constructor(chunk: Chunk) {
        super()
        this._text = chunk.text
    }

    nextChoice() {
        this._choice += 1
        return this._choice < 1
    }

    nextStep() {
        this._step += 1
        return this._step < this._text.length
    }

    hasNextStep() {
        return this._step + 1 < this._text.length
    }

    consume(symbol: ParsingNode) {
        if (symbol.isTerminal) {
            return this._text[this._step] == symbol.form
        } else {
            return false
        }
    }
}


class Chunk extends Form {
    private _text: string

    get text() {
        return this._text
    }

    constructor(text: string) {
        super()
        this._text = text
    }

    createProgress() {
        return new ChunkProgress(this)
    }
}

export default Chunk
