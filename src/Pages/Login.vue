<template>
  <div class="login-wrap">
    <div class="ms-title">后台管理模板</div>
    <div class="ms-login">
      <!--
      model	表单数据对象
      rules 表单验证规则
      @keyup.enter.native 点击回车
      prop 	表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的

      -->
      <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="0px" class="demo-userInfo">
        <el-form-item prop="username">
          <el-input v-model="userInfo.username" prefix-icon="el-icon-goods" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            class="form-inputs"
            prefix-icon="el-icon-edit login-pwd-icon"
            @input="onfocus"
            type="password"
            placeholder="密码"
            v-model="userInfo.password"
            @keyup.enter.native="submitForm('userInfo')"
            v-if="!isShow"
          >
            <i slot="suffix" class="el-icon-view" @click="lookPass"></i>
          </el-input>
          <el-input
            ref="password"
            class="form-inputs"
            placeholder="密码"
            prefix-icon="el-icon-edit login-pwd-icon"
            @input="onfocus"
            type="text"
            v-model="userInfo.password"
            @keyup.enter.native="submitForm('userInfo')"
            v-if="isShow"
          >
            <i slot="suffix" class="el-icon-view" @click="lookPass"></i>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" :loading="loading" @click="submitForm('userInfo')">登录</el-button>
        </div>
        <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setSessionStorage, clearSessionStorage, getSessionStorage } from "@/utils/common";
/*利用vuex 实现数据存储*/
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  data: function () {
    return {
      loading: false, //页面加载的 按钮加载
      isShow: false, //点击眼睛显示密码
      userInfo: {
        username: 'user1',
        password: 'user1',
        ACTIVE_CODE: ' '
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    //登陆
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate(valid => { // 验证elementUi 表单
        if (valid) {
          this.loading = true
          localStorage.removeItem("localMenus") //清楚routeStorage.vue的缓存菜单
          _this.login(_this.userInfo).then((data) => {
            setSessionStorage(`CommData`, data);
            this.$router.push("/");
          }).catch(error => {
            // this.$message.error(error);
          })
          this.loading = false
        } else {
          this.$message({
            message: '登录信息失败',
            center: true
          })
          this.loading = false
          return false
        }
      })
    },
    //切换是否显示密码
    lookPass() {
      this.isShow = !this.isShow
    },
    //关闭加载按钮
    onfocus() {
      this.loading = false
    }
  }
}

</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>

