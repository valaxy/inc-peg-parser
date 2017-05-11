import Form from './form'
import ZeroOrMoreProgress from '../parseProgress/zeroOrMore'

export default class ZeroOrMore extends Form {
    get id() { return 8 }

    get subForm() { return this._subForm }

    constructor(private _subForm: Form) {
        super()
    }

    createProgress() {
        return new ZeroOrMoreProgress(this)
    }
}
