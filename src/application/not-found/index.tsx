import { Result } from 'antd';

export default () => {
  return (
    <Result
      status={404}
      title="Page Not Found"
      subTitle="SORRY, SOMETHING WENT WRONG – WE APOLOGIZE FOR ANY INCONVENIENCE."
    />
  );
};
