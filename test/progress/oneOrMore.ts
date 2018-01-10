import * as f from '../../lib/form/index'
import ParsingNode from '../../lib/parsing/parsingNode'
import { assert } from 'chai'

describe('OneOrMoreProgress', function() {
    let subRule = f.chunk('abc')
    let rule = f.oneOrMore(subRule)

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


    it('consume: match zero', function() {
        let p = rule.createProgress()

        p.nextStep()
        assert.equal(p.consume(new ParsingNode('x')).type, 'descend')
        assert.equal(p.consume(new ParsingNode(subRule)).type, 'connect')
        assert.equal(p.consume(new ParsingNode(rule)).type, 'break')

        assert.isNotOk(p.nextChoice())
    })


    it('consume: match one', function() {
        let p = rule.createProgress()

        p.nextStep()
        p.nextStep()

        assert.isOk(p.nextChoice())
        p.nextStep()
        assert.equal(p.consume(new ParsingNode(subRule)).type, 'connect')
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })


    it('consume: match two', function() {
        let p = rule.createProgress()

        p.nextStep()
        p.nextStep()
        p.nextStep()

        assert.isOk(p.nextChoice())
        p.nextStep()
        assert.equal(p.consume(new ParsingNode(subRule)).type, 'connect')
        p.nextStep()
        assert.equal(p.consume(new ParsingNode(subRule)).type, 'connect')
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })
})
