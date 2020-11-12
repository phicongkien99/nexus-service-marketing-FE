import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function ServiceFormStatusModal({ open, onConfirm, onCancel, serviceFormStatus, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initServiceFormStatus = serviceFormStatus || { Name: "", Description: "" };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initServiceFormStatus, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="Service form status"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} name="basic" initialValues={initServiceFormStatus} form={form}>
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your service form status's name!" }]}
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

ServiceFormStatusModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    serviceFormStatus: PropTypes.object,
    isLoading: PropTypes.bool,
};

ServiceFormStatusModal.defaultProps = {
    serviceFormStatus: null,
    isLoading: false,
};

export default ServiceFormStatusModal;
