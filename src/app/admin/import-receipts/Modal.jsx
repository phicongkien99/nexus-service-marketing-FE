import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function ImportReceiptModal({ open, onConfirm, onCancel, importReceipt, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initImportReceipt = importReceipt || { Name: "", Address: "", IsClosed: 0 };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initImportReceipt, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="ImportReceipt"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                name="basic"
                initialValues={initImportReceipt}
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your importReceipt's name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="Address"
                    rules={[{ required: true, message: "Please input your importReceipt's address!" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

ImportReceiptModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    importReceipt: PropTypes.object,
    isLoading: PropTypes.bool,
};

ImportReceiptModal.defaultProps = {
    importReceipt: null,
    isLoading: false,
};

export default ImportReceiptModal;
