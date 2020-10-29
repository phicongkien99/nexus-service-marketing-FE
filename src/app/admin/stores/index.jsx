import React from "react";
import PropTypes from "prop-types";
import { Col, PageHeader, Row, Skeleton, Table } from "antd";
import { useSelector } from "react-redux";

function Stores(props) {
    const { stores, isLoading } = useSelector((state) => state.adminStore);

    const columns = [
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
    ];

    const handleChangeTable = (pagination, filters, sorter) => {
        
    }

    return (
        <>
            <PageHeader title="Stores" ghost={false} />
            <Row className="white-background mt-15">
                <Col span={22} offset={1} className="mt-15">
                    <Table loading={isLoading} dataSource={stores} columns={columns} onChange={handleChangeTable} />
                </Col>
            </Row>
        </>
    );
}

Stores.propTypes = {};

Stores.defaultProps = {};

export default Stores;
