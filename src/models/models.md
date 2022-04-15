## Sequelize 

Nestjs默认拥抱Ts所以就要以Ts的方式来引入Sequelize 
```
yarn add sequelize mysql2  sequelize sequelize-typescript @nest/sequelize
```  
原始的解决方法是
```
import { Model, Optional } from 'sequelize';

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare string: number;
  // other attributes...
}

```  
在Sequelize >= 6.14.0 提供了新的使用程序类型。 必需的样板:`InterAttributes` 和 `InferCreationAttributes`。他们将提取属性类型直接来自模型：

```
import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

// order of InferAttributes & InferCreationAttributes is important.
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>;
  declare string: number;
  // other attributes...
}
```

