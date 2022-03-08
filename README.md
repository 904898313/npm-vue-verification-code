# 验证码功能 -- 使用方法

# 参数说明
## @param pool
* 说明：生成验证码的数据池子
* 是否必传：否
* 值类型：String
* 默认值：'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

## @param width
* 说明：验证码区域的宽度
* 是否必传：否
* 值类型：Number
* 默认值：120

## @param height
* 说明：验证码区域的高度
* 是否必传：否
* 值类型：Number
* 默认值：40

## @param codeLength
* 说明：验证码长度
* 是否必传：否
* 值类型：Number
* 默认值：4

## @param disabled
* 说明：设置组件是否禁用
* 是否必传：否
* 值类型：Boolean

## 使用说明
```
//main.js
import verificationCode from 'ycg-vue-verification-code'
Vue.use(verificationCode);
//template
<verificationCode></verificationCode>
```

* 可以用ref获取验证码，变量名为code，如：this.$refs.canvas.code
* 也可以使用change回调获取验证码，验证码第一次初始化时也会调用