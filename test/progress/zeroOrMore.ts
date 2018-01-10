import * as f from '../../lib/form/index'
import ParsingNode from '../../lib/parsing/parsingNode'
import { assert } from 'chai'

describe('ZeroOrMoreProgress', function() {
    let subRule = f.chunk('a')
    let rule = f.zeroOrMore(subRule)

    it('match 0', function() {
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()

        assert.isOk(p.nextChoice())
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('match 1', function() {
        let p = rule.createProgress()

        p.nextStep()
        p.nextStep()
        assert.isOk(p.hasNextStep())

        assert.isOk(p.nextChoice())
        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('match 2', function() {
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

    it('consume', function() {
        let p = rule.createProgress()

        p.nextStep()
        assert.equal(p.consume(new ParsingNode('x')).type, 'descend')
        assert.equal(p.consume(new ParsingNode(subRule)).type, 'connect')
        assert.equal(p.consume(new ParsingNode(rule)).type, 'break')
    })
})
