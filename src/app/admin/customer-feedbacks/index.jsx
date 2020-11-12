import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerFeedbacks, createCustomerFeedback, updateCustomerFeedback, deleteCustomerFeedback } from "./slice";

function CustomerFeedbacks(props) {
    const { customerFeedbacks, isLoading } = useSelector((state) => state.adminCustomerFeedback);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "CustomerFeedbacks";
        dispatch(fetchCustomerFeedbacks(customerFeedbacks));
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
    ];

    const handleChangeTable = (pagination, filters, sorter) => {};

    return (
        <>
            <PageHeader title="CustomerFeedbacks" ghost={false} />
            <Row className="white-background mt-15">
                <Col span={22} offset={1} className="mt-15">
                    <Table
                        loading={isLoading}
                        dataSource={customerFeedbacks}
                        columns={columns}
                        onChange={handleChangeTable} rowKey="Id"
                    />
                </Col>
            </Row>
        </>
    );
}

CustomerFeedbacks.propTypes = {};

CustomerFeedbacks.defaultProps = {};

export default CustomerFeedbacks;
