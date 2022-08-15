import {
  Navigate,
  RouteObject,
  useMatch,
  useRoutes,
} from '@quick-toolkit/react-router-dom';
import {
  ComponentType,
  createElement,
  FC,
  lazy,
  PropsWithChildren,
  ReactNode,
  useLayoutEffect,
} from 'react';
import { ClassConstructor } from '@quick-toolkit/class-mirror';
import { transformer } from 'src/utils';

function RCRoutes(props: RCRouteProps) {
  return useRoutes(props.routes);
}

function RCRoute(props: PropsWithChildren<{ route: IRouteObject }>): ReactNode {
  const { children, route } = props;
  const isMatch = useMatch(route.fullPath);
  useLayoutEffect(() => {
    if (route.title && isMatch) {
      document.title = route.title as string;
    }
  }, [isMatch, route.title]);
  return children;
}

interface RCRouteProps {
  routes: RouteObject[];
}

export class RCRouter {
  public static mapRoutes(
    routes: RCRouteImpl[] = [],
    parent: string[],
    parentPaths: string[],
    allRoutes: IRouteObject[]
  ): IRouteObject[] {
    const list = routes.map((route) => {
      const {
        caseSensitive,
        component,
        routes,
        icon,
        index,
        path,
        name,
        title,
        model,
        redirect,
      } = route;

      let element: ReactNode;
      const currentComponentPaths = [...parent];
      const currentPaths = [...parentPaths];

      if (path) {
        currentPaths.push(path);
      }

      const fullPath = currentPaths.join('/').replace(/\/{2}/, '');

      if (redirect) {
        element = createElement(Navigate, {
          to: redirect,
          replace: true,
        });
      } else if (typeof component === 'string') {
        currentComponentPaths.push(component);
        element = createElement(RCRoute as any, {
          route: {
            fullPath,
            ...route,
          },
          children: createElement(
            lazy(
              () =>
                import(
                  `src/${currentComponentPaths.join('/').replace(/\/{2}/, '')}`
                )
            )
          ),
        });
      } else {
        element = component;
      }

      return {
        fullPath,
        caseSensitive,
        model,
        children: RCRouter.mapRoutes(
          routes,
          currentComponentPaths,
          currentPaths,
          allRoutes
        ),
        icon: icon && createElement(icon),
        validator: model && transformer.validator(model),
        element,
        title,
        name,
        index,
        path,
      };
    });
    allRoutes.push(...list);
    return list;
  }

  public routes: IRouteObject[] = [];

  public constructor(private _routes: RCRouteImpl[] = []) {}

  public toRoutes() {
    this.routes = [];
    return RCRouter.mapRoutes(this._routes, [], [], this.routes);
  }

  public toElement(): ReactNode {
    return createElement(RCRoutes, {
      routes: this.toRoutes(),
    });
  }

  public find(name: string): IRouteObject | undefined {
    return this.routes.find((o) => o.name === name);
  }
}

export interface IRouteObject extends RouteObject {
  fullPath: string;
}

export interface RCRouteImpl
  extends Omit<RouteObject, 'children' | 'icon' | 'element' | 'validator'> {
  routes?: RCRouteImpl[];
  icon?: FC<any> | ComponentType<any>;
  component?: string | ReactNode;
  model?: ClassConstructor;
  redirect?: string;
}
