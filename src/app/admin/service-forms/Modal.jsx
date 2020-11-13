import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnectionTypes } from "../connection-types/slice";
function ServiceFormModal({ open, onConfirm, onCancel, serviceForm, isLoading }) {
    const [form] = Form.useForm();

    const { connectionTypes } = useSelector((state) => state.adminConnectionType);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchConnectionTypes(connectionTypes));
    }, []);

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initServiceForm = serviceForm || { Name: "", Description: "", IdConnectionType: "" };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initServiceForm, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="Service form"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="basic"
                initialValues={initServiceForm}
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your service form's name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="Description">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Connection type"
                    name="IdConnectionType"
                    rules={[
                        {
                            required: true,
                            message: "Please input your service form's connection type!",
                        },
                    ]}
                >
                    <Select>
                        {connectionTypes.map((ct) => (
                            <Select.Option key={ct["Id"]} value={ct["Id"]}>{ct["Name"]}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

ServiceFormModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    serviceForm: PropTypes.object,
    isLoading: PropTypes.bool,
};

ServiceFormModal.defaultProps = {
    serviceForm: null,
    isLoading: false,
};

export default ServiceFormModal;
