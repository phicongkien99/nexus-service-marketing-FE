import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchStores } from "../stores/slice";
import constants from "../../../utils/constants";

function EmployeeModal({ open, onConfirm, onCancel, employee, isLoading }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { stores } = useSelector((state) => state.adminStore);

    const roles = Object.keys(constants.ROLES).map((key) => ({
        name: key,
        value: constants.ROLES[key],
    }));

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
        Password: "",
        IsActivated: 1,
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
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="basic"
                initialValues={initEmployee}
                form={form}
            >
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
                {!employee && (
                    <>
                        <Form.Item
                            label="Password"
                            name="Password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="confirm"
                            dependencies={["Password"]}
                            rules={[
                                { required: true, message: "Please confirm your password!" },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue("Password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("The two passwords that you entered do not match!");
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </>
                )}
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
                    label="Phone"
                    name="Phone"
                    rules={[{ required: true, message: "Please input your employee's phone number!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Store"
                    name="IdStore"
                    rules={[{ required: true, message: "Please select your employee's store!" }]}
                >
                    <Select>
                        {stores.map((store) => (
                            <Select.Option key={store["Id"]} value={store["Id"]}>
                                {store["Name"]}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Role"
                    name="Role"
                    rules={[{ required: true, message: "Please select your employee's role!" }]}
                >
                    <Select>
                        {roles.map((role, idx) => (
                            <Select.Option key={idx} value={role["value"]}>
                                {role["name"]}
                            </Select.Option>
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
