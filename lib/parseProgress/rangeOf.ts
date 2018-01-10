import ParseProgress from './parseProgress'
import RangeOf from '../form/rangeOf'
import ParsingNode from '../parsing/parsingNode'

export default class RangeOfProgress extends ParseProgress {
    private _choice = -1
    private _step: number

    constructor(private _form: RangeOf) {
        super()
        this.nextChoice()
    }

    nextChoice() {
        this._choice += 1
        this._step = -1
        return this._choice < 1
    }

    nextStep() {
        this._step += 1
    }

    hasNextStep() {
        return this._step < 0
    }


    accept(ch: string) {
        ch = ch[0]
        return this._form.charStart <= ch && ch <= this._form.charEnd
    }


    consume(vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }

        if (this.accept(vagrant.character)) {
            return {
                type: 'consume'
            }
        }

        return {
            type: 'back'
        }
    }
}
