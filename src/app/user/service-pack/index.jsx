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
            <Row className="mt-10">
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
                    <Row className="mt-5" style={nameServicePackStyle}>
                        <Col span={8}>
                            <h4 style={{marginBottom:"0"}}>COMBO</h4>
                            <h1>
                                <b className="text-orange">HOURLY BASIS</b>
                            </h1>
                            <br />

                        </Col>
                        <Col span={8}>
                            <h4 style={{marginBottom:"0"}}>COMBO</h4>
                            <h1>
                                <b className="text-orange">UNLIMITED 28K</b>
                            </h1>
                        </Col>
                        <Col span={8}>
                            <h4 style={{marginBottom:"0"}}>COMBO</h4>
                            <h1>
                                <b className="text-orange">UNLIMITED 56K</b>
                            </h1>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default ServicePack;
