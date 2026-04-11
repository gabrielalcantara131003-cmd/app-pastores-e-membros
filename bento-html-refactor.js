const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Refactor AUTH forms
const oldAuthStr = `      <!-- FORM: LOGIN -->
      <form class="auth-form active" id="formLogin" onsubmit="handleLogin(event)">
        <div class="form-group">
          <label class="form-label">📧 E-mail</label>
          <input class="form-input" type="email" id="loginEmail" placeholder="seu@email.com" required>
        </div>
        <div class="form-group">
          <label class="form-label"><i data-lucide="lock"></i> Senha</label>
          <div class="password-wrapper">
            <input class="form-input" type="password" id="loginSenha" placeholder="Sua senha" required minlength="6">
            <button type="button" class="password-toggle" onclick="togglePasswordVisibility('loginSenha', this)"><i data-lucide="eye"></i></button>
          </div>
        </div>
        <button type="submit" class="auth-btn" id="btnLogin">Entrar</button>
      </form>

      <!-- FORM: CADASTRO -->
      <form class="auth-form" id="formCadastro" onsubmit="handleCadastro(event)">
        <div class="form-group">
          <label class="form-label"><i data-lucide="user"></i> Seu Nome</label>
          <input class="form-input" type="text" id="cadNome" placeholder="Nome completo" required>
        </div>
        <div class="form-group">
          <label class="form-label">📧 E-mail</label>
          <input class="form-input" type="email" id="cadEmail" placeholder="seu@email.com" required>
        </div>
        <div class="form-group">
          <label class="form-label"><i data-lucide="lock"></i> Senha</label>
          <div class="password-wrapper">
            <input class="form-input" type="password" id="cadSenha" placeholder="Mínimo 6 caracteres" required minlength="6">
            <button type="button" class="password-toggle" onclick="togglePasswordVisibility('cadSenha', this)"><i data-lucide="eye"></i></button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label"><i data-lucide="church"></i> Nome da Igreja</label>
          <input class="form-input" type="text" id="cadIgreja" placeholder="Ex: Igreja Vida Nova" required>
        </div>
        <div class="form-group">
          <label class="form-label">👔 Perfil de Acesso</label>
          <select class="form-input" id="cadPerfil">
            <option value="pastor">Pastor / Líder (Acesso Total)</option>
            <option value="membro">Membro (Modo Simplificado)</option>
          </select>
        </div>
        <button type="submit" class="auth-btn" id="btnCadastro">Criar Conta</button>
      </form>`;

const newAuthStr = `      <!-- FORM: LOGIN -->
      <form class="auth-form active" id="formLogin" onsubmit="handleLogin(event)">
        <div class="form-group form-group-bento">
          <label class="form-label"><i data-lucide="mail"></i> E-mail</label>
          <input class="form-input" type="email" id="loginEmail" placeholder="seu@email.com" required>
        </div>
        <div class="form-group form-group-bento">
          <label class="form-label"><i data-lucide="lock"></i> Senha</label>
          <div class="password-wrapper">
            <input class="form-input" type="password" id="loginSenha" placeholder="Sua senha" required minlength="6">
            <button type="button" class="password-toggle" onclick="togglePasswordVisibility('loginSenha', this)"><i data-lucide="eye"></i></button>
          </div>
        </div>
        <button type="submit" class="auth-btn btn-bento-primary" id="btnLogin">Acessar Plataforma</button>
      </form>

      <!-- FORM: CADASTRO -->
      <form class="auth-form" id="formCadastro" onsubmit="handleCadastro(event)">
        <div class="form-group form-group-bento">
          <label class="form-label"><i data-lucide="user"></i> Nome Completo</label>
          <input class="form-input" type="text" id="cadNome" placeholder="Digite seu nome" required>
        </div>
        <div class="form-group form-group-bento">
          <label class="form-label"><i data-lucide="mail"></i> E-mail</label>
          <input class="form-input" type="email" id="cadEmail" placeholder="seu@email.com" required>
        </div>
        <div class="form-group form-group-bento">
          <label class="form-label"><i data-lucide="lock"></i> Senha Seguro</label>
          <div class="password-wrapper">
            <input class="form-input" type="password" id="cadSenha" placeholder="Mínimo 6 caracteres" required minlength="6">
            <button type="button" class="password-toggle" onclick="togglePasswordVisibility('cadSenha', this)"><i data-lucide="eye"></i></button>
          </div>
        </div>
        <div class="form-group form-group-bento">
          <label class="form-label"><i data-lucide="church"></i> Organização (Igreja)</label>
          <input class="form-input" type="text" id="cadIgreja" placeholder="Nome da Igreja" required>
        </div>
        <div class="form-group form-group-bento">
          <label class="form-label"><i data-lucide="shield"></i> Nível de Acesso</label>
          <select class="form-input bento-select" id="cadPerfil">
            <option value="pastor">Pastor / Líder (Acesso Total)</option>
            <option value="membro">Membro (Modo Simplificado)</option>
          </select>
        </div>
        <button type="submit" class="auth-btn btn-bento-primary" id="btnCadastro">Criar Conta</button>
      </form>`;

// We will use a regex to replace everything from <!-- FORM: LOGIN --> to closing form tag for Cadastro
const authRegex = /<!-- FORM: LOGIN -->[\s\S]*?<\/form>\s*<!-- FORM: CADASTRO -->[\s\S]*?<\/form>/;
html = html.replace(authRegex, newAuthStr);


// 2. Dashboard Bento Replacing
const oldDashboardRegex = /<!-- Stats -->[\s\S]*?<!-- Continue de onde parou -->/;

const newDashboardStr = `<!-- Bento Dashboard -->
      <div class="bento-grid">
        
        <!-- Estatísticas Bento (Pastor) -->
        <div class="bento-item bento-stats" data-role="pastor">
          <div class="bento-stat-box">
            <div class="bento-stat-icon"><i data-lucide="users"></i></div>
            <div class="bento-stat-content">
              <div class="stat-number" id="statMembros">0</div>
              <div class="stat-label">Membros</div>
            </div>
          </div>
          <div class="bento-stat-divider"></div>
          <div class="bento-stat-box">
            <div class="bento-stat-icon"><i data-lucide="pen-tool"></i></div>
            <div class="bento-stat-content">
              <div class="stat-number" id="statSermoes">0</div>
              <div class="stat-label">Sermões</div>
            </div>
          </div>
        </div>

        <!-- Acesso Rápido Bento -->
        <div class="bento-actions-grid">
          
          <div class="bento-card bento-feature" onclick="showScreen('biblia')">
            <div class="bento-card-bg blur-gold"></div>
            <div class="bento-card-header">
              <div class="bento-icon gold-icon"><i data-lucide="book-open"></i></div>
              <div class="bento-arrow"><i data-lucide="arrow-up-right"></i></div>
            </div>
            <div class="bento-card-body">
              <h3>Bíblia Digital</h3>
              <p>Áudio & Leitura</p>
            </div>
          </div>

          <div class="bento-card bento-feature" onclick="showScreen('harpa')">
            <div class="bento-card-bg blur-violet"></div>
            <div class="bento-card-header">
              <div class="bento-icon violet-icon"><i data-lucide="music"></i></div>
              <div class="bento-arrow"><i data-lucide="arrow-up-right"></i></div>
            </div>
            <div class="bento-card-body">
              <h3>Harpa Cristã</h3>
              <p>Letras e Cifras</p>
            </div>
          </div>

          <div class="bento-card bento-admin" onclick="navigateTo('membros')" data-role="pastor">
            <div class="bento-card-bg blur-blue"></div>
            <div class="bento-card-header">
              <div class="bento-icon"><i data-lucide="users-round"></i></div>
            </div>
            <div class="bento-card-body">
              <h3>Gestão</h3>
              <p>Membros</p>
            </div>
          </div>

          <div class="bento-card bento-admin" onclick="showScreen('sermao')" data-role="pastor">
            <div class="bento-card-bg blur-emerald"></div>
            <div class="bento-card-header">
              <div class="bento-icon"><i data-lucide="sparkles"></i></div>
            </div>
            <div class="bento-card-body">
              <h3>Sermões</h3>
              <p>IA Assistente</p>
            </div>
          </div>

        </div>
      </div>

      <!-- Continue de onde parou -->`;

html = html.replace(oldDashboardRegex, newDashboardStr);

// Let's also fix the auth background container
html = html.replace('class="auth-container"', 'class="auth-container bento-auth-container"');
// Let's add global CSS link for our new bento stylesheet
if (!html.includes('bento-styles.css')) {
  html = html.replace('<link rel="stylesheet" href="styles.css">', '<link rel="stylesheet" href="styles.css">\\n  <link rel="stylesheet" href="bento-styles.css">');
}

fs.writeFileSync('index.html', html, 'utf-8');
console.log('HTML restructured successfully for Bento Grid');
