import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import EmployeeModal from "./Modal";
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function Employees(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const { employees, isLoading, isSucceed } = useSelector((state) => state.adminEmployee);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Employees";
        dispatch(fetchEmployees(employees));
    }, []);
    
    useEffect(() => {
        if (isSucceed) {
            dispatch(fetchEmployees(employees));
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
            title: "Role",
            dataIndex: "Role",
            key: "Role",
        },
        {
            title: "Action",
            key: "action",
            
            render: (text, record) => (
                <Space>
                    {/* <Button
                        className="btn--yellow"
                        icon={<EditOutlined />}
                        onClick={() => handleUpdate(record)}
                    /> */}
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

    const handleUpdate = (employee) => {
        setCurrentEmployee(employee);
        setOpenModal(true);
    };

    const handleConfirm = (employee) => {
        if (currentEmployee) {
            delete employee.Password;
            dispatch(updateEmployee(employee));
        } else {
            dispatch(createEmployee(employee));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentEmployee(null);
    };

    const handleDelete = (employee) => {
        setCurrentEmployee(employee);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentEmployee(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteEmployee(currentEmployee["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Employees" ghost={false} />
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
                        dataSource={employees}
                        columns={columns}
                        onChange={handleChangeTable} rowKey="Id"
                    />
                </Col>
            </Row>
            <EmployeeModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                employee={currentEmployee}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this employee?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

Employees.propTypes = {};

Employees.defaultProps = {};

export default Employees;
