import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import calculateRoutes from './routes/calculate.js';// Adjust path if needed
 
// const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/tiles', calculateRoutes);

app.listen(PORT, () => {
console.log(`✅ Server is listening on port ${PORT}`);
});