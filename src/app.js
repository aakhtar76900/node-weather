const express = require("express");
const path = require("path");
const hbs = require("hbs");
const chalk = require("chalk");
const geocoding = require("./utils/geocoding");
const currentWeather = require('./utils/currentWeather')

console.log(path.join(__dirname, "../public"));
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Use PORT from Heroku

const port = process.env.PORT || 3000

const bootstrapPath = path.join(
  __dirname,
  "../node_modules/bootstrap/dist/css"
);
const bootstrapJsPath = path.join(
  __dirname,
  "../node_modules/bootstrap/dist/js"
);

const app = express();
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(publicDir));
app.use("/js", express.static(bootstrapJsPath)); // redirect bootstrap JS
app.use("/css", express.static(bootstrapPath)); // redirect CSS bootstrap
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index");
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Kimi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Addess is required",
    });
  }

  geocoding(req.query.address, (error, {lat, lon, place_name} ={}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    currentWeather(lat,lon , (error , data) => {
      if(error){
       return res.send({
          error : error
        })
      }

      res.send({...data, place_name : place_name })


    }
    )


    
    
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help Page not found!",
  });
});

app.get("/products", (req, res) => {
  console.log(chalk.green(req.query.search));

  res.send({
    name: "Kimi",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found!",
  });
});

app.listen(port, () => {
  console.log("Server is up!");
});
