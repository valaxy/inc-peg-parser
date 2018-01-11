import DescendOperation from '../../lib/parsing/descendOperation'
import ParsingNode from '../../lib/parsing/parsingNode'
import * as f from '../../lib/form/index'
import { assert } from 'chai'
import { createTree, checkTreeEqual, checkOperationResult } from './util'


describe('DescendOperation', function() {
    let subRule = f.chunk('abc')
    let rule    = f.sequence(subRule)

    it('case', function() {
        let generate = new ParsingNode(subRule)
        let op = new DescendOperation(generate)
        let connective = new ParsingNode(rule)
        let vagrant = new ParsingNode('x')
        checkOperationResult(op.do(connective, vagrant), generate, vagrant)
        checkTreeEqual(connective, createTree([rule, [subRule]]))
    })
})
