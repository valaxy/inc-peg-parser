import ParseProgress from './parseProgress'
import RangeOf from '../form/rangeOf'
import ParsingNode from '../parsing/parsingNode'
import BreakOperation from '../parsing/breakOperation'
import ConnectOperation from '../parsing/connectOperation'
import BackOperation from '../parsing/backOperation'

export default class RangeOfProgress extends ParseProgress {
    private _trying: boolean = false

    constructor(private _form: RangeOf) {
        super()
    }

    private _accept(ch: string) {
        ch = ch[0]
        return this._form.charStart <= ch && ch <= this._form.charEnd
    }

    nextChoice() {
        return false // 只有当前一种选择
    }

    nextStep() {
        this._trying = true
    }

    hasNextStep() {
        return !this._trying
    }

    consume(vagrant: ParsingNode) {
        if (vagrant.isTerminal) {
            if (this._accept(vagrant.character)) {
                return new ConnectOperation()
            } else {
                return new BackOperation()
            }
        }

        return new BreakOperation()
    }
}
