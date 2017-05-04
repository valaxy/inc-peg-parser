import ParsingNode from '../parsingNode'
import ParseProgress from './parseProgress'
import Chunk from '../form/chunk'

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

export default ChunkProgress
