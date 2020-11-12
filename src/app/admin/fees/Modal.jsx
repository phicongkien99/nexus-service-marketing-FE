import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function FeeModal({ open, onConfirm, onCancel, fee, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initFee = fee || { Name: "", Description: "" };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initFee, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="Fee"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} name="basic" initialValues={initFee} form={form}>
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your fee's name!" }]}
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

FeeModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    fee: PropTypes.object,
    isLoading: PropTypes.bool,
};

FeeModal.defaultProps = {
    fee: null,
    isLoading: false,
};

export default FeeModal;
