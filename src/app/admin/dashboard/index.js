import { Card, Col, Row } from "antd";
import React from "react";
import "./Dashboard.scss";

function Dashboard(props) {
    return (
        <div id="admin-dashboard">
            <Row gutter={15}>
                <Col span={6}>
                    <Card className="card-stat" title="Placeholder">
                        Wassup
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="card-stat" title="Placeholder">
                        Wassup
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="card-stat" title="Placeholder">
                        Wassup
                    </Card>
                </Col>
                <Col span={6}>
                    <Card className="card-stat" title="Placeholder">
                        Wassup
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard;