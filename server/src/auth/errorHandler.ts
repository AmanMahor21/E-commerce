import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: any, res: any, next: (err?: any) => any): void {
    console.log(error, 'erorrrrrrrrrrrr');
    const status = error.httpCode || 500;
    const message = error.message || 'Something went wrong';

    res.status(status).json({ status, message });
  }
}
