import { Layout } from "antd";
import React, { useState } from "react";
import UserFooter from "./Footer";
import { UserHeader } from "./Header";
import "./Layout.scss";

function UserLayout(props) {
    return (
        <Layout className="wrapper">
            <Layout>
                <UserHeader />
                <Layout.Content className="wrapper-content">
                    <div className="main-content white-background content-padding">{props.children}</div>
                </Layout.Content>
                <UserFooter />
            </Layout>
        </Layout>
    );
}

export default UserLayout;
