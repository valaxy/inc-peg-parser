import * as f from '../../lib/form/index'
import ParsingNode from '../../lib/parsing/parsingNode'
import { assert } from 'chai'

describe('SequenceProgress', function() {
    it('empty', function() {
        assert.throws(() => f.sequence())
    })

    let subRule = f.chunk('abc')


    it('length 1', function() {
        let rule = f.sequence(subRule)
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('length 2', function() {
        let rule = f.sequence(subRule, subRule)
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('consume', function() {
        let r1 = f.chunk('aaa')
        let r2 = f.chunk('bbb')
        let rule = f.sequence(r1, r2)
        let p = rule.createProgress()

        p.nextStep()
        assert.equal(p.consume(new ParsingNode('a')).type, 'descend')
        assert.equal(p.consume(new ParsingNode(r1)).type, 'connect')
        assert.equal(p.consume(new ParsingNode(r2)).type, 'break')

        p.nextStep()
        assert.equal(p.consume(new ParsingNode('a')).type, 'descend')
        assert.equal(p.consume(new ParsingNode(r2)).type, 'connect')
        assert.equal(p.consume(new ParsingNode(r1)).type, 'break')
    })
})
