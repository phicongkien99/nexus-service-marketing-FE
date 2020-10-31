import React, { useRef } from "react";
import { Row, Col, Carousel, Image, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Register from "../../../assets/img/register.png";
import Member from "../../../assets/img/member.png";
import Support from "../../../assets/img/support.png";

function HomePagePromation(props) {
    return (
        <>
            <Row gutter={35}>
                <Col span={8}>
                    <Image
                        className="full-width"
                        src={
                            "https://fpt.vn/static/storage/upload/images/promotions/khuyen_mai/fpt_aicungcoqua_3006_700x410-png?w=354&h=210&fit=crop"
                        }
                    />
                    <h2>
                        <Link className="text-black" to="">
                            The Program "Home Entertainment <br />
                            with wonderful presents" of FPT
                            <br />
                            Television is extended until June 30 <br />
                        </Link>
                    </h2>
                    <p>
                        Fsend is the first free large file <br />
                        transfer via email service in Vietnam <br />
                        that allows users to send large files
                    </p>
                    <Link className="text-orange" to="">
                        <b>
                            <RightOutlined /> Read more
                        </b>
                    </Link>
                </Col>
                <Col span={8}>
                    <Image
                        className="full-width"
                        src={
                            "https://fpt.vn/static/storage/upload/images/promotions/khuyen_mai/hinh_3-png?w=354&h=210&fit=crop"
                        }
                    />
                    <h2>
                        <Link className="text-black" to="">
                            The Program "Home Entertainment <br />
                            with wonderful presents" of FPT
                            <br />
                            Television is extended until June 30 <br />
                        </Link>
                    </h2>
                    <p>
                        Fsend is the first free large file <br />
                        transfer via email service in Vietnam <br />
                        that allows users to send large files
                    </p>
                    <Link className="text-orange" to="">
                        <b>
                            <RightOutlined /> Read more
                        </b>
                    </Link>
                </Col>
                <Col span={8}>
                    <Image
                        className="full-width"
                        src={
                            "https://fpt.vn/static/storage/upload/images/promotions/khuyen_mai/foxy_mylinh-png?w=354&h=210&fit=crop"
                        }
                    />
                    <h2>
                        <Link className="text-black" to="">
                            The Program "Home Entertainment <br />
                            with wonderful presents" of FPT
                            <br />
                            Television is extended until June 30 <br />
                        </Link>
                    </h2>
                    <p>
                        Fsend is the first free large file <br />
                        transfer via email service in Vietnam <br />
                        that allows users to send large files
                    </p>
                    <Link className="text-orange" to="">
                        <b>
                            <RightOutlined /> Read more
                        </b>
                    </Link>
                </Col>
            </Row>
        </>
    );
}

export default HomePagePromation;
