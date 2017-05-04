import ParseProgress from './parseProgress'

class RuleProgress extends ParseProgress {
    private _choice = -1
    private _step = -1

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

    consume(next: string|Form) {
        if (next instanceof Rule && next.subForm == this._rule.subForm) {
            return 'merge'
        }

    }
}


export default RuleProgress
