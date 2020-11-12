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
                <Menu.Item key="providers" icon={<ShopOutlined />}>
                    <Link to="/admin/providers">Providers</Link>
                </Menu.Item>
                <Menu.Item key="areas" icon={<ShopOutlined />}>
                    <Link to="/admin/areas">Areas</Link>
                </Menu.Item>
                <Menu.Item key="fees" icon={<ShopOutlined />}>
                    <Link to="/admin/fees">Fees</Link>
                </Menu.Item>
                <Menu.Item key="connection-statuses" icon={<ShopOutlined />}>
                    <Link to="/admin/connection-statuses">Connection statuses</Link>
                </Menu.Item>
                <Menu.Item key="contract-statuses" icon={<ShopOutlined />}>
                    <Link to="/admin/contract-statuses">Contract statuses</Link>
                </Menu.Item>
                <Menu.Item key="service-form-statuses" icon={<ShopOutlined />}>
                    <Link to="/admin/service-form-statuses">Service form statuses</Link>
                </Menu.Item>
                <Menu.Item key="connection-types" icon={<ShopOutlined />}>
                    <Link to="/admin/connection-types">Connection types</Link>
                </Menu.Item>
                <Menu.Item key="service-packs" icon={<ShopOutlined />}>
                    <Link to="/admin/service-packs">Service packs</Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
}

export default AdminSider;
