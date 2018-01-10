import * as f from '../../lib/form/index'
import { assert } from 'chai'

describe('OneOrMoreProgress', function() {
    let rule = f.oneOrMore(f.chunk('abc'))

    it('match zero', function() {
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('match one', function() {
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isOk(p.hasNextStep())

        assert.isOk(p.nextChoice())
        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('match two', function() {
        let p = rule.createProgress()

        p.nextStep()
        p.nextStep()
        p.nextStep()
        assert.isOk(p.hasNextStep())

        assert.isOk(p.nextChoice())
        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })
})
