import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, PageHeader, Row, Select, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import ServiceFormModal from "./Modal";
import { fetchServiceForms, createServiceForm, updateServiceForm, deleteServiceForm } from "./slice";
import { fetchServicePacks } from "../service-packs/slice";
import { fetchServiceFormStatuses } from "../service-form-statuses/slice";
import { fetchAreas } from "../areas/slice";
import ConfirmModal from "../../../components/Modal/Confirm";

function ServiceForms(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentServiceForm, setCurrentServiceForm] = useState(null);

    const { serviceForms, isLoading, isSucceed } = useSelector((state) => state.adminServiceForm);
    const { servicePacks } = useSelector((state) => state.adminServicePack);
    const { serviceFormStatuses } = useSelector((state) => state.adminServiceFormStatus);
    const { areas } = useSelector((state) => state.adminArea);

    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Service forms";
        dispatch(fetchServiceForms(serviceForms));
        dispatch(fetchAreas(areas));
        dispatch(fetchServicePacks(servicePacks));
        dispatch(fetchServiceFormStatuses(serviceFormStatuses));
    }, []);

    useEffect(() => {
        if (isSucceed) {
            dispatch(fetchServiceForms(serviceForms));
        }
    }, [isSucceed]);

    const handleChangeStatus = (data) => (value) => {
        const serviceForm = {
            ...data,
            IdServiceFormStatus: value,
        }
        dispatch(updateServiceForm(serviceForm))
    }

    const columns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "ID",
            dataIndex: "ServiceFormId",
            key: "ServiceFormId",
        },
        {
            title: "Status",
            key: "status",
            render: (text, record) => (
                <Select onSelect={handleChangeStatus(record)} defaultValue={record["IdServiceFormStatus"]} style={{width: "100%"}}>
                    {serviceFormStatuses.map((item) => (
                        <Select.Option key={item["Id"]} value={item["Id"]}>
                            {item["Name"]}
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            title: "Action",
            key: "action",
            
            render: (text, record) => (
                <Space>
                    <Button type="primary" icon={<EyeOutlined />} />
                </Space>
            )
        }
    ];

    const handleChangeTable = (pagination, filters, sorter) => {};

    const handleCreate = () => {
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
                        onChange={handleChangeTable}
                        rowKey="Id"
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
