import React, { useEffect } from "react";
import { HomeOutlined, UnorderedListOutlined } from "@ant-design/icons";
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
                <Menu.SubMenu
                    key="ServicePack"
                    title={
                        <>
                            <UnorderedListOutlined /> Sản phẩm dịch vụ
                        </>
                    }
                >
                    <Menu.Item key="Broadband">Broadband</Menu.Item>
                    <Menu.Item key="DialUp">Dial-up</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Layout.Header>
    );
}

export default UserHeader;
