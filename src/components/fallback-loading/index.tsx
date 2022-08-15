import { Spin } from 'antd';
import { PropsWithChildren } from 'react';

export function FallbackLoading(props: PropsWithChildren) {
  return <Spin style={{ width: '100%', height: '100%' }} {...props} spinning />;
}
