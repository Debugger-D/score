<template>
  <div class="">
    <ul>
      <li
        v-for="user in activeUsers"
        :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      users: {}
    }
  },

  computed: {
    // v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
    activeUsers: function () {
      return this.users.filter(function (user) {
        return user.isActive
      })
    }
  },

  async created() {
    const users = await axios.get("/api/users");

    // Vue 会通过 Object.defineProperty 对数据进行劫持，来实现视图响应数据的变化，
    // 然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 Vue 来劫持我们的数据，
    // 在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 Vue 劫持我们的数据呢？
    // 可以通过 Object.freeze 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。
    this.users = Object.freeze(users);
  },
  mounted () {},
  methods: {},

  beforeDestroy() {
    // Vue 组件销毁时，会自动清理它与其它实例的连接，解绑它的全部指令及事件监听器，
    // 但是仅限于组件本身的事件。如果在 js 内使用 addEventListene 等方式是不会自动销毁的，
    // 我们需要在组件销毁时手动移除这些事件的监听，以免造成内存泄露
    removeEventListener('click', this.click, false)
  }
}
</script>


/**

  1.1、v-if 和 v-show 区分使用场景

  1.2、computed 和 watch  区分使用场景
  computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，
  下一次获取 computed 的值时才会重新计算 computed  的值；

  watch： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

  运用场景：

  当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，
  避免每次获取值时，都要重新计算；

  当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作
  ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

  1.3、v-for 遍历必须为 item 添加 key，且避免同时使用 v-if



  （1）服务端渲染的优点：

  更好的 SEO：因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容，
  所以在 SPA 中是抓取不到页面通过 Ajax 获取到的内容；而 SSR 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），
  所以搜索引擎爬取工具可以抓取渲染好的页面；

  更快的内容到达时间（首屏加载更快）：SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，
  才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；
  SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间；

  （2）服务端渲染的缺点：

  更多的开发条件限制：例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，
  这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；
  并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；

  更多的服务器负载：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用CPU 资源
  ，因此如果你预料在高流量环境下使用，请准备相应的服务器负载，并明智地采用缓存策略。
 */
