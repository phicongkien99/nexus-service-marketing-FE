import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function ContractModal({ open, onConfirm, onCancel, contract, isLoading }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initContract = contract || { Name: "", Address: "", Email: "", Phone: "" };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initContract, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="Contract"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                name="basic"
                initialValues={initContract}
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your contract's name!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="Address"
                    rules={[{ required: true, message: "Please input your contract's address!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                        { required: true, message: "Please input your contract's email!" },
                        { type: "email", message: "Email invalid!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="Phone"
                    rules={[
                        { required: true, message: "Please input your contract's phone number!" },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

ContractModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    contract: PropTypes.object,
    isLoading: PropTypes.bool,
};

ContractModal.defaultProps = {
    contract: null,
    isLoading: false,
};

export default ContractModal;
