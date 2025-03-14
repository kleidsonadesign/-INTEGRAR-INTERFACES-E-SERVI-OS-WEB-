const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const produtosRoutes = require('./routes/produtos');
require('./config/database');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/produtos', produtosRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Servidor rodando na porta ${PORT}`);
});