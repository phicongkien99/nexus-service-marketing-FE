import React, { useRef } from "react";
import { Row, Col, Input, Image, Button } from "antd";
import { AudioOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { BookTwoTone } from "@ant-design/icons";

function Membership(props) {

    const { Search } = Input;

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    const onSearch = value => console.log(value);


    return (<>
        <Row className="mt-100" style={{ justifyContent: "center" }}>
            <Col span={16} offset={11}>
                <Row>
                    <Image width={156} height={52} src={"https://id.fpt.vn/images/logo.png"} />
                </Row>
                <Row className="mt-10">
                    <h4 className="font-size-30">LOOK UP CONTRACT</h4>
                </Row>
                <Row className="mt-3">
                    <label className="font-size-15">Your Nexus-Service contract code</label>
                </Row>
                <Row className="mt-20">
                    <Col span={8}>
                        <Search
                            placeholder="input your contract code"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={onSearch}
                        />
                    </Col>
                </Row>
                <Row className="mt-20">
                    <Col span={8}>
                        <hr />
                    </Col>
                </Row>
                <Row className="mt-20">
                    <Col span={8}>
                        <Row>
                            <Col span={12}>
                                <Link>
                                    <Row gutter={15}>
                                        <Col className="mt-5">
                                            <Image width={32} height={32} src={"https://id.fpt.vn/images/Contract32.svg"} />
                                        </Col>
                                        <Col>
                                            Confirmation of <br /> electronic contracts
                                    </Col>
                                    </Row>
                                </Link>
                            </Col>
                            <Col span={12}>
                                <Link>
                                    <Row gutter={15} className="ml-10">
                                        <Col className="mt-5">
                                            <Image width={32} height={32} src={"https://id.fpt.vn/images/Loyalty40.svg"} />
                                        </Col>
                                        <Col>
                                            Look up <br /> for acceptance
                                        </Col>
                                    </Row>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-25 mb-250">
                    <Col span={8}>
                        <Button icon={<BookTwoTone />} block size={"large"} shape={"round"}>User manual</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>);
}

export default Membership;