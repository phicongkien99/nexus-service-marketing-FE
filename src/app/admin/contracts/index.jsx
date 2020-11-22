import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, EyeOutlined, FileOutlined } from "@ant-design/icons";
import ContractModal from "./Modal";
import { fetchContracts, fetchContract, createContract, updateContract, createPayment, updatePayment } from "./slice";
import { fetchFees } from "../fees/slice";
import ViewModal from "./ViewModal";
import PaymentModal from "./PaymentModal";

function Contracts(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentContract, setCurrentContract] = useState(null);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);

    const { contracts, isLoading, isSucceed } = useSelector((state) => state.adminContract);
    const { fees } = useSelector(state => state.adminFee);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Contracts";
        dispatch(fetchContracts(contracts));
        dispatch(fetchFees(fees));
    }, []);

    useEffect(() => {
        if (isSucceed) {
            dispatch(fetchContracts(contracts));
        }
    }, [isSucceed]);

    useEffect(() => {
        if (contracts.length > 0 && currentContract) {
            const selectedContract = contracts.find(c => c["Id"] == currentContract["Id"]);
            if (selectedContract) {
                setCurrentContract(selectedContract);
            }
        }
    }, [contracts]);

    const columns = [
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
            title: "Customer name",
            key: "Name",
            render: (text, record) => record["Customer"]["Name"],
        },
        {
            title: "Location",
            dataIndex: "Address",
            key: "Address",
        },
        {
            title: "Action",
            key: "action",

            render: (text, record) => (
                <Space>
                    <Button icon={<EyeOutlined />} type="primary" onClick={() => handleView(record["ContractId"])} />
                    <Button icon={<FileOutlined />} type="secondary" onClick={() => handleOpenPaymentModal(record)} />
                </Space>
            ),
        },
    ];

    const handleChangeTable = (pagination, filters, sorter) => {};

    const handleOpenPaymentModal = (contract) => {
        setCurrentContract(contract);
        setOpenPaymentModal(true);
    };

    const handleCreate = () => {
        setOpenModal(true);
    };

    const handleConfirm = (contract) => {
        if (currentContract) {
            dispatch(updateContract(contract));
        } else {
            dispatch(createContract(contract));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setOpenViewModal(false);
        setOpenPaymentModal(false);
        setCurrentContract(null);
    };

    const handleView = (ContractId) => {
        setOpenViewModal(true);
        dispatch(fetchContract(ContractId));
    };

    const handleCreatePayment = (payment) => {
        dispatch(createPayment(payment));
    }

    const handlePayBill = (payment) => {
        dispatch(updatePayment(payment));
    }

    return (
        <>
            <PageHeader title="Contracts" ghost={false} />
            <Row className="white-background mt-15">
                <Col span={22} offset={1} className="mt-15">
                    <Button
                        shape="round"
                        className="btn--green float-right mb-15"
                        icon={<PlusOutlined />}
                        onClick={handleCreate}
                    >
                        Create
                    </Button>
                    <Table
                        loading={isLoading}
                        dataSource={contracts}
                        columns={columns}
                        onChange={handleChangeTable}
                        rowKey="Id"
                    />
                </Col>
            </Row>
            <ContractModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                contract={currentContract}
                isLoading={isLoading}
            />
            <ViewModal open={openViewModal} onCancel={handleCancel} />
            <PaymentModal
                contract={currentContract}
                key={currentContract ? currentContract["Id"] : new Date()}
                open={openPaymentModal}
                onCancel={handleCancel}
                onCreate={handleCreatePayment}
                onPay={handlePayBill}
            />
        </>
    );
}

export default Contracts;
