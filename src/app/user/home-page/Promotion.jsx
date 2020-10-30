import React, { useRef } from "react";
import { Row, Col, Carousel, Image, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Register from "../../../assets/img/register.png";
import Member from "../../../assets/img/member.png";
import Support from "../../../assets/img/support.png";

function HomePagePromation(props) {
    const carousel = useRef(null);

    const next = () => {
        carousel.current.next();
    };

    const prev = () => {
        carousel.current.prev();
    };

    const textBlack = {       
        color: "black",       
    };

    const divStyle = {
        float: 'left',
        marginRight: '2px',
        marginLeft: '2px',
    }
    return (
        <>

            <div>
                <div style={divStyle}>
                    <Image src={"https://fpt.vn/static/storage/upload/images/promotions/khuyen_mai/fpt_aicungcoqua_3006_700x410-png?w=354&h=210&fit=crop"} />
                    <h2>
                        <Link style={textBlack} to="">
                            The Program "Home Entertainment <br />
                            with wonderful presents" of FPT<br />
                            Television is extended until June 30 <br />
                        </Link>
                    </h2>
                    <p>
                        Fsend is the first free large file <br />
                            transfer via email service in Vietnam <br />
                            that allows users to send large files
                        </p>
                    <Link className="text--orange" to="">
                        <b><RightOutlined /> Read more</b>
                    </Link>
                </div>
                <div style={divStyle}>
                    <Image src={"https://fpt.vn/static/storage/upload/images/promotions/khuyen_mai/hinh_3-png?w=354&h=210&fit=crop"} />
                    <h2>
                        <Link  style={textBlack} to="">
                            The Program "Home Entertainment <br />
                            with wonderful presents" of FPT<br />
                            Television is extended until June 30 <br />
                        </Link>
                    </h2>
                    <p>
                        Fsend is the first free large file <br />
                            transfer via email service in Vietnam <br />
                            that allows users to send large files
                        </p>
                    <Link className="text--orange" to="">
                        <b><RightOutlined /> Read more</b>
                    </Link>
                </div>
                <div style={divStyle}>
                    <Image src={"https://fpt.vn/static/storage/upload/images/promotions/khuyen_mai/foxy_mylinh-png?w=354&h=210&fit=crop"} />
                    <h2>
                        <Link style={textBlack} to="">
                            The Program "Home Entertainment <br />
                            with wonderful presents" of FPT<br />
                            Television is extended until June 30 <br />
                        </Link>
                    </h2>
                    <p>
                        Fsend is the first free large file <br />
                            transfer via email service in Vietnam <br />
                            that allows users to send large files
                        </p>
                    <Link className="text--orange" to="">
                        <b><RightOutlined /> Read more</b>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default HomePagePromation;
