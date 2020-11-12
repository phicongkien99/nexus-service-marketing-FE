import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function DeviceModal({ open, onConfirm, onCancel, device, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initDevice = device || { Name: "", ShortName: "" };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initDevice, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="Device"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} name="basic" initialValues={initDevice} form={form}>
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your device's name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Short name"
                    name="ShortName"
                    rules={[{ required: true, message: "Please input your device's short name!" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

DeviceModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    device: PropTypes.object,
    isLoading: PropTypes.bool,
};

DeviceModal.defaultProps = {
    device: null,
    isLoading: false,
};

export default DeviceModal;
