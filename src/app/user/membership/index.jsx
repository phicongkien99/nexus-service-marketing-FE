import React, { useEffect, useState } from "react";
import { Row, Col, Input, Image, Button, Select, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { BookTwoTone, EyeOutlined } from "@ant-design/icons";
import {
    fetchServiceForms,
    fetchServiceFormByServiceFormId,
    setDetailServiceForm,
} from "../../admin/service-forms/slice";
import { fetchContracts, fetchContract, setDetailContract } from "../../admin/contracts/slice";
import {} from "../../admin/customers/slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosClient from "../../../utils/axiosClient";
import ServiceFormModal from "../../admin/service-forms/ViewModal";
import ContractModal from "../../admin/contracts/ViewModal";

function Membership(props) {
    const dispatch = useDispatch();

    const { contracts, detailContract } = useSelector((state) => state.adminContract);
    const { serviceForms, detailServiceForm } = useSelector((state) => state.adminServiceForm);

    useEffect(() => {
        if (detailContract["Id"]) {
            setDetailContractModal(true);
        }
    }, [detailContract]);

    useEffect(() => {
        if (detailServiceForm["Id"]) {
            setDetailServiceFormModal(true);
        }
    }, [detailServiceForm]);

    useEffect(() => {
        dispatch(fetchContracts(contracts));
        dispatch(fetchServiceForms(serviceForms));
    }, []);

    const searchOptions = [
        {
            title: "LOOK UP CONTRACT AND SERVICE FORM BY PHONE NUMBER",
            placeholder: "Input your phone number",
            name: "Phone number",
            value: "phone",
        },
        {
            title: "LOOK UP CONTRACT",
            placeholder: "Input your Contract ID",
            name: "Contract ID",
            value: "contract",
        },
        {
            title: "LOOK UP SERVICE FORM",
            placeholder: "Input your Service form ID",
            name: "Service Form ID",
            value: "serviceForm",
        },
    ];

    const [selectedOption, setSelectedOption] = useState("phone");
    const [contractList, setContractList] = useState([]);
    const [serviceFormList, setServiceFormList] = useState([]);
    const [detailContractModal, setDetailContractModal] = useState(false);
    const [detailServiceFormModal, setDetailServiceFormModal] = useState(false);

    const option = searchOptions.find((data) => data["value"] == selectedOption);

    const onSearch = (inputType) => async (value) => {
        let _selectedOption = selectedOption;
        if (inputType) {
            _selectedOption = inputType;
        }
        switch (_selectedOption) {
            case "phone":
                const findCustomerResp = await axiosClient({
                    url: "/customer",
                    method: "get",
                    params: {
                        phone: value,
                    },
                });
                let IdCustomer = null;
                if (findCustomerResp.IsSuccess && findCustomerResp.DataResult) {
                    IdCustomer = findCustomerResp.DataResult.Id;
                }
                if (!IdCustomer) {
                    toast.error("You don't have any contract or submitted service form");
                } else {
                    const filteredCs = contracts.filter((data) => data.IdCustomer == IdCustomer);
                    setContractList(filteredCs);
                    const filteredSfs = serviceForms.filter(
                        (data) => data.IdCustomer == IdCustomer
                    );
                    setServiceFormList(filteredSfs);
                }
                break;
            case "contract":
                dispatch(fetchContract(value));
                break;
            case "serviceForm":
                dispatch(fetchServiceFormByServiceFormId(value));
                break;
            default:
                break;
        }
    };

    const handleSelectOption = (value) => {
        setSelectedOption(value);
    };

    const handleCloseModals = () => {
        setDetailContractModal(false);
        setDetailContract({});
        setDetailServiceFormModal(false);
        setDetailServiceForm({});
    };

    const contractColumns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Contract ID",
            dataIndex: "ContractId",
            key: "ContractId",
        },
        {
            title: "Action",
            key: "action",

            render: (text, record) => (
                <Space>
                    <Button
                        icon={<EyeOutlined />}
                        type="primary"
                        onClick={async () => await onSearch("contract")(record["ContractId"])}
                    />
                </Space>
            ),
        },
    ];

    const serviceFormColumns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "ID",
            dataIndex: "ServiceFormId",
            key: "ServiceFormId",
        },
        {
            title: "Action",
            key: "action",

            render: (text, record) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={async () => await onSearch("serviceForm")(record["ServiceFormId"])}
                        icon={<EyeOutlined />}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Row className="mt-100">
                <Col span={16} offset={4}>
                    <Row justify="center">
                        <Image width={156} height={52} src={"https://id.fpt.vn/images/logo.png"} />
                    </Row>
                    <Row justify="center" className="mt-10">
                        <h4 className="font-size-30">{option["title"]}</h4>
                    </Row>
                    <Row justify="center" className="mt-20">
                        <Col span={16} offset={4}>
                            <Input.Group>
                                <Select
                                    onSelect={handleSelectOption}
                                    size="large"
                                    defaultValue={"phone"}
                                >
                                    {searchOptions.map((option, idx) => (
                                        <Select.Option value={option["value"]} key={idx}>
                                            {option["name"]}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <Input.Search
                                    style={{ width: "60%" }}
                                    placeholder={option["placeholder"]}
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                    onSearch={onSearch("")}
                                />
                            </Input.Group>
                        </Col>
                    </Row>
                    <Row justify="center" className="mt-20">
                        <Col span={8}>
                            <hr />
                        </Col>
                    </Row>
                    {selectedOption == "phone" && (
                        <Row className="mt-15" gutter={15}>
                            {contractList.length > 0 && (
                                <Col span={12}>
                                    <h4>Contract</h4>
                                    <Table
                                        dataSource={contractList}
                                        columns={contractColumns}
                                        rowKey="Id"
                                    />
                                </Col>
                            )}
                            {serviceFormList.length > 0 && (
                                <Col span={12}>
                                    <h4>Service form</h4>
                                    <Table
                                        dataSource={serviceFormList}
                                        columns={serviceFormColumns}
                                        rowKey="Id"
                                    />
                                </Col>
                            )}
                        </Row>
                    )}
                    <Row justify="center" className="mt-20">
                        <Col span={8}>
                            <Row>
                                <Col span={12}>
                                    <Link>
                                        <Row gutter={15}>
                                            <Col className="mt-5">
                                                <Image
                                                    width={32}
                                                    height={32}
                                                    src={"https://id.fpt.vn/images/Contract32.svg"}
                                                />
                                            </Col>
                                            <Col>
                                                Confirmation of <br /> electronic contracts
                                            </Col>
                                        </Row>
                                    </Link>
                                </Col>
                                <Col span={12}>
                                    <Link>
                                        <Row gutter={15} className="ml-10">
                                            <Col className="mt-5">
                                                <Image
                                                    width={32}
                                                    height={32}
                                                    src={"https://id.fpt.vn/images/Loyalty40.svg"}
                                                />
                                            </Col>
                                            <Col>
                                                Look up <br /> for acceptance
                                            </Col>
                                        </Row>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify="center" className="mt-25 mb-250">
                        <Col span={8}>
                            <Button icon={<BookTwoTone />} block size={"large"} shape={"round"}>
                                User manual
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <ServiceFormModal open={detailServiceFormModal} onCancel={handleCloseModals} />
            <ContractModal open={detailContractModal} onCancel={handleCloseModals} />
        </>
    );
}

export default Membership;
