import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import WarehouseInterface from "../../components/Warehouse/WarehouseInterface";
import { getUser, logOut } from "../../utilities/user-service";
import Dashboard from "./Dashboard";
import OrgPage from "./OrgPage";

type Props = {
  setUser: (a) => void;
};

export default function HomePage({ setUser }: Props) {
  return (
    <>
      <h1 className="absolute bottom-0 right-0">
        Loged In as user <span>{getUser()._id}</span>
      </h1>
      <div className="flex flex-row">
        <NavBar setUser={setUser} />
        <div className="py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/organization/" element={<OrgPage />} />
            <Route
              path="/warehouse/:warehouseId"
              element={<WarehouseInterface />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}
