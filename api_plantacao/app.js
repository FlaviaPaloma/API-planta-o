const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const swaggerSetup = require('./docs/swagger');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const plantacaoRoutes = require('./routes/plantacaoRoutes');
const inspecaoRoutes = require('./routes/inspecaoRoutes');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Conectar ao banco de dados
connectDB();

// Inicializar o aplicativo Express
const app = express();

// Middleware de segurança
app.use(helmet());

// Middleware para habilitar CORS
app.use(cors());

// Middleware para log de requisições
app.use(morgan('dev'));

// Middleware para parsing de JSON
app.use(express.json());

// Middleware para parsing de dados de formulários
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/plantacoes', plantacaoRoutes);
app.use('/api/inspecoes', inspecaoRoutes);

// Configuração do Swagger
swaggerSetup(app);
// http://localhost:3000/api-docs


// Configuração da Porta
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
