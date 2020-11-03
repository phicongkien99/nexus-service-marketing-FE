import React, { useRef } from "react";
import { Row, Col } from "antd";
import { Carousel, Button, Image } from "antd";

function ServicePack(props) {

    const imageStyle = {
        height: "379px",
        width: "100%"
    };

    const nameServicePackStyle = {
        textAlign: "center",
    }

    const itemServicePackStyle = {
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.08)",
        borderRadius: "10px",
        padding: "25px",
        background: "#FFFFFF",
        // marginRight:"1px",
    }

    const buttonStyle = {
        border: "2px solid #FF7318",
        borderRadius: "86px",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "23px",
        textAlign: "center",
        color: "#FF7318",
        marginTop: "20px"
    }

    return (
        <>
            <Row >
                <Col span={16} offset={4}>
                    <Row gutter={5}>
                        <Col span={16}>
                            <Carousel autoplay={true} autoplaySpeed={6000} pauseOnHover={false}>
                                <Row>
                                    <img style={imageStyle} src="https://fpt.vn/shop/html/assets/images/desktop/1.1.png" />
                                </Row>
                                <Row>
                                    <img style={imageStyle} src="https://fpt.vn/shop/html/assets/images/desktop/1.2.png" />
                                </Row>
                                <Row>
                                    <img style={imageStyle} src="https://fpt.vn/shop/html/assets/images/desktop/1.3.png" />
                                </Row>
                                <Row>
                                    <img style={imageStyle} src="https://fpt.vn/shop/html/assets/images/desktop/1.4.jpg" />
                                </Row>
                            </Carousel>
                        </Col>
                        <Col span={8}>
                            <Row>
                                <Image src={"https://fpt.vn/shop/html/assets/images/desktop/2.1.png"} />
                            </Row>
                            <Row className="mt-5">
                                <Image src={"https://fpt.vn/shop/html/assets/images/desktop/3.1.png"} />
                            </Row>
                            <Row className="mt-5">
                                <Image src={"https://fpt.vn/shop/html/assets/images/desktop/4.1.png"} />
                            </Row>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <Row className="mt-10" gutter={5}>
                <Col span={16} offset={4}>
                    <Row>
                        <Col span={8}>
                        </Col>
                        <Col style={nameServicePackStyle} span={8}>
                            <Row style={{ backgroundColor: "orange", justifyContent: "center", borderRadius: "52px" }}>
                                <Image className="mt-8" src={"https://fpt.vn/shop/html/assets/images/icon/icon-combo.png"} />
                                <h2 className="mt-3" style={{ color: "white" }}>Dial-up</h2>
                            </Row>
                        </Col>
                        <Col span={8}>
                        </Col>
                    </Row>
                    <Row className="mt-10" style={nameServicePackStyle} gutter={5}>
                        <Col style={itemServicePackStyle} span={8}>
                            <h4 style={{ marginBottom: "0" }}>COMBO</h4>
                            <h1>
                                <b style={{ fontSize: "30px" }} className="text-orange">HOURLY BASIS</b>
                            </h1>
                            <span>From</span>
                            <p>100 $/month</p>
                            <p style={{ color: "#BDBDBD" }}>Price does not include VAT</p>
                            <span>Download / Upload</span>
                            <p><b><h2>25 Mbps</h2></b></p>
                            <hr style={{ width: "50%", color: "#BDBDBD" }} />
                            <p>
                                More than 180 TV channels
                                <br /><br />
                                Free installation *
                                <br />
                                Equipped with WiFi Modem & HD Box
                                <br /><br />
                                Fast installation in 12 hours
                                <br />
                                Technical support 24/7
                            </p>
                            <Button style={buttonStyle}>Register now</Button>
                        </Col>
                        <Col style={itemServicePackStyle} span={8}>
                            <h4 style={{ marginBottom: "0" }}>COMBO</h4>
                            <h1>
                                <b style={{ fontSize: "30px" }} className="text-orange">UNLIMITED 28K</b>
                            </h1>
                            <span>From</span>
                            <p>110 $/month</p>
                            <p style={{ color: "#BDBDBD" }}>Price does not include VAT</p>
                            <span>Download / Upload</span>
                            <p><b><h2>25 Mbps</h2></b></p>
                            <hr style={{ width: "50%", color: "#BDBDBD" }} />
                            <p>
                                More than 180 TV channels
                                <br /><br />
                                Free installation *
                                <br />
                                Equipped with WiFi Modem & HD Box
                                <br /><br />
                                Fast installation in 12 hours
                                <br />
                                Technical support 24/7
                            </p>
                            <Button style={buttonStyle}>Register now</Button>
                        </Col>
                        <Col style={itemServicePackStyle} span={8}>
                            <h1>
                                <b style={{ fontSize: "30px" }} className="text-orange">UNLIMITED 56K</b>
                            </h1>
                            <span>From</span>
                            <p>110 $/month</p>
                            <p style={{ color: "#BDBDBD" }}>Price does not include VAT</p>
                            <span>Download / Upload</span>
                            <p><b><h2>25 Mbps</h2></b></p>
                            <hr style={{ width: "50%", color: "#BDBDBD" }} />
                            <p>
                                More than 180 TV channels
                                <br /><br />
                                Free installation *
                                <br />
                                Equipped with WiFi Modem & HD Box
                                <br /><br />
                                Fast installation in 12 hours
                                <br />
                                Technical support 24/7
                            </p>
                            <Button style={buttonStyle}>Register now</Button>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default ServicePack;
