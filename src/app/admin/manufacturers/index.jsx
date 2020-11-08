import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ManufacturerModal from "./Modal";
import { fetchManufacturers, createManufacturer, updateManufacturer, deleteManufacturer } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function Manufacturers(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentManufacturer, setCurrentManufacturer] = useState(null);

    const { manufacturers, isLoading } = useSelector((state) => state.adminManufacturer);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Manufacturers";
        dispatch(fetchManufacturers(manufacturers));
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

    const handleUpdate = (manufacturer) => {
        setCurrentManufacturer(manufacturer);
        setOpenModal(true);
    };

    const handleConfirm = (manufacturer) => {
        if (currentManufacturer) {
            dispatch(updateManufacturer(manufacturer));
        } else {
            dispatch(createManufacturer(manufacturer));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentManufacturer(null);
    };

    const handleDelete = (manufacturer) => {
        setCurrentManufacturer(manufacturer);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentManufacturer(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteManufacturer(currentManufacturer["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Manufacturers" ghost={false} />
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
                        dataSource={manufacturers}
                        columns={columns}
                        onChange={handleChangeTable}
                    />
                </Col>
            </Row>
            <ManufacturerModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                manufacturer={currentManufacturer}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this manufacturer?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

Manufacturers.propTypes = {};

Manufacturers.defaultProps = {};

export default Manufacturers;
