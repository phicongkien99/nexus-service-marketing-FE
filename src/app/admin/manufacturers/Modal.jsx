import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function ManufacturerModal({ open, onConfirm, onCancel, manufacturer, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initManufacturer = manufacturer || { Name: "" };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initManufacturer, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="Manufacturer"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                name="basic"
                initialValues={initManufacturer}
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your manufacturer's name!" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

ManufacturerModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    manufacturer: PropTypes.object,
    isLoading: PropTypes.bool,
};

ManufacturerModal.defaultProps = {
    manufacturer: null,
    isLoading: false,
};

export default ManufacturerModal;
