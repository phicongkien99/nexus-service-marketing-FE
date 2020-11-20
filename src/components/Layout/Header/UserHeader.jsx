import React, { useEffect } from "react";
import { HomeOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Menu, Skeleton } from "antd";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServicePacks } from "../../../app/admin/service-packs/slice";
import { fetchConnectionTypes } from "../../../app/admin/connection-types/slice";

function UserHeader(props) {
    const { servicePacks } = useSelector((state) => state.adminServicePack);
    const { connectionTypes } = useSelector((state) => state.adminConnectionType);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchServicePacks(servicePacks));
        dispatch(fetchConnectionTypes(connectionTypes));
    }, []);

    const textStyle = {
        fontSize: "18px",
    };

    const handleSelectPack = (sp) => {
        props.history.push(`/register?pack=${sp["Name"].replace(" ", "-")}.${sp["Id"]}`);
    };

    return (
        <Layout.Header className="header fixed">
            <Menu style={{ width: "100%" }} key="menu" mode="horizontal" selectable={false}>
                <Menu.Item key="HomePage" icon={<HomeOutlined />}>
                    <Link to="/">
                        <b style={textStyle}>Home</b>
                    </Link>
                </Menu.Item>
                <Menu.SubMenu
                    key="ServicePack"
                    title={
                        <>
                            <UnorderedListOutlined /> <b style={textStyle}>Services Pack</b>
                        </>
                    }
                >
                    {/* Dial-up */}
                    {connectionTypes.length > 0 &&
                        connectionTypes.map((type) => (
                            <Menu.SubMenu key={type["Id"]} title={type["Name"]}>
                                {servicePacks.length > 0 &&
                                    servicePacks
                                        .filter((sp) => sp["IdConnectionType"] === type["Id"])
                                        .map((sp) => (
                                            <Menu.Item
                                                key={sp["Id"]}
                                                onClick={() => handleSelectPack(sp)}
                                            >
                                                {sp["Name"]}
                                            </Menu.Item>
                                        ))}
                            </Menu.SubMenu>
                        ))}
                </Menu.SubMenu>
                {/* Promotions */}
                <Menu.Item key="Promotions">
                    <Link to="">
                        <b style={textStyle}>Promotions</b>
                    </Link>
                </Menu.Item>
                {/* Support */}
                <Menu.SubMenu
                    key="Support"
                    title={
                        <>
                            <UnorderedListOutlined /> <b style={textStyle}>Support</b>
                        </>
                    }
                >
                    <Menu.Item key="Contact_Support">
                        <Link to="">Contact 24/7</Link>
                    </Menu.Item>
                    <Menu.Item key="Feedback_Support">
                        <Link to="/feedback">Feedback</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                {/* Member */}
                <Menu.SubMenu
                    key="Member"
                    title={
                        <>
                            <UnorderedListOutlined /> <b style={textStyle}>Member</b>
                        </>
                    }
                >
                    <Menu.Item key="YourAccount_Member">Your Account</Menu.Item>
                    <Menu.Item key="Payment_Member">Payment</Menu.Item>
                    <Menu.Item key="Support_Member">Support</Menu.Item>
                </Menu.SubMenu>
                {/* Online Registration */}
                <Menu.Item key="OnlineRegistration">
                    <Link to="/register">
                        <b style={textStyle}>Online Registration</b>
                    </Link>
                </Menu.Item>
                {/* Online Payment */}
                <Menu.Item key="OnlinePayment">
                    <Link to="">
                        <b style={textStyle}>Online Payment</b>
                    </Link>
                </Menu.Item>
            </Menu>
        </Layout.Header>
    );
}

export default UserHeader;
