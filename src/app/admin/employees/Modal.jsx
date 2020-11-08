import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchStores } from "../stores/slice";

function EmployeeModal({ open, onConfirm, onCancel, employee, isLoading }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { stores } = useSelector((state) => state.adminStore);

    useEffect(() => {
        if (open) {
            form.resetFields();
            dispatch(fetchStores(stores));
        }
    }, [open]);

    const initEmployee = employee || {
        Name: "",
        Address: "",
        Email: "",
        Phone: "",
        Role: "",
        IdStore: "",
    };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initEmployee, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title="Employee"
            visible={open}
            onOk={onSubmitForm}
            onCancel={onCancel}
            confirmLoading={isLoading}
        >
            <Form
                labelCol={6}
                wrapperCol={18}
                name="basic"
                initialValues={initEmployee}
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: "Please input your employee's name!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="Address"
                    rules={[{ required: true, message: "Please input your employee's address!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                        { required: true, message: "Please input your employee's email!" },
                        { type: "email", message: "Email invalid!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="Phone"
                    rules={[
                        { required: true, message: "Please input your employee's phone number!" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Store"
                    name="Store"
                    rules={[{ required: true, message: "Please select your employee's store!" }]}
                >
                    <Select>
                        {stores.map((store) => (
                            <Select.Option value={store["Id"]}>{store["Name"]}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

EmployeeModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    employee: PropTypes.object,
    isLoading: PropTypes.bool,
};

EmployeeModal.defaultProps = {
    employee: null,
    isLoading: false,
};

export default EmployeeModal;
