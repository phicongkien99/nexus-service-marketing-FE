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
                {detailContract.hasOwnProperty("Customer") && (
                    <>
                        <Row>
                            <Col span={8}>
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
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col span={24}>
                                        <h3>Contract info</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <table border="0" cellPadding="5" cellSpacing="5">
                                            <tbody>
                                                <tr>
                                                    <td>Location:</td>
                                                    <td>{detailContract["Address"]}</td>
                                                </tr>
                                                <tr>
                                                    <td>Area:</td>
                                                    <td>{detailContract["AreaName"]}</td>
                                                </tr>
                                                <tr>
                                                    <td>Start at:</td>
                                                    <td>
                                                        {moment(detailContract["CreatedAt"]).format(
                                                            "YYYY-MM-DD HH:mm:ss"
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row>
                                    <Col span={24}>
                                        <h3>Connection info</h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <table border="0" cellPadding="5" cellSpacing="5">
                                            <tbody>
                                                <tr>
                                                    <td>Status:</td>
                                                    <td>{detailContract["Connection"]["status"]}</td>
                                                </tr>
                                                <tr>
                                                    <td>Device:</td>
                                                    <td>{detailContract["Connection"]["device"]}</td>
                                                </tr>
                                                <tr>
                                                    <td>Service pack:</td>
                                                    <td>{detailContract["Connection"]["servicePack"]}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-15">
                            <Col span={24}>
                                <h3>Unsettled bills</h3>
                                <table cellPadding="15" cellSpacing="15">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Created date</th>
                                            <th>Total price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detailContract["ListPayments"]
                                            .filter((payment) => !payment["PayDate"])
                                            .reverse()
                                            .map((payment, idx) => (
                                                <tr key={payment["Id"]}>
                                                    <td>{idx + 1}</td>
                                                    <td>{moment(payment["CreatedAt"]).format("YYYY-MM-DD HH:mm")}</td>
                                                    <td>{payment["TotalPrice"]}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </>
                )}
            </Skeleton>
        </Modal>
    );
}

export default ViewModal;
