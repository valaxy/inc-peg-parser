import ParseProgress from './ParseProgress'

abstract class Form {
    /** 创建一个进度对象 */
    abstract createProgress(): ParseProgress
}

export default Form
