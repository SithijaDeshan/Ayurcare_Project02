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
              <li className={`sidebarListItem ${location.pathname === "/admin/analytics" ? "active" : ""}`}>
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
              <li className={`sidebarListItem ${location.pathname === "/admin/sales" ? "active" : ""}`}>
                <TrendingUp className="sidebarIcon" />
                Sales
              </li>
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
              <li className={`sidebarListItem ${location.pathname === "/admin/transactions" ? "active" : ""}`}>
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
              <li className={`sidebarListItem ${location.pathname === "/admin/reports" ? "active" : ""}`}>
                <BarChart className="sidebarIcon" />
                Reports
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Notifications</h3>
            <ul className="sidebarList">
              <li className={`sidebarListItem ${location.pathname === "/admin/mail" ? "active" : ""}`}>
                <MailOutline className="sidebarIcon" />
                Mail
              </li>
              <li className={`sidebarListItem ${location.pathname === "/admin/feedback" ? "active" : ""}`}>
                <DynamicFeed className="sidebarIcon" />
                Feedback
              </li>
              <li className={`sidebarListItem ${location.pathname === "/admin/messages" ? "active" : ""}`}>
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </ul>
          </div>

        </div>
      </div>
  );
}
