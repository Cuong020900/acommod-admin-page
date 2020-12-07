import mock from "../mock"

export const searchResult = [
  {
    id: 1,
    target: "home",
    title: "Home",
    link: "/",
    icon: "Home",
    starred: false
  },
  {
    id: 2,
    target: "dashboard",
    title: "Dashboard",
    link: "/dashboard",
    icon: "File",
    starred: false
  },
  {
    id: 2,
    target: "User manage",
    title: "Quản lý người dùng",
    link: "/admin/user-manage",
    icon: "File",
    starred: false
  }
]

const searchResult2 = [
  {
    first_name: "cuong",
    last_name: "tran",
    user_name: "cuong123",
    img: "avatar-s-20.jpg"
  },
  {
    first_name: "hgai",
    last_name: "pham",
    user_name: "haidb",
    img: "avatar-s-20.jpg"
  },
  {
    first_name: "cuong",
    last_name: "tran",
    user_name: "cuong123",
    img: "avatar-s-20.jpg"
  },
  {
    first_name: "cuong",
    last_name: "tran",
    user_name: "cuong123",
    img: "avatar-s-20.jpg"
  },
  {
    first_name: "cuong",
    last_name: "tran",
    user_name: "cuong123",
    img: "avatar-s-20.jpg"
  },
  {
    first_name: "cuong",
    last_name: "tran",
    user_name: "cuong123",
    img: "avatar-s-20.jpg"
  },
  {
    first_name: "cuong",
    last_name: "tran",
    user_name: "cuong123",
    img: "avatar-s-20.jpg"
  }
]

mock.onGet("/api/search/bookmarks/data").reply(200, {
  searchResult
})

mock.onGet("/api/test").reply(200, {
  searchResult2
})

mock.onPost("/api/update/bookmarks").reply(request => {
  const bookmarkToUpdate = JSON.parse(request.data).obj

  searchResult.filter(i => {
    if (i.id === bookmarkToUpdate.id) {
      return (i.starred = !bookmarkToUpdate.starred)
    } else {
      return null
    }
  })
  return [200]
})
