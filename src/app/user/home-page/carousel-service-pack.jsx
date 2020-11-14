import React, { useRef } from "react";
import { Row, Col, Carousel, Image, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Register from "../../../assets/img/register.png";
import Member from "../../../assets/img/member.png";
import Support from "../../../assets/img/support.png";

function HomePageCarouselServicePack(props) {
    const carousel = useRef(null);

    const next = () => {
        carousel.current.next();
    };

    const prev = () => {
        carousel.current.prev();
    };

    return (
        <>
            <Button
                className="arrow-button arrow-button-left"
                icon={<LeftOutlined />}
                onClick={prev}
            />
            <Button
                className="arrow-button arrow-button-right"
                icon={<RightOutlined />}
                onClick={next}
            />
            <Carousel ref={carousel} autoplay={true} autoplaySpeed={6000} pauseOnHover={true}>
                <div>
                    <Row gutter={5}>
                        <Col span={8}>
                            <Image src={Register} alt="Register online" />
                            <h2 className="text-blue">
                                <Link to="">Dial-up</Link>
                            </h2>
                            <p>
                                Fsend is the first free large file <br />
                                transfer via email service in Vietnam <br />
                                that allows users to send large files
                            </p>
                            <Link className="text-orange" to="">
                                <b>
                                    <RightOutlined /> Learn more
                                </b>
                            </Link>
                        </Col>
                        <Col span={8}>
                            <Image src={Register} alt="Register online" />
                            <h2 className="text-blue">
                                <Link to="">Board Band</Link>
                            </h2>
                            <p>
                                Fsend is the first free large file <br />
                                transfer via email service in Vietnam <br />
                                that allows users to send large files
                            </p>
                            <Link className="text-orange" to="">
                                <b>
                                    <RightOutlined /> Learn more
                                </b>
                            </Link>
                        </Col>
                        <Col span={8}>
                            <Image src={Register} alt="Register online" />
                            <h2 className="text-blue">
                                <Link to="">Land Line</Link>
                            </h2>
                            <p>
                                Fsend is the first free large file <br />
                                transfer via email service in Vietnam <br />
                                that allows users to send large files
                            </p>
                            <Link className="text-orange" to="">
                                <b>
                                    <RightOutlined /> Learn more
                                </b>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Carousel>
        </>
    );
}

export default HomePageCarouselServicePack;
