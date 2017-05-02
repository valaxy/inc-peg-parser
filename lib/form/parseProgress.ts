import Session from '../session'
import Form from './form'
import ParsingNode from '../parsingNode'

abstract class ParseProgress {
    /** 切换到下一个choice成功返回true */
    abstract nextChoice(): boolean

    /** 切换到下一个step成功返回true */
    abstract nextStep(): boolean

    /** 解析成功返回true */
    abstract consume(symbol: ParsingNode): boolean

    /** 判断是否有下一个step */
    abstract hasNextStep(): boolean
}

export default ParseProgress
