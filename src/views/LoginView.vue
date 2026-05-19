<template>
  <div class="login-container">
    <div class="login_logo">
      <a-image :width="155" :src="login_logo_url" :preview="false" />
    </div>
    <div class="login-form">
      <div class="login-header">
        <div class="header_text">欢迎登录</div>
      </div>

      <a-form layout="vertical" class="login-form-content" :model="loginForm">
        <a-form-item label="">
          <a-input v-model:value="loginForm.userName" placeholder="请输入用户名" size="large" allow-clear>
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="">
          <a-input-password v-model:value="loginForm.password" placeholder="请输入密码" size="large" allow-clear>
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item label="">
          <div style="display: flex; gap: 10px">
            <a-input v-model:value="loginForm.captcha" placeholder="请输入验证码" allow-clear>
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input>
            <div title="点击刷新验证码" class="capt_warp" @click="init">
              <img v-show="info.capt_success" id="capt" class="capt_img" />
              <div v-show="!info.capt_success" class="capt_err">
                <ReloadOutlined />
                点击刷新
              </div>
            </div>
          </div>
        </a-form-item>
        <a-form-item>
          <div class="login-options">
            <a-button type="link" style="margin: 0; padding: 0">忘记密码?</a-button>
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" size="large" block class="login-button" @click="login">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import login_logo_url from '@/assets/images/login_logo.svg'
import { reactive, onMounted } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import router from '@/router/index.ts'
import { postLogin, getAuthCode } from '@/apis/system'
const info = reactive({
  capt_success: false
})
const loginForm = reactive({
  userName: '',
  password: '',
  captcha: '',
  captchaId: '',
})
function login() {
  if (loginForm.userName.trim() === '' || loginForm.password.trim() === '') {
    message.error('请输入用户名和密码')
    return
  }
  postLogin({
    ...loginForm,
    password: md5(loginForm.password)
  }).then((res) => {
    if (res.success) {
      notification.success({
        message: '登录成功',
        description: `欢迎回来，${res.data.userName}！`
        // duration: 0
      })
      const { accessToken, id, userName, role } = res.data
      sessionStorage.setItem('token', accessToken)
      console.log(id, userName, role)
      // startAutoRefresh(accessToken, refreshTokenAction)
      // store.dispatch('user/login', accessToken) //将token存入vuex
      // store.dispatch('user/setUserInfo', { id, username: userName, role }) //将用户信息存入vuex
      router.replace('/')
    } else {
      notification.error({
        message: '登录失败',
        description: `登录失败，${res.desc}！`
      })
    }
  })
}

function init() {
  getAuthCode().then((res) => {
    const imgDom = document.getElementById('capt')
    if (!imgDom) {
      console.log('imgDom not found')
      return
    }
    try {

      const { data, captchaId } = res
      console.log(res, data, captchaId)
      // imgDom.src = data.startsWith('data:') ? data : `data:image/png;base64,${data}`
      // loginForm.captchaId = captchaId
      info.capt_success = true
    } catch (e) {
      console.log(e)
      info.capt_success = false
    }
  })
}
onMounted(() => {
  init()
})
</script>

<style scoped>
.login-container {
  position: relative;
  min-height: 100vh;
  background-image: url('/src/assets/images/login_bg.webp');
  background-size: cover;
  /* 确保图片覆盖整个容器 */
  background-position: center;
  /* 图片居中显示 */
  background-repeat: no-repeat;
  /* 防止图片重复 */
}

.login_logo {
  position: absolute;
  top: 44px;
  left: 33px;
}

.login-form {
  position: absolute;
  right: 15%;
  top: calc(50% - 238px);
  width: 421px;
  height: 476px;
  /* background: white; */
  border-radius: 6px;
  box-shadow: 0px 4px 8px 0px #0000000f;
  overflow: hidden;
  background:
    linear-gradient(180.05deg, #b1c9ff 1%, rgba(186, 206, 250, 0) 19.3%),
    linear-gradient(0deg, #f4f6fa, #f4f6fa);
}

.login-header {
  height: 134px;
  padding: 59px 0 0 30px;
  color: #141f37;
  font-weight: 500;
  font-size: 32px;
  font-family: Alibaba PuHuiTi;
}

.login-form-content {
  padding: 0 30px;
}

.capt_warp {
  width: 50%;
  height: 38px;
  line-height: 38px;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
}

.capt_img {
  width: 100%;
  height: 38px;
  line-height: 38px;
  /* background-color: white; */
  /* border-radius: 6px; */
  /* cursor: pointer; */
}

.capt_err {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.25);
}

.login-options {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.forgot-password {
  text-decoration: none;
  color: #2c5af3;
  text-align: justify;
  font-family: 'Alibaba PuHuiTi';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
}

.forgot-password:hover {
  color: #40a9ff;
  text-decoration: underline;
}

.login-button {
  box-shadow: 0px 2px 0px 0px #0591ff1a;
  border-radius: 6px;
  background: #3c55ea;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
}

.login-footer {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.register-link {
  color: #1890ff;
  text-decoration: none;
  margin-left: 5px;
  font-weight: 500;
}

.register-link:hover {
  color: #40a9ff;
  text-decoration: underline;
}
</style>
