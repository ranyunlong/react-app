import './styles/index.less';
import { Button, Card, Form, Input } from 'antd';

export default () => {
  return (
    <div className="sign-in">
      <div className="sign-in-container">
        <Card title="Sign in">
          <Form
            layout="vertical"
            onFinish={(e) => {
              console.log(e);
            }}
          >
            <Form.Item
              name="username"
              label="username"
              rules={[{ required: true }]}
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              name="password"
              label="password"
              rules={[{ required: true }]}
            >
              <Input allowClear type="password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                children="Submit"
                block
              />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
