import ParseProgress from './ParseProgress'
import Choice from '../form/choice'

class ChoiceProgress extends ParseProgress {
    private _choice: number = -1
    private _step: number

    get currentSubForm() {
        return this._choiceForm.subForms[this._choice]
    }

    constructor(private _choiceForm: Choice) {
        super()
        this.nextChoice()
    }

    nextChoice() {
        this._step = -1
        this._choice += 1
        return this._choice < this._choiceForm.subForms.length
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
