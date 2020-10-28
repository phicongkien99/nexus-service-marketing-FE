import React from "react";
import { Row, Col, Carousel, Image } from "antd";
import HomePageCarousel from "./carousel";
import "./Home.scss";
import Register from "../../../assets/img/register.png";
import Member from "../../../assets/img/member.png";
import Support from "../../../assets/img/support.png";

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
                        <Col span={8} className="text--center">
                            <Image src={Register} alt="Register online" />
                            <h2 className="text--blue">Register online</h2>
                        </Col>
                        <Col span={8} className="text--center">
                            <Image src={Member} alt="Member" />
                            <h2 className="text--orange">Membership</h2>
                        </Col>
                        <Col span={8} className="text--center">
                            <Image src={Support} alt="Support" />
                            <h2 className="text--green">Support</h2>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default HomePage;
