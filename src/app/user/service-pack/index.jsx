import React, { useRef } from "react";
import { Row, Col } from "antd";
import { Carousel, Button, Image } from "antd";
import "./ServicePack.scss";

function ServicePack(props) {

    return (
        <>
            {/* Slide top */}
            <Row>
                <Col span={16} offset={4}>
                    <Row gutter={5}>
                        <Col span={16}>
                            <Carousel autoplay={true} autoplaySpeed={6000} pauseOnHover={false}>
                                <Row>
                                    <img
                                        alt="img"
                                        className="image-style"
                                        src="https://fpt.vn/shop/html/assets/images/desktop/1.1.png"
                                    />
                                </Row>
                                <Row>
                                    <img
                                        alt="img"
                                        className="image-style"
                                        src="https://fpt.vn/shop/html/assets/images/desktop/1.2.png"
                                    />
                                </Row>
                                <Row>
                                    <img
                                        alt="img"
                                        className="image-style"
                                        src="https://fpt.vn/shop/html/assets/images/desktop/1.3.png"
                                    />
                                </Row>
                                <Row>
                                    <img
                                        alt="img"
                                        className="image-style"
                                        src="https://fpt.vn/shop/html/assets/images/desktop/1.4.jpg"
                                    />
                                </Row>
                            </Carousel>
                        </Col>
                        <Col span={8}>
                            <Row>
                                <Col span={24}>
                                    <Image
                                        src={
                                            "https://fpt.vn/shop/html/assets/images/desktop/2.1.png"
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col span={24}>
                                    <Image
                                        src={
                                            "https://fpt.vn/shop/html/assets/images/desktop/3.1.png"
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col span={24}>
                                    <Image
                                        src={
                                            "https://fpt.vn/shop/html/assets/images/desktop/4.1.png"
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/*   Dial-up  */}
            <Row className="mt-10" style={{ justifyContent: "center" }}>
                <Col span={16}>
                    <Row>
                        <Col offset={8} className="name-service-pack-style" span={8}>
                            <Row
                                style={{
                                    backgroundColor: "orange",
                                    justifyContent: "center",
                                    borderRadius: "52px",
                                }}
                            >
                                <Image
                                    className="mt-8"
                                    src={
                                        "https://fpt.vn/shop/html/assets/images/icon/icon-combo.png"
                                    }
                                />
                                <h2 className="mt-3" style={{ color: "white" }}>
                                    Dial-up
                                </h2>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-10 name-service-pack-style">
                        <Col className="item-service-pack-style" span={8}>
                            <div className="border-shadow-shtyle">
                                <h4 style={{ marginBottom: "0" }}>COMBO</h4>
                                <h1>
                                    <b style={{ fontSize: "30px" }} className="text-orange">
                                        HOURLY BASIS
                                </b>
                                </h1>
                                <span>From</span>
                                <p>100 $/month</p>
                                <p style={{ color: "#BDBDBD" }}>Price does not include VAT</p>
                                <span>Download / Upload</span>
                                <p>
                                    <b>
                                        <h2>25 Mbps</h2>
                                    </b>
                                </p>
                                <hr style={{ width: "50%", color: "#BDBDBD" }} />
                                <p>
                                    More than 180 TV channels
                                <br />
                                    <br />
                                Free installation *
                                <br />
                                Equipped with WiFi Modem & HD Box
                                <br />
                                    <br />
                                Fast installation in 12 hours
                                <br />
                                Technical support 24/7
                                </p>
                                <Button className="button-orange-style">Register now</Button>
                            </div>
                        </Col>
                        <Col className="item-service-pack-style" span={8}>
                            <div className="border-shadow-shtyle">
                                <h4 style={{ marginBottom: "0" }}>COMBO</h4>
                                <h1>
                                    <b style={{ fontSize: "30px" }} className="text-orange">
                                        UNLIMITED 28K
                                </b>
                                </h1>
                                <span>From</span>
                                <p>110 $/month</p>
                                <p style={{ color: "#BDBDBD" }}>Price does not include VAT</p>
                                <span>Download / Upload</span>
                                <p>
                                    <b>
                                        <h2>25 Mbps</h2>
                                    </b>
                                </p>
                                <hr style={{ width: "50%", color: "#BDBDBD" }} />
                                <p>
                                    More than 180 TV channels
                                <br />
                                    <br />
                                Free installation *
                                <br />
                                Equipped with WiFi Modem & HD Box
                                <br />
                                    <br />
                                Fast installation in 12 hours
                                <br />
                                Technical support 24/7
                                </p>
                                <Button className="button-orange-style">Register now</Button>
                            </div>
                        </Col>
                        <Col className="item-service-pack-style" span={8}>
                            <div className="border-shadow-shtyle">
                                <h4 style={{ marginBottom: "0" }}>COMBO</h4>
                                <h1>
                                    <b style={{ fontSize: "30px" }} className="text-orange">
                                        UNLIMITED 56Kbps
                                </b>
                                </h1>
                                <span>From</span>
                                <p>110 $/month</p>
                                <p style={{ color: "#BDBDBD" }}>Price does not include VAT</p>
                                <span>Download / Upload</span>
                                <p>
                                    <b>
                                        <h2>25 Mbps</h2>
                                    </b>
                                </p>
                                <hr style={{ width: "50%", color: "#BDBDBD" }} />
                                <p>
                                    More than 180 TV channels
                                <br />
                                    <br />
                                Free installation *
                                <br />
                                Equipped with WiFi Modem & HD Box
                                <br />
                                    <br />
                                Fast installation in 12 hours
                                <br />
                                Technical support 24/7
                                </p>
                                <Button className="button-orange-style">Register now</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/*   Broad Band  */}
            <Row className="mt-20" style={{ justifyContent: "center" }}>
                <Col span={16}>
                    <Row>
                        <Col span={8}></Col>
                        <Col className="name-service-pack-style" span={8}>
                            <Row
                                style={{
                                    backgroundColor: "#4EB848",
                                    justifyContent: "center",
                                    borderRadius: "52px",
                                }}
                            >
                                <Image
                                    className="mt-8"
                                    src={
                                        "https://fpt.vn/shop/html/assets/images/icon/icon-net-only.png"
                                    }
                                />
                                <h2 className="mt-3" style={{ color: "white" }}>
                                    Broad Band
                                </h2>
                            </Row>
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row className="mt-10 name-service-pack-style" >
                        <Col className="item-service-pack-style" span={8}>
                            <div className="border-shadow-shtyle">
                                <h4 style={{ marginBottom: "0" }}>COMBO</h4>
                                <h1>
                                    <b style={{ fontSize: "30px" }} className="text-green">
                                        HOURLY BASIS
                                </b>
                                </h1>
                                <span>From</span>
                                <p>100 $/month</p>
                                <p style={{ color: "#BDBDBD" }}>Price does not include VAT</p>
                                <span>Download / Upload</span>
                                <p>
                                    <b>
                                        <h2>25 Mbps</h2>
                                    </b>
                                </p>
                                <hr style={{ width: "50%", color: "#BDBDBD" }} />
                                <p>
                                    More than 180 TV channels
                                <br />
                                    <br />
                                Free installation *
                                <br />
                                Equipped with WiFi Modem & HD Box
                                <br />
                                    <br />
                                Fast installation in 12 hours
                                <br />
                                Technical support 24/7
                            </p>
                                <Button className="button-green-style">Register now</Button>
                            </div>
                        </Col>
                        <Col className="item-service-pack-style" span={8}>
                            <div className="border-shadow-shtyle">
                                <h4 style={{ marginBottom: "0" }}>COMBO</h4>
                                <h1>
                                    <b style={{ fontSize: "30px" }} className="text-green">
                                        UNLIMITED 64Kbps
                                </b>
                                </h1>
                                <span>From</span>
                                <p>110 $/month</p>
                                <p style={{ color: "#BDBDBD" }}>Price does not include VAT</p>
                                <span>Download / Upload</span>
                                <p>
                                    <b>
                                        <h2>25 Mbps</h2>
                                    </b>
                                </p>
                                <hr style={{ width: "50%", color: "#BDBDBD" }} />
                                <p>
                                    More than 180 TV channels
                                <br />
                                    <br />
                                Free installation *
                                <br />
                                Equipped with WiFi Modem & HD Box
                                <br />
                                    <br />
                                Fast installation in 12 hours
                                <br />
                                Technical support 24/7
                                </p>
                                <Button className="button-green-style">Register now</Button>
                            </div>
                        </Col>
                        <Col className="item-service-pack-style" span={8}>
                            <div className="border-shadow-shtyle">
                                <h4 style={{ marginBottom: "0" }}>COMBO</h4>
                                <h1>
                                    <b style={{ fontSize: "30px" }} className="text-green">
                                        UNLIMITED 128Kbps
                                </b>
                                </h1>
                                <span>From</span>
                                <p>110 $/month</p>
                                <p style={{ color: "#BDBDBD" }}>Price does not include VAT</p>
                                <span>Download / Upload</span>
                                <p>
                                    <b>
                                        <h2>25 Mbps</h2>
                                    </b>
                                </p>
                                <hr style={{ width: "50%", color: "#BDBDBD" }} />
                                <p>
                                    More than 180 TV channels
                                <br />
                                    <br />
                                Free installation *
                                <br />
                                Equipped with WiFi Modem & HD Box
                                <br />
                                    <br />
                                Fast installation in 12 hours
                                <br />
                                Technical support 24/7
                                </p>
                                <Button className="button-green-style">Register now</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/*  Land Line  */}
            <Row className="mt-20" style={{ justifyContent: "center" }}>
                <Col span={16}>
                    <Row>
                        <Col span={8}></Col>
                        <Col className="name-service-pack-style" span={8}>
                            <Row
                                style={{
                                    backgroundColor: "#035690",
                                    justifyContent: "center",
                                    borderRadius: "52px",
                                }}
                            >
                                <Image
                                    className="mt-8"
                                    src={
                                        "https://fpt.vn/shop/html/assets/images/icon/icon-combo.png"
                                    }
                                />
                                <h2 className="mt-3" style={{ color: "white" }}>
                                    Land Line
                                </h2>
                            </Row>
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row className="mt-10 name-service-pack-style">
                        <Col className="item-service-pack-style" span={8}>
                            <div className="border-shadow-shtyle">
                                <h4 style={{ marginBottom: "0" }}>COMBO</h4>
                                <h1>
                                    <b style={{ fontSize: "30px" }} className="text-blue">
                                        LOCAL PLAN
                                </b>
                                </h1>
                                <span>From</span>
                                <p>100 $/month</p>
                                <p style={{ color: "#BDBDBD" }}>Price does not include VAT</p>
                                <span>Download / Upload</span>
                                <p>
                                    <b>
                                        <h2>25 Mbps</h2>
                                    </b>
                                </p>
                                <hr style={{ width: "50%", color: "#BDBDBD" }} />
                                <p>
                                    More than 180 TV channels
                                <br />
                                    <br />
                                Free installation *
                                <br />
                                Equipped with WiFi Modem & HD Box
                                <br />
                                    <br />
                                Fast installation in 12 hours
                                <br />
                                Technical support 24/7
                                </p>
                                <Button className="button-blue-style">Register now</Button>
                            </div>
                        </Col>
                        <Col className="item-service-pack-style" span={8}>
                            <div className="border-shadow-shtyle">
                                <h4 style={{ marginBottom: "0" }}>COMBO</h4>
                                <h1>
                                    <b style={{ fontSize: "30px" }} className="text-blue">
                                        STD PLAN
                                </b>
                                </h1>
                                <span>From</span>
                                <p>110 $/month</p>
                                <p style={{ color: "#BDBDBD" }}>Price does not include VAT</p>
                                <span>Download / Upload</span>
                                <p>
                                    <b>
                                        <h2>25 Mbps</h2>
                                    </b>
                                </p>
                                <hr style={{ width: "50%", color: "#BDBDBD" }} />
                                <p>
                                    More than 180 TV channels
                                <br />
                                    <br />
                                Free installation *
                                <br />
                                Equipped with WiFi Modem & HD Box
                                <br />
                                    <br />
                                Fast installation in 12 hours
                                <br />
                                Technical support 24/7
                            </p>
                                <Button className="button-blue-style">Register now</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* Promotion Service Pack */}
            <Row className="mt-20" style={{ justifyContent: "center" }}>
                <Col span={20}>
                    {/* Image left */}
                    <Row>
                        <Row style={{ fontSize: "30px" }}>
                            <Col offset={7} span={24}>
                                <h1>
                                    <b>Special offer for Online Subscription only</b>
                                </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={16}>
                                <img
                                    alt="img"
                                    style={{ width: "900px" }}
                                    src="https://fpt.vn/shop/html/assets/images/event_t11/desktop/5.jpg"
                                />
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <h1
                                        className="text-orange front-size-20"
                                        style={{ marginLeft: "4%" }}
                                    >
                                        Apply only at Nexus Service
                                    </h1>
                                </Row>
                                <Row>
                                    <ul>
                                        <li>
                                            Up to 3 months free when prepaid Hourly Basis package
                                        </li>
                                        <li>
                                            Up to 2 months free when prepaid Unlimited 24K package
                                        </li>
                                        <li>
                                            Up to 1 months free when prepaid Unlimited 56Kbps
                                            package
                                        </li>
                                    </ul>
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                    {/* Image right */}
                    <Row className="mt-20">
                        <Row>
                            <Col span={8}>
                                <Row>
                                    <h1
                                        className="text-orange front-size-20"
                                    >
                                        Apply only at Nexus Service
                                    </h1>
                                </Row>
                                <Row>
                                    <ul style={{ paddingLeft: "22px" }}>
                                        <li>
                                            Up to 3 months free when prepaid Hourly Basis package
                                        </li>
                                        <li>
                                            Up to 2 months free when prepaid Unlimited 64Kbps
                                            package
                                        </li>
                                        <li>
                                            Up to 1 months free when prepaid Unlimited 120Kbps
                                            package
                                        </li>
                                    </ul>
                                </Row>
                            </Col>
                            <Col span={16}>
                                <img
                                    alt="img"
                                    style={{ width: "900px" }}
                                    src="https://fpt.vn/shop/html/assets/images/event_t11/desktop/6.png"
                                />
                            </Col>
                        </Row>
                    </Row>
                    {/* Image left */}
                    <Row className="mt-20">
                        <Row>
                            <Col span={16}>
                                <Row>
                                    <img
                                        alt="img"
                                        style={{ width: "900px" }}
                                        src="https://fpt.vn/shop/html/assets/images/event_t11/desktop/5.jpg"
                                    />
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <h1
                                        className="text-orange front-size-20"
                                        style={{ marginLeft: "4%" }}
                                    >
                                        Apply only at Nexus Service
                                    </h1>
                                </Row>
                                <Row>
                                    <ul>
                                        <li>Up to 3 months free when prepaid Local Plan package</li>
                                        <li>Up to 2 months free when prepaid STD package</li>
                                    </ul>
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default ServicePack;
