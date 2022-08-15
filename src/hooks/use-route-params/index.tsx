import { useRouteContext } from '@quick-toolkit/react-router-dom';
import { ClassConstructor } from '@quick-toolkit/class-mirror';
import { RouteParamsException } from '../../lib/exceptions';

export function useRouteParams<T extends {}>(model: ClassConstructor<T>): T {
  const { data } = useRouteContext();
  if (!(data instanceof model)) {
    throw new RouteParamsException();
  }
  return data;
}
