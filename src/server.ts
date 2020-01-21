import App from "./api/app";

const { PORT = 3000 } = process.env;
const app = new App(PORT);

app.initializeMiddleware();
app.initializeControllers();
app.run();
