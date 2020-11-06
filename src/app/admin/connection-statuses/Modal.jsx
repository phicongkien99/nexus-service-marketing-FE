import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function ConnectionStatusModal({ open, onConfirm, onCancel, connectionStatus, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initConnectionStatus = connectionStatus || { Name: "", Description: "" };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initConnectionStatus, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="Connection status"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form labelCol={6} wrapperCol={18} name="basic" initialValues={initConnectionStatus} form={form}>
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your connection status's name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="Description"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

ConnectionStatusModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    connectionStatus: PropTypes.object,
    isLoading: PropTypes.bool,
};

ConnectionStatusModal.defaultProps = {
    connectionStatus: null,
    isLoading: false,
};

export default ConnectionStatusModal;
