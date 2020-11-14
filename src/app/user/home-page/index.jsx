import React from "react";
import { Row, Col, Carousel, Image } from "antd";
import HomePageCarousel from "./carousel";
import HomePageCarouselServicePack from "./carousel-service-pack";
import HomePagePromotion from "./Promotion";
import "./Home.scss";
import Register from "../../../assets/img/register.png";
import Member from "../../../assets/img/member.png";
import Support from "../../../assets/img/support.png";
import { Link } from "react-router-dom";

function HomePage(props) {
    return (
        <>
            <Row>
                <Col span={24} id="home-page-carousel">
                    <HomePageCarousel />
                </Col>
            </Row>
            <Row className="mt-15">
                <Col span={16} offset={4}>
                    <Row gutter={5}>
                        <Col span={8} className="text-center">
                            <Link to="/service-pack">
                                <Image src={Register} alt="Register online" />
                                <h2 className="text-blue">Register online</h2>
                            </Link>
                        </Col>
                        <Col span={8} className="text-center">
                            <Link to="/membership">
                                <Image src={Member} alt="Member" />
                                <h2 className="text-orange">Membership</h2>
                            </Link>
                        </Col>
                        <Col span={8} className="text-center">
                            <Link to="/feedback">
                                <Image src={Support} alt="Support" />
                                <h2 className="text-green">Feedback</h2>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-15">
                <Col span={16} offset={4}>
                    <b style={{ fontSize: "18px" }}>Promotion</b>
                </Col>
            </Row>
            <Row className="mt-15">
                <Col span={16} offset={4} id="home-page-promotion">
                    <HomePagePromotion />
                </Col>
            </Row>
        </>
    );
}

export default HomePage;
