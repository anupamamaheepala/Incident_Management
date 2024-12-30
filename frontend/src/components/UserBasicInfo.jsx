import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Space, message } from "antd";


const UserProfileForm = () => {
    return (
        <>
            <Space direction="vertical">
                <Space direction="horizontal" align="center">
                <div className="labelContainer">
                    <label  className =" labelStyle" >
                        First Name
                    </label>
                    </div>
                    <Input
                        style={{
                            flex: "auto",
                            width: "260px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                            
                        }}
                        value={"firstName"}
                        // onChange={(e) => setFirstName(e.target.value)}
                    />
                </Space>

                <Space direction="horizontal" align="center">
                <div className="labelContainer">
                    <label className =" labelStyle">
                        Last Name
                    </label>
                </div>
                    <Input
                        style={{
                            flex: "auto",
                            width: "260px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={"lastName"}
                        // onChange={(e) => setUsername(e.target.value)}
                    />
                </Space>
                <Space direction="horizontal" align="center">   
                <div className="labelContainer">
                    <label className =" labelStyle">
                        Email
                    </label>
                    </div>
                    <Input
                        style={{
                            flex: "auto",
                            width: "530px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={"email"}
                        // onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Space>
                <Space direction="horizontal" align="center">
                    <div className="labelContainer">
                    <label className =" labelStyle">
                        Phone Number
                    </label>
                    </div>
                    
                    <Input
                        style={{
                            flex: "auto",
                            width: "530px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={"mobile"}
                        // onChange={(e) => setProvince(e.target.value)}
                    />
                </Space>

                <Space direction="horizontal" align="center">
                <div className="labelContainer">
                    <label className =" labelStyle1" >
                    NIC
                    </label>
                    </div>
                    <Input
                        style={{
                            flex: "auto",
                            width: "530px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={"nic"}
                        // onChange={(e) => setEmail(e.target.value)}
                    />
                </Space>
                <Space direction="horizontal" align="center">
                <div className="labelContainer">
                    <label className =" labelStyle">
                        Address
                    </label>
                    </div>
                    <Input
                        style={{
                            flex: "auto",
                            width: "530px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={"address"}
                        // onChange={(e) => setZipCode(e.target.value)}
                    />
                </Space>

                <Space direction="horizontal" align="center">
                <div className="labelContainer">
                    <label className =" labelStyle">
                        Provice
                    </label>
                    </div>
                    <Input
                        style={{
                            flex: "auto",
                            width: "530px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={"province"}
                        // onChange={(e) => setAddress(e.target.value)}
                    />
                </Space>

                <Space direction="horizontal" align="center">
                <div className="labelContainer">
                    <label className =" labelStyle">
                        Postal Code
                    </label>
                    </div>
                    <Input
                        style={{
                            flex: "auto",
                            width: "530px",
                            height: "36px",
                            flexShrink: 0,
                            marginTop: "10px",
                        }}
                        value={"postalCode"}
                        // onChange={(e) => setZipCode(e.target.value)}
                    />
                </Space>
                
            </Space>

            <button className="btn btn-primary save" onClick={"saveChanges"}
            style={{margin : "40px", marginLeft : "190px" }}>
                Save Changes
            </button>
        </>
    );
};

export default UserProfileForm;