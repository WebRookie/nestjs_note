import { dbObject } from "./database.init";


// const dbObject = require(./database.init)

(() =>{
  try {
    async () => {
      await dbObject.authenticate()
      console.log('Connection has been established successfully')
      dbObject.sync({ alter: true }).then(res => {
        console.log('所有模型已经同步')
        process.exit()
      }).catch(err => {
        console.log('模型同步失败')
        console.log(err)
      })
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()
