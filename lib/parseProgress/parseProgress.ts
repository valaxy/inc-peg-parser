import Form from '../form/form'
import ParsingNode from '../parsing/parsingNode'

// 实例化成功后就处于一个有效状态

/** 标识一个节点的解析进程 */
abstract class ParseProgress {
    /** 切换到下一个choice成功返回true */
    abstract nextChoice(): boolean

    /** 切换到下一个step，必须在hasNextStep为true的情况下调用 */
    abstract nextStep(): void

    /** 判断是否有下一个step */
    abstract hasNextStep(): boolean
}

export default ParseProgress
