import { DashboardOutlined, ShopOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sider.scss";
import Logo from "../../../assets/img/radar.svg";

function AdminSider(props) {
    const location = useLocation();
    const { collapsed, onCollapseChange } = props;
    const activeMenu = location.pathname.replace("/admin/", "");

    return (
        <Layout.Sider theme="light" width="250" collapsible collapsed={collapsed} onCollapse={onCollapseChange}>
            <div className="brand">
                <div className="logo">
                    <img alt="logo" src={Logo} />
                    {!collapsed && <h1>Admin Page</h1>}
                </div>
            </div>
            <Menu defaultSelectedKeys={[activeMenu !== "" ? activeMenu : "dashboard"]} mode="inline">
                <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                    <Link to="/admin/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="stores" icon={<ShopOutlined />}>
                    <Link to="/admin/stores">Retail stores</Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
}

export default AdminSider;
