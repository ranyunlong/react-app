import { ClassConstructor } from '@quick-toolkit/class-mirror';
import { ClassTransformer } from '@quick-toolkit/class-transformer';
import { RouteMatch } from '@quick-toolkit/react-router';
import qs from 'qs';

class Transformer extends ClassTransformer {
  public validator<T extends {} = any>(
    type: ClassConstructor<T>
  ): (path: RouteMatch) => boolean {
    return (match: RouteMatch) => {
      try {
        const query = qs.parse((match.search || '').replace(/^\?/, ''), {
          arrayLimit: 1000,
          allowDots: true,
        });
        match.data = this.transform(type, {
          ...match.params,
          ...query,
        } as T);
        return true;
      } catch (e) {
        return false;
      }
    };
  }
}

export const transformer = new Transformer();
