import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Skeleton, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import StoreModal from "./Modal";
import { v1 } from "uuid";

function Stores(props) {
    const [openModal, setOpenModal] = useState(false);
    const [currentStore, setCurrentStore] = useState(null);
    const [randomKey, setRandomKey] = useState(v1());

    const { stores, isLoading } = useSelector((state) => state.adminStore);
    const dispatch = useDispatch();

    const columns = [
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
            title: "Actions",
            className: "min-width",
            render: (text, record) => (
                <Space>
                    <Button className="btn--yellow" icon={<EditOutlined />} onClick={handleUpdate} />
                    <Button className="btn--red" icon={<DeleteOutlined />} onClick={handleDelete} />
                </Space>
            ),
        },
    ];

    const handleChangeTable = (pagination, filters, sorter) => {};

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCreate = () => {
        setRandomKey(v1());
        handleOpenModal();
    }

    const handleUpdate = (store) => {
        setCurrentStore(store);
        handleOpenModal();
    }

    const handleConfirm = () => {};

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentStore(null);
    };

    const handleDelete = () => {
        
    }

    return (
        <>
            <PageHeader title="Stores" ghost={false} />
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
                        dataSource={stores}
                        columns={columns}
                        onChange={handleChangeTable}
                    />
                </Col>
            </Row>
            <StoreModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                store={currentStore}
                key={currentStore ? currentStore.id : randomKey}
            />
        </>
    );
}

Stores.propTypes = {};

Stores.defaultProps = {};

export default Stores;
