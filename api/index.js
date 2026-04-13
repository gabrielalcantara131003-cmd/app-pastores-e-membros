const express = require('express');
const cors = require('cors');
const path = require('path');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const app = express();
app.use(cors());
app.use(express.json());

// Serve os arquivos estáticos do site (HTML, CSS, JS) com base na pasta pai (já que estamos em /api)
app.use(express.static(path.join(__dirname, '..')));

// Configuração do Mercado Pago com sua chave secreta (Access Token)
const client = new MercadoPagoConfig({ 
  accessToken: 'APP_USR-7999464771115294-040910-fd3885efa638f6c6dba4af2754f5f892-715827364' 
});

// Aceita qualquer POST (independente de como a Vercel reescreve a URL internamente)
app.post('*', async (req, res) => {
  try {
    const { items, payerEmail, origin } = req.body;
    const baseOrigin = origin || `http://${req.headers.host}`;
    
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: items,
        payer: {
          email: payerEmail || 'test_user_123@testuser.com'
        },
        back_urls: {
          success: baseOrigin,
          failure: baseOrigin,
          pending: baseOrigin
        },
        auto_return: 'approved'
      }
    });

    console.log(`[MP] Preferência criada com sucesso!`);
    console.log(`[MP] ID: ${result.id}`);
    console.log(`[MP] Link: ${result.init_point}`);
    res.json({ init_point: result.init_point });
    
  } catch (error) {
    console.error('Erro ao criar preferência no Mercado Pago:', error.message || error);
    res.status(500).json({ error: 'Erro interno ao processar pagamento.' });
  }
});

// Se um acesso de GET for feito direto na API, servir o nosso index.html (fallback de segurança)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Servidor único — porta 3000 para tudo (site + API)
const PORT = 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('====================================================');
    console.log('  🚀 APP MINISTERIAL — SERVIDOR ATIVO');
    console.log(`  📍 Site:       http://localhost:${PORT}`);
    console.log(`  📍 API:        http://localhost:${PORT}/api/create-preference`);
    console.log('====================================================');
  });
}

module.exports = app;
