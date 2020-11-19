import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ImportReceiptModal from "./Modal";
import { fetchImportReceipts, createImportReceipt, updateImportReceipt, deleteImportReceipt } from "./slice";
import ConfirmModal from "../../../components/Modal/Confirm";
import moment from "moment";

function ImportReceipts(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentImportReceipt, setCurrentImportReceipt] = useState(null);

    const { importReceipts, isLoading, isSucceed } = useSelector((state) => state.adminImportReceipt);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "ImportReceipts";
        dispatch(fetchImportReceipts(importReceipts));
    }, []);

    useEffect(() => {
        if (isSucceed) {
            dispatch(fetchImportReceipts(importReceipts));
        }
    }, [isSucceed]);

    const columns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Import date",
            key: "ImportDate",
            render: (text, record) => moment(record["ImportDate"]).format("YYYY-MM-DD"),
        },
        {
            title: "TotalPrice",
            dataIndex: "TotalPrice",
            key: "TotalPrice",
        },
        {
            title: "Action",
            key: "action",

            render: (text, record) => (
                <Space>
                    <Button className="btn--yellow" icon={<EditOutlined />} onClick={() => handleUpdate(record)} />
                </Space>
            ),
        },
    ];

    const handleChangeTable = (pagination, filters, sorter) => {};

    const handleCreate = () => {
        setOpenModal(true);
    };

    const handleUpdate = (importReceipt) => {
        setCurrentImportReceipt(importReceipt);
        setOpenModal(true);
    };

    const handleConfirm = (importReceipt) => {
        importReceipt["TotalPrice"] = 0;
        importReceipt.ListDataTemp.forEach((data) => {
            importReceipt["TotalPrice"] += parseInt(data["Price"]) * parseInt(data["Quantity"]);
        });
        if (currentImportReceipt) {
            const newListDataTemp = [...importReceipt["ListDataTemp"]];
            newListDataTemp.forEach((data) => {
                data["IdImportReceipt"] = importReceipt.Id;
                data["IsDeleted"] = 0;
            });
        } else {
            dispatch(createImportReceipt(importReceipt));
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        setCurrentImportReceipt(null);
    };

    const handleDelete = (importReceipt) => {
        setCurrentImportReceipt(importReceipt);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setCurrentImportReceipt(null);
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteImportReceipt(currentImportReceipt["Id"]));
        setOpenDeleteModal(false);
    };

    return (
        <>
            <PageHeader title="ImportReceipts" ghost={false} />
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
                        dataSource={importReceipts}
                        columns={columns}
                        onChange={handleChangeTable}
                        rowKey="Id"
                    />
                </Col>
            </Row>
            <ImportReceiptModal
                open={openModal}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                importReceipt={currentImportReceipt}
                isLoading={isLoading}
            />
            <ConfirmModal
                open={openDeleteModal}
                message="Are you sure to close this importReceipt?"
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </>
    );
}

ImportReceipts.propTypes = {};

ImportReceipts.defaultProps = {};

export default ImportReceipts;
