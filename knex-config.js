module.exports = {
    sqlite : {
        client : "sqlite3",
        connection: {
            filename : "./eventdb.sqlite"
        },
        pool : {max:1,min :1}
    }
}