import ParseProgress from './ParseProgress'


class ChoiceProgress extends ParseProgress {
    private _subForms: Form[]
    private _choice: number
    private _step: number

    constructor(choice: Choice) {
        super()
        this._subForms = choice.subForms
        this._choice = -1
        this._step = -1
    }

    nextChoice() {
        this._step = -1
        this._choice += 1
        return this._choice < this._subForms.length
    }

    nextStep() {
        this._step += 1
        return this._step < 1 // 只有1步
    }

    consume(symbol: string|Form) {
        if (symbol instanceof Form) {
            let form = this._subForms[this._choice]
        }
        return form.createChoice()
    }
}


export default ChoiceProgress
