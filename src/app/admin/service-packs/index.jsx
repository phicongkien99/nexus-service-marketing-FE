import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ServicePackModal from "./Modal";
import { fetchServicePacks, createServicePack, updateServicePack, deleteServicePack } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function ServicePacks(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentServicePack, setCurrentServicePack] = useState(null);

    const { servicePacks, isLoading } = useSelector((state) => state.adminServicePack);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Service packs";
        dispatch(fetchServicePacks(servicePacks));
    }, []);

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
            title: "Connection type",
            dataIndex: "ConnectionTypeName",
            key: "ConnectionTypeName",
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

    const handleUpdate = (servicePack) => {
        setCurrentServicePack(servicePack);
        setOpenModal(true);
    };

    const handleConfirm = (servicePack) => {
        if (currentServicePack) {
            dispatch(updateServicePack(servicePack));
        } else {
            dispatch(createServicePack(servicePack));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentServicePack(null);
    };

    const handleDelete = (servicePack) => {
        setCurrentServicePack(servicePack);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentServicePack(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteServicePack(currentServicePack["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Service packs" ghost={false} />
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
                        dataSource={servicePacks}
                        columns={columns}
                        onChange={handleChangeTable}
                    />
                </Col>
            </Row>
            <ServicePackModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                servicePack={currentServicePack}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this service pack?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

ServicePacks.propTypes = {};

ServicePacks.defaultProps = {};

export default ServicePacks;
