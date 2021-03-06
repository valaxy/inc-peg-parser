import ParseProgress from './parseProgress'
import Sequence from '../form/sequence'
import ParsingNode from '../parsing/parsingNode'
import BreakOperation from '../parsing/breakOperation'
import ConnectOperation from '../parsing/connectOperation'
import DescendOperation from '../parsing/descendOperation'

class SequenceProgress extends ParseProgress {
    private _step = -1

    get currentSubForm() {
        return this._sequence.subForms[this._step]
    }

    constructor(private _sequence: Sequence) {
        super()
    }

    nextChoice() {
        return false // 永远只有1个choice
    }

    nextStep() {
        this._step += 1
        return this._step < this._sequence.subForms.length
    }

    hasNextStep() {
        return this._step + 1 < this._sequence.subForms.length
    }

    consume(vagrant: ParsingNode) {
        if (vagrant.isTerminal) {
            return new DescendOperation(new ParsingNode(this.currentSubForm))
        }

        // 流浪节点可以直接合并
        if (this.currentSubForm === vagrant.form) {
            return new ConnectOperation()
        }

        // 无法合并
        return new BreakOperation()
    }
}

export default SequenceProgress
