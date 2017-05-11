import ParseProgress from '../parseProgress/parseProgress'

abstract class Form {
    abstract get id(): number

    /** 创建一个进度对象 */
    abstract createProgress(): ParseProgress
}

export default Form
