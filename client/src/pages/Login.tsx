import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { authInstance } from "../utils/auth";
import { Button, Checkbox, Form, Input } from "antd";
import "./styles/login.css";

export const Login = () => {
  const [form] = Form.useForm();
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (values: any) => {
    console.log(values);
    try {
      const { data } = await login({
        variables: { ...values },
      });
      authInstance.login(data.login.token);
      window.location.href = "/home";
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error occured", error);
      }
    }
    form.resetFields();
  };

  return <main>
  <div>
    <div>
      <h4 id="title">Login</h4>
      <div>
        {data ? (
          <p>
            Success! You may now head{" "}
            <Link to="/home">back to the homepage.</Link>
          </p>
        ) : (
          <Form id="login"
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleFormSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input a valid email!',
                  type: 'email'
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}

        {error && <div>{error.message}</div>}
      </div>
    </div>
  </div>
</main>;
};
