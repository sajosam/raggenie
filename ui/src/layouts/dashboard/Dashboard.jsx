import {  Outlet, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import useAppSettings from "src/store/authStore";
import style from "./Dashboard.module.css";
import SideMenu from "./SideMenu";
import { GetUserDetails } from "src/services/Auth";
import axios from "axios";

const DashboardLayout = () => {

  const { username, setUsername, isAuthenticated, setIsAuthenticated } = useAppSettings();

  const navigate = useNavigate()

  const fetchUserInfo = () => {
    GetUserDetails().then((response) => {
      const userData = response.data;
      setUsername(userData.data.username);
      setIsAuthenticated(true)
    })
      .catch((error) => {
        if (error.response.status == 401) {
          navigate("/login")
        }
      });
  };


  useEffect(() => {
    fetchUserInfo()
  }, []);

  return (
    isAuthenticated && <div className={style.DashboardLayout}>
      <div className={style.SideMenuContainer}>
        <SideMenu username={username} />
      </div>
      <div className={style.DashboardBodyContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
