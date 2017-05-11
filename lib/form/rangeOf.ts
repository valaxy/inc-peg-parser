import Form from './form'
import RangeOfProgress from '../parseProgress/rangeOf'

export default class RangeOf extends Form {
    get id() { return 5 }
    
    get charStart() { return this._charStart }

    get charEnd() { return this._charEnd }

    constructor(private _charStart: string, private _charEnd: string) {
        super()
        if (_charStart > _charEnd) throw new Error('charStart should <= charEnd')
    }

    createProgress() {
        return new RangeOfProgress(this)
    }
}
