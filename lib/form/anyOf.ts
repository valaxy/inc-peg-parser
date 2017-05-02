import Form from './form'
import ParseProgress from './parseProgress'
import Session from '../session'
import ParsingNode from '../parsingNode'


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
            return this._chars.indexOf(<string>(symbol.form)) >= 0
        } else {
            return false
        }
    }
}

class AnyOf extends Form {
    get chars() { return this._chars }

    constructor(private _chars: string) {
        super()
    }

    createProgress() {
        return new AnyOfProgress(this)
    }
}


export default AnyOf
