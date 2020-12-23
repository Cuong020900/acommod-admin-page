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

// GET DATA
mock.onGet("/api/statistics/view-per-date").reply(response => {
  return [200, viewsPerDate]
})