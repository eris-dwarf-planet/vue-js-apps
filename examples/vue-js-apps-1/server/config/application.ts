"use strict";

export default {
    ip: process.env.NODE_IP || "0.0.0.0",
    port: process.env.PORT || 3000,
    db: {
        uri: process.env.DB_MONGO_URI || "mongodb://todos-mongo/todo_db",
        // uri: process.env.DB_MONGO_URI || "mongodb://localhost/todo_db",
        options: {
            user: "",
            pass: "",
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    },
};