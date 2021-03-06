import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import FeeModal from "./Modal";
import { fetchFees, createFee, updateFee, deleteFee } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function Fees(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentFee, setCurrentFee] = useState(null);

    const { fees, isLoading, isSucceed } = useSelector((state) => state.adminFee);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Fees";
        dispatch(fetchFees(fees));
    }, []);
    
    useEffect(() => {
        if (isSucceed) {
            dispatch(fetchFees(fees));
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

    const handleUpdate = (fee) => {
        setCurrentFee(fee);
        setOpenModal(true);
    };

    const handleConfirm = (fee) => {
        if (currentFee) {
            dispatch(updateFee(fee));
        } else {
            dispatch(createFee(fee));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentFee(null);
    };

    const handleDelete = (fee) => {
        setCurrentFee(fee);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentFee(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteFee(currentFee["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="Fees" ghost={false} />
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
                        dataSource={fees}
                        columns={columns}
                        onChange={handleChangeTable} rowKey="Id"
                    />
                </Col>
            </Row>
            <FeeModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                fee={currentFee}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to delete this fee?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

Fees.propTypes = {};

Fees.defaultProps = {};

export default Fees;
