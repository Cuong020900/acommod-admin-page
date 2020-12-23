import mock from "./mock"
import "./navbar/navbarSearch"
import "./navbar/navbarBookmarkSearch"
import "./auth/authentication"
import "./apps/email"
import "./apps/chat"
import "./apps/todo"
import "./apps/calendar"
import "./apps/userList"
import "./apps/listPost"
import "./statistics"
mock.onAny().passThrough()
