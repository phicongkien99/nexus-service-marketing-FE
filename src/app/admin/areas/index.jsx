import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AreaModal from "./Modal";
import { fetchAreas, createArea, updateArea, deleteArea } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function Areas(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentArea, setCurrentArea] = useState(null);

    const { areas, isLoading } = useSelector((state) => state.adminArea);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Areas";
        dispatch(fetchAreas(areas));
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
            title: "Short name",
            dataIndex: "ShortName",
            key: "ShortName",
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

    const handleUpdate = (area) => {
        setCurrentArea(area);
        setOpenModal(true);
    };

    const handleConfirm = (area) => {
        if (currentArea) {
            dispatch(updateArea(area));
        } else {
            dispatch(createArea(area));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentArea(null);
    };

    const handleDelete = (area) => {
        setCurrentArea(area);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentArea(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteArea(currentArea["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Areas" ghost={false} />
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
                        dataSource={areas}
                        columns={columns}
                        onChange={handleChangeTable}
                    />
                </Col>
            </Row>
            <AreaModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                area={currentArea}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this area?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

Areas.propTypes = {};

Areas.defaultProps = {};

export default Areas;
