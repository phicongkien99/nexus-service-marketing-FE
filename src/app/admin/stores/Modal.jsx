import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function StoreModal({ open, onConfirm, onCancel, store, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initStore = store || { Name: "", Address: "", IsClosed: 0 };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initStore, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="Store"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                name="basic"
                initialValues={initStore}
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your store's name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="Address"
                    rules={[{ required: true, message: "Please input your store's address!" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

StoreModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    store: PropTypes.object,
    isLoading: PropTypes.bool,
};

StoreModal.defaultProps = {
    store: null,
    isLoading: false,
};

export default StoreModal;
