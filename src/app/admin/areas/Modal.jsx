import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function AreaModal({ open, onConfirm, onCancel, area, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initArea = area || { Name: "", ShortName: "" };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initArea, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="Area"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} name="basic" initialValues={initArea} form={form}>
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your area's name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Short name"
                    name="ShortName"
                    rules={[{ required: true, message: "Please input your area's short name!" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

AreaModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    area: PropTypes.object,
    isLoading: PropTypes.bool,
};

AreaModal.defaultProps = {
    area: null,
    isLoading: false,
};

export default AreaModal;
