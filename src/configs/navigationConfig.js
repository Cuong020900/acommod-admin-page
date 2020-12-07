import React from "react"
import * as Icon from "react-feather"
const navigationConfig = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/"
  },
  {
    id: "dashboard",
    title: "Dashboard",
    type: "collapse",
    icon: <Icon.File size={20} />,
    permissions: ["admin", "editor"],
    children: [
      {
        id: "Dashboardx",
        title: "Grid",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/dashboard"
      },
      {
        id: "userManager",
        title: "Quản lý người dùng",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin"],
        navLink: "/admin/user-manage"
      }
    ]
  },
  {
    id: "users",
    title: "User",
    type: "collapse",
    icon: <Icon.User size={20} />,
    children: [
      {
        id: "list",
        title: "List",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/user/list"
      },
      {
        id: "view",
        title: "View",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/user/view"
      },
      {
        id: "edit",
        title: "Edit",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/user/edit"
      }
    ]
  },
  {
    id: "posts",
    title: "Bài viết",
    type: "collapse",
    icon: <Icon.FileText size={20} />,
    children: [
      {
        id: "list-post",
        title: "Danh sách bài viết",
        type: "item",
        icon: <Icon.Book size={12} />,
        permissions: ["admin"],
        navLink: "/app/admin/list-post"
      },
      {
        id: "post-manage",
        title: "Chỉnh sửa bài viết",
        type: "item",
        icon: <Icon.Edit size={12} />,
        permissions: ["admin"],
        navLink: "/app/admin/post-manage"
      }
    ]
  },
]

export default navigationConfig
