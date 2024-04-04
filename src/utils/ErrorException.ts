import { HttpException, HttpStatus } from '@nestjs/common';
import { LOGIC_STATUS } from '@/constants/common';

export default class ErrorException extends HttpException {
  constructor({
    code = LOGIC_STATUS.FAIL,
    message,
    data,
    HttpStatus: HTTPStatus = HttpStatus.OK,
  }: any) {
    super(
      {
        code,
        message,
        data,
      },
      HTTPStatus,
    );
  }
}
