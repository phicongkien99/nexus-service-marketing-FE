import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, PageHeader, Row, Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerFeedbacks, createCustomerFeedback, updateCustomerFeedback, deleteCustomerFeedback } from "./slice";

function CustomerFeedbacks(props) {
    const { customerFeedbacks, isLoading, isSucceed } = useSelector((state) => state.adminCustomerFeedback);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Customer Feedbacks";
        dispatch(fetchCustomerFeedbacks(customerFeedbacks));
    }, []);
    
    useEffect(() => {
        if (isSucceed) {
            dispatch(fetchCustomerFeedbacks(customerFeedbacks));
        }
    }, [isSucceed]);

    const columns = [
        {
            title: "#",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Customer name",
            key: "Name",
            render: (text, record) => record["Customer"]["Name"]
        },
        {
            title: "Customer phone",
            key: "Phone",
            render: (text, record) => record["Customer"]["Phone"]
        },
        {
            title: "Content",
            dataIndex: "Content",
            key: "Content",
        },
    ];

    const handleChangeTable = (pagination, filters, sorter) => {};

    return (
        <>
            <PageHeader title="Customer Feedbacks" ghost={false} />
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
