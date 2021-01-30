<template>
  <div>
    <h3>(1) 处理 async 函数中的错误</h3>
    <h3>(2) 正确处理多个 await 操作的并行 串行</h3>
    <h3>(3) 使用 Promise.all() 让多个 await 操作并行</h3>
    <h3>(4) 在 for 循环中正确的使用 await</h3>
  </div>
</template>
<script>
import { async } from "q";
const bluebird = require('bluebird');
export default {
  data() {
    return {
      a: "1"
    };
  },
  methods: {
    //(1)编写第一个 async/await 函数 , 调用菜单获取异步内容

    step1(timeout) {
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          resolve('async await 需要配合Promise，ajax请求时候不用')
          // reject('失败')
        }, timeout);
      });
    },
    async menuList1() {
      const response = await this.step1(2000)
      console.log(`111111111111`, response);
    },



    //（3.1）箭头函数
    // async person(uid) {
    //   this.$axios.get("/api/columns/" + uid).then(res => {
    //     console.log(3, res);
    //   });
    // },
    // //4 处理 async 函数中的错误

    // async getColumn3(id) {
    //   // debugger
    //   const response = await this.step7(200);
    //   debugger
    //   if (response.status !== 200) {
    //     throw new Error(response.statusText, "请求错误");
    //   }
    //   return await response;
    // },

    // async showColumnInfo(id) {
    //   try {
    //     const column = await this.getColumn3(id);
    //     console.log(4, column);
    //   } catch (err) {
    //     console.error(err, "错误");
    //   }
    // },



    // 串行和并行的区别为  数据传送方式不同:
    // 串行: 口传输方式为数据排成一行、一位一位送出接收也一样,
    //  并行: 口传输8位数据一次送出.

    // 5 正确处理多个 await 操作的并行串行
    sleep4(timeout = 2000) {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve('成功')
        }, timeout);
      });
    },
    sleep3(timeout = 3000) {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve('成功2')
        }, timeout);
      });
    },
    async showColumn5() {
      console.time()
      const sleep4 = await this.sleep4(5000);
      const sleep3 = await this.sleep3(6000);
      console.timeEnd()
      console.log(4, sleep4); //两个所用时间相加
      console.log(3, sleep3);
    },




    //6 使用 Promise.all() 让多个 await 操作并行
    async getColumn6(timeout = 1000) {
      const response = await new Promise(resolve => {
        setTimeout(function () {
          resolve('成功00')
        }, timeout);
      });
      return response
    },
    async showColumn6() {
      console.time()
      const [feweekly, toolingtips] = await Promise.all([
        this.getColumn6(3000),
        this.getColumn6(4000)
      ]);
      console.timeEnd()
      console.log(6, feweekly); //用时四秒用的是最短的时间
      console.log(6, toolingtips);
    },


    // 7 结合 await 和任意兼容 .then() 的代码
    // async main(){
    //   console.log('waiting...');
    //   await bluebird.delay(2000);
    //   console.log('done!'); 
    // }

    //8 在 for 循环中正确的使用 await
    async getColumn8(id) {
      await bluebird.delay(1000);
      const response = await this.$axios.get("/api/columns/" + id);
      return await response
    },
    async showColumn8() {
      const names = ['feweekly', 'toolingtips']; //加入到 getColumn8循环
      const promises = names.map(x => this.getColumn8(x))
      // for of 循环 
      for (const promise of promises) {
        const column = await promise;
        console.log(8, column);
      }
    }
  },
  mounted() {
    //1 调用获取菜单方法
    //this.menuList()

    //2 链式调用
    // this.getColumn().then(column => {
    //   console.log(2, column);
    // });

    // //3 把任意类型的函数转成 async 风格
    // this.person("feweekly");

    // //4 捕获错误用 try cathc
    // this.showColumnInfo("feweekly");

    // //5 正确处理多个 await 操作的并行串行
    // this.showColumn5();

    //6 使用 Promise.all() 让多个 await 操作并行
    this.showColumn6()

    // //7 结合 await 和任意兼容 .then() 的代码
    // // this.main()

    // //8 在 for 循环中正确的使用 await
    // this.showColumn8()


    this.menuList1()

    //解决报错问题
    // this.getColumn3()
    // this.menuList2()
  }
};
</script>
