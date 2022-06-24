var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const helpers = require('./helpers/index')
const Sentry = require("@sentry/node")
const Tracing = require("@sentry/tracing")
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const basicAuth = require('express-basic-auth');
const swaggerDocument = require('./swagger.json');
var app = express();

process.env.NODE_ENV === "production" && Sentry.init({
  dsn: "https://9f9dd90308714321bd222a65679fe52c@o1162014.ingest.sentry.io/6474657",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.options('*', cors());
//app.options("*", cors({ origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'SunCulture API for Customer Portal',
      version: '1.0.0',
      description: 'Rest endpoints for use by customer innovation portal',
    },
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    basePath: "/api/v1/",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    contact: {
      name: 'Sunculture',
      url: 'https://sunculture.io',
      email: 'it@sunculture.io'
    },
    servers: [
      {
        url: "http://localhost:3303",
        description: 'Development server'
      },
      {
        url: "https://stage.my.sunculture.io",
        description: 'Staging server'
      }
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", basicAuth({
  users: { 'api': 'api1234,' },
  challenge: true,
}), swaggerUi.serve, swaggerUi.setup(specs))

app.use('/', require('./routes/index'));
app.use('/api/v1', require('./routes/users'));
app.use('/api/v1', require('./routes/tickets'))
app.use('/api/v1', require('./routes/devices'))
app.use('/api/v1', require('./routes/payments'))
app.use('/api/v1', require('./routes/auth'))
app.use('/api/v1', require('./routes/referrals'))

app.use(Sentry.Handlers.errorHandler());

app.use(function (req, res, next) {
  return helpers.response.notFoundResponse(res, "Api resource not found")
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
