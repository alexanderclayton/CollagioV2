import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { authInstance } from "../utils/auth";
import { Form, Input, Button, Checkbox } from "antd";

export const Signup = () => {
  const [form] = Form.useForm();
  const [addProfile, { error, data }] = useMutation(ADD_USER);

  const handleFormSubmit = async (values: any) => {
    console.log(values);
    try {
      const { data } = await addProfile({
        variables: { ...values },
      });
      authInstance.login(data.addProfile.token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };
  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/login">back to the login page.</Link>
              </p>
            ) : (
              <Form
                form={form}
                onFinish={handleFormSubmit}
                style={{ maxWidth: 600 }}
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item
                  label="Your username"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Your email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Your password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
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

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
