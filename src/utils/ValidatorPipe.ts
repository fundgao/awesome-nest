import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { LOGIC_STATUS } from '@/constants/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import ErrorException from '@/utils/ErrorException';

@Injectable()
export default class ValidatorPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    //
    if (!metadata) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length) {
      throw new ErrorException({
        code: LOGIC_STATUS.FAIL,
        message: this.formatErrors(errors),
      });
    }

    return value;
  }

  private formatErrors(errors = []) {
    const value = [];
    for (const e of errors) {
      const { constraints } = e;
      for (const c of constraints) {
        if (constraints.hasOwnProperty(c)) {
          value.push(constraints[c]);
        }
      }
    }
    return value.join(', ');
  }
}
