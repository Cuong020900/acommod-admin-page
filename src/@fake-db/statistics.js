import mock from "./mock"

export let viewsPerDate = [
    {
        id: 1,
        date: '2020-12-15',
        views: 2756
    },
    {
        id: 1,
        date: '2020-12-16',
        views: 3156
    },
    {
        id: 1,
        date: '2020-12-17',
        views: 3056
    },
    {
        id: 1,
        date: '2020-12-18',
        views: 4056
    },
    {
        id: 1,
        date: '2020-12-19',
        views: 306
    },
    {
        id: 1,
        date: '2020-12-20',
        views: 2156
    },
    {
        id: 1,
        date: '2020-12-21',
        views: 256
    }
]

export const mostView = [
    {
        postId: 1,
        views: 2756
    },
    {
        postId: 2,
        views: 3156
    },
    {
        postId: 3,
        views: 3056
    },
    {
        postId: 4,
        views: 4056
    },
    {
        postId: 5,
        views: 306
    },
]

export const mostLike = [
    {
        postId: 1,
        likes: 6
    },
    {
        postId: 2,
        likes: 67
    },
    {
        postId: 3,
        likes: 12
    },
    {
        postId: 4,
        likes: 23
    },
    {
        postId: 5,
        likes: 34
    },
]

// GET DATA
mock.onGet("/api/statistics/view-per-date").reply(response => {
    return [200, viewsPerDate]
})

// GET DATA
mock.onGet("/api/statistics/most-view").reply(response => {
    return [200, mostView]
})

// GET DATA
mock.onGet("/api/statistics/most-like").reply(response => {
    return [200, mostLike]
})