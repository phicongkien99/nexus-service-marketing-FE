import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Table, Space, Button, Tabs } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import moment from "moment";

function PaymentModal({ open, onCancel, onCreate, onPay, contract = {} }) {
    const { fees } = useSelector((state) => state.adminFee);
    
    const columns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Total price",
            key: "TotalPrice",
            dataIndex: "TotalPrice",
        },
        {
            title: "Pay date",
            key: "PayDate",
            render: (text, record) => (record["PayDate"] ? moment(record["PayDate"]).format("YYYY-MM-DD HH:mm") : null),
        },
        {
            title: "Created date",
            key: "CreatedAt",
            render: (text, record) =>
                record["CreatedAt"] ? moment(record["CreatedAt"]).format("YYYY-MM-DD HH:mm") : null,
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => onPay(record)}>Pay</Button>
                </Space>
            )
        }
    ];

    const initPayment = contract && {
        IdContract: contract["Id"],
        ListDataTemp: [],
        TotalPrice: "",
    };

    const [form] = Form.useForm();

    const handleCalculatePrice = () => {
        const fees = form.getFieldValue("ListDataTemp");
        let totalPrice = 0;
        fees.forEach((fee) => {
            if (fee && fee["Value"]) {
                totalPrice += parseInt(fee["Value"]);
            }
        });
        form.setFields([{ name: "TotalPrice", value: totalPrice }]);
    };

    const createPayment = async () => {
        const values = await form.validateFields();
        onCreate({...initPayment, ...values});
    }

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title={`Contract ID: ${contract && contract["ContractId"]}`}
            visible={open}
            onCancel={onCancel}
            width={1000}
        >
            {contract && (
                <>
                    <Tabs defaultActiveKey="list">
                        <Tabs.TabPane tab="Payment list" key="list">
                            <Table dataSource={contract["ListPayments"]} columns={columns} rowKey="Id" />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Create payment" key="create">
                            <Form
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                name="basic"
                                initialValues={initPayment}
                                form={form}
                            >
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
                                                        <Input onBlur={handleCalculatePrice} type="number" />
                                                    </Form.Item>

                                                    <MinusCircleOutlined
                                                        onClick={() => {
                                                            remove(field.name);
                                                            handleCalculatePrice();
                                                        }}
                                                    />
                                                </Space>
                                            ))}

                                            <Form.Item wrapperCol={{ span: 24 }}>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined />}
                                                >
                                                    Add fee
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                                <Form.Item label="Total price" name="TotalPrice">
                                    <Input readOnly />
                                </Form.Item>
                            </Form>
                            <Button type="primary" onClick={createPayment}>
                                Create
                            </Button>
                        </Tabs.TabPane>
                    </Tabs>
                </>
            )}
        </Modal>
    );
}

export default PaymentModal;
