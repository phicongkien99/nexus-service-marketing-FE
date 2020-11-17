import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button, Space } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnectionTypes } from "../connection-types/slice";
import { fetchFees } from "../fees/slice";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function ServicePackModal({ open, onConfirm, onCancel, servicePack, isLoading }) {
    const [form] = Form.useForm();

    const { connectionTypes } = useSelector((state) => state.adminConnectionType);
    const { fees } = useSelector((state) => state.adminFee);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchConnectionTypes(connectionTypes));
        dispatch(fetchFees(fees));
    }, []);

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initServicePack = servicePack ? { ...servicePack, ListDataTemp: servicePack["ListServicePackFee"] } : {
        Name: "",
        Description: "",
        IdConnectionType: "",
        ListDataTemp: [],
    };

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
                            <Select.Option key={ct["Id"]} value={ct["Id"]}>
                                {ct["Name"]}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.List name="ListDataTemp">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <Space key={field.key} align="baseline">
                                    <Form.Item noStyle>
                                        <Form.Item
                                            {...field}
                                            label="Fee"
                                            name={[field.name, "IdFee"]}
                                            fieldKey={[field.fieldKey, "IdFee"]}
                                            rules={[{ required: true, message: "Missing fee" }]}
                                        >
                                            <Select style={{ width: 130 }}>
                                                {fees.map((item) => (
                                                    <Select.Option key={item["Id"]} value={item["Id"]}>
                                                        {item["Name"]}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        label="Value"
                                        name={[field.name, "Value"]}
                                        fieldKey={[field.fieldKey, "Value"]}
                                        rules={[{ required: true, message: "Missing value" }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                            ))}

                            <Form.Item wrapperCol={{ span: 24 }}>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add fee
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
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
