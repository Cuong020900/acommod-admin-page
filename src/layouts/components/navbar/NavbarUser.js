import React from "react"
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Badge
} from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"
import axios from "axios"
import * as Icon from "react-feather"
import classnames from "classnames"
import Autocomplete from "../../../components/@vuexy/autoComplete/AutoCompleteComponent"
import { history } from "../../../history"


const UserDropdown = props => {
  return (
    <DropdownMenu right>
      <DropdownItem tag="a" href="#">
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Edit Profile</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.Mail size={14} className="mr-50" />
        <span className="align-middle">My Inbox</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.CheckSquare size={14} className="mr-50" />
        <span className="align-middle">Tasks</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.MessageSquare size={14} className="mr-50" />
        <span className="align-middle">Chats</span>
      </DropdownItem>
      <DropdownItem tag="a" href="#">
        <Icon.Heart size={14} className="mr-50" />
        <span className="align-middle">WishList</span>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem
        tag="a"
        href="#"
        onClick={e => {
          localStorage.removeItem('userName')
          history.push("/pages/login")
        }}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  )
}

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    suggestions: [],
    listNotifications: []
  }

  componentDidMount() {
    axios.get("/api/main-search/data").then(({ data }) => {
      this.setState({ suggestions: data.searchResult })
    })
    this.getData()
  }

  async getData () {
    axios.get("https://localhost:5000/api/Notification/getAll", { 
      withCredentials: true
    }).then(({ data }) => {
      this.setState({ listNotifications: data.slice().reverse() });
    })
  }

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch
    })
  }

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">

        <NavItem className="nav-search" onClick={this.handleNavbarSearch}>
          <NavLink className="nav-link-search">
            <Icon.Search size={21} data-tour="search" />
          </NavLink>
          <div
            className={classnames("search-input", {
              open: this.state.navbarSearch,
              "d-none": this.state.navbarSearch === false
            })}
          >
            <div className="search-input-icon">
              <Icon.Search size={17} className="danger" />
            </div>
            <Autocomplete
              className="form-control"
              suggestions={this.state.suggestions}
              filterKey="title"
              filterHeaderKey="groupTitle"
              grouped={true}
              placeholder="Nhập gì đó..."
              autoFocus={true}
              clearInput={this.state.navbarSearch}
              externalClick={e => {
                this.setState({ navbarSearch : false })
              }}
              onKeyDown={e => {
                if (e.keyCode === 27 || e.keyCode === 13) {
                  this.setState({
                    navbarSearch: false
                  })
                  this.props.handleAppOverlay("")
                }
              }}
              customRender={(
                item,
                i,
                filteredData,
                activeSuggestion,
                onSuggestionItemClick,
                onSuggestionItemHover
              ) => {
                const IconTag = Icon[item.icon ? item.icon : "X"]
                return (
                  <li
                    className={classnames("suggestion-item", {
                      active: filteredData.indexOf(item) === activeSuggestion
                    })}
                    key={i}
                    onClick={e => onSuggestionItemClick(item.link, e)}
                    onMouseEnter={() =>
                      onSuggestionItemHover(filteredData.indexOf(item))
                    }
                  >
                    <div
                      className={classnames({
                        "d-flex justify-content-between align-items-center":
                          item.file || item.img
                      })}
                    >
                      <div className="item-container d-flex">
                        {item.icon ? (
                          <IconTag size={17} />
                        ) : item.file ? (
                          <img
                            src={item.file}
                            height="36"
                            width="28"
                            alt={item.title}
                          />
                        ) : item.img ? (
                          <img
                            className="rounded-circle mt-25"
                            src={item.img}
                            height="28"
                            width="28"
                            alt={item.title}
                          />
                        ) : null}
                        <div className="item-info ml-1">
                          <p className="align-middle mb-0">{item.title}</p>
                          {item.by || item.email ? (
                            <small className="text-muted">
                              {item.by
                                ? item.by
                                : item.email
                                ? item.email
                                : null}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      {item.size || item.date ? (
                        <div className="meta-container">
                          <small className="text-muted">
                            {item.size
                              ? item.size
                              : item.date
                              ? item.date
                              : null}
                          </small>
                        </div>
                      ) : null}
                    </div>
                  </li>
                )
              }}
              onSuggestionsShown={userInput => {
                if (this.state.navbarSearch) {
                  this.props.handleAppOverlay(userInput)
                }
              }}
            />
            <div className="search-input-close">
              <Icon.X
                size={24}
                onClick={(e) => {
                  e.stopPropagation()
                  this.setState({
                    navbarSearch: false
                  })
                  this.props.handleAppOverlay("")
                }}
              />
            </div>
          </div>
        </NavItem>
        <UncontrolledDropdown
          tag="li"
          className="dropdown-notification nav-item"
        >
          <DropdownToggle tag="a" className="nav-link nav-link-label">
            <Icon.Bell size={21} onClick={() => {
              axios.get("https://localhost:5000/api/Notification/getAll", { 
                withCredentials: true
              }).then(({ data }) => {
                this.setState({ listNotifications: data.slice().reverse() })
              })
            }} />
            <Badge pill color="danger" className="badge-up" onClick={() => {
              axios.get("https://localhost:5000/api/Notification/getAll", {
                withCredentials: true
              }).then(({ data }) => {
                this.setState({ listNotifications: data.slice().reverse() })
              })
            }} >
              {" "}
              {this.state.listNotifications.length}{" "}
            </Badge>
          </DropdownToggle>
          <DropdownMenu tag="ul" right className="dropdown-menu-media">
            <li className="dropdown-menu-header">
              <div className="dropdown-header mt-0">
                <h3 className="text-white">{this.state.listNotifications.length}</h3>
                <span className="notification-title">Thông báo</span>
              </div>
            </li>
            <PerfectScrollbar
              className="media-list overflow-hidden position-relative"
              options={{
                wheelPropagation: false
              }}
            >
                {this.state.listNotifications.map( (d, idx) => {
                  return (
                    <div key={idx} className="d-flex justify-content-between">

                      <Media className="d-flex align-items-start">
                        <Media left href="#">
                          { function a() {
                              switch (d.content) {
                                case "POST_ACCEPTED": {
                                  return (
                                    <Icon.DollarSign
                                      className="font-medium-5 success"
                                      size={12}
                                    />
                                  )
                                }
                                case "POST_REJECTED": {
                                  return (
                                    <Icon.Delete
                                      className="font-medium-5 danger"
                                      size={12}
                                    />
                                  )
                                }
                                case "REQUEST": {
                                  return (
                                    <Icon.Activity
                                      className="font-medium-5 warning"
                                      size={12}
                                    />
                                  )
                                }
                                case "REQUEST_ACCEPTED": {
                                  return (
                                    <Icon.Circle
                                      className="font-medium-5 success"
                                      size={12}
                                    />
                                  )
                                }
                                case "REQUEST_REJECTED": {
                                  return (
                                    <Icon.ArrowDown
                                      className="font-medium-5 danger"
                                      size={12}
                                    />
                                  )
                                }
                                default: {
                                  return (
                                    <Icon.PlusSquare
                                      className="font-medium-5 danger"
                                      size={12}
                                    />
                                  )
                                }
                              }
                            }()}
                        </Media>
                        <Media body>
                          <Media heading className="secondary media-heading" tag="h6">
                            { function a() {
                              switch (d.content) {
                                case "POST_ACCEPTED": {
                                  return "Bài đăng đã được duyệt"
                                  break
                                }
                                case "POST_REJECTED": {
                                  return "Bài đăng bị từ chối duyệt"
                                  break
                                }
                                case "REQUEST": {
                                  return "Yêu cầu gia hạn, ID: " + d.requestId
                                  break
                                }
                                case "REQUEST_ACCEPTED": {
                                  return "Yêu cầu gia hạn thành công"
                                  break
                                }
                                case "REQUEST_REJECTED": {
                                  return "Yêu cầu gia hạn bị từ chối"
                                  break
                                }
                                case "REQUEST_EXTEND": {
                                  return "Yêu cầu gia hạn"
                                  break
                                }
                                default: {
                                  return d.content || "Bài đăng bị hết hạn"
                                  break
                                }
                              }
                            }()}
                          </Media>
                          <p className="notification-text">
                            {"Post ID: " + d.postId + " by " + d.userName}
                          </p>
                        </Media>
                        <small>
                          <time
                            className="media-meta"
                            dateTime="2015-06-11T18:29:20+08:00"
                          >
                            {function a() {
                              let time = new Date(Date.parse(d.notifTime))
                              let now = new Date()
                              let diffMiliSec = Math.abs(now - time)
                              let diffMin = Math.ceil(diffMiliSec / (60 * 1000))
                              let diffHours = Math.ceil(diffMiliSec / (3600 * 1000))
                              let diffDays = Math.ceil(diffMiliSec / (86400 * 1000))
                              if (diffDays > 1) return diffDays + " ngày trước"
                              else if (diffHours > 1) return diffHours + " giờ trước"
                              else if (diffMin > 1) return diffMin + " phút trước"
                              else return "bây giờ"
                            }()}
                          </time>
                        </small>
                        <Icon.Trash
                          className="font-medium-5 danger ml-1"
                          size={20}
                          onClick={async () => {
                            // request delete action
                            await axios.delete("https://localhost:5000/api/Notification/delete?notiId=" + d.notifId, {
                              data: {notiId: d.notifId},
                              withCredentials: true
                            })
                            this.getData()
                          }}
                        />
                      </Media>
                    </div>
                  )
                })}
              </PerfectScrollbar>
            <li className="dropdown-menu-footer">
              <DropdownItem tag="a" className="p-1 text-center">
                <span className="align-middle">Read all notifications</span>
              </DropdownItem>
            </li>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userName}
              </span>
              <span className="user-status">Available</span>
            </div>
            <span data-tour="user">
              <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    )
  }
}
export default NavbarUser
