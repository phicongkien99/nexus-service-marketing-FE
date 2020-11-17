import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ContractStatusModal from "./Modal";
import { fetchContractStatuses, createContractStatus, updateContractStatus, deleteContractStatus } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function ContractStatuses(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentContractStatus, setCurrentContractStatus] = useState(null);

    const { contractStatuses, isLoading, isSucceed } = useSelector((state) => state.adminContractStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Contract statuses";
        dispatch(fetchContractStatuses(contractStatuses));
    }, []);
    
    useEffect(() => {
        if (isSucceed) {
            dispatch(fetchContractStatuses(contractStatuses));
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
            title: "Description",
            dataIndex: "Description",
            key: "Description",
        },
        {
            title: "Action",
            key: "action",
            
            render: (text, record) => (
                <Space>
                    <Button
                        className="btn--yellow"
                        icon={<EditOutlined />}
                        onClick={() => handleUpdate(record)}
                    />
                    <Button
                        className="btn--red"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    />
                </Space>
            ),
        },
    ];

    const handleChangeTable = (pagination, filters, sorter) => {};

    const handleCreate = () => {
        setOpenModal(true);
    };

    const handleUpdate = (contractStatus) => {
        setCurrentContractStatus(contractStatus);
        setOpenModal(true);
    };

    const handleConfirm = (contractStatus) => {
        if (currentContractStatus) {
            dispatch(updateContractStatus(contractStatus));
        } else {
            dispatch(createContractStatus(contractStatus));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentContractStatus(null);
    };

    const handleDelete = (contractStatus) => {
        setCurrentContractStatus(contractStatus);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentContractStatus(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteContractStatus(currentContractStatus["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Contract statuses" ghost={false} />
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
                        dataSource={contractStatuses}
                        columns={columns}
                        onChange={handleChangeTable} rowKey="Id"
                    />
                </Col>
            </Row>
            <ContractStatusModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                contractStatus={currentContractStatus}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this contractStatus?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

ContractStatuses.propTypes = {};

ContractStatuses.defaultProps = {};

export default ContractStatuses;
