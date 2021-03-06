import * as f from '../../lib/form/index'
import ParsingNode from '../../lib/parsing/parsingNode'
import { assert } from 'chai'

describe('ChoiceProgress', function() {
    it('empty', function() {
        assert.throws(() => {
            f.choice()
        })
    })

    it('one choice', function() {
        let subRule = f.chunk('a')
        let rule = f.choice(subRule)
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.equal(p.currentSubForm, subRule)
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('two choices', function() {
        let s1 = f.chunk('x')
        let s2 = f.chunk('y')
        let rule = f.choice(s1, s2)
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.equal(p.currentSubForm, s1)
        assert.isNotOk(p.hasNextStep())

        assert.isOk(p.nextChoice())
        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.equal(p.currentSubForm, s2)
        assert.isNotOk(p.hasNextStep())

        assert.isNotOk(p.nextChoice())
    })

    it('consume', function() {
        let s1 = f.chunk('x')
        let s2 = f.chunk('y')
        let rule = f.choice(s1, s2)
        let p = rule.createProgress()

        p.nextStep()
        assert.equal(p.consume(new ParsingNode('x')).type, 'descend')
        assert.equal(p.consume(new ParsingNode('u')).type, 'descend')
        assert.equal(p.consume(new ParsingNode(s1)).type, 'descend')
        assert.equal(p.consume(new ParsingNode(s2)).type, 'break')

        p.nextChoice()
        assert.equal(p.consume(new ParsingNode('x')).type, 'descend')
        assert.equal(p.consume(new ParsingNode(s2)).type, 'descend')
        assert.equal(p.consume(new ParsingNode(s1)).type, 'break')
    })
})
