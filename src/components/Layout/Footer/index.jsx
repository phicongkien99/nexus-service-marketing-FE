import React from "react";
import { Layout, Row, Col, Image } from "antd";
import { Link } from "react-router-dom";

function UserFooter(props) {
    const textWhite = {
        color: "white",
    };

    const rowStyle = {
        marginTop: "6px",
    };

    return (
        <Layout.Footer
            style={{
                textAlign: "left",
                backgroundColor: "#333333",
                color: "white",
                paddingLeft: "0",
                paddingRight: "0",
                paddingBottom: "0",
            }}
        >
            <Row>
                <Col span={16} offset={4}>
                    <Row gutter={5}>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <Row>
                                        <Link to="">
                                            <h3 className="text-orange">About Nexus Service</h3>
                                        </Link>
                                    </Row>
                                    <Row>
                                        <Link style={textWhite} to="">
                                            Introduction
                                        </Link>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Link style={textWhite} to="">
                                            Subsidiaries
                                        </Link>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Link style={textWhite} to="">
                                            Customers - Partners
                                        </Link>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Link style={textWhite} to="">
                                            Investor Relations
                                        </Link>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Link style={textWhite} to="">
                                            Nexus Service Marketing
                                        </Link>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <h3 className="text-orange">Nexus Service's Customer</h3>
                                    <Row>
                                        <Link style={textWhite} to="">
                                            User Guides
                                        </Link>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Link style={textWhite} to="">
                                            Technical Support
                                        </Link>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Link style={textWhite} to="">
                                            Online Payment
                                        </Link>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Link style={textWhite} to="">
                                            Feedback
                                        </Link>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Link style={textWhite} to="">
                                            TV Guide
                                        </Link>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}>
                                    <h3 className="text-orange">New to Nexus Service?</h3>
                                    <Row>
                                        <Link style={textWhite} to="">
                                            Online Registrantion
                                        </Link>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Link style={textWhite} to="">
                                            Product & Services
                                        </Link>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Link style={textWhite} to="">
                                            Promotion
                                        </Link>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Link style={textWhite} to="">
                                            Find A Store
                                        </Link>
                                    </Row>
                                    <Row style={rowStyle}>
                                        <Link style={textWhite} to="">
                                            News
                                        </Link>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Link to="">
                                        <Image
                                            src={
                                                "https://fpt.vn/storage/upload/images/banners/associated/fptjobs_new.png"
                                            }
                                            alt="Member"
                                        />
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={rowStyle}>
                <Col span={16} offset={4}>
                    <Row gutter={5}>
                        <Col span={24}>
                            <Row>
                                <Col span={12}>
                                    <Row>
                                        <Link to="">
                                            <h3 className="text-orange">Follow Us</h3>
                                        </Link>
                                    </Row>
                                    <Row>
                                        <Link
                                            style={{ fontSize: "20px", color: "white" }}
                                            to="https://www.facebook.com"
                                        >
                                            <Image
                                                src={
                                                    "https://fpt.vn/assets/frontend/img/icon/face.png"
                                                }
                                                alt="Member"
                                            />{" "}
                                            Find us in FaceBook
                                        </Link>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <h3 className="text-orange">Links</h3>
                                    <Row>
                                        <Link style={{ marginRight: "10px" }} to="">
                                            <Image
                                                src={
                                                    "https://fpt.vn/storage/upload/images/menus/icons/sn/youtube.png"
                                                }
                                            />
                                        </Link>
                                        <Link style={{ marginRight: "10px" }} to="">
                                            <Image
                                                src={
                                                    "https://fpt.vn/storage/upload/images/menus/icons/sn/instagram.png"
                                                }
                                            />
                                        </Link>
                                        <Link style={{ marginRight: "10px" }} to="">
                                            <Image
                                                src={
                                                    "https://fpt.vn/storage/upload/images/menus/icons/sn/zalo.png"
                                                }
                                            />
                                        </Link>
                                        <Link style={{ marginRight: "10px" }} to="">
                                            <Image
                                                src={
                                                    "https://fpt.vn/storage/upload/images/menus/sn/face.png"
                                                }
                                            />
                                        </Link>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row
                style={{
                    backgroundColor: "black",
                    marginTop: "5px",
                    width: "100%",
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Col span={16} offset={4}>
                    <Row gutter={5}>
                        <Col span={12}>
                            <Row>
                                <Col span={8}>
                                    <Link to="">
                                        <h4 style={textWhite}>PRODUCT & SERVICES</h4>
                                    </Link>
                                </Col>
                                <Col span={8}>
                                    <Link to="">
                                        <h4 style={textWhite}>SUPPORT</h4>
                                    </Link>
                                </Col>
                                <Col span={8}>
                                    <Link to="">
                                        <h4 style={textWhite}>PROMOTIOS</h4>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={8}>
                                    <Link to="">
                                        <h4 style={textWhite}>MEMBER</h4>
                                    </Link>
                                </Col>
                                <Col span={8}>
                                    <Link to="">
                                        <h4 style={textWhite}>ONLINE REGISTRANTION</h4>
                                    </Link>
                                </Col>
                                <Col span={8}>
                                    <Link to="">
                                        <h4 style={textWhite}>PAYMENT ONLINE</h4>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row
                style={{
                    backgroundColor: "white",
                    height: "20px",
                    justifyContent: "center",
                    color: "black",
                }}
            >
                <p>Copyright © 2020, Nexus Service. All rights reserved.</p>
            </Row>
        </Layout.Footer>
    );
}

export default UserFooter;
