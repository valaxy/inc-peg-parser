import AnyOf from '../form/anyOf'
import ParsingNode from '../parsing/parsingNode'
import ParseProgress from './parseProgress'

class AnyOfProgress extends ParseProgress {
    private _choice = -1
    private _step = -1
    private _chars: string

    constructor(anyOf: AnyOf) {
        super()
        this._chars = anyOf.chars
    }

    nextChoice() {
        this._choice += 1
        return this._choice < 1
    }

    nextStep() {
        this._step += 1
        return this._step < 1
    }

    hasNextStep() {
        return this._step < 0
    }

    consume(symbol: ParsingNode) {
        if (symbol.isTerminal) {
            return this._chars.indexOf(symbol.character) >= 0
        } else {
            return false
        }
    }
}

export default AnyOfProgress
