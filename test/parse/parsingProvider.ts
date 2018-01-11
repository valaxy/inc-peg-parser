import ParsingProvider from '../../lib/parsing/parsingProvider'
import ParsingNode from '../../lib/parsing/parsingNode'
import { createCommonTree } from './util'
import { assert } from 'chai'

describe('ParsingProvider', function() {
    describe('leftMostAncestor', function() {
        it ('itself', function() {
            let n = createCommonTree([])
            assert.equal(ParsingProvider.leftMostAncestor(n), n)
        })

        it('parent not root', function() {
            let root = createCommonTree([
                [[],[]], []
            ])
            let parent = root.children[0]
            let n = parent.children[1]
            assert.equal(ParsingProvider.leftMostAncestor(n), parent)
        })

        it('parent is root', function() {
            let root = createCommonTree([
                [[],[]], [[],[]]
            ])
            let n = root.children[1].children[1]
            assert.equal(ParsingProvider.leftMostAncestor(n), root)
        })
    })
})
