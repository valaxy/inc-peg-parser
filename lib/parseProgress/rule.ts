import ParseProgress from './parseProgress'
import Rule from '../form/rule'
import ParsingNode from '../parsing/parsingNode'
import TreeOperation from '../parsing/treeOperation'

class RuleProgress extends ParseProgress {
    private _choice = -1
    private _step = -1

    get subForm() {
        return this._rule.subForm
    }

    constructor(private _rule: Rule) {
        super()
    }

    nextChoice() {
        this._choice += 1
        return this._choice < 1
    }

    nextStep() {
        this._step += 1
        return this._step < 1
    }

    hasNextStep() {
        return this._step < 0
    }

    consume(vagrant: ParsingNode) {
        return null
    }
}


export default RuleProgress
