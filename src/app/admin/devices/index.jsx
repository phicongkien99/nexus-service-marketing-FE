import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import DeviceModal from "./Modal";
import { fetchDevices, createDevice, updateDevice, deleteDevice } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function Devices(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentDevice, setCurrentDevice] = useState(null);

    const { devices, isLoading, isSucceed } = useSelector((state) => state.adminDevice);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Devices";
        dispatch(fetchDevices(devices));
    }, []);
    
    useEffect(() => {
        if (isSucceed) {
            dispatch(fetchDevices(devices));
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

    const handleUpdate = (device) => {
        setCurrentDevice(device);
        setOpenModal(true);
    };

    const handleConfirm = (device) => {
        if (currentDevice) {
            dispatch(updateDevice(device));
        } else {
            dispatch(createDevice(device));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentDevice(null);
    };

    const handleDelete = (device) => {
        setCurrentDevice(device);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentDevice(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteDevice(currentDevice["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Devices" ghost={false} />
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
                        dataSource={devices}
                        columns={columns}
                        onChange={handleChangeTable} rowKey="Id"
                    />
                </Col>
            </Row>
            <DeviceModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                device={currentDevice}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this device?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

Devices.propTypes = {};

Devices.defaultProps = {};

export default Devices;
