import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ServiceFormStatusModal from "./Modal";
import { fetchServiceFormStatuses, createServiceFormStatus, updateServiceFormStatus, deleteServiceFormStatus } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function ServiceFormStatuses(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentServiceFormStatus, setCurrentServiceFormStatus] = useState(null);

    const { serviceFormStatuses, isLoading } = useSelector((state) => state.adminServiceFormStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Service form statuses";
        dispatch(fetchServiceFormStatuses(serviceFormStatuses));
    }, []);

    const columns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => index,
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

    const handleUpdate = (serviceFormStatus) => {
        setCurrentServiceFormStatus(serviceFormStatus);
        setOpenModal(true);
    };

    const handleConfirm = (serviceFormStatus) => {
        if (currentServiceFormStatus) {
            dispatch(updateServiceFormStatus(serviceFormStatus));
        } else {
            dispatch(createServiceFormStatus(serviceFormStatus));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentServiceFormStatus(null);
    };

    const handleDelete = (serviceFormStatus) => {
        setCurrentServiceFormStatus(serviceFormStatus);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentServiceFormStatus(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteServiceFormStatus(currentServiceFormStatus["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Service form statuses" ghost={false} />
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
                        dataSource={serviceFormStatuses}
                        columns={columns}
                        onChange={handleChangeTable}
                    />
                </Col>
            </Row>
            <ServiceFormStatusModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                serviceFormStatus={currentServiceFormStatus}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this service form status?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

ServiceFormStatuses.propTypes = {};

ServiceFormStatuses.defaultProps = {};

export default ServiceFormStatuses;
