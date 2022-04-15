import { Sequelize } from 'sequelize'


const config =require('./database.config.json')

// const dbConfig = config[process.env.NODE_ENV]
 const dbConfig = config['development']

 
export  const dbObject = new Sequelize(dbConfig)

