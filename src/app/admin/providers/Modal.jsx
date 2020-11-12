import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function ProviderModal({ open, onConfirm, onCancel, provider, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initProvider = provider || { Name: "", Address: "", Email: "", Phone: "" };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initProvider, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="Provider"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                name="basic"
                initialValues={initProvider}
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your provider's name!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="Address"
                    rules={[{ required: true, message: "Please input your provider's address!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                        { required: true, message: "Please input your provider's email!" },
                        { type: "email", message: "Email invalid!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="Phone"
                    rules={[
                        { required: true, message: "Please input your provider's phone number!" },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

ProviderModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    provider: PropTypes.object,
    isLoading: PropTypes.bool,
};

ProviderModal.defaultProps = {
    provider: null,
    isLoading: false,
};

export default ProviderModal;
