import express from 'express';
import router from './routes/index.route';
const { errors } = require('celebrate');
const NodeCache = require( "node-cache" ); 

const myCache = new NodeCache({ stdTTL: 600 });

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(router);
app.use(errors());

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});

export {
  myCache
}

