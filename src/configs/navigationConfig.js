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
        title: "Danh sách user",
        type: "item",
        icon: <Icon.UserPlus size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/user/list"
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
        id: "post-report",
        title: "Báo cáo bài viết",
        type: "item",
        icon: <Icon.GitBranch size={12} />,
        permissions: ["admin"],
        navLink: "/app/admin/post-report"
      },
      {
        id: "request-extend",
        title: "Yêu cầu gia hạn",
        type: "item",
        icon: <Icon.Airplay size={12} />,
        permissions: ["admin"],
        navLink: "/app/admin/request-extend"
      },
      {
        id: "comment-manage",
        title: "Quản lý bình luận",
        type: "item",
        icon: <Icon.Command size={12} />,
        permissions: ["admin"],
        navLink: "/app/admin/cmt-manage"
      }
    ]
  },
]

export default navigationConfig
