import { SetMetadata } from "@nestjs/common"


export const jwtConstant = {
  // 秘钥加密内容，需要放在环境变量或者不容易访问的地方
  secret: 'HelloNestJwt',
  publicSecret: 'PublicNestJwt'
}

export const SkipAuth = () => SetMetadata(jwtConstant.publicSecret, true)
