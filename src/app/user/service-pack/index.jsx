import React, { useEffect, useRef } from "react";
import { Row, Col } from "antd";
import { Carousel, Button, Image } from "antd";
import "./ServicePack.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchServicePacks } from "../../admin/service-packs/slice";
import { fetchConnectionTypes } from "../../admin/connection-types/slice";
import { Link } from "react-router-dom";

function ServicePack(props) {
    const { servicePacks } = useSelector((state) => state.adminServicePack);
    const { connectionTypes } = useSelector((state) => state.adminConnectionType);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchServicePacks(servicePacks));
        dispatch(fetchConnectionTypes(connectionTypes));
    }, []);

    const backgroundColor = ["orange", "#4EB848", "#035690"];

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

            {connectionTypes.map((ct, idx) => (
                <Row className="mt-10" style={{ justifyContent: "center" }}>
                    <Col span={16}>
                        <Row>
                            <Col offset={8} className="name-service-pack-style" span={8}>
                                <Row
                                    style={{
                                        backgroundColor: backgroundColor[idx],
                                        justifyContent: "center",
                                        borderRadius: "52px",
                                    }}
                                >
                                    <h2 className="mt-3" style={{ color: "white" }}>
                                        {ct["Name"]}
                                    </h2>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-10 name-service-pack-style">
                            {servicePacks
                                .filter((sp) => sp["IdConnectionType"] == ct["Id"])
                                .map((sp) => (
                                    <Col className="item-service-pack-style" span={8}>
                                        <div className="border-shadow-shtyle">
                                            <h4 style={{ marginBottom: "0" }}>COMBO</h4>
                                            <h1>
                                                <b
                                                    style={{ fontSize: "30px" }}
                                                    className="text-orange"
                                                >
                                                    {sp["Name"]}
                                                </b>
                                            </h1>
                                            <span>From</span>
                                            <p>100 $/month</p>
                                            <p style={{ color: "#BDBDBD" }}>
                                                Price does not include VAT
                                            </p>
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
                                            <Link
                                                to={{
                                                    pathname: "/register",
                                                    search: `?pack=${sp["Name"].replace(" ", "-")}.${sp["Id"]}`
                                                }}
                                            >
                                                <Button className="button-orange-style">
                                                    Register now
                                                </Button>
                                            </Link>
                                        </div>
                                    </Col>
                                ))}
                        </Row>
                    </Col>
                </Row>
            ))}

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
                        <Row gutter={15}>
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
                                        className="text-orange font-size-20"
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
                                    <h1 className="text-orange font-size-20">
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
                </Col>
            </Row>
        </>
    );
}

export default ServicePack;
