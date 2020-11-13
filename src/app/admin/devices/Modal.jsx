import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchManufacturers } from "../manufacturers/slice";
import { fetchDeviceTypes } from "../device-types/slice";

function DeviceModal({ open, onConfirm, onCancel, device, isLoading }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const { manufacturers } = useSelector((state) => state.adminManufacturer);
    const { deviceTypes } = useSelector((state) => state.adminDeviceType);

    useEffect(() => {
        if (open) {
            form.resetFields();
            dispatch(fetchManufacturers(manufacturers));
            dispatch(fetchDeviceTypes(deviceTypes));
        }
    }, [open]);

    const initDevice = device || { Name: "", IdDeviceType: "", IdManufacturer: "", Stock: 0, Using: 0 };

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
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} name="basic" initialValues={initDevice} form={form}>
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your device's name!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Device type"
                    name="IdDeviceType"
                    rules={[{ required: true, message: "Please input your device's type!" }]}
                >
                    <Select>
                        {deviceTypes.map((item) => (
                            <Select.Option key={item["Id"]} value={item["Id"]}>
                                {item["Name"]}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Manufacturer"
                    name="IdManufacturer"
                    rules={[{ required: true, message: "Please input your device's manufacturer!" }]}
                >
                    <Select>
                        {manufacturers.map((item) => (
                            <Select.Option key={item["Id"]} value={item["Id"]}>
                                {item["Name"]}
                            </Select.Option>
                        ))}
                    </Select>
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
