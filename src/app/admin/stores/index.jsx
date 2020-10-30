import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import StoreModal from "./Modal";
import { fetchStores, createStore, updateStore, deleteStore } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function Stores(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentStore, setCurrentStore] = useState(null);

    const { stores, isLoading } = useSelector((state) => state.adminStore);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Stores";
        dispatch(fetchStores(stores));
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
                <Tag color={isClosed ? "red" : "green"}>{isClosed ? "Deactivated" : "Activating"}</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            className: "min-width",
            render: (text, record) => (
                <Space>
                    <Button className="btn--yellow" icon={<EditOutlined />} onClick={() => handleUpdate(record)} />
                    <Button className="btn--red" icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
                </Space>
            ),
        },
    ];

    const handleChangeTable = (pagination, filters, sorter) => {};

    const handleCreate = () => {
        setOpenModal(true);
    };

    const handleUpdate = (store) => {
        setCurrentStore(store);
        setOpenModal(true);
    };

    const handleConfirm = (store) => {
        if (currentStore) {
            dispatch(updateStore(store));
        } else {
            dispatch(createStore(store));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentStore(null);
    };

    const handleDelete = (store) => {
        setCurrentStore(store);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentStore(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteStore(currentStore["id"]));
        setOpenDeleteModal(false);
    };

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
                    <Table loading={isLoading} dataSource={stores} columns={columns} onChange={handleChangeTable} />
                </Col>
            </Row>
            <StoreModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                store={currentStore}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to close this store?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

Stores.propTypes = {};

Stores.defaultProps = {};

export default Stores;
