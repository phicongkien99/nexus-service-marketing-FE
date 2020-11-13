import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ServiceFormModal from "./Modal";
import { fetchServiceForms, createServiceForm, updateServiceForm, deleteServiceForm } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function ServiceForms(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentServiceForm, setCurrentServiceForm] = useState(null);

    const { serviceForms, isLoading, isSucceed } = useSelector((state) => state.adminServiceForm);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Service forms";
        dispatch(fetchServiceForms(serviceForms));
    }, []);

    useEffect(() => {
        if (isSucceed) {
            dispatch(fetch());
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

    const handleUpdate = (serviceForm) => {
        setCurrentServiceForm(serviceForm);
        setOpenModal(true);
    };

    const handleConfirm = (serviceForm) => {
        if (currentServiceForm) {
            dispatch(updateServiceForm(serviceForm));
        } else {
            dispatch(createServiceForm(serviceForm));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentServiceForm(null);
    };

    const handleDelete = (serviceForm) => {
        setCurrentServiceForm(serviceForm);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentServiceForm(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteServiceForm(currentServiceForm["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Service forms" ghost={false} />
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
                        dataSource={serviceForms}
                        columns={columns}
                        onChange={handleChangeTable} rowKey="Id"
                    />
                </Col>
            </Row>
            <ServiceFormModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                serviceForm={currentServiceForm}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this service form?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

ServiceForms.propTypes = {};

ServiceForms.defaultProps = {};

export default ServiceForms;
