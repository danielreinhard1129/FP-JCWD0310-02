import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
// import { SampleRouter } from './routers/sample.router';

import { AuthRouter } from './routers/auth.router';
import { CartRouter } from './routers/cart.router';
import { ProductRouter } from './routers/product.router';
import { StockRouter } from './routers/stock.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    // const sampleRouter = new SampleRouter();

    const authRouter = new AuthRouter();
    const cartRouter = new CartRouter();
    const productRouter = new ProductRouter();
    const stockRouter = new StockRouter();

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    // this.app.use('/samples', sampleRouter.getRouter());

    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/product', productRouter.getRouter());
    this.app.use('/api/carts', cartRouter.getRouter());
    this.app.use('/api/stock', stockRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
