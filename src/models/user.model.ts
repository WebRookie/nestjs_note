import { DataTypes, Model } from 'sequelize';
import { dbObject } from "src/config/database/database.init";
// const initFunction = '/src/config/database/initdb.ts'

class User extends Model { }

User.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '用户Id',
    allowNull: false,
  },
  nick_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '用户昵称'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户密码'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '注册邮箱'
  },
  token: {
    type: DataTypes.STRING,
    comment: "登录token,没有即使未登录"
  }
},
  {
    sequelize: dbObject,
    tableName: 'user'
  })

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
    // User.sync({ alter: true }).then(res => {
    //   console.log('用户表模型已经同步')
    // }).catch(err => {
    //   console.log('用户模型同步失败')
    //   console.log(err)
    // })
  }
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default User