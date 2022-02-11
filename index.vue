<template>
  <div>
    <div :class="{ disabled: disabled }">
      <canvas ref="verifyCode" :width="width" :height="height" @click="handleDraw">您的浏览器不支持HTML5 canvas标签。</canvas>
    </div>
  </div>
</template>
<script>
// 随机数
const randomNum = (min, max) => {
  return parseInt(Math.random() * (max - min) + min)
}
// 随机颜色
const randomColor = (min, max) => {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}
export default {
  data() {
    return {
      code: ''
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    pool: {
      type: String,
      default: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    },
    width: {
      type: Number,
      default:120
    },
    height: {
      type: Number,
      default:40
    },
    codeLength: {
      type: Number,
      default: 4
    }
  },
  methods: {
    handleDraw() {
      // 初始化/刷新 绘制图片验证码
      if(this.$props.disabled) return 
      this.draw();
    },
    // 绘制图片
    draw() {
      // 3.填充背景颜色，背景颜色要浅一点
      const ctx = this.$refs.verifyCode.getContext('2d'); // const ctx = document.getElementById('verify').getContext('2d');

      // 填充颜色
      ctx.fillStyle = randomColor(180, 230)
      // 填充的位置
      ctx.fillRect(0, 0, this.$props.width, this.$props.height)
      // 定义paramText
      let code = ''
      // 4.随机产生字符串，并且随机旋转
      // console.log(this.$props, 'this.$propsthis.$propsthis.$props')
      for (let i = 0; i < this.$props.codeLength; i++) {
        // 随机的四个字
        const text = this.$props.pool[randomNum(0, this.$props.pool.length)]
        code += text
        // 随机的字体大小
        const fontSize = randomNum(this.$props.height / 2, this.$props.height)
        // 字体随机的旋转角度
        const deg = randomNum(-30, 30)
        /*
         * 绘制文字并让四个文字在不同的位置显示的思路 :
         * 1、定义字体
         * 2、定义对齐方式
         * 3、填充不同的颜色
         * 4、保存当前的状态（以防止以上的状态受影响）
         * 5、平移translate()
         * 6、旋转 rotate()
         * 7、填充文字
         * 8、restore出栈
         * */
        ctx.font = fontSize + 'px Simhei'
        ctx.textBaseline = 'top'
        ctx.fillStyle = randomColor(80, 150)
        /*
         * save() 方法把当前状态的一份拷贝压入到一个保存图像状态的栈中。
         * 这就允许您临时地改变图像状态，
         * 然后，通过调用 restore() 来恢复以前的值。
         * save是入栈，restore是出栈。
         * 用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。 restore：用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。
         *
         * */
        ctx.save()
        ctx.translate((this.$props.width / this.$props.codeLength) * i + 15, this.$props.height / 2)
        ctx.rotate((deg * Math.PI) / 180)
        // fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色。
        // 请使用 font 属性来定义字体和字号，并使用 fillStyle 属性以另一种颜色/渐变来渲染文本。
        // context.fillText(text,x,y,maxWidth);
        ctx.fillText(text, -15 + 5, -15)
        ctx.restore()
      }
      // 5.随机产生5条干扰线,干扰线的颜色要浅一点
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(randomNum(0, this.$props.width), randomNum(0, this.$props.height))
        ctx.lineTo(randomNum(0, this.$props.width), randomNum(0, this.$props.height))
        ctx.strokeStyle = randomColor(180, 230)
        ctx.closePath()
        ctx.stroke()
      }
      // 6.随机产生40个干扰的小点
      for (let i = 0; i < 40; i++) {
        ctx.beginPath()
        ctx.arc(randomNum(0, this.$props.width), randomNum(0, this.$props.height), 1, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fillStyle = randomColor(150, 200)
        ctx.fill()
      }

      this.code = code; // 获取到验证码的内容 用于后续提交验证
      this.$emit('change', this.code)
    }
  },
  mounted() {
    this.draw();
  }
}
</script>
<style scoped>
.disabled {
  opacity: 0.5;
  filter: grayscale(1);
}
</style>
