import './database/db';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import apiRoutes from './routes';

dotenv.config();

const app = express();

/*
---------------------
	 Middleware
---------------------
*/
const corsOption = {
  origin: true,
  methods: 'GET,POST,PATCH,DELETE, PUT',
  credentials: true,
};

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors(corsOption));

/*
-----------------------------
	API Route mount on /api
-----------------------------
*/
app.use('/', apiRoutes);

/*
--------------------------
	Server Configuration
--------------------------
*/
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server listening on ${port}`));
