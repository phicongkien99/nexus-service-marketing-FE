import React, { useRef } from "react";
import { Row, Col, Input, Image, Button } from "antd";
import { AudioOutlined, MessageOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { BookTwoTone } from "@ant-design/icons";

function Feedback(props) {
    return (<>
        <Row className="bg-gray">
            <Col span={16} offset={4}>
                <Row>
                    {/* <Row>
                        <div>
                            <Image src="https://fpt.vn/assets/frontend/personal/support/icon/feedback.png" />
                            <span className="front-size-20 text-orange">FEEDBACK</span>
                            <hr style={{ height: "3px", backgroundColor: "orange", border: "none" }} />
                        </div>
                    </Row> */}
                    <Col span={12}>
                        <div style={{ width: "165px" }}>
                            <Image src="https://fpt.vn/assets/frontend/personal/support/icon/feedback.png" />
                            <span className="front-size-20 text-orange">FEEDBACK</span>
                            <hr style={{ height: "3px", backgroundColor: "orange", border: "none" }} />
                        </div>
                        <Image src="https://fpt.vn/assets/frontend/personal/support/img/info-feedback.jpg" />
                        <strong>
                            With the customer-centric principle, Nexus Service always wants to receive <br />
                            more feedback from our customers. Any comments from Customers will <br />
                            be recorded and used for the continuous improvement and enhancement <br />
                            of the quality of our services. Customers can provide feedback on Nexus <br />
                            Service using the form on the side. Sincerely thanks!
                        </strong>
                    </Col>
                    <Col span={12} style={{ padding: "67px 10px 0px 40px" }}>
                        <Row>
                            <label className="front-size-15">Full name <span className="text-red">*</span></label>
                            <Input />
                        </Row>
                        <Row className="mt-10" gutter={5}>
                            <Col span={12}>
                                <label className="front-size-15">Phone number <span className="text-red">*</span></label>
                                <Input />
                            </Col>
                            <Col span={12}>
                                <label className="front-size-15">Email</label>
                                <Input />
                            </Col>
                        </Row>
                        <Row className="mt-10">
                            <label className="front-size-15">Address</label>
                            <Input />
                        </Row>
                        <Row className="mt-10">
                            <label className="front-size-15">Contract code</label>
                            <Input />
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>);
}

export default Feedback;