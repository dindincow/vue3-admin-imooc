<template>
  <div class="login-container">
    <!-- element 圖標使用 -->
    <!-- <div><CirclePlus style="width: 30px; color: red"></CirclePlus></div> -->
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginFromRef"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <LangSelect class="langSelect" />
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="請輸入用戶名"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="請輸入密碼"
          name="password"
          :type="passwordType"
          v-model="loginForm.password"
        />
        <span class="show-pwd" @click="changePwdType">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
        </span>
      </el-form-item>

      <el-button
        class="btn"
        type="primary"
        :loading="loading"
        @click="handlerLogin"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
      <div class="tip" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
// element 圖標使用s
// import { CirclePlus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { validatePassword } from './rules'
import LangSelect from '@/components/LangSelect'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const store = useStore()
const loginFromRef = ref(null)
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
const loginRules = ref({
  username: [{ required: true, message: i18n.t('msg.login.usernameRule'), trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword(), trigger: 'blur' }]
})

// 密碼展現類型
const passwordType = ref('password')
const changePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 提交登入
const loading = ref(false)
const handlerLogin = () => {
  loginFromRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        // TODO:登入後處理
        // router.push({ path: '/' })
      })
      .catch((err) => {
        loading.value = false
        console.log(err)
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .tip{
      font-size: 14px;
      color: #fff;
      line-height: 21px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;
    display: flex;
    align-items: baseline;

    .langSelect{
      font-size: 25px;
      background: #fff;
      padding: 3px;
      border-radius: 5px;
    }

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.btn {
  width: 100%;
  margin-bottom: 30px;
}
</style>
