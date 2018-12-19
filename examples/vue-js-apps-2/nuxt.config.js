const bodyParser = require('body-parser')
const session = require('express-session')

module.exports = {
  head: {
    title: 'TodoMVC made with Nuxt.js',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        content: 'TodoMVC project made with Nuxt.js.'
      },
      {
        name: "google-signin-client_id",
        content: "285987054413-dgp0asadk23tldhemepg3k733tv9ojv9.apps.googleusercontent.com"
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico'
      }
    ],
    script: [
      {
        type: 'text/javascript',
        src: 'https://apis.google.com/js/platform.js',
        async: true,
        defer: true
      }
    ]
  },
  css: [
    {
      src: 'todomvc-app-css/index.css'
    },
    {
      src: 'bootstrap/dist/css/bootstrap.css'
    }
  ],
  router: {
    linkActiveClass: 'selected'
  },
  build: {
    // vendor: ['axios', 'aws-sdk', 'amazon-cognito-identity-js', './api/cognito', './api/dynamodb']
    // vendor: ['axios', './api/cognito', './api/dynamodb']
    vendor: ['axios', 'aws-sdk', 'amazon-cognito-identity-js']
  },
  plugins: [
    {
      src: '~plugins/cognito.js',
      injectAs: 'cognitoAuth'
    },
    {
      src: '~plugins/dynamodb.js',
      injectAs: 'dynamoClient'
    }
  ],
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000
      }
    }),
    // Api middleware
    '~/api',
    // '~/api/cognito',
    // '~/api/dynamodb'
  ]
}