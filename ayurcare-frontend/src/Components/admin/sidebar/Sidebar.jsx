import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";

export default function Sidebar() {
  const location = useLocation();

  return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/admin" className="link">
                <li className={`sidebarListItem ${location.pathname === "/admin" ? "active" : ""}`}>
                  <LineStyle className="sidebarIcon" />
                  Home
                </li>
              </Link>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
              <Link to="/admin/users" className="link">
                <li className={`sidebarListItem ${location.pathname === "/admin/users" ? "active" : ""}`}>
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </Link>
              <Link to="/admin/newUser" className="link">
                <li className={`sidebarListItem ${location.pathname === "/admin/newUser" ? "active" : ""}`}>
                  <PermIdentity className="sidebarIcon" />
                  Create User
                </li>
              </Link>
              <Link to="/admin/categories" className="link">
                <li className={`sidebarListItem ${location.pathname === "/admin/categories" ? "active" : ""}`}>
                  <Storefront className="sidebarIcon" />
                  Categories
                </li>
              </Link>
            </ul>
          </div>

        </div>
      </div>
  );
}
