import React, { useEffect } from "react";
import { Row, Col } from "antd";
import qs from "query-string";
import { useDispatch, useSelector } from "react-redux";

function Register({history, location: {search}}) {
    
    const dispatch = useDispatch();

    const { } = useSelector(state => state.userRegister);
    const { servicePacks } = useSelector(state => state.adminServicePack);

    useEffect(() => {
        const searchObj = qs.parse(search);
        if (searchObj["pack"]) {
            const [Name, Id] = searchObj["pack"].split(".");
        } else {
            history.push("/service-pack");
        }
    }, [search]);

    return (
        <Row>
            <Col span={24}>Sup</Col>
        </Row>
    );
}

export default Register;