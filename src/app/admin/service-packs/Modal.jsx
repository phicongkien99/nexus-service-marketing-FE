import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnectionTypes } from "../connection-types/slice";
function ServicePackModal({ open, onConfirm, onCancel, servicePack, isLoading }) {
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

    const initServicePack = servicePack || { Name: "", Description: "", IdConnectionType: "" };

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
            title="Service pack"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="basic"
                initialValues={initServicePack}
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your service pack's name!" }]}
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
                            message: "Please input your service pack's connection type!",
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
