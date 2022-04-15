## 简述
该项目是汇总最近学习的typescript和nodejs，通过nest来整合学习的知识，由于nest不熟练，该项目是根据官网一步一步走下来的.该项目本着尽可能的以面向对象的思路来开发。（本人是刚入行前端开发，面向对象的思想还不够贯彻）。有什么想法提issue哦，共同进步。

## 项目搭建  

首先全局安装nestjs脚手架
```
npm i -g @nestjs/cli 
```
然后创建nest项目  
```
nest new project-name
```  
然后就会创建出项目大概的结构了。其中默认是typescript。在安装的时候可以选择包管理器，我使用的是yarn  

### 熟悉项目结构  


首先src目录下多了几个核心文件   
app.controller.ts、  
app.controller.spec.ts    
app.modules.ts  
app.service.ts  
main.ts 


| -- | -- |
| :--: | :--: |
| app.controller.ts| 带有单个路由的基本控制器 | 
| app.controller.spec.ts | 针对控制器的单元测试 | 
| app.modules.ts |  T应用的根模块（root module） |
| app.service.ts | 具有单一方法的基本服务（service）method |
| main.ts | 应用程序的入口文件，它使用核心函数NestFactory来创建Nest应用程序实例 |  

然后运行程序
`yarn run start` 此时会进入debugger模式。输入localhost:3000k可以看到hello world    



### Modules   模块 

模块、可以分为对用的不同功能模块。也就是说，nest推荐以模块来分类功能。当然，你也可以把所有功能都放在一个文件里  

**Modules**  

app.modules.ts 就是项目的根模块、它是Nest构建应用程序的起点。其修饰器为@Module  

| ---- | ---- |
| :--: | :--: |
| provider | 将由 Nest 注入器实例化并且至少可以在此模块中共享的提供程序 |
| controllers | 此模块中定义的一组控制器，必须实例化 |
| imports | 导出此模块所需提供程序的导入模块列表 |
| exports | 其中子集providers由该模块提供，并且应该在导入该模块的其他模块中可用 |  


与他属于统一个程序域的`Controller`和 `Service` 和它密切相关。  

创建的模块默认是单例、可用通过exports导出，来达到共享模块。这样就可以在别的模块之间共享了。   
同样的 当你导入了一个模块后，你也可以把它导出去。

但是如果这个模块应用比较广的话，可用把全局范围注册 `@Global()`    
`@Global()` 装饰器使模块有全局范围，全局模块应该注册一次，通常是用来注册根模块或者核心模块。所以注册后，在别的模块里就不用再导入了。  


### Controller 控制器  
首先：什么事Controller？
> Controllers are responsible for handling incoming requests and returning responses to the client    

控制器就是负责处理从客户端进来的请求，以及返回对应的响应  
 这句话的理解就是。用户发送的请求，最初揭接触的就是Controller。  
 每个控制器有多个路由，不同的路由可以执行不同的动作  

### Provider  提供者  

其实就是处理服务   
在Nest中的主要思想是可以用来注入依赖；这样的好处就是可以互相建立关系！   

在上面Controller中，控制器应该处理http请求，然后将任务提交提供者。也就是用来处理逻辑任务的地方   

`@Injectable()` 它声明了被添加类，是可以被Nest IoC容器管理的类。  

### Pipes 管道  
 管道是一个用```@Injectable()```装饰器注解了类。管道应该实现`PipeTransform`接口   


管道主要是用来处理传入的数据。
- 数据转换 比如 从字符串转入整数  
- 验证。参数验证  

这种情况下，管道对【控制器路由处理程序】正在处理的对象进行操作。  
Nestjs 内置了几个开箱即用的管道，当然了，也可以自定义。这里我用的joi来进行参数验证  
##### Nest内置管道 
- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- DefaultValuePipe   
以上都是从@nestjs/common包中导出  

### 中间件  

默认情况下，Nest中间件等同于Express中间件  
中间件函数可以执行一下任务  
- 执行任何代码  
- 更改请求和响应对象
- 结束请求---响应周期
- 调用堆栈中的下一个中间件函数
- 如果当前中间件函数没有结束请求-响应循环，它必须调用next()以将控制权传递给下一个中间件函数。否则，请求将被挂起    

可以在函数中或者带有`@Injectable` 装饰器的类中实现自定义Nest中间件。类应该实现`NestMiddleware`接口。  

### 异常过滤器  

 Nest带有一个内置的异常层，负责处理应用中所有未处理的异常，
 ```
 Nest内置了一个 HttpException 举例

 findAll() {
   throw new HttpException({ code: 40001,message: 'Forbidden}, HttpStatus.FORBIDDEN)
 } 

 其中FORBIDDEN是nest/common已经枚举好的
 ```

此时也可以自定义异常层次结构   
```
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN)
  }
}
```


如果想要完全的控制异常层，：比如说想要添加日志，或者基于某些动态因素使用不同的JSON的模式。  

详情看`error.filter.ts`文件  
使用方法 

```
  @Post()
  @UseFilters(HttpExceptionFilter)
  async create(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }
```  

当然如果想要全局的范围的使用  

```
(main文件)
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```  

### 守卫   
守卫是一个用@Injectable()装饰器注解的类。守卫需要实现CanActive接口  

守卫有一个单一的责任。根据运行存在的某些的条件（如权限、角色、ACL等）来确定给请求是否将路由处理。这通常称为授权。中间件通常是身份验证的最佳选择。但是中间件的缺点就是，不知道后续要执行的程序是哪个？况且 守卫Guards可以访问ExecutionContext 实例，因此他可以知道接下来要执行什么。类似过滤器、管道、拦截器。   

#### 授权  
 > 授权是 Guards 的一个很好的用例，因为只有当调用者（通常是特定的经过身份验证的用户）具有足够的权限时，特定的路由才应该可用。   

 
### 日志 

Nest 自己带有一个内置的基于文本的记录器，此功能是通过包`Logger`中的类提供的`@nestjs/common` 。 基础的设置就在main中将logger设置为true就可以开始了   

当然，怎么能只满足这些呢？   

#### 自定义日志   

如果想要实现自己自定义的日志，只需要实现`LoggerService`接口的每个方法。 

```
import { LoggerService } from '@nestjs/common'  

export class MyLogger implements LoggerService {
    log(message: string) {
    /* your implementation */
  }
  error(message: string, trace: string) {
    /* your implementation */
  }
  warn(message: string) {
    /* your implementation */
  }
  debug(message: string) {
    /* your implementation */
  }
  verbose(message: string) {
    /* your implementation */
  }
}
```

然后在main.ts通过实例化和这个类

 ### Database   

 Nestjs 官网上默认配置的是TypeOrm、和MongoDB。。 T^T TypeOrm用过了，感觉不太好用，MongoDB 不会用..... 所以转向了 Sequelize 和 Mysql  

 **[Sequelize记录](src/models/models.md)**   

 现在可以返回到Providers  


 ### Providers  提供者  处理业务逻辑的  

 

 

 


 
