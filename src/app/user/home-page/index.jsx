import React from "react";
import { Row, Col, Carousel } from "antd";
import HomePageCarousel from "./carousel";
import "./Home.scss";

function HomePage(props) {
    return (
        <>
            <Row>
                <Col span={24} id="home-page-carousel">
                    <HomePageCarousel />
                </Col>
            </Row>
        </>
    );
}

export default HomePage;