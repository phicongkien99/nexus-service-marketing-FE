import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function ConnectionTypeModal({ open, onConfirm, onCancel, connectionType, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initConnectionType = connectionType || { Name: "", Description: "" };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initConnectionType, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="Connection type"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} name="basic" initialValues={initConnectionType} form={form}>
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your connection type's name!" }]}
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

ConnectionTypeModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    connectionType: PropTypes.object,
    isLoading: PropTypes.bool,
};

ConnectionTypeModal.defaultProps = {
    connectionType: null,
    isLoading: false,
};

export default ConnectionTypeModal;
