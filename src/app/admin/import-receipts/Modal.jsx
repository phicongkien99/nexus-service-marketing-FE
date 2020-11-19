import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { fetchProviders } from "../providers/slice";
import { fetchDevices } from "../devices/slice";
import { useDispatch, useSelector } from "react-redux";

function ImportReceiptModal({ open, onConfirm, onCancel, importReceipt, isLoading }) {
    const [form] = Form.useForm();

    const { providers } = useSelector((state) => state.adminProvider);
    const { devices } = useSelector((state) => state.adminDevice);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProviders(providers));
        dispatch(fetchDevices(devices));
    }, []);

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initImportReceipt = importReceipt
        ? { ...importReceipt, ListDataTemp: importReceipt["List"] }
        : {
              IdProvider: "",
              ListDataTemp: [],
          };

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
            width={1000}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="basic"
                initialValues={initImportReceipt}
                form={form}
            >
                <Form.Item
                    label="Provider"
                    name="IdProvider"
                    rules={[
                        {
                            required: true,
                            message: "Please input provider!",
                        },
                    ]}
                >
                    <Select>
                        {providers.map((ct) => (
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
                                <Space size="large" key={field.key} align="baseline">
                                    <Form.Item noStyle>
                                        <Form.Item
                                            {...field}
                                            label="Device"
                                            name={[field.name, "IdDevice"]}
                                            fieldKey={[field.fieldKey, "IdDevice"]}
                                            rules={[{ required: true, message: "Missing device" }]}
                                        >
                                            <Select style={{ width: 200 }}>
                                                {devices.map((item) => (
                                                    <Select.Option
                                                        key={item["Id"]}
                                                        value={item["Id"]}
                                                    >
                                                        {item["Name"]}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        label="Price"
                                        name={[field.name, "Price"]}
                                        fieldKey={[field.fieldKey, "Price"]}
                                        rules={[{ required: true, message: "Missing price" }]}
                                        type="number"
                                        min={1}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        label="Quantity"
                                        name={[field.name, "Quantity"]}
                                        fieldKey={[field.fieldKey, "Quantity"]}
                                        rules={[{ required: true, message: "Missing quantity" }]}
                                        type="number"
                                        min={1}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                            ))}

                            <Form.Item wrapperCol={{ span: 24 }}>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Add device
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
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
