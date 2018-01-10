import * as f from '../../lib/form/index'
import ParsingNode from '../../lib/parsing/parsingNode'
import { assert } from 'chai'

describe('OptionalProgress', function() {
    let subRule = f.chunk('abc')
    let rule = f.optional(subRule)

    it('case', function() {
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isOk(p.hasNextStep())
        p.nextStep()

        assert.isOk(p.nextChoice())
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('consume', function() {
        let p = rule.createProgress()

        p.nextStep()
        assert.equal(p.consume(new ParsingNode('x')).type, 'descend')
        assert.equal(p.consume(new ParsingNode(subRule)).type, 'connect')
        assert.equal(p.consume(new ParsingNode(rule)).type, 'break')

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.equal(p.consume(new ParsingNode('x')).type, 'seal')
        assert.equal(p.consume(new ParsingNode(subRule)).type, 'seal')

        assert.isOk(p.nextChoice())
        assert.equal(p.consume(new ParsingNode('x')).type, 'seal')
        assert.equal(p.consume(new ParsingNode(subRule)).type, 'seal')
    })
})
