import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchConnectionTypes } from "../connection-types/slice";
import axiosClient from "../../../utils/axiosClient";
function ServiceFormModal({ open, onConfirm, onCancel, serviceForm, isLoading }) {
    const [form] = Form.useForm();

    const { areas } = useSelector((state) => state.adminArea);
    const { servicePacks } = useSelector((state) => state.adminServicePack);

    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
            form.resetFields();
        }
    }, [open]);

    const initServiceForm = serviceForm || {
        IdArea: "",
        IdServiceFormStatus: 1,
        IdServicePack: "",
        CName: "",
        CPhone: "",
        CAddress: "",
        Address: "",
        IdCustomer: "",
    };

    const onSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            onConfirm({ ...initServiceForm, ...values });
        } catch (e) {
            toast.error("Validate data failed!");
        }
    };

    const handleFindCustomer = async (e) => {
        try {
            const findCustomerResp = await axiosClient({
                url: "/customer",
                method: "get",
                params: {
                    phone: form.getFieldValue("CPhone"),
                },
            });
            if (findCustomerResp.IsSuccess && findCustomerResp.DataResult) {
                const customer = findCustomerResp.DataResult;
                form.setFieldsValue({
                    CName: customer.Name,
                    CAddress: customer.Address,
                    CPhone: customer.Phone,
                });
                initServiceForm["IdCustomer"] = customer.Id;
            }
        } catch (e) {
            console.error(e);
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
                    label="Customer phone"
                    name="CPhone"
                    rules={[{ required: true, message: "Please input customer's phone!" }]}
                >
                    <Input onBlur={handleFindCustomer} />
                </Form.Item>
                <Form.Item
                    label="Customer name"
                    name="CName"
                    rules={[{ required: true, message: "Please input customer's name!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Customer address"
                    name="CAddress"
                    rules={[{ required: true, message: "Please input customer's address!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Service location"
                    name="Address"
                    rules={[{ required: true, message: "Please input service location!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Area"
                    name="IdArea"
                    rules={[
                        {
                            required: true,
                            message: "Please input your service form's area!",
                        },
                    ]}
                >
                    <Select>
                        {areas.map((item) => (
                            <Select.Option key={item["Id"]} value={item["Id"]}>
                                {item["Name"]}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Service pack"
                    name="IdServicePack"
                    rules={[
                        {
                            required: true,
                            message: "Please input your service form's pack!",
                        },
                    ]}
                >
                    <Select>
                        {servicePacks.map((item) => (
                            <Select.Option key={item["Id"]} value={item["Id"]}>
                                {item["ConnectionTypeName"]}
                                {" - "}
                                {item["Name"]}
                            </Select.Option>
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
