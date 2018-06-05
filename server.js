const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const webpack = require('webpack');
const config = require('./webpack.config.dev');
const webpackMiddleware = require('koa-webpack');
const views = require('koa-views');

const app = new Koa();

const compiler = webpack(config);

const webpackDevOptions = {
  noInfo: true,
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};

const render = views(
  './', 
  {
    map: {
      html: 'nunjucks'
    }
  }
);

app.use(logger());
app.use(render);
app.use(bodyParser());

// webpackMiddleware({
//   compiler: compiler,
//   config: config,
//   devMiddleware: webpackDevOptions,
//   hotClient: compiler
// }).then(middleware => {
//   app.use(middleware)
// })
app.use(webpackMiddleware({
  compiler: compiler,
  config: config,
  dev: webpackDevOptions,
  hot: compiler
}));


router.get('/', async ctx => {
  await ctx.render('index.html', {});
});

const commentList = [
  {
    "name": "cam",
    "content": "It's good idea",
    "pubishTime": "2015-05-01"
  },
  {
    "name": "arcthur",
    "content": "Not bad.",
    "pubishTime": "2015-05-01"
  }
];


router.get('/api/response.json', ctx => {
  ctx.body = {
    'commentList': commentList
  }
});

router.post('/api/submit.json', ctx => {
  console.log(ctx.request.body);
  const data = ctx.request.body;
  console.log(typeof data);
  console.log(Object.prototype.toString.call(data));
  if (data.value) {
    commentList.push({
      name: 'arcthur',
      content: decodeURI(data.value),
      pubishTime: (new Date()).toISOString().split('T')[0]
    });

    ctx.body = {
      'ok': true
    }
  } else {
    ctx.body = {
      'ok': false
    }
  }
});

app.use(router.routes());

const server = app.listen(8787);


server.on('listening', () => {
  console.log('Listening 8787');
});
