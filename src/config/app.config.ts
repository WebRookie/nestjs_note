

export const CodeMap = {
  ParamsError: '100000', // 参数错误
  RequestSuccess: '200000', // 请求成功
  UserExisted: '200100',  // 用户已经存在
  AccountOrPwdError: '301001', // 账户或密码错误
  UserNotExist: '301002', // 用户不存在
  RequestNotExist: '301003', // 请求内容不存在
  UnAuthorityError: '401001', // 未授权
  ParameterUnMatched: '401002', // 请求与身份不匹配
  LoginExpired: '401001'     // 登录过期
}