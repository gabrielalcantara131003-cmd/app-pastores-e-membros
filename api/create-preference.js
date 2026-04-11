const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({ 
  accessToken: 'APP_USR-7999464771115294-040910-fd3885efa638f6c6dba4af2754f5f892-715827364' 
});

module.exports = async (req, res) => {
  // Configuração de CORS nativo da Vercel
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const items = body.items || [];
      
      const preference = new Preference(client);
      const result = await preference.create({
        body: { items }
      });

      console.log(`[MP] Preferência Vercel Nativa Criada! ID: ${result.id}`);
      return res.status(200).json({ init_point: result.init_point });
      
    } catch (error) {
      console.error('Erro na Vercel Serverless:', error.message || error);
      return res.status(500).json({ error: 'Erro interno ao processar pagamento.' });
    }
  }

  // Se não for POST
  return res.status(405).json({ message: 'Method Not Allowed' });
};
