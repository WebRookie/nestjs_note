
/**
 * 如果是正式环境，记录每个报错的信息。以及请求的信息
 * 
 * 
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
const fs = require('fs');
const dayjs = require("dayjs") ;
const path = require('path');


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
    .status(status)
    .json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: request.url,
      requestData: request.body
    })

    // TODO 文件路径没有达到想要的位置但是输出还是实现了
    
    // const now = dayjs().format('YYYY/MM/DD HH:mm:ss')
    // const errMessage = `${now}--- ${status} --- ${JSON.stringify(request.body??'{}')} --- ${request.url} --- ${request.method}}` + '\r\n'
    // const txtUrl =  path.resolve(__dirname, '../../log');
    // console.log(txtUrl)
    // fs.appendFile(__dirname + '/error_log.txt',errMessage, (err) => {
    //   if(err) console.log(err)
    // })
    
  } 
}