import ParseProgress from './ParseProgress'
import Choice from '../form/choice'
import ParsingNode from '../parsing/parsingNode'
import TreeOperation from '../parsing/treeOperation'

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

    consume(vagrant: ParsingNode) {
        if (vagrant.isTerminal) {
            return TreeOperation.descend(new ParsingNode(this.currentSubForm))
        }

        // 流浪节点若相同可以直接合并
        if (this.currentSubForm === vagrant.form) {
            return TreeOperation.descend(new ParsingNode(vagrant.form))
        }

        // 无法合并
        return TreeOperation.break()
    }
}


export default ChoiceProgress
