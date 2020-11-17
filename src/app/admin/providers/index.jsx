import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ProviderModal from "./Modal";
import { fetchProviders, createProvider, updateProvider, deleteProvider } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function Providers(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentProvider, setCurrentProvider] = useState(null);

    const { providers, isLoading, isSucceed } = useSelector((state) => state.adminProvider);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Providers";
        dispatch(fetchProviders(providers));
    }, []);
    
    useEffect(() => {
        if (isSucceed) {
            dispatch(fetchProviders(providers));
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

    const handleUpdate = (provider) => {
        setCurrentProvider(provider);
        setOpenModal(true);
    };

    const handleConfirm = (provider) => {
        if (currentProvider) {
            dispatch(updateProvider(provider));
        } else {
            dispatch(createProvider(provider));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentProvider(null);
    };

    const handleDelete = (provider) => {
        setCurrentProvider(provider);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentProvider(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteProvider(currentProvider["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Providers" ghost={false} />
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
                        dataSource={providers}
                        columns={columns}
                        onChange={handleChangeTable} rowKey="Id"
                    />
                </Col>
            </Row>
            <ProviderModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                provider={currentProvider}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this provider?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

Providers.propTypes = {};

Providers.defaultProps = {};

export default Providers;
