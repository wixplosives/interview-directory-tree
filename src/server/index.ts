import express from "express";
import { webpack } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackConfig from "../../webpack.config";
import { router } from "./routes";

function startApp(port = 8080) {
    express()
        .use(express.json())
        .use(webpackDevMiddleware(webpack(webpackConfig)))
        .use(router)
        .listen(port, () => {
            process.stdout.write(`Listening on http://localhost:${port}\n`);
        });
}

startApp();
