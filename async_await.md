# 编写第一个 async/await 函数
```
methods:{
    //调用菜单获取异步内容
    async menuList() {
     const response =  await this.http.get("https://www.easy-mock.com/mock/5bbab3f329a4d80bbccbcb81/example/menuData")
     const column = await response.data.data
     console.log(column);
    }
  },
  mounted(){
      //调用获取菜单方法
      this.menuList()
  }
```
# 链式调用
```

```