import validatorBase from './base'
const formValidator ={
    /**
     * 验证数字
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    integer:(rule, value, callback) => {
        if (!validatorBase.match(value, validatorBase.rules.integer)) {
            return callback(new Error(validatorBase.message));
        }
        callback()
    },
    /**
     * 验证金额
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    money:(rule, value, callback) => {
        if (!validatorBase.match(value, validatorBase.rules.money)) {
            return callback(new Error(validatorBase.message));
        }
        callback()
    },
    /**
     * 浮点型数字验证
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    float:(rule, value, callback) => {
        if (!validatorBase.match(value, validatorBase.rules.float)) {
            return callback(new Error(validatorBase.message));
        }
        callback()
    },
    /**
     * 密码
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    password:(rule, value, callback) => {
        if (!validatorBase.match(value, validatorBase.rules.password)) {
            return callback(new Error(validatorBase.message));
        }
        callback()
    },
    /**
     * 日期时间
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    dateTime:(rule, value, callback) => {
        if (!validatorBase.match(value, validatorBase.rules.dateTime)) {
            return callback(new Error(validatorBase.message));
        }
        callback()
    },
    /**
     * 日期
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    date:(rule, value, callback) => {
        if (!validatorBase.match(value, validatorBase.rules.date)) {
            return callback(new Error(validatorBase.message));
        }
        callback();
    },
    /**
     * 座机
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    tel:(rule, value, callback) => {
        if (!validatorBase.match(value, validatorBase.rules.tel)) {
            return callback(new Error(validatorBase.message));
        }
        callback()
    },
    /**
     * 银行卡号
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    bankNo:(rule, value, callback) => {
        if (!validatorBase.match(value, validatorBase.rules.bankno)) {
            return callback(new Error(validatorBase.message));
        }
        callback()
    }
}

export default formValidator