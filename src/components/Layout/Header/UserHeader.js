import React, { useEffect } from "react";
import {
    HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./Header.scss";
import { Link } from "react-router-dom";

function UserHeader(props) {

    return (
        <Layout.Header className="header fixed">
            <Menu style={{ width: "100%" }} key="menu" mode="horizontal" selectable={false}>
                <Menu.Item key="HomePage" icon={<HomeOutlined />}>
                    <Link to="/">Trang chủ</Link>
                </Menu.Item>
            </Menu>
        </Layout.Header>
    );
}

export default UserHeader;
