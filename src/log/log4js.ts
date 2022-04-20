import * as Log4js from "log4js";


// 定义日级别
export enum LoggerLevel {
  ALL = "ALl",
  MARK = "MARK",
  TRACE = "TRACE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  FATAL = "FATAL",
  OFF = "OFF"
}

//  内容跟踪类
export class ContextTrace {
  constructor(readonly context: string, readonly path?: string, readonly lineNumber?: number, readonly columnNumber?: number) { }
}


Log4js.addLayout('json', (logConfig: any) => {
  return (logEvent: Log4js.LoggingEvent): string => {
    let moduleName: string = '';
    let position: string = '';

    // 日志组装
    const messageList: string[] = [];
    logEvent.data.forEach((value: any) => {
      if(value instanceof ContextTrace) {
        moduleName = value.context;
        // 显示触发日志的坐标（行，列）
        if(value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber}, ${value.columnNumber}`
        }
        return
      }
      
      messageList.push(value);
    });
    return '12'

  }
})
