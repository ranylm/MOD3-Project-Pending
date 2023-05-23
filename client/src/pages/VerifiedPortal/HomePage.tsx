import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import WarehouseInterface from "../../components/Warehouse/WarehouseInterface";
import { getUser, logOut } from "../../utilities/user-service";
import Dashboard from "./Dashboard";
import OrgPage from "./OrgPage";

export default function HomePage() {
  return (
    <>
      <h1>
        Loged In as user <span onClick={logOut}>{getUser()._id}</span>
      </h1>
      <div className="flex flex-row">
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/organization/" element={<OrgPage />} />
          <Route
            path="/warehouse/:warehouseId"
            element={<WarehouseInterface />}
          />
        </Routes>
      </div>
    </>
  );
}
