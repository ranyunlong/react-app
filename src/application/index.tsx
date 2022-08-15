import { Outlet } from '@quick-toolkit/react-router-dom';
import { Suspense } from 'react';
import { ConfigProvider, Layout } from 'antd';
import { useRouteParams } from 'src/hooks';
import { LanguageValidator } from 'src/models';
import { FallbackLoading } from '../components';

export default () => {
  const { language } = useRouteParams(LanguageValidator);
  return (
    <ConfigProvider
      prefixCls="ant-dark"
      locale={require(`antd/lib/locale/${language}`)}
    >
      <Layout>
        <Suspense fallback={<FallbackLoading />}>
          <Outlet />
        </Suspense>
      </Layout>
    </ConfigProvider>
  );
};
