import ParseProgress from './ParseProgress'
import Choice from '../form/choice'

class ChoiceProgress extends ParseProgress {
    private _choice: number = -1
    private _step: number = -1

    get currentSubForm() {
        return this._form.subForms[this._choice]
    }

    constructor(private _form: Choice) {
        super()
    }

    nextChoice() {
        this._step = -1
        this._choice += 1
        return this._choice < this._form.subForms.length
    }

    nextStep() {
        this._step += 1
        return this._step < 1 // 只有1步
    }

    hasNextStep() {
        return this._step < 0
    }
}


export default ChoiceProgress
