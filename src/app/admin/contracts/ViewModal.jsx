import React, { useEffect } from "react";
import { Modal, Form, Input, Select, PageHeader, Skeleton, Card, Row, Col } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";

function ViewModal({ open, onCancel }) {
    const { detailContract, isLoading } = useSelector((state) => state.adminContract);

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title={`Contract ID: ${detailContract["ContractId"]}`}
            visible={open}
            onCancel={onCancel}
            width={1000}
        >
            <Skeleton loading={isLoading}>
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <h3>Customer info</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <table border="0">
                                    <tr>
                                        <td>Name:</td>
                                        <td>{detailContract["Customer"]["Name"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone:</td>
                                        <td>{detailContract["Customer"]["Phone"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Address:</td>
                                        <td>{detailContract["Customer"]["Address"]}</td>
                                    </tr>
                                </table>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <h3>Request info</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <table border="0">
                                    <tr>
                                        <td>Location:</td>
                                        <td>{detailContract["Address"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Area:</td>
                                        <td>{detailContract["AreaName"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Service:</td>
                                        <td>
                                            {detailContract["ServicePackType"]}-
                                            {detailContract["ServicePackName"]}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Request at:</td>
                                        <td>{moment(detailContract["CreatedAt"]).format("YYYY-MM-DD HH:mm:ss")}</td>
                                    </tr>
                                </table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Skeleton>
        </Modal>
    );
}

export default ViewModal;
