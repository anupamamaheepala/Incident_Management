// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Dashboard from "../components/AdminDashboard";
// import AdminFeedbacks from "./AdminFeedbacks";
// import AdminReports from "../components/AdminReports"
// import AdminTeams from "../components/AdminTeams"

// function AdminRoutes() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/feedbacks" element={<AdminFeedbacks/>}/>
//         <Route path="/reports" element={<AdminReports/>}/>
//         <Route path="/teams" element={<AdminTeams/>}/>
//       </Routes>
//     </div>
//   );
// }

// export default AdminRoutes;


import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/AdminDashboard";
import AdminFeedbacks from "./AdminFeedbacks";
import AdminReports from "../components/AdminReports";
import AdminTeams from "../components/AdminTeams";

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/feedbacks" element={<AdminFeedbacks />} />
        <Route path="/reports" element={<AdminReports />} />
        <Route path="/teams" element={<AdminTeams />} />
      </Routes>
    </div>
  );
}

export default AdminRoutes;

