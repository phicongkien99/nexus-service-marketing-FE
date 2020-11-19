import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import ContractModal from "./Modal";
import { fetchContracts, fetchContract, createContract, updateContract, deleteContract } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";
import ViewModal from "./ViewModal";

function Contracts(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentContract, setCurrentContract] = useState(null);

    const { contracts, isLoading, isSucceed } = useSelector((state) => state.adminContract);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Contracts";
        dispatch(fetchContracts(contracts));
    }, []);

    useEffect(() => {
        if (isSucceed) {
            dispatch(fetchContracts(contracts));
        }
    }, [isSucceed]);

    const columns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Name",
            dataIndex: "Name",
            key: "Name",
        },
        {
            title: "Address",
            dataIndex: "Address",
            key: "Address",
        },
        {
            title: "Email",
            dataIndex: "Email",
            key: "Email",
        },
        {
            title: "Phone number",
            dataIndex: "Phone",
            key: "Phone",
        },
        {
            title: "Action",
            key: "action",

            render: (text, record) => (
                <Space>
                    <Button icon={<EyeOutlined />} type="primary" onClick={() => handleView(record["ContractId"])} />
                </Space>
            ),
        },
    ];

    const handleChangeTable = (pagination, filters, sorter) => {};

    const handleCreate = () => {
        setOpenModal(true);
    };

    const handleUpdate = (contract) => {
        setCurrentContract(contract);
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
        setCurrentContract(null);
    };

    const handleDelete = (contract) => {
        setCurrentContract(contract);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentContract(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteContract(currentContract["Id"]));
        setOpenDeleteModal(false);
    };

    const handleView = (ContractId) => {
        setOpenViewModal(true);
        dispatch(fetchContract(ContractId));
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
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this contract?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
            <ViewModal open={openViewModal} onCancel={handleCancel} />
        </>
    );
}

export default Contracts;
