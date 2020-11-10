import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, PageHeader } from "antd";
import axiosClient from "../../../utils/axiosClient";
import { toast } from "react-toastify";

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 19,
    },
};

function Login({ history }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        form.resetFields();
    }, []);

    const initLogin = {
        Email: "",
        Password: "",
        remember: true,
    };

    const onFinish = async ({ Email, Password, remember }) => {
        try {
            setLoading(true);
            const resp = await axiosClient({
                url: "/auth",
                data: {
                    Email,
                    Password,
                },
                method: "post"
            });
    
            if (resp.IsSuccess && resp.ListDataResult.length > 0) {
                const token = resp.ListDataResult[0]["Token"];
                const userInfo = resp.ListDataResult[0]["UserInfo"];
                window.userInfo = userInfo;
                window.localStorage.setItem("token", token);
            } else {
                throw resp.ErrorMsg;
            }
        } catch (e) {
            console.error(e);
            toast.error("Login failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Row
                align="middle"
                justify="center"
                style={{
                    height: "100vh",
                    backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
                }}
            >
                <Col
                    span={8}
                    className="bordered"
                    style={{ padding: 25, backgroundColor: "white" }}
                >
                    <h1 className="text-center">Login</h1>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={initLogin}
                        onFinish={onFinish}
                        form={form}
                        
                    >
                        <Form.Item
                            label="Email"
                            name="Email"
                            rules={[
                                { required: true, message: "Please input your email!" },
                                // {
                                //     type: "email",
                                //     message: "Your email is invalid!",
                                // },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="Password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button loading={loading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default Login;
