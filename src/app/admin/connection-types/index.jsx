import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ConnectionTypeModal from "./Modal";
import {
    fetchConnectionTypes,
    createConnectionType,
    updateConnectionType,
    deleteConnectionType,
} from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function ConnectionTypes(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentConnectionType, setCurrentConnectionType] = useState(null);

    const { connectionTypes, isLoading, isSucceed } = useSelector((state) => state.adminConnectionType);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Connection types";
        dispatch(fetchConnectionTypes(connectionTypes));
    }, []);
    
    useEffect(() => {
        if (isSucceed) {
            dispatch(fetchConnectionTypes(connectionTypes));
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

    const handleUpdate = (connectionType) => {
        setCurrentConnectionType(connectionType);
        setOpenModal(true);
    };

    const handleConfirm = (connectionType) => {
        if (currentConnectionType) {
            dispatch(updateConnectionType(connectionType));
        } else {
            dispatch(createConnectionType(connectionType));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentConnectionType(null);
    };

    const handleDelete = (connectionType) => {
        setCurrentConnectionType(connectionType);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentConnectionType(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteConnectionType(currentConnectionType["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Connection types" ghost={false} />
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
                        dataSource={connectionTypes}
                        columns={columns}
                        onChange={handleChangeTable} rowKey="Id"
                    />
                </Col>
            </Row>
            <ConnectionTypeModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                connectionType={currentConnectionType}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this connection type?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

ConnectionTypes.propTypes = {};

ConnectionTypes.defaultProps = {};

export default ConnectionTypes;
