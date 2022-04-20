import path from 'path'

const baseLogPath = path.resolve('__dirname', './logs')


const log4jsConfig = {
  appenders: { // 配置输出源，用于定义输出日志的各种格式，后续真正的输出日志对象就是log4j的下属输出源 appender
    console: { type: 'console'},
    // 统计日志
    access: {
      type: 'dateFile',
      filename: `${baseLogPath}/access/access.log`, // 日志文件名 access.timer.log
      alwaysIncludePattern: true,  // 设置true,每个文件都会按照pattern命名
      pattern: 'YYYY-MM-DD',
      maxLogSize: 1024 * 1024 * 3,  // 日志文件大小
      daysToKeep: 30, // 文件保存日期 30天
      numBackups: 3, // ? 不太清楚
      compress: true, // 配置文件是否压缩
      category: 'http',  // category类型，
      keepFileExt: true, // 保留文件后缀
    },
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        // 自定义的输出格式 参考 https://blog.csdn.net/hello_word2/article/details/79295344
        pattern: "[%d{yyyy-MM-dd hh:mm:ss SS}] [%p] -h: %h -pid: %z msg: \'%m\'"
      },
      pattern: 'yyyy-MM-dd',
      daysToKeep: 30,
      numBackups: 3,
      keepFileExt: true
    },
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/error/error.log`,
      alwaysIncludePattern: true,layout: {
        type: 'pattern',
        pattern: "[%d{yyyy-MM-dd hh:mm:ss SS}] [%p] -h: %h -pid: %z msg: \'%m\'"
      },
      pattern: 'YYYY-MM-DD',
      daysToKeep: 30,
      numBackups: 3,
      keepFileExt: true
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile'
    }
  },
  categories: { // category类型 可以设置一个Logger实例的类型，按照另一个维度来区分日志。 通过getLogger获取Logger实例时，可指定获取具体的Logger实例 
    default: { appenders: ['console', 'access', 'app', 'errors'], level: 'DEBUG'},
    mysql: { appenders: ['access','errors'], level: 'info'},
    http: { appenders: ['access'], level:'DEBUG'},
  }
}

export default log4jsConfig