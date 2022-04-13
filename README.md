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
| -- | -- |
| :--: | :--: |
| app.controller.ts| 带有单个路由的基本控制器 | 
| app.controller.spec.ts | 针对控制器的单元测试 | 
| app.modules.ts |  T应用的根模块（root module） |
| app.service.ts | 具有单一方法的基本服务（service）method |
| main.ts | 应用程序的入口文件，它使用核心函数NestFactory来创建Nest应用程序实例 |  





首先src目录下多了几个核心文件 
app.controller.ts、  
app.controller.spec.ts    
app.modules.ts  
app.service.ts  
main.ts