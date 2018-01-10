import * as f from '../../lib/form/index'
import { assert } from 'chai'

describe('OptionalProgress', function() {
    it('case', function() {
        let rule = f.optional(f.chunk('abc'))
        let p = rule.createProgress()

        assert.isOk(p.hasNextStep())
        p.nextStep()
        assert.isNotOk(p.hasNextStep())

        assert.isOk(p.nextChoice())
        assert.isNotOk(p.hasNextStep())
    })
})
