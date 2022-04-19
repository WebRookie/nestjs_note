

import { PrismaClient } from "@prisma/client";


let prisma = new PrismaClient()

// prisma.$use(async (params, next) => {

//   return next(params)
// })

export default prisma