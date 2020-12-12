import { Card, Col, Row, Divider, PageHeader, Table } from "antd";
import React, { useEffect } from "react";
import "./Dashboard.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./slice";
import { ShopOutlined, UserOutlined, SmileOutlined, FileDoneOutlined } from "@ant-design/icons";

function Dashboard(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Dashboard";
        dispatch(fetchData());
    }, []);

    const { dashboardData, isLoading } = useSelector((state) => state.adminDashboard);

    const customerColumns = [
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

    return (
        <div id="admin-dashboard">
            <Row gutter={15}>
                <Col span={6}>
                    <Card className="card-stat" style={{ backgroundColor: "#87F1C1" }}>
                        <Row justify="center">
                            <Col span={8}>
                                <ShopOutlined style={{ fontSize: 70 }} />
                            </Col>
                            <Col span={16}>
                                <h4>Cửa hàng đang hoạt động</h4>
                                <Divider />
                                <span style={{ fontSize: 24, fontWeight: "bold" }}>
                                    {dashboardData["stores"].length}
                                </span>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="card-stat" style={{ backgroundColor: "#8AE8D0" }}>
                        <Row justify="center">
                            <Col span={8}>
                                <UserOutlined style={{ fontSize: 70 }} />
                            </Col>
                            <Col span={16}>
                                <h4>Tổng số nhân viên</h4>
                                <Divider />
                                <span style={{ fontSize: 24, fontWeight: "bold" }}>
                                    {dashboardData["employees"].length}
                                </span>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="card-stat" style={{ backgroundColor: "#8CE0DE" }}>
                        <Row justify="center">
                            <Col span={8}>
                                <SmileOutlined style={{ fontSize: 70 }} />
                            </Col>
                            <Col span={16}>
                                <h4>Khách hàng</h4>
                                <Divider />
                                <span style={{ fontSize: 24, fontWeight: "bold" }}>
                                    {dashboardData["customers"].length}
                                </span>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="card-stat" style={{ backgroundColor: "#8ED8ED" }}>
                        <Row justify="center">
                            <Col span={8}>
                                <FileDoneOutlined style={{ fontSize: 70 }} />
                            </Col>
                            <Col span={16}>
                                <h4>Số lượng hợp đồng</h4>
                                <Divider />
                                <span style={{ fontSize: 24, fontWeight: "bold" }}>
                                    {dashboardData["contracts"].length}
                                </span>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-15">
                <Col span={24}>
                    <PageHeader title="Khách hàng mới" />
                    <Table
                        loading={isLoading}
                        dataSource={[...dashboardData["customers"]].reverse().slice(0,5)}
                        columns={customerColumns}
                        rowKey="Id"
                    />
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
