import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ConnectionStatusModal from "./Modal";
import { fetchConnectionStatuses, createConnectionStatus, updateConnectionStatus, deleteConnectionStatus } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function ConnectionStatuses(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentConnectionStatus, setCurrentConnectionStatus] = useState(null);

    const { connectionStatuses, isLoading } = useSelector((state) => state.adminConnectionStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "ConnectionStatuses";
        dispatch(fetchConnectionStatuses(connectionStatuses));
    }, []);

    const columns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => index,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Status",
            dataIndex: "isClosed",
            key: "isClosed",
            render: (isClosed) => (
                <Tag color={isClosed ? "red" : "green"}>
                    {isClosed ? "Deactivated" : "Activating"}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            className: "min-width",
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

    const handleUpdate = (connectionStatus) => {
        setCurrentConnectionStatus(connectionStatus);
        setOpenModal(true);
    };

    const handleConfirm = (connectionStatus) => {
        if (currentConnectionStatus) {
            dispatch(updateConnectionStatus(connectionStatus));
        } else {
            dispatch(createConnectionStatus(connectionStatus));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentConnectionStatus(null);
    };

    const handleDelete = (connectionStatus) => {
        setCurrentConnectionStatus(connectionStatus);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentConnectionStatus(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteConnectionStatus(currentConnectionStatus["id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="ConnectionStatuses" ghost={false} />
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
                        dataSource={connectionStatuses}
                        columns={columns}
                        onChange={handleChangeTable}
                    />
                </Col>
            </Row>
            <ConnectionStatusModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                connectionStatus={currentConnectionStatus}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this connectionStatus?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

ConnectionStatuses.propTypes = {};

ConnectionStatuses.defaultProps = {};

export default ConnectionStatuses;
