import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import CategoryModal from "./Modal";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function Categories(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const { categories, isLoading } = useSelector((state) => state.adminCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Categories";
        dispatch(fetchCategories(categories));
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
                <Tag color={isClosed ? "red" : "green"}>
                    {isClosed ? "Deactivated" : "Activating"}
                </Tag>
            ),
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

    const handleUpdate = (category) => {
        setCurrentCategory(category);
        setOpenModal(true);
    };

    const handleConfirm = (category) => {
        if (currentCategory) {
            dispatch(updateCategory(category));
        } else {
            dispatch(createCategory(category));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentCategory(null);
    };

    const handleDelete = (category) => {
        setCurrentCategory(category);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentCategory(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteCategory(currentCategory["id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Categories" ghost={false} />
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
                        dataSource={categories}
                        columns={columns}
                        onChange={handleChangeTable}
                    />
                </Col>
            </Row>
            <CategoryModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                category={currentCategory}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this category?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

Categories.propTypes = {};

Categories.defaultProps = {};

export default Categories;
