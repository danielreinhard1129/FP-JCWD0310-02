import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  static as static_,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { CartRouter } from './routers/cart.router';
import { CategoryRouter } from './routers/category.router';
import { ProductRouter } from './routers/product.router';
import { StockRouter } from './routers/stock.router';
import { join } from 'path';
import { UserRouter } from './routers/user.router';
import { StockMutationRouter } from './routers/stock-mutation.router';
import { WarehouseRouter } from './routers/warehouse.router';

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
    this.app.use('/api/assets', static_(join(__dirname, '../public')));
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
          res.status(500).send({ message: err.message });
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const authRouter = new AuthRouter();
    const cartRouter = new CartRouter();
    const productRouter = new ProductRouter();
    const stockRouter = new StockRouter();
    const userRouter = new UserRouter();
    const categoryRouter = new CategoryRouter();
    const stockMutationRouter = new StockMutationRouter();
    const warehouseRouter = new WarehouseRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API !`);
    });
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/products', productRouter.getRouter());
    this.app.use('/api/carts', cartRouter.getRouter());
    this.app.use('/api/stocks', stockRouter.getRouter());
    this.app.use(`/api/user`, userRouter.getRouter());
    this.app.use('/api/categories', categoryRouter.getRouter());
    this.app.use('/api/stock-mutations', stockMutationRouter.getRouter());
    this.app.use(`/api/warehouse`, warehouseRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
