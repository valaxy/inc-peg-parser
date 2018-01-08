import Form from '../form/form'
import ParsingNode from '../parsing/parsingNode'

/** 标识一个节点的解析进程 */
abstract class ParseProgress {
    /** 切换到下一个choice成功返回true */
    abstract nextChoice(): boolean

    /** 切换到下一个step成功返回true */
    abstract nextStep(): boolean

    /** 判断是否有下一个step */
    abstract hasNextStep(): boolean


    abstract take(ch: string): { }
}

export default ParseProgress
