import ParseProgress from '../parseProgress/parseProgress'

abstract class Form {
    /** 创建一个进度对象 */
    abstract createProgress(): ParseProgress

    /** 判断是否是同一种Form */
    isSameType(b: Form) {
        return this.constructor == b.constructor
    }
}

export default Form
