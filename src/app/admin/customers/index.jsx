import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CustomerModal from "./Modal";
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function Customers(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState(null);

    const { customers, isLoading, isSucceed } = useSelector((state) => state.adminCustomer);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Customers";
        dispatch(fetchCustomers(customers));
    }, []);
    
    useEffect(() => {
        if (isSucceed) {
            dispatch(fetchCustomers(customers));
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

    const handleUpdate = (customer) => {
        setCurrentCustomer(customer);
        setOpenModal(true);
    };

    const handleConfirm = (customer) => {
        if (currentCustomer) {
            dispatch(updateCustomer(customer));
        } else {
            dispatch(createCustomer(customer));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentCustomer(null);
    };

    const handleDelete = (customer) => {
        setCurrentCustomer(customer);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentCustomer(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteCustomer(currentCustomer["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Customers" ghost={false} />
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
                        dataSource={customers}
                        columns={columns}
                        onChange={handleChangeTable} rowKey="Id"
                    />
                </Col>
            </Row>
            <CustomerModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                customer={currentCustomer}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this customer?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

Customers.propTypes = {};

Customers.defaultProps = {};

export default Customers;
