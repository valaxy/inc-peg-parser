import ParseProgress from './ParseProgress'
import Choice from '../form/choice'
import ParsingNode from '../parsing/parsingNode'
import DescendOperation from '../parsing/descendOperation'
import BreakOperation from '../parsing/breakOperation'

class ChoiceProgress extends ParseProgress {
    private _choice: number = -1
    private _tryMatch: boolean

    get currentSubForm() {
        return this._choiceForm.subForms[this._choice]
    }

    constructor(private _choiceForm: Choice) {
        super()
        this.nextChoice()
    }

    nextChoice() {
        this._tryMatch = false
        this._choice += 1
        return this._choice < this._choiceForm.subForms.length
    }

    nextStep() {
        this._tryMatch = true
    }

    hasNextStep() {
        return !this._tryMatch
    }

    consume(vagrant: ParsingNode) {
        if (vagrant.isTerminal) {
            return new DescendOperation(new ParsingNode(this.currentSubForm))
        }

        // 流浪节点若相同可以直接合并
        if (this.currentSubForm === vagrant.form) {
            return new DescendOperation(new ParsingNode(vagrant.form))
        }

        // 无法合并
        return new BreakOperation()
    }
}


export default ChoiceProgress
