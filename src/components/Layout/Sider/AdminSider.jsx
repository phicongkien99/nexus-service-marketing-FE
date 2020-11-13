import {
    DashboardOutlined,
    ShopOutlined,
    WindowsOutlined,
    DatabaseOutlined,
    CustomerServiceOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sider.scss";
import Logo from "../../../assets/img/radar.svg";

function AdminSider(props) {
    const location = useLocation();
    const { collapsed, onCollapseChange } = props;
    const activeMenu = location.pathname.split("/");

    return (
        <Layout.Sider theme="light" width="250" collapsible collapsed={collapsed} onCollapse={onCollapseChange}>
            <div className="brand">
                <div className="logo">
                    <img alt="logo" src={Logo} />
                    {!collapsed && <h1>Admin Page</h1>}
                </div>
            </div>
            <Menu defaultSelectedKeys={activeMenu} defaultOpenKeys={activeMenu} mode="inline">
                <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                    <Link to="/admin/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="stores" icon={<ShopOutlined />}>
                    <Link to="/admin/stores">Retail stores</Link>
                </Menu.Item>
                <Menu.Item key="employees" icon={<UserOutlined />}>
                    <Link to="/admin/employees">Employees</Link>
                </Menu.Item>
                <Menu.SubMenu key="service" title="Services" icon={<CustomerServiceOutlined />}>
                    <Menu.Item key="customers">
                        <Link to="/admin/service/customers">Customers</Link>
                    </Menu.Item>
                    <Menu.Item key="customer-feedbacks">
                        <Link to="/admin/service/customer-feedbacks">Customer feedbacks</Link>
                    </Menu.Item>
                    <Menu.Item key="contracts">
                        <Link to="/admin/service/contracts">Contracts</Link>
                    </Menu.Item>
                    <Menu.Item key="service-forms">
                        <Link to="/admin/service/service-forms">Service forms</Link>
                    </Menu.Item>
                    <Menu.Item key="service-packs">
                        <Link to="/admin/service/service-packs">Service packs</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="storage" title="Device management" icon={<DatabaseOutlined />}>
                    <Menu.Item key="providers">
                        <Link to="/admin/storage/providers">Providers</Link>
                    </Menu.Item>
                    <Menu.Item key="manufacturers">
                        <Link to="/admin/storage/manufacturers">Manufacturers</Link>
                    </Menu.Item>
                    <Menu.Item key="devices">
                        <Link to="/admin/storage/devices">Devices</Link>
                    </Menu.Item>
                    <Menu.Item key="import-receipts">
                        <Link to="/admin/storage/import-receipts">Import receipts</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="attribute" title="Attribute management" icon={<WindowsOutlined />}>
                    <Menu.Item key="areas">
                        <Link to="/admin/attribute/areas">Areas</Link>
                    </Menu.Item>
                    <Menu.Item key="fees">
                        <Link to="/admin/attribute/fees">Fees</Link>
                    </Menu.Item>
                    <Menu.Item key="connection-statuses">
                        <Link to="/admin/attribute/connection-statuses">Connection statuses</Link>
                    </Menu.Item>
                    {/* <Menu.Item key="contract-statuses">
                        <Link to="/admin/attribute/contract-statuses">Contract statuses</Link>
                    </Menu.Item> */}
                    <Menu.Item key="service-form-statuses">
                        <Link to="/admin/attribute/service-form-statuses">Service form statuses</Link>
                    </Menu.Item>
                    <Menu.Item key="connection-types">
                        <Link to="/admin/attribute/connection-types">Connection types</Link>
                    </Menu.Item>
                    <Menu.Item key="device-types">
                        <Link to="/admin/attribute/device-types">Device types</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Layout.Sider>
    );
}

export default AdminSider;
