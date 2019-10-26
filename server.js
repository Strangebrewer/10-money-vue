import 'dotenv/config';
import express from 'express';
import './connection';
// import cors from 'cors';
const app = express();
import routes from './routes';
const PORT = process.env.PORT || 3001;
import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
// app.use(cors());

app.use(routes);

// Handle production
if (process.env.NODE_ENV === 'production') {
   console.log("NODE_ENV does === 'production'");
   // Static folder
   app.use(express.static(__dirname + '/client/dist'));

   // Handle SPA <--- this note is from the tutorial; what exactly does it mean / what does this do?
   app.get(/.*/, (req, res) => res.sendFile(__dirname + '/client/dist/index.html'));
}

app.listen(PORT, () => {
   console.log(`====> API Server now listening on PORT ${PORT}!`);
});
