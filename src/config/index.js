const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  },
  testing: {
    isProduction: false
  }
}[process.env.NODE_ENV || 'development']

export default {
  apiHost: process.env.DATURA || (environment.isProduction && 'https://www.taidii.cn') || 'https://www.taidii.cn',
  isProduction: environment.isProduction,
  TOP_DEFAULT_CONFIG: {
    pullText: '下拉刷新', // 下拉时显示的文字
    triggerText: '释放更新', // 下拉到触发距离时显示的文字
    loadingText: '加载中...', // 加载中的文字
    doneText: '加载完成', // 加载完成的文字
    failText: '加载失败', // 加载失败的文字
    loadedStayTime: 400, // 加载完后停留的时间ms
    stayDistance: 50, // 触发刷新后停留的距离
    triggerDistance: 70 // 下拉刷新触发的距离
  },
  BOTTOM_DEFAULT_CONFIG: {
    pullText: '上拉加载',
    triggerText: '释放更新',
    loadingText: '加载中...',
    doneText: '加载完成',
    failText: '加载失败',
    loadedStayTime: 400,
    stayDistance: 50,
    triggerDistance: 70
  }
}
