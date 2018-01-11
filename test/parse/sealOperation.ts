import SealOperation from '../../lib/parsing/sealOperation'
import ParsingNode from '../../lib/parsing/parsingNode'
import * as f from '../../lib/form/index'
import { assert } from 'chai'
import { createTree, checkTreeEqual, checkOperationResult } from './util'


describe('SealOperation', function() {
    let rule = f.optional(f.chunk('aa'))

    it('case', function() {
        let op = new SealOperation()
        let connective = new ParsingNode(rule)
        let vagrant = new ParsingNode('x')
        connective.progress.nextChoice()
        connective.progress.nextStep()

        checkOperationResult(op.do(connective, vagrant), connective, vagrant)
        checkTreeEqual(connective, createTree([rule]))
    })
})
