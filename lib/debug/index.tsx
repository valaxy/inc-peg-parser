import ParsingNode from '../parsing/parsingNode'
import Session from '../parsing/session'
import verbatimParsing from '../parsing/verbatimParsing'
import createPEG from './peg/numberExpression'

import React = require('react')
import ReactDom = require('react-dom')
import sigma = require('sigma')
import leftAlignNarrowDraw from '../draw/leftAlignNarrowDraw'
import centerAlignNarrowDraw from '../draw/centerAlignNarrowDraw'
import Sidebar from './sidebar/index'
import './index.scss'

const createNode = function(symbol = '@', children = []) {
    let node: any = new ParsingNode(symbol)
    node._children = children
    children.forEach(child => child._parent = node)
    return node
}


const TEXT = '123'

class Main extends React.Component {
    private _container
    private _session: Session
    private _connectiveNode: ParsingNode
    private _root: ParsingNode

    private _handleNext(cursorIndex) {
        let ch = TEXT[cursorIndex]
        let vagrant = new ParsingNode(ch)
        let result = this._session.insertAfter(this._connectiveNode, vagrant, vagrant)
        if (result) {
            this._connectiveNode = result
        } else {
            console.error('中断：解析失败')
        }
        // console.log('toIndentString')
        // console.log(this._root.toIndentString())
        this._drawTree(this._root)
    }

    private _drawTree(root: ParsingNode) {
        this._container.graph.clear()

        let infos = centerAlignNarrowDraw(root)
        infos.forEach((info) => {
            this._container.graph.addNode({
                id: `n${info.id}`,
                label: info.name,
                x: info.x,
                y: info.y,
                size: 1,
                color: '#f00'
            })
        })

        infos.forEach((info, index) => {
            if (info.parentID !== null) {
                this._container.graph.addEdge({
                    id: `e${index}`,
                    source: `n${info.parentID}`,
                    target: `n${info.id}`
                })
           }
        })

        this._container.refresh()
    }

    componentDidMount() {
        this._container = new sigma(this._container)
        let peg = createPEG()
        this._root = new ParsingNode(peg)
        this._session = new Session(verbatimParsing)
        this._connectiveNode = this._root
        this._drawTree(this._root)
    }

    render() {
        return (
            <div className="main">
                <Sidebar parseText={TEXT} next={this._handleNext.bind(this)} />
                <div className="canvas" ref={_ => this._container = _}>
                </div>
            </div>
        )
    }
}


ReactDom.render(<Main />, document.querySelector('.everything'))


// let root = createNode('a', [
//     createNode('b'),
//     createNode('c', [
//         createNode('d'),
//         createNode('e'),
//         createNode('f')
//     ]),
//     createNode('g'),
//     createNode('f', [
//         createNode('h'),
//         createNode('i')
//     ])
// ])
