import BreakOperation from '../../lib/parsing/breakOperation'
import ParsingNode from '../../lib/parsing/parsingNode'
import * as f from '../../lib/form/index'
import { assert } from 'chai'
import { createTree, checkTreeEqual, checkOperationResult } from './util'

describe('BreakOperation', function() {
    it('case', function() {
        let v = new ParsingNode(f.chunk('abc'))
        let v1 = new ParsingNode('')
        let v2 = new ParsingNode('')
        v.add(v1)
        v.add(v2)

        let v3 = new ParsingNode('')
        v.nextVagrantNode = v3

        let op = new BreakOperation()
        let connective = new ParsingNode('')
        let result = op.do(connective, v)
        checkOperationResult(result, connective, v1)
        assert.equal(v.children.length, 0)
        assert.equal(v1.nextVagrantNode, v2)
        assert.equal(v2.nextVagrantNode, v3)
        assert.equal(v3.nextVagrantNode, null)
    })
})
