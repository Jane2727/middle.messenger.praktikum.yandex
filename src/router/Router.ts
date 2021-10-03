import { routes } from '../utils';
import { Dictionary } from '../utils/block';
import Route, { IRoute } from './Route';

export interface IRouter {
    use(pathname: string, block: Dictionary, context: Dictionary): IRouter;
    start(): void;
    _onRoute(pathname: string): void;
    go(pathname?: string): void;
    getRoute(pathname: string): void;
    back(): void;
    forward(): void;
}

class Router {
    routes: IRoute[];

    history: History;

    _currentRoute: IRoute | undefined;

    _rootQuery: string;

    static __instance: Router | null;

    constructor(rootQuery: string) {
      if (Router.__instance) {
        return Router.__instance;
      }

      this.routes = [];
      this.history = window.history;
      this._currentRoute = undefined;

      this._rootQuery = rootQuery;

      Router.__instance = this;
    }

    use(pathname: string, block: Dictionary, context: Dictionary = {}) {
      const route: IRoute = new Route(pathname, block, {
        rootQuery: this._rootQuery,
        context,
      });
      this.routes.push(route);
      return this;
    }

    start() {
      window.onpopstate = (event: PopStateEvent & { currentTarget: Window }) => {
        this._onRoute(event.currentTarget.location.pathname);
      };

      this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
      const route = this.getRoute(pathname);

      if (this._currentRoute && this._currentRoute !== route) {
        this._currentRoute.leave();
      }

      this._currentRoute = route;

      try {
        route?.navigate(pathname);
      } catch (e) {
        const errorPage = this.getRoute(`/${routes.notFound}`);
        this._currentRoute = errorPage;
        errorPage?.navigate(`/${routes.notFound}`);
      }
    }

    go(pathname?: string) {
      if (pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
      } else {
        this.history.go();
      }
    }

    getRoute(pathname: string) {
      return this.routes.find((route) => route.match(pathname));
    }

    back() {
      this.history.back();
    }

    forward() {
      this.history.forward();
    }
}

export default Router;
