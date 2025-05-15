import { Route, Routes } from "react-router-dom";
import UserLayout from "./UserLayout";
import { NotFound } from "@/components/shared/navigation/not-found";
import UserHomeDashboard from "../dashboard/components/UserHomeDashboard";

const UserRouter = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<UserHomeDashboard />} />

        <Route
          path="*"
          element={
            <NotFound backLink="/user" backText="Return to user dashboard" />
          }
        />
      </Routes>
    </UserLayout>
  );
};

export default UserRouter;
