import React, { useEffect, useState } from "react";
import { Row, Col, PageHeader, Form, Select, Input, Button } from "antd";
import qs from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";
import { createServiceForm } from "../../admin/service-forms/slice";
import { fetchAreas } from "../../admin/areas/slice";

function Register({ history, location: { search } }) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const { areas } = useSelector((state) => state.adminArea);
    const { servicePacks } = useSelector((state) => state.adminServicePack);

    const [packName, setPackName] = useState("");
    const [IdServicePack, setIdServicePack] = useState(null);

    useEffect(() => {
        dispatch(fetchAreas(areas));
    }, []);

    useEffect(() => {
        const searchObj = qs.parse(search);
        if (searchObj["pack"]) {
            const [Name, Id] = searchObj["pack"].split(".");
            const existSp = servicePacks.find(
                (sp) => sp["Name"].replace(" ", "-") == Name && sp["Id"] == Id
            );
            if (existSp) {
                setPackName(`${existSp["ConnectionTypeName"]} - ${existSp["Name"]}`);
                setIdServicePack(Id);
            }
        } else {
            history.push("/service-pack");
        }
    }, [search]);

    const initServiceForm = {
        IdArea: "",
        IdServiceFormStatus: 1,
        CName: "",
        CPhone: "",
        CAddress: "",
        Address: "",
        IdCustomer: "",
    };

    const handleSubmitForm = async () => {
        try {
            const values = await form.validateFields();
            dispatch(createServiceForm({ ...initServiceForm, ...values, IdServicePack }));
            history.push("/");
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
        <>
            <Row>
                <Col span={24}>
                    <PageHeader title="Register online" />
                </Col>
            </Row>
            <Row className="mt-15">
                <Col span={12} offset={6}>
                    <Row>
                        <Col
                            style={{
                                backgroundColor: "#F0F2F5",
                                padding: 15,
                                borderLeft: "5px solid black",
                                fontSize: 20,
                            }}
                            span={24}
                        >
                            Selected pack: <b>{packName}</b>
                        </Col>
                    </Row>
                    <Row className="mt-15">
                        <Col
                            span={24}
                            style={{
                                backgroundColor: "#F0F2F5",
                                padding: 15,
                                borderLeft: "5px solid black",
                            }}
                        >
                            <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 20 }}
                                name="basic"
                                initialValues={initServiceForm}
                                form={form}
                                onSub
                            >
                                <h3>Personal information</h3>
                                <Form.Item
                                    label="Phone number"
                                    name="CPhone"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your phone!",
                                        },
                                    ]}
                                >
                                    <Input onBlur={handleFindCustomer} />
                                </Form.Item>
                                <Form.Item
                                    label="Name"
                                    name="CName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your name!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Address"
                                    name="CAddress"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your address!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <h3>Service</h3>
                                <Form.Item
                                    label="Service location"
                                    name="Address"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input service location!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Area"
                                    name="IdArea"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your area!",
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
                            </Form>
                            <Button style={{ float: "right" }} type="primary" onClick={handleSubmitForm}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Register;
