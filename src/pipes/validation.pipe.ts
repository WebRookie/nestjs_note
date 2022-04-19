import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

/**
 * 这是按照官网来同步写的
 * 
 */

@Injectable()
export class CommonValidationPipe implements PipeTransform {
  constructor( private schema: ObjectSchema) {}


  transform(value: any, metadata: ArgumentMetadata) {
    const { error }  = this.schema.validate(value)
    if( error) {
      throw new BadRequestException('Parameter Error')
    }
    return value
  }
}



