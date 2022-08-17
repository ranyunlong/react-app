import { Result, Layout } from 'antd';

export default () => {
  return (
    <Layout
      style={{
        height: '100vh',
      }}
    >
      <Result
        icon={<Result.PRESENTED_IMAGE_404 />}
        title="Page Not Found"
        subTitle="SORRY, SOMETHING WENT WRONG – WE APOLOGIZE FOR ANY INCONVENIENCE."
      />
    </Layout>
  );
};
