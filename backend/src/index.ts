import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

/*
---------------------
	 Middleware
---------------------
*/
const corsOption = {
  origin: true,
  methods: 'GET,POST,PATCH,DELETE',
  credentials: true,
};

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors(corsOption));

/*
--------------------------
	Server Configuration
--------------------------
*/
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server listening on ${port}`));
