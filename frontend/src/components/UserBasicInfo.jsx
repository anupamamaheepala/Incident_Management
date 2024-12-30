// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Input, Space, message } from "antd";


// const UserProfileForm = () => {
//     return (
//         <>
//             <Space direction="vertical">
//                 <Space direction="horizontal" align="center">
//                 <div className="labelContainer">
//                     <label  className =" labelStyle" >
//                         First Name
//                     </label>
//                     </div>
//                     <Input
//                         style={{
//                             flex: "auto",
//                             width: "260px",
//                             height: "36px",
//                             flexShrink: 0,
//                             marginTop: "10px",
                            
//                         }}
//                         value={"firstName"}
//                         // onChange={(e) => setFirstName(e.target.value)}
//                     />
//                 </Space>

//                 <Space direction="horizontal" align="center">
//                 <div className="labelContainer">
//                     <label className =" labelStyle">
//                         Last Name
//                     </label>
//                 </div>
//                     <Input
//                         style={{
//                             flex: "auto",
//                             width: "260px",
//                             height: "36px",
//                             flexShrink: 0,
//                             marginTop: "10px",
//                         }}
//                         value={"lastName"}
//                         // onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </Space>
//                 <Space direction="horizontal" align="center">   
//                 <div className="labelContainer">
//                     <label className =" labelStyle">
//                         Email
//                     </label>
//                     </div>
//                     <Input
//                         style={{
//                             flex: "auto",
//                             width: "530px",
//                             height: "36px",
//                             flexShrink: 0,
//                             marginTop: "10px",
//                         }}
//                         value={"email"}
//                         // onChange={(e) => setPhoneNumber(e.target.value)}
//                     />
//                 </Space>
//                 <Space direction="horizontal" align="center">
//                     <div className="labelContainer">
//                     <label className =" labelStyle">
//                         Phone Number
//                     </label>
//                     </div>
                    
//                     <Input
//                         style={{
//                             flex: "auto",
//                             width: "530px",
//                             height: "36px",
//                             flexShrink: 0,
//                             marginTop: "10px",
//                         }}
//                         value={"mobile"}
//                         // onChange={(e) => setProvince(e.target.value)}
//                     />
//                 </Space>

//                 <Space direction="horizontal" align="center">
//                 <div className="labelContainer">
//                     <label className =" labelStyle1" >
//                     NIC
//                     </label>
//                     </div>
//                     <Input
//                         style={{
//                             flex: "auto",
//                             width: "530px",
//                             height: "36px",
//                             flexShrink: 0,
//                             marginTop: "10px",
//                         }}
//                         value={"nic"}
//                         // onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </Space>
//                 <Space direction="horizontal" align="center">
//                 <div className="labelContainer">
//                     <label className =" labelStyle">
//                         Address
//                     </label>
//                     </div>
//                     <Input
//                         style={{
//                             flex: "auto",
//                             width: "530px",
//                             height: "36px",
//                             flexShrink: 0,
//                             marginTop: "10px",
//                         }}
//                         value={"address"}
//                         // onChange={(e) => setZipCode(e.target.value)}
//                     />
//                 </Space>

//                 <Space direction="horizontal" align="center">
//                 <div className="labelContainer">
//                     <label className =" labelStyle">
//                         Provice
//                     </label>
//                     </div>
//                     <Input
//                         style={{
//                             flex: "auto",
//                             width: "530px",
//                             height: "36px",
//                             flexShrink: 0,
//                             marginTop: "10px",
//                         }}
//                         value={"province"}
//                         // onChange={(e) => setAddress(e.target.value)}
//                     />
//                 </Space>

//                 <Space direction="horizontal" align="center">
//                 <div className="labelContainer">
//                     <label className =" labelStyle">
//                         Postal Code
//                     </label>
//                     </div>
//                     <Input
//                         style={{
//                             flex: "auto",
//                             width: "530px",
//                             height: "36px",
//                             flexShrink: 0,
//                             marginTop: "10px",
//                         }}
//                         value={"postalCode"}
//                         // onChange={(e) => setZipCode(e.target.value)}
//                     />
//                 </Space>
                
//             </Space>

//             <button className="btn btn-primary save" onClick={"saveChanges"}
//             style={{margin : "40px", marginLeft : "190px" }}>
//                 Save Changes
//             </button>
//         </>
//     );
// };

// export default UserProfileForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Space, message } from "antd";

const UserProfileForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    nic: "",
    address: "",
    province: "",
    postalCode: "",
  });

  // Populate form data when the user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        mobile: user.phone || "",
        nic: user.nic || "",
        address: user.address || "",
        province: user.province || "",
        postalCode: user.postalCode || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    onSave(formData);
  };

  return (
    <>
      <Space direction="vertical">
        <Space direction="horizontal" align="center">
          <div className="labelContainer">
            <label className="labelStyle">First Name</label>
          </div>
          <Input
            name="firstName"
            style={{
              flex: "auto",
              width: "260px",
              height: "36px",
              flexShrink: 0,
              marginTop: "10px",
            }}
            value={formData.firstName}
            onChange={handleChange}
          />
        </Space>

        <Space direction="horizontal" align="center">
          <div className="labelContainer">
            <label className="labelStyle">Last Name</label>
          </div>
          <Input
            name="lastName"
            style={{
              flex: "auto",
              width: "260px",
              height: "36px",
              flexShrink: 0,
              marginTop: "10px",
            }}
            value={formData.lastName}
            onChange={handleChange}
          />
        </Space>

        <Space direction="horizontal" align="center">
          <div className="labelContainer">
            <label className="labelStyle">Email</label>
          </div>
          <Input
            name="email"
            style={{
              flex: "auto",
              width: "530px",
              height: "36px",
              flexShrink: 0,
              marginTop: "10px",
            }}
            value={formData.email}
            onChange={handleChange}
          />
        </Space>

        <Space direction="horizontal" align="center">
          <div className="labelContainer">
            <label className="labelStyle">Phone Number</label>
          </div>
          <Input
            name="mobile"
            style={{
              flex: "auto",
              width: "530px",
              height: "36px",
              flexShrink: 0,
              marginTop: "10px",
            }}
            value={formData.mobile}
            onChange={handleChange}
          />
        </Space>

        <Space direction="horizontal" align="center">
          <div className="labelContainer">
            <label className="labelStyle1">NIC</label>
          </div>
          <Input
            name="nic"
            style={{
              flex: "auto",
              width: "530px",
              height: "36px",
              flexShrink: 0,
              marginTop: "10px",
            }}
            value={formData.nic}
            onChange={handleChange}
          />
        </Space>

        <Space direction="horizontal" align="center">
          <div className="labelContainer">
            <label className="labelStyle">Address</label>
          </div>
          <Input
            name="address"
            style={{
              flex: "auto",
              width: "530px",
              height: "36px",
              flexShrink: 0,
              marginTop: "10px",
            }}
            value={formData.address}
            onChange={handleChange}
          />
        </Space>

        <Space direction="horizontal" align="center">
          <div className="labelContainer">
            <label className="labelStyle">Province</label>
          </div>
          <Input
            name="province"
            style={{
              flex: "auto",
              width: "530px",
              height: "36px",
              flexShrink: 0,
              marginTop: "10px",
            }}
            value={formData.province}
            onChange={handleChange}
          />
        </Space>

        <Space direction="horizontal" align="center">
          <div className="labelContainer">
            <label className="labelStyle">Postal Code</label>
          </div>
          <Input
            name="postalCode"
            style={{
              flex: "auto",
              width: "530px",
              height: "36px",
              flexShrink: 0,
              marginTop: "10px",
            }}
            value={formData.postalCode}
            onChange={handleChange}
          />
        </Space>
      </Space>

      <button
        className="btn btn-primary save"
        onClick={handleSaveChanges}
        style={{ margin: "40px", marginLeft: "190px" }}
      >
        Save Changes
      </button>
    </>
  );
};

export default UserProfileForm;
