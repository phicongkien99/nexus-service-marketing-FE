import React from "react";
import { Route } from "react-router-dom";
import UserLayout from "../../components/Layout/UserLayout";
import NotFound from "../../components/Layout/NotFound";

function UserLayoutRoute({ component: Component, ...rest }) {
    const isLogin = true;
    if (!isLogin) {
        return <NotFound />
    }
    
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <UserLayout>
                    <Component {...matchProps} />
                </UserLayout>
            )}
        />
    );
}

export default UserLayoutRoute;