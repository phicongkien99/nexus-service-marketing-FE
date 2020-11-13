import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import DeviceTypeModal from "./Modal";
import {
    fetchDeviceTypes,
    createDeviceType,
    updateDeviceType,
    deleteDeviceType,
} from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function DeviceTypes(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentDeviceType, setCurrentDeviceType] = useState(null);

    const { deviceTypes, isLoading, isSucceed } = useSelector((state) => state.adminDeviceType);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Device types";
        dispatch(fetchDeviceTypes(deviceTypes));
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

    const handleUpdate = (deviceType) => {
        setCurrentDeviceType(deviceType);
        setOpenModal(true);
    };

    const handleConfirm = (deviceType) => {
        if (currentDeviceType) {
            dispatch(updateDeviceType(deviceType));
        } else {
            dispatch(createDeviceType(deviceType));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentDeviceType(null);
    };

    const handleDelete = (deviceType) => {
        setCurrentDeviceType(deviceType);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentDeviceType(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteDeviceType(currentDeviceType["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Device types" ghost={false} />
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
                        dataSource={deviceTypes}
                        columns={columns}
                        onChange={handleChangeTable} rowKey="Id"
                    />
                </Col>
            </Row>
            <DeviceTypeModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                deviceType={currentDeviceType}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this device type?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

DeviceTypes.propTypes = {};

DeviceTypes.defaultProps = {};

export default DeviceTypes;
