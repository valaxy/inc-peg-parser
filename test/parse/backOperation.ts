import BackOperation from '../../lib/parsing/backOperation'
import ParsingNode from '../../lib/parsing/parsingNode'
import * as f from '../../lib/form/index'
import { assert } from 'chai'
import { createTree, checkTreeEqual, checkOperationResult } from './util'


describe('BackOperation', function() {
    let op = new BackOperation()

    it('fail 0', function() {
        let rule = f.chunk('aa')
        let connective = new ParsingNode(rule)
        let vagrant = new ParsingNode('x')

        checkOperationResult(op.do(connective, vagrant), null, vagrant)
    })

    it('fail 2', function() {
        let subRule = f.chunk('aa')
        let rule = f.sequence(subRule)
        let connective = new ParsingNode(rule)
        let subNode = new ParsingNode(subRule)
        connective.add(subNode)
        let vagrant = new ParsingNode('x')

        checkOperationResult(op.do(subNode, vagrant), null, vagrant)
    })

    it('simple nextChoice 1', function() {
        let rule = f.choice(f.chunk('a'), f.chunk('b'))
        let connective = new ParsingNode(rule)
        let vagrant = new ParsingNode('x')

        checkOperationResult(op.do(connective, vagrant), connective, vagrant)
        assert.isNotOk(connective.progress.nextChoice())
    })

    it('simple nextChoice 2', function() {
        let subRule = f.chunk('a')
        let rule = f.choice(subRule, f.chunk('b'))
        let root = new ParsingNode(rule)
        let subNode = new ParsingNode(subRule)
        root.add(subNode)
        let vagrant = new ParsingNode('x')

        checkOperationResult(op.do(subNode, vagrant), root, vagrant)
        assert.isNotOk(root.progress.nextChoice())
        assert.equal(vagrant.nextVagrantNode, null)
    })


    it('vagrants add up', function() {
        let subRule = f.chunk('a')
        let rule = f.choice(subRule, subRule)
        let root = new ParsingNode(rule)
        let s1 = new ParsingNode(subRule)
        let s2 = new ParsingNode(subRule)
        let n1 = new ParsingNode('a')
        root.add(s1)
        root.add(s2)
        s1.add(n1)

        let vagrant = new ParsingNode('x')
        checkOperationResult(op.do(s2, vagrant), root, s1)
        assert.equal(s1.nextVagrantNode, vagrant) // s2被删掉了
        assert.equal(vagrant.nextVagrantNode, null)
        assert.equal(root.children.length, 0)
    })
})
