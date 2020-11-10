import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Avatar } from "antd";
import React, { Fragment } from "react";
import "./Header.scss";
import Logo from "../../../assets/img/radar.svg";
import SubMenu from "antd/lib/menu/SubMenu";
import { useLocation } from "react-router-dom";

function AdminHeader({history}) {

    const handleSignOut = () => {
        window.userInfo = undefined;
        window.localStorage.removeItem("token");
        history.push("/");
    };

    return (
        <Layout.Header className="header admin-header">
            <Menu style={{ width: "100%" }} className="bg-transparent" key="user" mode="horizontal" selectable={false}>
                <SubMenu
                    style={{ float: "right" }}
                    title={
                        <Fragment>
                            <span style={{ color: "#999", marginRight: 4 }}>Hi,</span>
                            <span className="username">Admin</span>
                            <Avatar style={{ marginLeft: 8 }} src={Logo} />
                        </Fragment>
                    }
                >
                    <Menu.Item key="SignOut" onClick={handleSignOut}>
                        Sign out
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Layout.Header>
    );
}

export default AdminHeader;
