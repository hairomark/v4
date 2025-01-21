// https://nuxt.com/docs/guide/directory-structure/app.config
export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'cool',
    notifications: {
      // 通知配置
      position: 'top-right'
    },
    button: {
      // 按钮默认样式
      default: {
        color: 'primary',
        variant: 'solid'
      }
    }
  }
}) 