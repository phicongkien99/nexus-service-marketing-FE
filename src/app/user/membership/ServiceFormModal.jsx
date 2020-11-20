import React, { useEffect } from "react";
import { Modal, Form, Input, Select, PageHeader, Skeleton, Card, Row, Col } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";

function ViewModal({ open, onCancel }) {
    const { detailServiceForm, isLoading } = useSelector((state) => state.adminServiceForm);

    return (
        <Modal
            closable={false}
            maskClosable={false}
            title={`Service form ID: ${detailServiceForm["ServiceFormId"]}`}
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
                                <table border="0" cellPadding="5" cellSpacing="5">
                                    <tbody>
                                        <tr>
                                            <td>Name:</td>
                                            <td>{detailServiceForm["CustomerName"]}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone:</td>
                                            <td>{detailServiceForm["CustomerPhone"]}</td>
                                        </tr>
                                        <tr>
                                            <td>Address:</td>
                                            <td>{detailServiceForm["CustomerAddress"]}</td>
                                        </tr>
                                    </tbody>
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
                                <table border="0" cellPadding="5" cellSpacing="5">
                                    <tbody>
                                        <tr>
                                            <td>Location:</td>
                                            <td>{detailServiceForm["Address"]}</td>
                                        </tr>
                                        <tr>
                                            <td>Area:</td>
                                            <td>{detailServiceForm["AreaName"]}</td>
                                        </tr>
                                        <tr>
                                            <td>Service:</td>
                                            <td>
                                                {detailServiceForm["ServicePackType"]}-
                                                {detailServiceForm["ServicePackName"]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Request at:</td>
                                            <td>
                                                {moment(detailServiceForm["CreatedAt"]).format(
                                                    "YYYY-MM-DD HH:mm:ss"
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
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
