import { Result } from 'antd';

export function NotFound() {
  return (
    <Result
      status={404}
      title="Page Not Found"
      subTitle="SORRY, SOMETHING WENT WRONG – WE APOLOGIZE FOR ANY INCONVENIENCE."
    />
  );
}
