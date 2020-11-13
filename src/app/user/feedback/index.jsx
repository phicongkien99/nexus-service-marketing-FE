import React, { useEffect, useState } from "react";
import { Row, Col, Input, Image, Button } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setIsReceived, createCustomerFeedback } from "../../slice/customer-feedback";

function Feedback(props) {
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");
    const [Email, setEmail] = useState("");
    const [Content, setContent] = useState("");

    const dispatch = useDispatch();

    const { isLoading, isReceived } = useSelector((state) => state.userCustomerFeedback);

    const refreshForm = () => {
        setName("");
        setPhone("");
        setAddress("");
        setEmail("");
        setContent("");
    };

    useEffect(() => {
        if (isReceived) {
            dispatch(setIsReceived(false));
            refreshForm();
        }
    }, [isReceived]);

    const handleSubmitFeedback = () => {
        if (Name && Phone && Content) {
            dispatch(
                createCustomerFeedback({
                    Name,
                    Phone,
                    Email,
                    Address,
                    Content,
                })
            );
        }
    };

    return (
        <>
            <Row className="bg-gray">
                <Col span={16} offset={4}>
                    <Row>
                        <Col span={12}>
                            <div style={{ width: "165px" }}>
                                <Image src="https://fpt.vn/assets/frontend/personal/support/icon/feedback.png" />
                                <span className="font-size-20 text-orange">FEEDBACK</span>
                                <hr style={{ height: "3px", backgroundColor: "orange", border: "none" }} />
                            </div>
                            <Image src="https://fpt.vn/assets/frontend/personal/support/img/info-feedback.jpg" />
                            <p>
                                <b>
                                    With the customer-centric principle, Nexus Service always wants to receive more feedback from our customers. Any comments
                                    from Customers will be recorded and used for the continuous improvement and enhancement of the quality of our services.
                                    Customers can provide feedback on Nexus Service using the form on the side. Sincerely thanks!
                                </b>
                            </p>
                        </Col>
                        <Col span={12} style={{ padding: "67px 10px 0px 40px" }}>
                            <Row>
                                <Col span={24}>
                                    <label className="font-size-15">
                                        Full name <span className="text-red">*</span>
                                    </label>
                                    <Input value={Name} onChange={(e) => setName(e.target.value)} />
                                </Col>
                            </Row>
                            <Row className="mt-10" gutter={5}>
                                <Col span={12}>
                                    <label className="font-size-15">
                                        Phone number <span className="text-red">*</span>
                                    </label>
                                    <Input value={Phone} onChange={(e) => setPhone(e.target.value)} />
                                </Col>
                                <Col span={12}>
                                    <label className="font-size-15">Email</label>
                                    <Input value={Email} onChange={(e) => setEmail(e.target.value)} />
                                </Col>
                            </Row>
                            <Row className="mt-10">
                                <Col span={24}>
                                    <label className="font-size-15">Address</label>
                                    <Input value={Address} onChange={(e) => setAddress(e.target.value)} />
                                </Col>
                            </Row>
                            <Row className="mt-10">
                                <Col span={24}>
                                    <label className="font-size-15">Feedback</label>
                                    <Input.TextArea rows={5} value={Content} onChange={(e) => setContent(e.target.value)} />
                                </Col>
                            </Row>
                            <Row className="mt-10">
                                <Col span={24}>
                                    <Button loading={isLoading} type="primary" disabled={!Content || !Phone || !Name} block onClick={handleSubmitFeedback}>
                                        Submit feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Feedback;
