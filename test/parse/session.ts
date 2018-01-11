import 'mocha'
import { assert } from 'chai'
import Session from '../../lib/parsing/session'
import ParsingNode from '../../lib/parsing/parsingNode'
import * as f from '../../lib/form/index'
import { createCommonTree, createTree, checkTreeEqual } from './util'

describe('session', function() {
    let s = new Session()

    describe('_findNextConnectiveNode', function() {
        it('return null', function() {
            let rule = f.chunk('a')
            let root = new ParsingNode(rule)
            root.progress.nextStep()
            assert.isNotOk(root.progress.hasNextStep())
            assert.equal(s._findNextConnectiveNode(root), null)

            let subNode = new ParsingNode(rule)
            root.add(subNode)
            subNode.progress.nextStep()
            assert.isNotOk(subNode.progress.hasNextStep())
            assert.equal(s._findNextConnectiveNode(subNode), null)
        })

        it('return node', function() {
            let rule = f.chunk('a')
            let root = new ParsingNode(rule)
            assert.isOk(root.progress.hasNextStep())
            assert.equal(s._findNextConnectiveNode(root), root)

            let subNode = new ParsingNode(rule)
            root.add(subNode)
            subNode.progress.nextStep()
            assert.isNotOk(subNode.progress.hasNextStep())
            assert.equal(s._findNextConnectiveNode(subNode), root)
        })
    })

    describe('_rebuildVagrants', function() {
        it('1 child', function() {
            let root = new ParsingNode('root')
            let n1 = new ParsingNode('n1')
            root.add(n1)

            let n = new ParsingNode('')
            let head = s._rebuildVagrants(root, n1, n)

            assert.equal(root.children.length, 0)
            assert.equal(head, n1)
            assert.equal(n1.nextVagrantNode, n)
            assert.equal(n.nextVagrantNode, null)
        })

        it('left in 2 children', function() {
            let root = new ParsingNode('root')
            let n1 = new ParsingNode('n1')
            let n2 = new ParsingNode('n2')
            root.add(n1)
            root.add(n2)

            let n = new ParsingNode('')
            let head = s._rebuildVagrants(root, n1, n)

            assert.equal(root.children.length, 0)
            assert.equal(head, n1)
            assert.equal(n1.nextVagrantNode, n)
            assert.equal(n.nextVagrantNode, n2)
            assert.equal(n2.nextVagrantNode, null)
        })

        it('right in 2 children', function() {
            let root = new ParsingNode('root')
            let n1 = new ParsingNode('n1')
            let n2 = new ParsingNode('n2')
            root.add(n1)
            root.add(n2)

            let n = new ParsingNode('')
            let head = s._rebuildVagrants(root, n2, n)

            assert.equal(root.children.length, 0)
            assert.equal(head, n1)
            assert.equal(n1.nextVagrantNode, n2)
            assert.equal(n2.nextVagrantNode, n)
            assert.equal(n.nextVagrantNode, null)
        })

        it('middle in 3 children', function() {
            let root = new ParsingNode('root')
            let n1 = new ParsingNode('n1')
            let n2 = new ParsingNode('n2')
            let n3 = new ParsingNode('n3')
            root.add(n1)
            root.add(n2)
            root.add(n3)

            let n = new ParsingNode('')
            let head = s._rebuildVagrants(root, n2, n)

            assert.equal(root.children.length, 0)
            assert.equal(head, n1)
            assert.equal(n1.nextVagrantNode, n2)
            assert.equal(n2.nextVagrantNode, n)
            assert.equal(n.nextVagrantNode, n3)
            assert.equal(n3.nextVagrantNode, null)
        })
    })


    describe('_maintainAt', function() {
        it('chunk', function() {
            let session = new Session
            let chunk = f.chunk('abc')
            let root = new ParsingNode(chunk)

            let a = new ParsingNode('a')
            session._maintainAt(root, a)
            checkTreeEqual(root, createTree([chunk, [
                ['a']
            ]]))

            let b = new ParsingNode('b')
            session._maintainAt(root, b)
            checkTreeEqual(root, createTree([chunk, [
                ['a'],
                ['b']
            ]]))

            let c = new ParsingNode('c')
            session._maintainAt(root, c)
            checkTreeEqual(root, createTree([chunk, [
                ['a'],
                ['b'],
                ['c']
            ]]))
        })
    })
})
