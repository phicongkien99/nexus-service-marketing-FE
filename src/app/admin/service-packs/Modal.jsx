import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function ServicePackModal({ open, onConfirm, onCancel, servicePack, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initServicePack = servicePack || { name: "", address: "", isClosed: 0 };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initServicePack, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="ServicePack"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form labelCol={6} wrapperCol={18} name="basic" initialValues={initServicePack} form={form}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please input your servicePack's name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Please input your servicePack's address!" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

ServicePackModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    servicePack: PropTypes.object,
    isLoading: PropTypes.bool,
};

ServicePackModal.defaultProps = {
    servicePack: null,
    isLoading: false,
};

export default ServicePackModal;
