import Form from './form'
import ParseProgress from './parseProgress'
import Session from '../session'
import ParsingNode from '../parsingNode'


class AnyOfProgress extends ParseProgress {
    private _choice = -1
    private _step = -1

    constructor(anyOf) {
        super()
    }

    parse({text, pos, setPos}) {
        if (pos >= text.length) return false
        if (this._chars.indexOf(text[pos]) < 0) return false

        setPos(pos + 1)
        return true
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
