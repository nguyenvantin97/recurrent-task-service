import fastify from 'fastify';
import Routes from './routes/Routes';

class App {
  public fastifyApp: fastify.FastifyInstance;
  public routes: Routes;

  constructor() {
    this.fastifyApp = fastify({
      logger: { prettyPrint: true }
    });
    this.routes = new Routes(this.fastifyApp);

    this.connectToDatabase();
    this.configPreRouteMiddlewares();
    this.setUpRoutes();
    this.configPostRouteMiddlewares();
  }

  private configPreRouteMiddlewares(): void {

  }

  private configPostRouteMiddlewares(): void {

  }

  private async connectToDatabase(): Promise<any> {

  }

  private setUpRoutes(): void {
    this.routes.initialize();
  }
}

export default new App().fastifyApp;
