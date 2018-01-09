import * as f from '../lib/form/index'
import parse from '../lib/tool/parse'
import { assert } from 'chai'

describe('Progress', function() {
    describe('Optional', function() {
        let rule = f.optional(f.chunk('abc'))

        it('match', function() {
            let text = 'abc'
            let root = parse(rule, text)
            assert.isOk(true)
        })
    })
})
