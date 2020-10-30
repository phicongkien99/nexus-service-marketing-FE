import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function StoreModal({ open, onConfirm, onCancel, store, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open && !store) {
            form.resetFields();
        }
    }, [open, store]);

    const initStore = store || { name: "", address: "", isClosed: 0 };

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
            <Form labelCol={6} wrapperCol={18} name="basic" initialValues={initStore} form={form}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please input your store's name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
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
