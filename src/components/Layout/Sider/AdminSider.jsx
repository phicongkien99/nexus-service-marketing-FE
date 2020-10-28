import {
    DashboardOutlined,
    EnvironmentOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sider.scss";
import Logo from "../../../assets/img/radar.svg";

function AdminSider(props) {
    const location = useLocation();
    const { collapsed, onCollapseChange } = props;
    const activeMenu = location.pathname.slice(1);
    return (
        <Layout.Sider width="250" collapsible collapsed={collapsed} onCollapse={onCollapseChange}>
            <div className="brand">
                <div className="logo">
                    <img alt="logo" src={Logo} />
                    {!collapsed && <h1>Admin Page</h1>}
                </div>
            </div>
            <Menu
                theme="dark"
                defaultSelectedKeys={[activeMenu !== "" ? activeMenu : "restaurants"]}
                mode="inline"
            >
                <Menu.ItemGroup>
                    <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                        <Link to="dashboard">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="regions" icon={<EnvironmentOutlined />}>
                        <Link to="regions">Khu vực</Link>
                    </Menu.Item>
                    <Menu.Item key="users" icon={<UserOutlined />}>
                        <Link to="users">Tài khoản</Link>
                    </Menu.Item>
                </Menu.ItemGroup>

                <Menu.ItemGroup title="">
                    <SubMenu key="sub1" icon={<TeamOutlined />} title="Sub Menu">
                        <Menu.Item key="9">Team 1</Menu.Item>
                        <Menu.Item key="10">Team 2</Menu.Item>
                    </SubMenu>
                </Menu.ItemGroup>
            </Menu>{" "}
        </Layout.Sider>
    );
}

export default AdminSider;
