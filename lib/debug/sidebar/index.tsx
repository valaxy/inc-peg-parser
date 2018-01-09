import React = require('react')
import './index.scss'

export default class Sidebar extends React.Component {
    state = {
        cursorIndex: -1
    }

    props: {
        parseText: string,
        next?: Function
    }

    private _handleClickNext() {
        let { next } = this.props
        let cursorIndex = this.state.cursorIndex + 1
        this.setState({
            cursorIndex
        })
        next && next(cursorIndex)
    }

    private _handleClickPrev() {

    }

    render() {
        let { parseText } = this.props
        let { cursorIndex } = this.state

        return (
            <div className="sidebar">
                <div className="buttonList">
                    <button onClick={this._handleClickPrev.bind(this)}>&lt;</button>
                    <button onClick={this._handleClickNext.bind(this)}>&gt;</button>
                </div>
                <div className="parseText">
                    {parseText.split('').map((ch, i) => (
                        <span data-cursor={i == cursorIndex} key={i}>
                            {ch}
                        </span>
                    ))}
                </div>
            </div>
        )
    }
}
