import Vue from 'vue';
import canvasDom from './index.vue';

const handler = {
  install: function () {
    Vue.component('verificationCode', canvasDom)
  }
}

export default handler