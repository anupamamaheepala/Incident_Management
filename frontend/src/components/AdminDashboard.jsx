import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const AdminDashboard = () => {
  const pieData = [
    { name: "Billing/Payment", value: 10 },
    { name: "Service Interruptions", value: 30 },
    { name: "Issues with SIM", value: 10 },
    { name: "Service Requests", value: 5 },
    { name: "Customer Portal app Issues", value: 20 },
    { name: "Device Related Issues", value: 25 },
  ];
  const lineData = [
    { day: "01", reports: 10 },
    { day: "02", reports: 20 },
    { day: "03", reports: 15 },
    { day: "04", reports: 25 },
    { day: "05", reports: 35 },
    { day: "06", reports: 40 },
    { day: "07", reports: 50 },
  ];

  const COLORS = [
    "#FF6F61", 
    "#FFA500", 
    "#FFD700",
    "#00FF7F",
    "#00BFFF", 
    "#DA70D6",
  ];

  return (
    <div className="container">
      <div style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          {/* Statistic Boxes */}
          <Col span={6}>
            <Card style={{ backgroundColor: "#D7ECF6",  height :"150px"}}>
              <Statistic title="All Customers" value={240} />
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ backgroundColor: "#C2D6F9",height :"150px" }}>
              <Statistic title="Total Incidents" value={300} />
            </Card>
          </Col>
          <Col span={6}>
            <Card style={{ backgroundColor: "#C7FFC2",height :"150px" }}>
              <Statistic title="Completed Incidents" value={250} />
            </Card>
          </Col>
          <Col span={6}>
            <Card   style={{ backgroundColor: "#B7D1B0" ,height :"150px"}} >
              <Statistic title="Unassigned Incidents" value={50} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {/* Doughnut Chart with Legends */}
          <Col span={12}>
            <Card title="Incidents">
              <p style={{marginBottom :"20px" , color :"#71717A"}}>Monthly status of the incidents</p>
              <div style={{ display: "flex", alignItems: "center",  marginBottom :"10px"}}>
                <PieChart width={250} height={250}>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={50} // Hollow center for Doughnut
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                {/* Custom Legend */}
                <div style={{ marginLeft: "20px" }}>
                  {pieData.map((entry, index) => (
                    <div
                      key={entry.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: COLORS[index % COLORS.length],
                          marginRight: "10px",
                        }}
                      ></div>
                      <span>{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Col>

          {/* Placeholder for Line Chart */}
          <Col span={12}>
            <Card title="All Reports (Last 7 Days)">
            <LineChart
                width={400}
                height={300}
                data={lineData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reports" stroke="#8884d8" />
              </LineChart>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminDashboard;
