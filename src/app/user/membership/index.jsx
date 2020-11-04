import React, { useRef } from "react";
import { Row, Col } from "antd";
import { Carousel, Button, Image } from "antd";

function Membership(props) {

    return (<>
        <Row style={{ justifyContent: "center" }}>
            <Col span={16}>
                <Row style={{ justifyContent: "left" }}>
                    <Row>
                        <Image height={156} width src={"https://id.fpt.vn/images/logo.png"}/>
                    </Row>
                    <Row></Row>
                </Row>
            </Col>
        </Row>
    </>);

}

export default Membership;