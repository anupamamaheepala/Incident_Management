import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Menu, ConfigProvider, Dropdown, Space, Avatar } from "antd";
import { useAuth } from "../context/Context";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem("My Profile", "/userProfile", <Icon icon="iconamoon:profile" />),
    getItem("Incidents", "/userProfile/UserIncidents", <Icon icon="prime:book" />),
    getItem(
        "Settings",
        "/userProfile/UserSettings",
        <Icon icon="uil:setting" />
    ),
    
];

// submenu keys of first level
const rootSubmenuKeys = [];

function UserSideMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [openKeys, setOpenKeys] = useState(["/userProfile"]);
    const [selectedKeys, setSelectedKeys] = useState("/userProfile");
    const handleLogout = () => {
        logout();
        navigate("/"); // Redirect to login page after logout
      };

    // function logout() {
    //     localStorage.removeItem("currentUser");
    //     localStorage.removeItem('selectedCategory');
    //     navigate("/login");
    // }

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <>
            <div className="User_SideMenu">
                <h3>Settings</h3>

                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                iconSize: "20px",
                                itemHeight: "40px",
                                subMenuItemBg: "#ffffff",
                            },
                        },
                    }}
                >
                    <Menu
                        mode="inline"
                        openKeys={openKeys}
                        selectedKeys={[selectedKeys]}
                        onOpenChange={onOpenChange}
                        onClick={(item) => {
                            // Navigate to the clicked item's key
                            navigate(item.key);
                        }}
                        style={{
                            width: 256,
                            textAlign: "left",
                        }}
                        items={items}
                    />
                </ConfigProvider>

                <div className="logout_btn_Container">
                    <button className="user_logout_btn" onClick={handleLogout }>
                        <Icon
                            icon="ic:baseline-logout"
                            style={{ marginRight: "10px"}}
                        />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

export default UserSideMenu;