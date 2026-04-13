// APP.JS v2.1 — Lógica Consolidada (MVP Premium)
// =====================================================

// === CONFIGURAÇÃO DE VERSÃO ===
const IS_FREE_VERSION = false; // Mude para true para liberar todos os recursos (Versão de Cortesia)

// === STATE ===
let currentScreen = 'inicio';
let screenHistory = [];
let currentMembroFilter = 'todos';
let currentBibleFilter = 'todos';
let selectedBook = null;
let isPlaying = false;
let deleteMembroId = null;

// === PREMIUM/FREEMIUM STATE ===
let iaDuracaoSelecionada = 40;
let onboardingStep = 1;
let currentPlanProfile = 'pastor'; // 'pastor' ou 'membro'
let mpInstance = null;

// === CONFIGURAÇÕES REAIS — MERCADO PAGO ===
const MP_CONFIG = {
    modo: 'real', 
    publicKey: 'APP_USR-cdd236ee-5e74-4c1b-a863-fd3406936564',
    // O Access Token foi movido para o servidor (server.js) por segurança
};

const PLANS_CONFIG = {
  pastor: {
    name: 'Pastor Premium',
    prices: [
      { id: 'mensal', label: 'Mensal', price: 25, period: 'mês' },
      { id: 'anual', label: 'Anual', price: 240, period: 'ano', recommended: true, save: 'Economize 20%' },
      { id: 'vitalicio', label: 'Vitalício', price: 500, period: 'único' }
    ]
  },
  membro: {
    name: 'Membro Premium',
    prices: [
      { id: 'mensal', label: 'Mensal', price: 15, period: 'mês' },
      { id: 'anual', label: 'Anual', price: 144, period: 'ano', recommended: true, save: 'Economize 20%' },
      { id: 'vitalicio', label: 'Vitalício', price: 200, period: 'único' }
    ]
  }
};

// === AUTH STATE ===
let currentUser = null; // { id, nome, email, igreja, pastorNome, logoBase64 }

// === DINAMIC DATA STATE ===
let bibliaData = []; // Receberá o JSON pesado da web
let harpaCompletaData = []; // Gerada dinamicamente com 640 hinos
let financasData = []; // Lançamentos financeiros

// =====================================================
// AUTH — Sistema de Login / Cadastro / Logout
// =====================================================
const AUTH_USERS_KEY = 'appMinisterial_users';
const AUTH_SESSION_KEY = 'appMinisterial_session';

function getRegisteredUsers() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '[]');
  } catch (e) { return []; }
}

function saveRegisteredUsers(users) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY));
  } catch (e) { return null; }
}

function saveSession(user) {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(AUTH_SESSION_KEY);
}

// Gera um ID simples para o usuário
function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

// Hash simples da senha (simulação — em produção usar bcrypt no backend)
// Normalização de texto para busca (remove acentos e converte para minúsculas)
function normalizeText(txt) {
  if (!txt) return "";
  return txt.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Logic...
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'h' + Math.abs(hash).toString(36);
}

// Login
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const senha = document.getElementById('loginSenha').value;
  const errorEl = document.getElementById('authError');

  if (!email || !senha) {
    showAuthError('Preencha todos os campos.');
    return;
  }

  const users = getRegisteredUsers();
  const user = users.find(u => u.email === email && u.senhaHash === simpleHash(senha));

  if (!user) {
    showAuthError('E-mail ou senha incorretos.');
    return;
  }

  // Sucesso!
  currentUser = user;
  saveSession(user);
  enterApp();
}

// Cadastro
function handleCadastro(e) {
  e.preventDefault();
  const nome = document.getElementById('cadNome').value.trim();
  const email = document.getElementById('cadEmail').value.trim().toLowerCase();
  const senha = document.getElementById('cadSenha').value;
  const igreja = document.getElementById('cadIgreja').value.trim();
  const perfil = document.getElementById('cadPerfil').value;
  const errorEl = document.getElementById('authError');

  if (!nome || !email || !senha || !igreja) {
    showAuthError('Preencha todos os campos.');
    return;
  }

  // Validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAuthError('Por favor, insira um e-mail válido.');
    return;
  }

  if (senha.length < 6) {
    showAuthError('A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  // Validação de força
  const strength = getPasswordStrength(senha);
  if (strength.score < 2) {
    showAuthError('Senha muito fraca. Use letras, números e caracteres especiais.');
    return;
  }

  const users = getRegisteredUsers();
  if (users.find(u => u.email === email)) {
    showAuthError('Este e-mail já está cadastrado. Tente entrar.');
    return;
  }

  const newUser = {
    id: generateUserId(),
    nome: nome,
    email: email,
    senhaHash: simpleHash(senha),
    igreja: igreja,
    perfilAcesso: perfil,
    pastorNome: nome,
    logoBase64: '',
    criadoEm: new Date().toISOString()
  };

  users.push(newUser);
  saveRegisteredUsers(users);

  // Login automático
  currentUser = newUser;
  saveSession(newUser);
  enterApp();

  // Mostrar onboarding para novo usuário
  setTimeout(() => {
    showOnboarding();
  }, 500);
}

// Logout
function handleLogout() {
  if (confirm('Tem certeza que deseja sair?')) {
    currentUser = null;
    clearSession();
    showAuthScreen();
  }
}

// Exibir tela de login
function showAuthScreen() {
  const authScreen = document.getElementById('authScreen');
  const app = document.getElementById('app');
  authScreen.classList.remove('hidden');
  app.style.display = 'none';
  // Reset forms
  document.getElementById('formLogin').reset();
  document.getElementById('formCadastro').reset();
  hideAuthError();
}

// Entrar no app
function enterApp() {
  const authScreen = document.getElementById('authScreen');
  const app = document.getElementById('app');
  authScreen.classList.add('hidden');
  app.style.display = 'block';
  
  // Applica nível de permissão no corpo do site
  if (currentUser.perfilAcesso === 'membro') {
    document.body.classList.add('role-membro');
  } else {
    document.body.classList.remove('role-membro');
  }
  
  // Carregar dados do usuário
  updateUIWithUserData();
  loadUserScopedData();
  
  // Init do app
  loadVerseDoDia();
  loadStats();
  renderMembros();
  renderSermoes();
  renderCerimonial();
  renderDicionario();
  initEBD();
  initMagicoData();
  initBgMusic();
  updateIAUsageBar();
  updatePremiumUI();
  loadFinancasFromStorage();
  renderFinancas();
  loadCarteirinha(); // Carrega a foto da carteira se existir
  initRealMP(); // Inicializa o Mercado Pago Real
  checkRetornoPagamento(); // Verifica se usuário voltou de um pagamento
}

// Tabs de login/cadastro
function showAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  hideAuthError();

  if (tab === 'login') {
    document.querySelector('.auth-tab:nth-child(1)').classList.add('active');
    document.getElementById('formLogin').classList.add('active');
    document.getElementById('authToggleText').innerHTML = 'Não tem conta? <a onclick="showAuthTab(\'cadastro\')">Crie agora</a>';
  } else {
    document.querySelector('.auth-tab:nth-child(2)').classList.add('active');
    document.getElementById('formCadastro').classList.add('active');
    document.getElementById('authToggleText').innerHTML = 'Já tem conta? <a onclick="showAuthTab(\'login\')">Entrar</a>';
  }
}

function showAuthError(msg) {
  const el = document.getElementById('authError');
  el.textContent = msg;
  el.classList.add('show');
}

function hideAuthError() {
  document.getElementById('authError').classList.remove('show');
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
  }
}

// === PASSWORD STRENGTH ===
function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score <= 1) return { score: 1, label: 'Fraca', level: 'weak' };
  if (score === 2) return { score: 2, label: 'Razoável', level: 'fair' };
  if (score === 3) return { score: 3, label: 'Boa', level: 'good' };
  return { score: 4, label: 'Forte 💪', level: 'strong' };
}

function updatePasswordStrength(value) {
  const container = document.getElementById('passwordStrength');
  const label = document.getElementById('strengthLabel');
  const bars = [1,2,3,4].map(i => document.getElementById('strengthBar' + i));
  
  if (!value) {
    bars.forEach(b => b.className = 'strength-bar');
    label.textContent = '';
    label.className = 'strength-label';
    return;
  }
  
  const strength = getPasswordStrength(value);
  bars.forEach((b, i) => {
    b.className = 'strength-bar' + (i < strength.score ? ' ' + strength.level : '');
  });
  label.textContent = strength.label;
  label.className = 'strength-label ' + strength.level;
}

// === ONBOARDING ===
function showOnboarding() {
  onboardingStep = 1;
  updateOnboardingUI();
  document.getElementById('modalOnboarding').classList.add('active');
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function nextOnboardingStep() {
  if (onboardingStep >= 4) {
    closeOnboarding();
    return;
  }
  onboardingStep++;
  updateOnboardingUI();
}

function updateOnboardingUI() {
  // Steps
  document.querySelectorAll('.onboarding-step').forEach(s => {
    s.classList.remove('active');
    if (parseInt(s.dataset.step) === onboardingStep) s.classList.add('active');
  });
  // Dots
  document.querySelectorAll('.onboarding-dot').forEach(d => {
    d.classList.remove('active');
    if (parseInt(d.dataset.dot) === onboardingStep) d.classList.add('active');
  });
  // Button text
  const btn = document.getElementById('onboardingNextBtn');
  if (onboardingStep === 4) {
    btn.innerHTML = 'Começar <i data-lucide="check"></i>';
  } else {
    btn.innerHTML = 'Próximo <i data-lucide="arrow-right"></i>';
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeOnboarding() {
  document.getElementById('modalOnboarding').classList.remove('active');
}

// === PREMIUM/FREEMIUM LOGIC ===
function getUserPlan() {
  if (IS_FREE_VERSION) return 'pastor_vitalicio';
  if (!currentUser) return 'free';
  const plan = localStorage.getItem(getUserStorageKey('plan')) || 'free';
  
  if (plan !== 'free') {
    const expiresAt = localStorage.getItem(getUserStorageKey('plan_expires'));
    if (expiresAt && expiresAt !== '-1') {
      const expirationTime = parseInt(expiresAt, 10);
      if (Date.now() > expirationTime) {
        // Expirou!
        setUserPlan('free');
        showToast('Sua assinatura expirou. Renove para continuar usando os recursos Premium.', 'warning');
        return 'free';
      }
    }
  }
  return plan;
}

function setUserPlan(plan) {
  localStorage.setItem(getUserStorageKey('plan'), plan);
  
  if (plan !== 'free') {
    const parts = plan.split('_');
    const duration = parts[parts.length - 1]; // mensal, anual, teste, vitalicio
    
    let expiresAt = null;
    const now = new Date();
    
    if (duration === 'mensal') {
      now.setMonth(now.getMonth() + 1);
      expiresAt = now.getTime();
    } else if (duration === 'anual') {
      now.setFullYear(now.getFullYear() + 1);
      expiresAt = now.getTime();
    } else if (duration === 'teste') {
      // Plano de teste dura até o fim do dia (para validações rápidas)
      // Ajuste para 1 dia para testes adequados
      now.setDate(now.getDate() + 1);
      expiresAt = now.getTime();
    } else if (duration === 'vitalicio') {
      expiresAt = -1; // -1 significa que não expira
    }
    
    if (expiresAt !== null) {
      localStorage.setItem(getUserStorageKey('plan_expires'), expiresAt);
    }
  } else {
    localStorage.removeItem(getUserStorageKey('plan_expires'));
  }
}

function ativarPremiumDesenvolvedor() {
  if (confirm('Ativar Modo Desenvolvedor? Isso liberará todos os recursos Premium gratuitamente para este navegador.')) {
    setUserPlan('pastor_vitalicio');
    showToast('🚀 Modo Desenvolvedor Ativado! Todos os recursos Premium estão liberados.', 'success');
    updatePremiumUI();
    // Se estiver no modal premium, fechar
    closeModal('modalPremium');
  }
}

function getIAUsageCount() {
  const monthKey = new Date().toISOString().slice(0, 7); // YYYY-MM
  const data = JSON.parse(localStorage.getItem(getUserStorageKey('iaUsage')) || '{}');
  return data[monthKey] || 0;
}

function incrementIAUsage() {
  const monthKey = new Date().toISOString().slice(0, 7);
  const data = JSON.parse(localStorage.getItem(getUserStorageKey('iaUsage')) || '{}');
  data[monthKey] = (data[monthKey] || 0) + 1;
  localStorage.setItem(getUserStorageKey('iaUsage'), JSON.stringify(data));
}

function canGenerateIA() {
  return true; // Ilimitado agora
}

function updateIAUsageBar() {
  const bar = document.getElementById('iaUsageBar');
  if (bar) bar.classList.add('hidden');
}

// === PREMIUM GATEKEEPER ===
function isPremium() {
  if (IS_FREE_VERSION) return true;
  const plan = getUserPlan();
  return plan !== 'free';
}

function checkPremiumAccess(featureName) {
  if (isPremium()) return true;
  
  // Se não for premium, abre o modal de planos
  openPremiumModal(featureName);
  return false;
}

function selectPlanProfile(profile) {
  currentPlanProfile = profile;
  document.getElementById('btnPlanPastor').classList.toggle('active', profile === 'pastor');
  document.getElementById('btnPlanMembro').classList.toggle('active', profile === 'membro');
  const btnTeste = document.getElementById('btnPlanTeste');
  if (btnTeste) btnTeste.classList.toggle('active', profile === 'teste');
  renderPremiumPlans();
}

function renderPremiumPlans() {
  const grid = document.getElementById('premiumPlansGrid');
  if (!grid) return;
  
  const config = PLANS_CONFIG[currentPlanProfile];
  grid.innerHTML = config.prices.map(p => `
    <div class="plan-card ${p.recommended ? 'recommended' : ''}" onclick="openCheckout('${currentPlanProfile}', '${p.id}', ${p.price})">
      <div class="plan-info-main">
        <span class="plan-name">${p.label}</span>
        <span class="plan-desc">${p.save || 'Acesso total'}</span>
      </div>
      <div class="plan-price-wrap">
        <span class="plan-price">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
        <span class="plan-period">/${p.period}</span>
      </div>
    </div>
  `).join('');
}

function openPremiumModal(featureName = '') {
  if (IS_FREE_VERSION) return;
  const modal = document.getElementById('modalPremium');
  if (modal) {
    modal.classList.add('active');
    renderPremiumPlans();
    
    const titleEl = modal.querySelector('h2');
    if (featureName && titleEl) {
      titleEl.innerHTML = `<i data-lucide="lock" style="width:20px"></i> Recurso Premium`;
    }
  }
  
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// === CHECKOUT LOGIC ===
let selectedCheckoutPlan = null;

function openCheckout(profile, duration, price) {
  selectedCheckoutPlan = { profile, duration, price };
  
  if (MP_CONFIG.modo === 'real') {
    closeModal('modalPremium');
    createMPPreference(profile, duration, price);
    return;
  }

  document.getElementById('checkoutPlanName').textContent = `${profile.charAt(0).toUpperCase() + profile.slice(1)} Premium — ${duration.charAt(0).toUpperCase() + duration.slice(1)}`;
  document.getElementById('checkoutPlanPrice').textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;
  
  closeModal('modalPremium');
  document.getElementById('modalCheckout').classList.add('active');
}

function showCheckoutMethod(method) {
  document.querySelectorAll('.checkout-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.checkout-method-content').forEach(c => c.style.display = 'none');
  
  if (method === 'pix') {
    document.querySelector('.checkout-tab:nth-child(1)').classList.add('active');
    document.getElementById('checkout-pix').style.display = 'block';
  } else {
    document.querySelector('.checkout-tab:nth-child(2)').classList.add('active');
    document.getElementById('checkout-card').style.display = 'block';
  }
}

function simulatePaymentSuccess() {
  if (MP_CONFIG.modo === 'real') {
    // Se estiver no modo real, a lógica é tratada pelo Mercado Pago
    return;
  }

  showToast('Processando pagamento...', '');
  setTimeout(() => {
    const planName = `${selectedCheckoutPlan.profile}_${selectedCheckoutPlan.duration}`;
    setUserPlan(planName); // Salvando o plano específico
    showToast('🎉 Pagamento confirmado! Seu acesso Premium está liberado.', 'success');
    closeModal('modalCheckout');
    updatePremiumUI();
  }, 2000);
}

// === MERCADO PAGO API REAL ===
function initRealMP() {
  if (MP_CONFIG.modo === 'real' && MP_CONFIG.publicKey) {
    if (typeof MercadoPago !== 'undefined') {
      mpInstance = new MercadoPago(MP_CONFIG.publicKey, { locale: 'pt-BR' });
    }
  }
}

function checkRetornoPagamento() {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get('collection_status') || urlParams.get('status');
  
  if (status === 'approved') {
    const currentPlan = getUserPlan();
    if (currentPlan === 'free') {
       const pendingPlan = localStorage.getItem('pending_plan') || 'pastor_mensal';
       setUserPlan(pendingPlan);
       localStorage.removeItem('pending_plan');
       showToast('🎉 Pagamento Aprovado! Seu acesso Premium foi liberado.', 'success');
       updatePremiumUI();
       window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
}

async function createMPPreference(profile, duration, price) {
  showToast('Iniciando pagamento seguro...', '');
  
  // Salva o plano que o usuário está tentando assinar
  localStorage.setItem('pending_plan', `${profile}_${duration}`);

  const checkOutData = {
    items: [{
      title: `Plano ${profile.charAt(0).toUpperCase() + profile.slice(1)} — ${duration}`,
      quantity: 1,
      unit_price: price,
      currency_id: 'BRL'
    }],
    payerEmail: currentUser ? currentUser.email : '',
    origin: window.location.origin
  };

  try {
    const response = await fetch('/api/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkOutData)
    });

    const data = await response.json();
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      throw new Error(data.error || 'Erro ao gerar link de pagamento');
    }
  } catch (err) {
    console.error('Erro no checkout:', err);
    showToast('Erro ao conectar com o servidor de pagamentos.', 'danger');
  }
}

function handleCheckoutPrincipal() {
  if (MP_CONFIG.modo === 'real') {
    createMPPreference(selectedCheckoutPlan.profile, selectedCheckoutPlan.duration, selectedCheckoutPlan.price);
  } else {
    document.getElementById('modalCheckout').classList.add('active');
  }
}

function handleCardPayment(e) {
  e.preventDefault();
  simulatePaymentSuccess();
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('active');
}

function togglePremiumPlan() {
  const plan = getUserPlan();
  if (plan === 'premium') {
    if (confirm('Tem certeza que deseja cancelar o plano Premium?')) {
      setUserPlan('free');
      showToast('Plano rebaixado para Gratuito', '');
    }
  } else {
    setUserPlan('premium');
    showToast('🎉 Parabéns! Você agora é Premium!', 'success');
  }
  closeModal('modalPremium');
  updateIAUsageBar();
  updatePremiumUI();
}

function forceSyncPayment() {
  const pending = localStorage.getItem('pending_plan');
  if (pending) {
    setUserPlan(pending);
    localStorage.removeItem('pending_plan');
    showToast('✅ Pagamento sincronizado e plano liberado!', 'success');
    updatePremiumUI();
  } else {
    showToast('Nenhum pagamento pendente foi encontrado.', 'danger');
  }
}

function updatePremiumUI() {
  const badge = document.getElementById('profilePlanBadge');
  const title = document.getElementById('profilePlanTitle');
  const text = document.getElementById('profilePlanText');
  const btn = document.getElementById('profilePlanBtn');

  if (IS_FREE_VERSION) {
    if (badge) {
      badge.textContent = `🎁 Versão de Cortesia`;
      badge.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      badge.style.color = '#fff';
    }
    if (title) title.textContent = `Acesso Total Liberado`;
    if (text) text.textContent = 'Você está usando uma versão especial com todos os recursos premium habilitados.';
    if (btn) btn.style.display = 'none';
    return;
  }

  const plan = getUserPlan();
  
  if (plan !== 'free') {
    const [profile, duration] = plan.split('_');
    const config = PLANS_CONFIG[profile];
    const durationLabel = duration === 'mensal' ? 'Mensal' : (duration === 'anual' ? 'Anual' : (duration === 'teste' ? 'Teste' : 'Vitalício'));
    
    const expiresAt = localStorage.getItem(getUserStorageKey('plan_expires'));
    let expiresText = '';
    if (expiresAt && expiresAt !== '-1') {
       const d = new Date(parseInt(expiresAt, 10));
       expiresText = ` (Válido até ${d.toLocaleDateString('pt-BR')})`;
    }
    
    if (badge) {
      badge.textContent = `⭐ ${config.name}`;
      badge.style.background = 'linear-gradient(135deg, var(--gold-dark), var(--gold))';
      badge.style.color = '#fff';
    }
    if (title) title.textContent = `Assinatura ${durationLabel} Ativa${expiresText}`;
    if (text) text.textContent = 'Você tem acesso ilimitado a todos os recursos do App Ministerial.';
    if (btn) btn.innerHTML = '<i data-lucide="settings"></i> Gerenciar Plano';
  } else {
    if (badge) {
      badge.textContent = 'Plano Gratuito';
      badge.style.background = '';
      badge.style.color = '';
    }
    if (title) title.textContent = 'Upgrade para Premium';
    if (text) text.textContent = 'Sermões ilimitados, exportação PDF, backup na nuvem e relatórios avançados.';
    if (btn) btn.innerHTML = '<i data-lucide="crown"></i> Ver Plano Premium';
  }
}

// === DURATION SELECTOR ===
function selectDuracao(el, mins) {
  iaDuracaoSelecionada = mins;
  document.querySelectorAll('.ia-duration-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

// Atualiza toda a UI com dados do usuário logado
function updateUIWithUserData() {
  if (!currentUser) return;

  const nome = currentUser.pastorNome || currentUser.nome;
  const igreja = currentUser.igreja || 'Ministerial';
  const iniciais = nome.split(' ').map(p => p[0]).join('').toUpperCase().substring(0, 2);

  // Header
  document.getElementById('headerChurchName').textContent = igreja;
  const headerLogoIcon = document.getElementById('headerLogoIcon');
  if (currentUser.logoBase64 && headerLogoIcon) {
    headerLogoIcon.innerHTML = `<img src="${currentUser.logoBase64}" alt="Logo" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">`;
  } else if (headerLogoIcon) {
    headerLogoIcon.innerHTML = 'M';
  }
  
  // Greeting
  const firstName = nome.split(' ').pop() || nome.split(' ')[0];
  const title = currentUser.perfilAcesso === 'membro' ? 'Irmão(ã)' : 'Pastor';
  document.getElementById('greetingName').innerHTML = `${title} <span>${firstName}</span>`;

  // Perfil
  document.getElementById('profileAvatar').textContent = iniciais;
  document.getElementById('profileName').textContent = nome;
  document.getElementById('profileRole').textContent = currentUser.perfilAcesso === 'membro' ? 'Membro' : 'Pastor Titular';
  document.getElementById('profileChurch').textContent = igreja;
  document.getElementById('profileEmailDisplay').textContent = currentUser.email;

  // Config inputs
  document.getElementById('cfgNomeIgreja').value = igreja;
  document.getElementById('cfgNomePastor').value = nome;

  // Logo da igreja
  const logoPreview = document.getElementById('churchLogoPreview');
  if (currentUser.logoBase64) {
    logoPreview.innerHTML = `<img src="${currentUser.logoBase64}" alt="Logo da Igreja">`;
  } else {
    logoPreview.innerHTML = '⛪';
  }
}

// Salvar configuração da igreja
function saveChurchConfig() {
  if (!currentUser) return;

  currentUser.igreja = document.getElementById('cfgNomeIgreja').value.trim() || currentUser.igreja;
  currentUser.pastorNome = document.getElementById('cfgNomePastor').value.trim() || currentUser.pastorNome;

  // Atualizar no array de users
  const users = getRegisteredUsers();
  const idx = users.findIndex(u => u.id === currentUser.id);
  if (idx >= 0) {
    users[idx] = currentUser;
    saveRegisteredUsers(users);
  }
  saveSession(currentUser);
  updateUIWithUserData();
  showToast('Configurações salvas com sucesso!', 'success');
}

function onChurchConfigChange() {
  // Feedback visual se quiser — por ora, nada
}

// Upload de logo da igreja
function handleChurchLogo(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 500 * 1024) {
    showToast('Imagem muito grande. Use até 500KB.', 'danger');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(ev) {
    currentUser.logoBase64 = ev.target.result;

    // Atualizar no array de users
    const users = getRegisteredUsers();
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx >= 0) {
      users[idx] = currentUser;
      saveRegisteredUsers(users);
    }
    saveSession(currentUser);
    updateUIWithUserData();
    showToast('Logo atualizada!', 'success');
  };
  reader.readAsDataURL(file);
}

// === CARTEIRINHA LOGIC ===
function handleCarteirinhaUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) { 
    showToast('Imagem muito grande. Use até 2MB.', 'danger');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(ev) {
    const base64 = ev.target.result;
    localStorage.setItem(getUserStorageKey('carteirinha'), base64);
    displayCarteirinha(base64);
    showToast('Carteirinha salva com sucesso!', 'success');
  };
  reader.readAsDataURL(file);
}

function loadCarteirinha() {
  const saved = localStorage.getItem(getUserStorageKey('carteirinha'));
  if (saved) {
    displayCarteirinha(saved);
  }
}

function displayCarteirinha(base64) {
  const preview = document.getElementById('carteirinhaPreview');
  const btnDelete = document.getElementById('btnDeleteCarteirinha');
  
  if (preview) {
    preview.innerHTML = `<img src="${base64}" alt="Carteirinha de Membro" onclick="openCarteirinhaZoom(this.src)">`;
    preview.classList.add('has-image');
  }
  if (btnDelete) {
    btnDelete.style.display = 'flex';
  }
}

function deleteCarteirinha() {
  if (confirm('Deseja remover a foto da carteirinha?')) {
    localStorage.removeItem(getUserStorageKey('carteirinha'));
    const preview = document.getElementById('carteirinhaPreview');
    const btnDelete = document.getElementById('btnDeleteCarteirinha');
    
    if (preview) {
      preview.innerHTML = `
        <div class="empty-card">
          <i data-lucide="camera" style="width:48px;height:48px;opacity:0.2;margin-bottom:var(--sp-4)"></i>
          <p>Nenhuma carteirinha capturada</p>
        </div>`;
      preview.classList.remove('has-image');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
    if (btnDelete) {
      btnDelete.style.display = 'none';
    }
  }
}

// === CARTEIRINHA ZOOM ===
function openCarteirinhaZoom(src) {
  const overlay = document.getElementById('carteirinhaZoom');
  const img = document.getElementById('zoomImg');
  if (overlay && img) {
    img.src = src;
    overlay.classList.add('active');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}

function closeCarteirinhaZoom() {
  const overlay = document.getElementById('carteirinhaZoom');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

// === TESOURARIA LOGIC ===
function loadFinancasFromStorage() {
  const key = getUserStorageKey('financas');
  const stored = localStorage.getItem(key);
  if (stored) financasData = JSON.parse(stored);
}

function saveFinancasToStorage() {
  const key = getUserStorageKey('financas');
  localStorage.setItem(key, JSON.stringify(financasData));
}

function openAddFinanca(tipo) {
  const modal = document.getElementById('modalFinancas');
  document.getElementById('finTipo').value = tipo;
  document.getElementById('financaModalTitle').textContent = tipo === 'entrada' ? 'Nova Entrada' : 'Nova Saída';
  document.getElementById('finData').value = new Date().toISOString().split('T')[0];
  document.getElementById('formFinancas').reset();
  document.getElementById('finTipo').value = tipo; // reset limpa o hidden
  modal.classList.add('active');
}

function saveFinanca(e) {
  e.preventDefault();
  const tipo = document.getElementById('finTipo').value;
  const desc = document.getElementById('finDesc').value;
  const valor = parseFloat(document.getElementById('finValor').value);
  const data = document.getElementById('finData').value;
  const categoria = document.getElementById('finCategoria').value;

  const novaFinanca = { id: Date.now(), tipo, desc, valor, data, categoria };
  financasData.unshift(novaFinanca);
  saveFinancasToStorage();
  renderFinancas();
  closeModal('modalFinancas');
  showToast('Lançamento realizado!', 'success');
}

function renderFinancas() {
  const lista = document.getElementById('financasLista');
  const saldoEl = document.getElementById('finSaldo');
  const entradasEl = document.getElementById('finEntradas');
  if (!lista) return;

  let totalEntradas = 0;
  let totalSaidas = 0;
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  lista.innerHTML = financasData.map(f => {
    const isEntrada = f.tipo === 'entrada';
    const v = f.valor;
    
    // Cálculo de estatísticas (mês atual)
    const fData = new Date(f.data);
    if (fData.getMonth() === mesAtual && fData.getFullYear() === anoAtual) {
      if (isEntrada) totalEntradas += v;
      else totalSaidas += v;
    }

    return `
      <div class="financa-item">
        <div class="fin-icon ${f.tipo}">${isEntrada ? '↑' : '↓'}</div>
        <div style="flex:1">
          <div class="fin-desc">${f.desc}</div>
          <div class="fin-meta">${f.categoria} · ${f.data.split('-').reverse().join('/')}</div>
        </div>
        <div class="fin-valor ${f.tipo}">${isEntrada ? '+' : '-'} R$ ${v.toFixed(2).replace('.', ',')}</div>
      </div>
    `;
  }).join('');

  if (saldoEl) {
    const saldoTotal = financasData.reduce((acc, f) => f.tipo === 'entrada' ? acc + f.valor : acc - f.valor, 0);
    saldoEl.textContent = `R$ ${saldoTotal.toFixed(2).replace('.', ',')}`;
  }
  if (entradasEl) {
    entradasEl.textContent = `R$ ${totalEntradas.toFixed(2).replace('.', ',')}`;
  }
}

// === STORAGE SCOPED POR USUÁRIO ===
function getUserStorageKey(suffix) {
  if (!currentUser) return 'appMinisterial_' + suffix;
  return `appMinisterial_${currentUser.id}_${suffix}`;
}

// === LOCAL STORAGE HELPERS (scoped) ===
function loadMembrosFromStorage() {
  const key = getUserStorageKey('membros');
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        membrosData.length = 0;
        parsed.forEach(m => membrosData.push(m));
      }
    } catch (e) {
      console.warn('Erro ao carregar membros do localStorage:', e);
    }
  }
}

function saveMembrosToStorage() {
  const key = getUserStorageKey('membros');
  localStorage.setItem(key, JSON.stringify(membrosData));
}

function loadUserScopedData() {
  loadMembrosFromStorage();
  // Sermões e lições usam keys que já serão scoped
}

function getNextMembroId() {
  return membrosData.length === 0 ? 1 : Math.max(...membrosData.map(m => m.id)) + 1;
}

function showToast(message, type = '') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast' + (type ? ' ' + type : '');
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; }, 2200);
  setTimeout(() => toast.remove(), 2600);
}

// === NAVIGATION ===
const mainNavScreens = ['inicio','membros','estudo','culto','escola','carteirinha','perfil'];
const subScreens = ['biblia','sermao','cerimonial','dicionario','harpa','membro-detalhe','sermao-detalhe','cerimonial-detalhe','harpa-detalhe','esboco-detalhe'];

function navigateTo(screenId) {
  screenHistory = [];
  showScreen(screenId);
}

function showScreen(screenId) {
  // Trava Premium: Se não for 'inicio' ou 'perfil', precisa ser Premium
  const publicScreens = ['inicio', 'perfil'];
  if (!publicScreens.includes(screenId)) {
    if (!checkPremiumAccess(screenId)) return;
  }

  // Removido o return antecipado para garantir que a tela sempre seja ativada visualmente
  if (currentScreen !== screenId) {
    screenHistory.push(currentScreen);
  }
  currentScreen = screenId;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + screenId);
  if (target) {
    target.classList.add('active');
    // Scroll the inner container to avoid mobile freeze on window.scrollTo
    const pageContent = target.querySelector('.page-content');
    if (pageContent && typeof pageContent.scrollTo === 'function') {
      pageContent.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }
  updateNav(screenId);
  updateHeader(screenId);
  // Re-render EBD ao navegar para a tela
  if (screenId === 'escola') {
    try { renderEBDCaderneta(); } catch(e) { console.error('EBD render error:', e); }
  }
}

function goBack() {
  if (screenHistory.length > 0) {
    const prev = screenHistory.pop();
    currentScreen = prev;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('screen-' + prev);
    if (target) {
      target.classList.add('active');
      // Scroll the inner container to avoid mobile freeze on window.scrollTo
      const pageContent = target.querySelector('.page-content');
      if (pageContent && typeof pageContent.scrollTo === 'function') {
        pageContent.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
    updateNav(prev);
    updateHeader(prev);
  } else {
    navigateTo('inicio');
  }
}

function updateNav(screenId) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navMap = {
    'biblia':'estudo','sermao':'estudo','dicionario':'estudo','sermao-detalhe':'estudo','esboco-detalhe':'estudo',
    'harpa':'culto','cerimonial':'culto','harpa-detalhe':'culto','cerimonial-detalhe':'culto',
    'membro-detalhe':'membros'
  };
  const navId = navMap[screenId] || screenId;
  const navEl = document.getElementById('nav-' + navId);
  if (navEl) navEl.classList.add('active');
}

function updateHeader(screenId) {
  const main = document.getElementById('mainHeader');
  const sub = document.getElementById('subHeader');
  const titles = {
    'biblia':'Bíblia em Áudio','sermao':'Pesquisa para Sermão','dicionario':'Dicionário Bíblico',
    'harpa':'Harpa Cristã','cerimonial':'Cerimonial Bíblico','membro-detalhe':'Ficha do Membro',
    'sermao-detalhe':'Sermão','cerimonial-detalhe':'Cerimonial',
    'harpa-detalhe':'Hino da Harpa',
    'esboco-detalhe':'Esboço IA'
  };
  if (subScreens.includes(screenId)) {
    main.style.display = 'none';
    sub.style.display = 'flex';
    document.getElementById('subHeaderTitle').textContent = titles[screenId] || '';
  } else {
    main.style.display = 'flex';
    sub.style.display = 'none';
  }
}

// === INIT ===
function init() {
  // Verificar se há sessão ativa
  const session = getSession();
  if (session && session.id) {
    // Verificar se o usuário ainda existe
    const users = getRegisteredUsers();
    const user = users.find(u => u.id === session.id);
    if (user) {
      currentUser = user;
      enterApp();
      return;
    }
  }
  // Não logado — mostrar tela de auth
  showAuthScreen();
}

// === DINAMIC DATA & GLOBAL SEARCH ===
function initMagicoData() {
  gerarHarpaCompleta();
  renderHarpa(); // Renderiza na aba da Harpa com Virtual List / lazy rendering
  
  // Carrega a Bíblia pesada assincronamente (sem travar a tela de início)
  fetchBibliaAssincrona();
}

function gerarHarpaCompleta() {
  harpaCompletaData = [];
  // Vamos usar os hinos que já temos reais na data.js (harpaData)
  const hinosConhecidos = {};
  if (typeof harpaData !== 'undefined') {
    harpaData.forEach(h => { hinosConhecidos[h.numero] = h; });
  }
  
  // Loop de 1 a 640 mágico
  for (let i = 1; i <= 640; i++) {
    if (hinosConhecidos[i]) {
      harpaCompletaData.push(hinosConhecidos[i]);
    } else {
      // Hino genérico gerado programaticamente
      harpaCompletaData.push({
        numero: i,
        titulo: `Hino ${i}`,
        letra: "Letra sendo carregada do servidor...", // Fallback local
        categoria: "Geral"
      });
    }
  }
}

async function fetchBibliaAssincrona() {
  try {
    // Tenta IndexedDB/localStorage primeiro (vamos manter simples em memória da API na demo, mas num app real usamos um DB local)
    // Busca do CDN raw (Almeida Corrigida Fiel - ACF)
    const response = await fetch('https://raw.githubusercontent.com/thiagobodruk/bible/master/json/pt_acf.json');
    if(response.ok) {
      bibliaData = await response.json();
      console.log('Bíblia carregada magicamente:', bibliaData.length, 'livros');
      renderBiblia(); // Re-renderiza a aba bíblia com a real
    }
  } catch(e) {
    console.log('Erro ao baixar a Bíblia dinâmica. Mantendo estrutura local offline de teste.', e);
  }
}

// Global Search
function openGlobalSearch() {
  const overlay = document.getElementById('globalSearchOverlay');
  const input = document.getElementById('globalSearchInput');
  if(overlay) {
    overlay.classList.add('active');
    setTimeout(() => input.focus(), 100);
  }
}

function closeGlobalSearch() {
  document.getElementById('globalSearchOverlay').classList.remove('active');
}

function clearGlobalSearch() {
  const input = document.getElementById('globalSearchInput');
  input.value = '';
  document.getElementById('clearSearchBtn').style.display = 'none';
  document.getElementById('globalSearchResults').innerHTML = `
    <div class="search-empty-state">
      <div>✨</div>
      <p>A "Pesquisa Inteligente" permite encontrar rapidamente versículos da Bíblia, hinos da Harpa ou palavras no Dicionário Bíblico. Digite algo para começar.</p>
    </div>
  `;
  input.focus();
}

// Hook de input para a Busca Global
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('globalSearchInput');
  if(searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      const clearBtn = document.getElementById('clearSearchBtn');
      clearBtn.style.display = query.length > 0 ? 'block' : 'none';
      
      if(query.length < 3) {
        if(query.length === 0) clearGlobalSearch();
        return; 
      }
      executarBuscaGlobal(query);
    });
  }
});

function highlightText(text, query) {
  if(!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

function executarBuscaGlobal(query) {
  const resultsDiv = document.getElementById('globalSearchResults');
  const s = normalizeText(query);
  let html = '';
  let totalFound = 0;
  
  // 1. Busca na Harpa
  const harpaResults = harpaCompletaData.filter(h => {
    const t = normalizeText(h.titulo);
    const n = h.numero.toString();
    const l = normalizeText(h.letra || "");
    
    const numMatch = n === query;
    const titleMatch = t.includes(s);
    const letraMatch = s.length > 3 && l.includes(s);
    
    return numMatch || titleMatch || letraMatch;
  }).slice(0, 10);
  
  if (harpaResults.length > 0) {
    totalFound += harpaResults.length;
    html += '<div class="search-category"><div class="search-category-title">🎵 Harpa Cristã</div>';
    harpaResults.forEach(h => {
      html += `
        <div class="search-result-item res-harpa" onclick="abrirHinoGlobal(${h.numero})">
          <div class="res-num">${h.numero.toString().padStart(3, '0')}</div>
          <div class="res-info">
            <div class="res-title">${highlightText(h.titulo, query)}</div>
          </div>
        </div>
      `;
    });
    html += '</div>';
  }
  
  // 2. Busca no Dicionário
  const dicasResults = [];
  if (typeof dicionarioData !== 'undefined' && Array.isArray(dicionarioData)) {
    dicionarioData.forEach(item => {
      const t = normalizeText(item.termo);
      const def = normalizeText(item.definicao);
      const cat = normalizeText(item.categoria);
      
      const termMatch = t.includes(s);
      const defMatch = s.length > 3 && def.includes(s);
      const catMatch = cat.includes(s);
      
      if (termMatch || defMatch || catMatch) {
        dicasResults.push(item);
      }
    });
  }
  const dictLim = dicasResults.slice(0, 5);
  if (dictLim.length > 0) {
    totalFound += dictLim.length;
    html += '<div class="search-category"><div class="search-category-title">📚 Dicionário Bíblico</div>';
    dictLim.forEach(d => {
      html += `
        <div class="search-result-item res-biblia" onclick="closeGlobalSearch(); showScreen('dicionario'); setTimeout(()=>{ document.getElementById('searchDicionario').value='${d.termo}'; filterDicionario(); }, 200)">
          <div class="res-title">${highlightText(d.termo, query)}</div>
          <div class="res-text">${highlightText(d.definicao.substring(0, 120) + '...', query)}</div>
        </div>
      `;
    });
    html += '</div>';
  }
  
  // 3. Busca na Bíblia Pesada
  const bibliaRes = [];
  if (bibliaData.length > 0) {
    // Busca pesada! Limitar loops
    for (const livro of bibliaData) {
      for (let c = 0; c < livro.chapters.length; c++) {
        const capitulo = livro.chapters[c];
        for (let v = 0; v < capitulo.length; v++) {
          const verso = capitulo[v];
          if (normalizeText(verso).includes(s)) {
             bibliaRes.push({
               livroNome: livro.name,
               capituloNum: c + 1,
               versoNum: v + 1,
               texto: verso
             });
             if (bibliaRes.length >= 10) break; // limite global de performance
          }
        }
        if (bibliaRes.length >= 10) break;
      }
      if (bibliaRes.length >= 10) break;
    }
  }
  
  if (bibliaRes.length > 0) {
    totalFound += bibliaRes.length;
    html += '<div class="search-category"><div class="search-category-title">📖 Versículos Bíblicos</div>';
    bibliaRes.forEach(r => {
      html += `
        <div class="search-result-item res-biblia" onclick="closeGlobalSearch(); showBibleChapterGlobal('${r.livroNome}', ${r.capituloNum})">
          <div class="res-title">${r.livroNome} ${r.capituloNum}:${r.versoNum}</div>
          <div class="res-text">${highlightText(r.texto, query)}</div>
        </div>
      `;
    });
    html += '</div>';
  }
  
  if (totalFound === 0) {
    resultsDiv.innerHTML = `
      <div class="search-empty-state">
        <div style="font-size:2rem;margin-bottom:10px">😞</div>
        <p>Nenhum resultado encontrado para "<strong>${query}</strong>".</p>
      </div>`;
  } else {
    resultsDiv.innerHTML = html;
  }
}

function abrirHinoGlobal(num) {
  closeGlobalSearch();
  navigateTo('harpa');
  // Esperar tela renderizar e abrir o detalhe
  setTimeout(() => openHarpaHino(num), 100);
}

function showBibleChapterGlobal(livroNome, capituloNum) {
  closeGlobalSearch();
  navigateTo('biblia');
  // Se tivéssemos a renderização completa da bliblia conectada:
  // Essa chamada será implementada no renderBiblia
}


// === HOME ===
let lastVerseDay = -1;

function loadVerseDoDia() {
  const now = new Date();
  // Calcula o dia do ano para garantir rotação contínua (inclusive inter-mês)
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  
  if (lastVerseDay === dayOfYear) return;
  lastVerseDay = dayOfYear;
  
  const dayIndex = dayOfYear % versiculosDoDia.length;
  const v = versiculosDoDia[dayIndex];
  
  const textEl = document.getElementById('verseText');
  const refEl = document.getElementById('verseRef');
  
  if (textEl && refEl) {
    textEl.style.transition = 'opacity 0.5s ease';
    refEl.style.transition = 'opacity 0.5s ease';
    textEl.style.opacity = 0;
    refEl.style.opacity = 0;
    
    setTimeout(() => {
      textEl.textContent = v.texto;
      refEl.textContent = '— ' + v.referencia;
      textEl.style.opacity = 1;
      refEl.style.opacity = 1;
    }, 300);
  }
}

// Verifica a cada 1 hora se virou o dia (para quem deixa o app aberto)
setInterval(loadVerseDoDia, 3600000);

function loadStats() {
  const ativosCount = membrosData.filter(m => m.status === 'ativo').length;
  animateNumber('statMembros', ativosCount);
  animateNumber('statSermoes', sermoesData.length);
  animateNumber('statLicoes', (typeof ebdData !== 'undefined' && ebdData.alunos) ? ebdData.alunos.length : 0);
}

function animateNumber(elId, target) {
  const el = document.getElementById(elId);
  if (!el) return;
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 15));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = current;
  }, 50);
}

// === MEMBROS ===
function renderMembros(filter = 'todos', search = '') {
  const container = document.getElementById('membrosLista');
  let filtered = membrosData;
  if (filter !== 'todos') filtered = filtered.filter(m => m.status === filter);
  if (search) {
    const s = normalizeText(search);
    filtered = filtered.filter(m => {
      const nome = normalizeText(m.nome);
      const cargo = normalizeText(m.cargo);
      return nome.includes(s) || (s.length > 3 && cargo.includes(s));
    });
    
    // Sort: nomes que começam com a busca vêm primeiro
    filtered.sort((a,b) => {
      const aStarts = normalizeText(a.nome).startsWith(s);
      const bStarts = normalizeText(b.nome).startsWith(s);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });
  }

  // Update count
  const countEl = document.getElementById('membroCount');
  if (countEl) {
    const ativos = membrosData.filter(m => m.status === 'ativo').length;
    countEl.textContent = ativos + ' ativos';
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">👥</div><div class="empty-title">Nenhum membro encontrado</div><div class="empty-text">Tente outro filtro ou adicione novos membros</div></div>`;
    return;
  }

  container.innerHTML = filtered.map(m => {
    const initials = m.nome.split(' ').filter(n => n.length > 1).map(n => n[0]).slice(0, 2).join('').toUpperCase();
    return `<div class="member-item" onclick="showMembroDetalhe(${m.id})">
      <div class="member-avatar">${initials}</div>
      <div class="member-info">
        <div class="member-name">${m.nome}</div>
        <div class="member-role">${m.cargo} · ${m.congregacao}</div>
      </div>
      <span class="member-status ${m.status}">${m.status}</span>
    </div>`;
  }).join('');
}

function filterMembros() {
  renderMembros(currentMembroFilter, document.getElementById('searchMembros').value);
}

function filterStatus(el, status) {
  currentMembroFilter = status;
  el.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  filterMembros();
}

function showMembroDetalhe(id) {
  const m = membrosData.find(x => x.id === id);
  if (!m) return;
  const fmt = d => d ? new Date(d + 'T00:00:00').toLocaleDateString('pt-BR') : '—';
  const initials = m.nome.split(' ').filter(n => n.length > 1).map(n => n[0]).slice(0, 2).join('').toUpperCase();

  document.getElementById('membroDetalheContent').innerHTML = `
    <div style="text-align:center;margin-bottom:var(--sp-6)">
      <div class="profile-avatar" style="width:68px;height:68px;font-size:var(--fs-lg);margin:0 auto var(--sp-3)">${initials}</div>
      <div style="font-size:var(--fs-lg);font-weight:800;color:var(--navy)">${m.nome}</div>
      <div style="font-size:var(--fs-xs);color:var(--gold-dark);font-weight:600;margin-top:4px">${m.cargo}</div>
      <span class="member-status ${m.status}" style="margin-top:8px;display:inline-block">${m.status}</span>
    </div>

    <div class="section-label">Informações</div>
    <div class="card" style="margin-bottom:var(--sp-5)">
      <div class="info-row"><div class="info-label">Telefone</div><div class="info-value">${m.telefone || '—'}</div></div>
      <div class="info-row"><div class="info-label">Endereço</div><div class="info-value">${m.endereco || '—'}</div></div>
      <div class="info-row"><div class="info-label">Data de Nascimento</div><div class="info-value">${fmt(m.nascimento)}</div></div>
      <div class="info-row"><div class="info-label">Data de Batismo</div><div class="info-value">${fmt(m.batismo)}</div></div>
      <div class="info-row"><div class="info-label">Congregação</div><div class="info-value">${m.congregacao || '—'}</div></div>
    </div>

    ${m.observacoes ? `
    <div class="section-label">Observações</div>
    <div class="card">
      <div style="font-size:var(--fs-sm);color:var(--gray-700);line-height:1.7">${m.observacoes}</div>
    </div>` : ''}

    <!-- CRM PASTORAL -->
    <div class="pastoral-notes" data-role="pastor">
      <div class="section-label" style="margin-bottom:var(--sp-3)"><i data-lucide="clipboard-list"></i> Acompanhamento Pastoral</div>
      ${m.notaPastoral ? `<div class="pastoral-note-card">
        <div class="pastoral-note-header">
          <div class="pastoral-note-type"><i data-lucide="heart"></i> Nota Pastoral</div>
        </div>
        <div class="pastoral-note-text">${m.notaPastoral}</div>
      </div>` : ''}
      ${(m.notasPastorais || []).map(n => `
        <div class="pastoral-note-card">
          <div class="pastoral-note-header">
            <div class="pastoral-note-type"><i data-lucide="${n.tipo === 'visita' ? 'home' : n.tipo === 'oracao' ? 'heart' : 'clipboard-list'}"></i> ${n.tipo === 'visita' ? 'Visita' : n.tipo === 'oracao' ? 'Pedido de Oração' : 'Acompanhamento'}</div>
            <div class="pastoral-note-date">${new Date(n.data).toLocaleDateString('pt-BR')}</div>
          </div>
          <div class="pastoral-note-text">${n.texto}</div>
        </div>
      `).join('')}
      <button class="btn-add-note" onclick="addPastoralNote(${m.id})"><i data-lucide="plus"></i> Adicionar Nota Pastoral</button>
    </div>

    <div class="action-buttons" style="margin-top:var(--sp-5)">
      <button class="btn-primary" onclick="openEditMembro(${m.id})">✏️ Editar</button>
      <button class="btn-danger" onclick="openDeleteMembro(${m.id})">🗑️ Excluir</button>
    </div>
  `;
  if (typeof lucide !== 'undefined') lucide.createIcons();
  showScreen('membro-detalhe');
}

function openAddMembro() { document.getElementById('modalMembro').classList.add('active'); }

function saveMembro(e) {
  e.preventDefault();
  const newMembro = {
    id: getNextMembroId(),
    nome: document.getElementById('mNome').value,
    telefone: document.getElementById('mTelefone').value,
    endereco: document.getElementById('mEndereco').value,
    nascimento: document.getElementById('mNascimento').value,
    batismo: document.getElementById('mBatismo').value,
    cargo: document.getElementById('mCargo').value || 'Membro',
    congregacao: document.getElementById('mCongregacao').value || 'Sede Central',
    status: document.getElementById('mStatus').value || 'ativo',
    observacoes: document.getElementById('mObservacoes').value,
    notaPastoral: document.getElementById('mNotaPastoral').value || '',
    notasPastorais: []
  };
  membrosData.push(newMembro);
  saveMembrosToStorage();
  renderMembros();
  loadStats();
  closeModal('modalMembro');
  document.getElementById('formMembro').reset();
  showToast('✓ Membro adicionado com sucesso', 'success');
}

// === EDITAR MEMBRO ===
function openEditMembro(id) {
  const m = membrosData.find(x => x.id === id);
  if (!m) return;
  document.getElementById('editMembroId').value = m.id;
  document.getElementById('emNome').value = m.nome || '';
  document.getElementById('emTelefone').value = m.telefone || '';
  document.getElementById('emEndereco').value = m.endereco || '';
  document.getElementById('emNascimento').value = m.nascimento || '';
  document.getElementById('emBatismo').value = m.batismo || '';
  document.getElementById('emCargo').value = m.cargo || '';
  document.getElementById('emCongregacao').value = m.congregacao || '';
  document.getElementById('emStatus').value = m.status || 'ativo';
  document.getElementById('emObservacoes').value = m.observacoes || '';
  document.getElementById('modalEditMembro').classList.add('active');
}

function updateMembro(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('editMembroId').value);
  const m = membrosData.find(x => x.id === id);
  if (!m) return;
  m.nome = document.getElementById('emNome').value;
  m.telefone = document.getElementById('emTelefone').value;
  m.endereco = document.getElementById('emEndereco').value;
  m.nascimento = document.getElementById('emNascimento').value;
  m.batismo = document.getElementById('emBatismo').value;
  m.cargo = document.getElementById('emCargo').value || 'Membro';
  m.congregacao = document.getElementById('emCongregacao').value || 'Sede Central';
  m.status = document.getElementById('emStatus').value || 'ativo';
  m.observacoes = document.getElementById('emObservacoes').value;
  saveMembrosToStorage();
  renderMembros();
  loadStats();
  closeModal('modalEditMembro');
  showMembroDetalhe(id);
  showToast('✓ Dados atualizados com sucesso', 'success');
}

// === NOTAS PASTORAIS (CRM) ===
function addPastoralNote(id) {
  const m = membrosData.find(x => x.id === id);
  if (!m) return;
  
  const tipo = prompt('Tipo da nota:\n1 - Visita\n2 - Pedido de Oração\n3 - Acompanhamento\n\nDigite 1, 2 ou 3:');
  if (!tipo) return;
  
  const tipoMap = { '1': 'visita', '2': 'oracao', '3': 'acompanhamento' };
  const tipoNota = tipoMap[tipo] || 'acompanhamento';
  
  const texto = prompt('Descreva a nota pastoral:');
  if (!texto || !texto.trim()) return;
  
  if (!m.notasPastorais) m.notasPastorais = [];
  m.notasPastorais.push({
    tipo: tipoNota,
    texto: texto.trim(),
    data: new Date().toISOString()
  });
  
  saveMembrosToStorage();
  showMembroDetalhe(id);
  showToast('📋 Nota pastoral adicionada', 'success');
}

// === EXCLUIR MEMBRO ===
function openDeleteMembro(id) {
  deleteMembroId = id;
  const m = membrosData.find(x => x.id === id);
  if (!m) return;
  document.getElementById('deleteMembroMsg').textContent = `O membro "${m.nome}" será removido permanentemente. Esta ação não pode ser desfeita.`;
  document.getElementById('modalDeleteMembro').classList.add('active');
}

function confirmDeleteMembro() {
  if (deleteMembroId === null) return;
  const idx = membrosData.findIndex(x => x.id === deleteMembroId);
  if (idx !== -1) {
    membrosData.splice(idx, 1);
    saveMembrosToStorage();
    renderMembros();
    loadStats();
  }
  closeModal('modalDeleteMembro');
  deleteMembroId = null;
  goBack();
  showToast('Membro excluído', 'danger');
}

// === BÍBLIA ===
const AUDIO_BASE = 'https://www.wordproaudio.org/bibles/app/audio/2_BR';
const RECENT_KEY = 'appMinisterial_recentBible';
let currentBookData = null;
let currentChapterNum = null;
let audioUpdateInterval = null;

// === MÚSICA AMBIENTE DE FUNDO ===
const BG_MUSIC_URL = 'bg_music.mp3';
let bgMusicEnabled = true;
let bgMusicLoaded = false;
let bgMusicVolume = 0.15; // 15% default

function renderBiblia(filter = 'todos', search = '') {
  let books = livrosBiblia;
  if (filter !== 'todos') books = books.filter(b => b.testamento === filter);
  if (search) {
    const s = normalizeText(search);
    books = books.filter(b => normalizeText(b.nome).includes(s) || normalizeText(b.abreviacao).includes(s));
  }
  document.getElementById('bibliaLivros').innerHTML = books.map(b =>
    `<div class="bible-book-item" onclick="selectBook('${b.nome}',${b.capitulos},${b.bookIndex})">${b.abreviacao}</div>`
  ).join('');
}

function filterBiblia() {
  renderBiblia(currentBibleFilter, document.getElementById('searchBiblia').value);
}

function filterTestamento(el, t) {
  currentBibleFilter = t;
  el.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  filterBiblia();
}

function selectBook(nome, caps, bookIdx) {
  selectedBook = nome;
  currentBookData = livrosBiblia.find(b => b.nome === nome);
  document.getElementById('selectedBookName').textContent = nome;
  document.getElementById('bible-livros').style.display = 'none';
  document.getElementById('bible-capitulos').style.display = 'block';
  let html = '';
  for (let i = 1; i <= caps; i++) {
    html += `<div class="chapter-item" onclick="selectChapter('${nome}',${i})">${i}</div>`;
  }
  document.getElementById('bibliaCapitulos').innerHTML = html;
}

function showBibleBooks() {
  document.getElementById('bible-livros').style.display = 'block';
  document.getElementById('bible-capitulos').style.display = 'none';
}

function selectChapter(book, chapter) {
  const bookData = livrosBiblia.find(b => b.nome === book);
  if (!bookData) return;
  currentBookData = bookData;
  currentChapterNum = chapter;

  document.getElementById('playerBook').textContent = book;
  document.getElementById('playerChapter').textContent = 'Capítulo ' + chapter;
  showBibleTab('player', document.querySelectorAll('#bibliaTabs .tab')[1]);

  loadBibleAudio(bookData.bookIndex, chapter);
  addToRecentlyPlayed(book, chapter);
}

function loadBibleAudio(bookIdx, chapter) {
  const audio = document.getElementById('bibleAudio');
  const url = `${AUDIO_BASE}/${bookIdx}/${chapter}.mp3`;

  // Reset UI
  isPlaying = false;
  document.getElementById('btnPlayBible').textContent = '▶';
  document.getElementById('progressBar').style.width = '0%';
  document.getElementById('playerScrubber').style.left = '0%';
  document.getElementById('playerCurrentTime').textContent = '0:00';
  document.getElementById('playerDuration').textContent = 'Carregando...';
  document.getElementById('playerLoadingState').style.display = 'block';

  // Set source and load
  audio.src = url;
  audio.load();

  // Clear previous interval
  if (audioUpdateInterval) clearInterval(audioUpdateInterval);

  // Event: metadata loaded
  audio.onloadedmetadata = function() {
    document.getElementById('playerDuration').textContent = formatTime(audio.duration);
    document.getElementById('playerLoadingState').style.display = 'none';
  };

  // Event: can play
  audio.oncanplay = function() {
    document.getElementById('playerLoadingState').style.display = 'none';
  };

  // Event: time update
  audio.ontimeupdate = function() {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      document.getElementById('progressBar').style.width = pct + '%';
      document.getElementById('playerScrubber').style.left = pct + '%';
      document.getElementById('playerCurrentTime').textContent = formatTime(audio.currentTime);
    }
  };

  // Event: ended
  audio.onended = function() {
    isPlaying = false;
    document.getElementById('btnPlayBible').textContent = '▶';
    pauseBgMusic();
    // Auto-advance to next chapter
    if (currentBookData && currentChapterNum < currentBookData.capitulos) {
      setTimeout(() => selectChapter(currentBookData.nome, currentChapterNum + 1), 1500);
    }
  };

  // Event: error
  audio.onerror = function() {
    document.getElementById('playerLoadingState').style.display = 'none';
    document.getElementById('playerDuration').textContent = '--:--';
    pauseBgMusic();
    showToast('Áudio não disponível para este capítulo', 'danger');
  };

  // Auto-play
  audio.play().then(() => {
    isPlaying = true;
    document.getElementById('btnPlayBible').textContent = '⏸';
    resumeBgMusic();
  }).catch(() => {
    // Autoplay blocked — user needs to tap play
    document.getElementById('playerLoadingState').style.display = 'none';
  });
}

function togglePlay() {
  const audio = document.getElementById('bibleAudio');
  if (!audio.src || audio.src === window.location.href) {
    showToast('Selecione um livro e capítulo primeiro', '');
    return;
  }
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    document.getElementById('btnPlayBible').textContent = '▶';
    pauseBgMusic();
  } else {
    audio.play().then(() => {
      isPlaying = true;
      document.getElementById('btnPlayBible').textContent = '⏸';
      resumeBgMusic();
    }).catch(() => {
      showToast('Não foi possível reproduzir o áudio', 'danger');
    });
  }
}

function skipAudio(seconds) {
  const audio = document.getElementById('bibleAudio');
  if (!audio.src || !audio.duration) return;
  audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
}

function seekAudio(event) {
  const audio = document.getElementById('bibleAudio');
  if (!audio.duration) return;
  const wrap = document.getElementById('playerProgressWrap');
  const rect = wrap.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  audio.currentTime = pct * audio.duration;
}

function setPlaybackSpeed(speed, btn) {
  const audio = document.getElementById('bibleAudio');
  audio.playbackRate = speed;
  document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

// === MÚSICA AMBIENTE DE FUNDO — FUNÇÕES ===
function initBgMusic() {
  // Restaurar preferência do usuário
  // Se não existir preferência salva, mantém o padrão (true)
  const saved = localStorage.getItem(getUserStorageKey('bgMusicEnabled'));
  const savedVol = localStorage.getItem(getUserStorageKey('bgMusicVolume'));
  
  // Só desativa se tiver salvo explicitamente como "false"
  if (saved === 'false') {
    bgMusicEnabled = false;
  }
  
  if (bgMusicEnabled) {
    const toggle = document.getElementById('bgMusicToggle');
    const controls = document.getElementById('bgMusicControls');
    if (toggle) toggle.classList.add('active');
    if (controls) controls.style.display = 'block';
  }
  if (savedVol) {
    bgMusicVolume = parseFloat(savedVol);
    const slider = document.getElementById('bgMusicVolume');
    if (slider) slider.value = Math.round(bgMusicVolume * 100);
  }
  updateBgMusicStatus();
}

function loadBgMusicSource() {
  if (bgMusicLoaded) return;
  const bgAudio = document.getElementById('bgMusicAudio');
  if (!bgAudio) return;
  bgAudio.src = BG_MUSIC_URL;
  bgAudio.volume = bgMusicVolume;
  bgAudio.load();
  bgMusicLoaded = true;
}

function toggleBgMusic() {
  bgMusicEnabled = !bgMusicEnabled;
  const toggle = document.getElementById('bgMusicToggle');
  const controls = document.getElementById('bgMusicControls');

  if (bgMusicEnabled) {
    toggle.classList.add('active');
    controls.style.display = 'block';
    loadBgMusicSource();
    // Se a narração já está tocando, iniciar música de fundo
    if (isPlaying) {
      resumeBgMusic();
    }
    showToast('🎵 Música ambiente ativada', 'success');
  } else {
    toggle.classList.remove('active');
    controls.style.display = 'none';
    pauseBgMusic();
    showToast('🔇 Música ambiente desativada', '');
  }

  // Salvar preferência
  localStorage.setItem(getUserStorageKey('bgMusicEnabled'), bgMusicEnabled);
  updateBgMusicStatus();
}

function resumeBgMusic() {
  if (!bgMusicEnabled) return;
  loadBgMusicSource();
  const bgAudio = document.getElementById('bgMusicAudio');
  if (!bgAudio || !bgAudio.src) return;
  bgAudio.volume = 0;
  bgAudio.play().then(() => {
    // Fade in suave
    fadeAudioVolume(bgAudio, 0, bgMusicVolume, 800);
  }).catch(() => {});
}

function pauseBgMusic() {
  const bgAudio = document.getElementById('bgMusicAudio');
  if (!bgAudio || bgAudio.paused) return;
  // Fade out suave
  fadeAudioVolume(bgAudio, bgAudio.volume, 0, 500, () => {
    bgAudio.pause();
  });
}

function fadeAudioVolume(audioEl, from, to, duration, onComplete) {
  const steps = 20;
  const stepTime = duration / steps;
  const stepValue = (to - from) / steps;
  let current = from;
  let step = 0;
  const interval = setInterval(() => {
    step++;
    current += stepValue;
    audioEl.volume = Math.max(0, Math.min(1, current));
    if (step >= steps) {
      clearInterval(interval);
      audioEl.volume = Math.max(0, Math.min(1, to));
      if (onComplete) onComplete();
    }
  }, stepTime);
}

function setBgMusicVolume(val) {
  bgMusicVolume = parseInt(val) / 100;
  const bgAudio = document.getElementById('bgMusicAudio');
  if (bgAudio && !bgAudio.paused) {
    bgAudio.volume = bgMusicVolume;
  }
  localStorage.setItem(getUserStorageKey('bgMusicVolume'), bgMusicVolume);
  updateBgMusicStatus();
}

function updateBgMusicStatus() {
  const statusEl = document.getElementById('bgMusicStatus');
  if (statusEl) {
    const pct = Math.round(bgMusicVolume * 100);
    statusEl.textContent = 'Chuva suave · Volume ' + pct + '%';
  }
}

function showBibleTab(tab, el) {
  document.querySelectorAll('#bibliaTabs .tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  ['livros','player','favoritos-biblia'].forEach(t => {
    const container = document.getElementById('bible-' + t);
    if (container) container.style.display = t === tab ? 'block' : 'none';
  });
  if (tab === 'livros') {
    document.getElementById('bible-capitulos').style.display = 'none';
    document.getElementById('bible-livros').style.display = 'block';
  }
  if (tab === 'player') {
    renderRecentlyPlayed();
  }
}

// === RECENTLY PLAYED ===
function addToRecentlyPlayed(book, chapter) {
  let recent = JSON.parse(localStorage.getItem(getUserStorageKey('bibleRecent')) || '[]');
  // Remove duplicate
  recent = recent.filter(r => !(r.book === book && r.chapter === chapter));
  // Add to front
  recent.unshift({ book, chapter, timestamp: Date.now() });
  // Keep max 10
  if (recent.length > 10) recent = recent.slice(0, 10);
  localStorage.setItem(getUserStorageKey('bibleRecent'), JSON.stringify(recent));
  renderRecentlyPlayed();
}

function renderRecentlyPlayed() {
  const recent = JSON.parse(localStorage.getItem(getUserStorageKey('bibleRecent')) || '[]');
  const container = document.getElementById('recentlyPlayedList');
  if (!container) return;
  if (recent.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding:var(--sp-6)">
        <div class="empty-icon">📖</div>
        <div class="empty-title">Nenhum histórico</div>
        <div class="empty-text">Selecione um livro e capítulo para começar</div>
      </div>`;
    return;
  }
  container.innerHTML = recent.map(r => `
    <div class="recent-item" onclick="selectChapter('${r.book}',${r.chapter})">
      <div class="recent-item-icon">▶</div>
      <div class="recent-item-text">
        <div class="recent-item-title">${r.book}</div>
        <div class="recent-item-sub">Capítulo ${r.chapter}</div>
      </div>
    </div>
  `).join('');
}

// === SERMÕES ===
function renderSermoes(search = '') {
  let items = sermoesData;
  if (search) {
    const s = normalizeText(search);
    items = items.filter(ser => {
      const t = normalizeText(ser.titulo);
      const ref = normalizeText(ser.textoBase);
      const intro = normalizeText(ser.introducao || "");
      
      const titleMatch = t.includes(s);
      const refMatch = ref.includes(s);
      const introMatch = s.length > 3 && intro.includes(s);
      
      return titleMatch || refMatch || introMatch;
    });
    
    items.sort((a,b) => {
      const aStarts = normalizeText(a.titulo).startsWith(s);
      const bStarts = normalizeText(b.titulo).startsWith(s);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });
  }
  const container = document.getElementById('sermoesLista');
  if (items.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">✍️</div><div class="empty-title">Nenhum sermão encontrado</div><div class="empty-text">Crie um novo esboço usando o botão +</div></div>`;
    return;
  }
  container.innerHTML = items.map(s => `
    <div class="card" style="margin-bottom:var(--sp-3);cursor:pointer" onclick="showSermaoDetalhe(${s.id})">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--sp-2)">
        <div style="flex:1;min-width:0">
          <div style="font-size:var(--fs-sm);font-weight:700;color:var(--navy)">${s.titulo}</div>
          <div style="font-size:var(--fs-xs);color:var(--gold-dark);font-weight:600;margin-top:2px">${s.textoBase}</div>
        </div>
        ${s.favorito ? '<span style="color:var(--gold);font-size:1rem;flex-shrink:0;margin-left:var(--sp-2)">⭐</span>' : ''}
      </div>
      <div style="font-size:var(--fs-xs);color:var(--gray-500)">${new Date(s.dataCreacao + 'T00:00:00').toLocaleDateString('pt-BR')} · ${s.topicos.length} tópico${s.topicos.length !== 1 ? 's' : ''}</div>
    </div>
  `).join('');
}

function filterSermoes() { renderSermoes(document.getElementById('searchSermao').value); }

function showSermaoDetalhe(id) {
  const s = sermoesData.find(x => x.id === id);
  if (!s) return;
  document.getElementById('subHeaderTitle').textContent = 'Sermão';
  document.getElementById('sermaoDetalheContent').innerHTML = `
    <div style="margin-bottom:var(--sp-6)">
      <div style="font-size:var(--fs-xl);font-weight:800;color:var(--navy);margin-bottom:var(--sp-2);line-height:1.2">${s.titulo}</div>
      <div style="font-size:var(--fs-sm);color:var(--gold-dark);font-weight:600">${s.textoBase}</div>
      <div style="font-size:var(--fs-xs);color:var(--gray-500);margin-top:var(--sp-2)">${new Date(s.dataCreacao + 'T00:00:00').toLocaleDateString('pt-BR')}</div>
    </div>
    ${s.introducao ? `<div class="card" style="margin-bottom:var(--sp-5)"><div class="section-label" style="margin-bottom:var(--sp-3)">Introdução</div><div style="font-size:var(--fs-sm);color:var(--gray-700);line-height:1.75">${s.introducao}</div></div>` : ''}
    <div class="section-label">Tópicos do Sermão</div>
    ${s.topicos.map((t, i) => `<div class="sermon-topico"><div style="font-size:var(--fs-sm);font-weight:700;color:var(--navy);margin-bottom:var(--sp-2)">${i + 1}. ${t.titulo}</div><div style="font-size:var(--fs-sm);color:var(--gray-700);line-height:1.75">${t.conteudo}</div></div>`).join('')}
    ${s.conclusao ? `<div class="card" style="margin-top:var(--sp-4);margin-bottom:var(--sp-4)"><div class="section-label" style="margin-bottom:var(--sp-3)">Conclusão</div><div style="font-size:var(--fs-sm);color:var(--gray-700);line-height:1.75">${s.conclusao}</div></div>` : ''}
    ${s.referencias.length ? `<div class="section-label" style="margin-top:var(--sp-5)">Referências Bíblicas</div><div style="display:flex;flex-wrap:wrap;gap:var(--sp-2)">${s.referencias.map(r => `<span class="chip-ref">${r}</span>`).join('')}</div>` : ''}
  `;
  showScreen('sermao-detalhe');
}

function openAddSermao() { document.getElementById('modalSermao').classList.add('active'); }

function saveSermao(e) {
  e.preventDefault();
  sermoesData.push({
    id: sermoesData.length + 1,
    titulo: document.getElementById('sTitulo').value,
    textoBase: document.getElementById('sTexto').value || 'Sem referência',
    dataCreacao: new Date().toISOString().split('T')[0],
    introducao: document.getElementById('sIntro').value,
    topicos: [],
    conclusao: document.getElementById('sConclusao').value,
    referencias: [],
    favorito: false
  });
  renderSermoes();
  loadStats();
  closeModal('modalSermao');
  document.getElementById('formSermao').reset();
}

// === CERIMONIAL ===
function renderCerimonial(search = '') {
  let items = cerimonialData;
  if (search) {
    const s = normalizeText(search);
    items = items.filter(c => normalizeText(c.categoria).includes(s) || (s.length > 3 && normalizeText(c.descricao).includes(s)));
  }
  
  if (items.length === 0) {
    document.getElementById('cerimonialLista').innerHTML = `<div class="empty-state"><div class="empty-icon"><i data-lucide="search"></i></div><div class="empty-title">Nenhum cerimonial encontrado</div></div>`;
    lucide.createIcons();
    return;
  }
  
  document.getElementById('cerimonialLista').innerHTML = items.map(c => `
    <div class="premium-module-card" onclick="showCerimonialDetalhe(${c.id})">
      <div class="premium-module-icon" style="background:var(--surface-hover);color:var(--text-primary)">${c.icone}</div>
      <div class="premium-module-content">
        <div class="premium-module-title">${c.categoria}</div>
        <div class="premium-module-desc">${c.descricao}</div>
      </div>
      <span class="premium-module-arrow"><i data-lucide="chevron-right"></i></span>
    </div>
  `).join('');
  lucide.createIcons();
}

function filterCerimonial() { renderCerimonial(document.getElementById('searchCerimonial').value); }

function showCerimonialDetalhe(id) {
  const c = cerimonialData.find(x => x.id === id);
  if (!c) return;
  document.getElementById('subHeaderTitle').textContent = c.categoria;
  document.getElementById('cerimonialDetalheContent').innerHTML = `
    <div style="text-align:center;margin-bottom:var(--sp-6)">
      <div style="font-size:2.5rem;margin-bottom:var(--sp-3)">${c.icone}</div>
      <div style="font-size:var(--fs-lg);font-weight:800;color:var(--navy)">${c.categoria}</div>
      <div style="font-size:var(--fs-xs);color:var(--gray-500);margin-top:var(--sp-1)">${c.descricao}</div>
    </div>
    <div class="ceremonial-content">${c.roteiro}</div>
  `;
  showScreen('cerimonial-detalhe');
}

// === DICIONÁRIO ===
function renderDicionario(search = '') {
  const container = document.getElementById('dicionarioLista');
  if (!container) return;

  const s = normalizeText(search);
  let items = [...dicionarioData];

  if (s) {
    items = items.filter(d => {
      const t = normalizeText(d.termo);
      const def = normalizeText(d.definicao);
      return t.includes(s) || (s.length > 3 && def.includes(s));
    });

    items.sort((a, b) => {
      const ta = normalizeText(a.termo);
      const tb = normalizeText(b.termo);
      const aStarts = ta.startsWith(s);
      const bStarts = tb.startsWith(s);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return ta.localeCompare(tb);
    });
  }

  const groups = {};
  items.forEach(d => {
    const letter = d.termo[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(d);
  });

  let html = '';
  if (items.length === 0) {
    html = `
      <div class="empty-state">
        <div class="empty-icon"><i data-lucide="search"></i></div>
        <div class="empty-title">Nenhum termo encontrado</div>
        <div class="empty-text">Tente outra palavra na busca</div>
      </div>`;
  } else {
    Object.keys(groups).sort().forEach(letter => {
      html += `<div class="dict-letter">${letter}</div>`;
      groups[letter].forEach(d => {
        html += `
          <div class="premium-dict-entry" onclick="this.classList.toggle('expanded')">
            <div class="dict-term-wrap">
              <div class="dict-term">${d.termo}</div>
              <div class="dict-cat">${d.categoria}</div>
            </div>
            <div class="dict-def">${d.definicao}</div>
          </div>`;
      });
    });
  }
  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function filterDicionario() {
  const input = document.getElementById('searchDicionario');
  if (input) renderDicionario(input.value);
}

// =====================================================
// CADERNETA DIGITAL EBD
// =====================================================
let ebdData = null;
let ebdCurrentTab = 'chamada';
let ebdResumoDateIndex = 0;

function getEBDStorageKey() {
  return getUserStorageKey('ebdCaderneta');
}

function loadEBDFromStorage() {
  try {
    const saved = localStorage.getItem(getEBDStorageKey());
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validar estrutura básica
      if (parsed && parsed.nome && Array.isArray(parsed.alunos) && parsed.chamada && parsed.resumos) {
        return parsed;
      }
      console.warn('[EBD] Dados inválidos no localStorage, usando default');
      localStorage.removeItem(getEBDStorageKey());
    }
  } catch(e) {
    console.warn('[EBD] Erro ao carregar localStorage:', e);
  }
  return null;
}

function saveEBDToStorage() {
  if (!ebdData) return;
  try {
    localStorage.setItem(getEBDStorageKey(), JSON.stringify(ebdData));
  } catch(e) {}
}

function initEBD() {
  console.log('[EBD] initEBD chamado');
  try {
    ebdData = loadEBDFromStorage();
    console.log('[EBD] Dados do localStorage:', ebdData ? 'encontrados' : 'não encontrados');
    if (!ebdData) {
      ebdData = JSON.parse(JSON.stringify(ebdClasseDefault));
      saveEBDToStorage();
      console.log('[EBD] Usando dados default');
    }
    renderEBDCaderneta();
    console.log('[EBD] renderEBDCaderneta concluído');
  } catch(e) {
    console.error('[EBD] Erro ao inicializar EBD:', e);
    // Fallback: usar dados default
    ebdData = JSON.parse(JSON.stringify(ebdClasseDefault));
    try { renderEBDCaderneta(); } catch(e2) { console.error('[EBD] Erro ao renderizar EBD:', e2); }
  }
}

function renderEBDCaderneta() {
  if (!ebdData) {
    ebdData = JSON.parse(JSON.stringify(ebdClasseDefault));
  }
  // Hero
  const nomeEl = document.getElementById('ebdClasseNome');
  const metaEl = document.getElementById('ebdClasseMeta');
  if (nomeEl) nomeEl.textContent = ebdData.nome;
  if (metaEl) metaEl.textContent = ebdData.tipo + ' · ' + ebdData.trimestre + '° Trimestre · ' + ebdData.ano;
  // Trimestre chips
  renderEBDTrimestreChips();
  // Render active tab
  renderEBDActiveTab();
  // Refresh icons
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderEBDTrimestreChips() {
  const container = document.getElementById('ebdTrimestreChips');
  container.innerHTML = [1,2,3,4].map(t => `
    <button class="ebd-tri-chip ${ebdData.trimestre === t ? 'active' : ''}" onclick="changeEBDTrimestre(${t})">${t}° Tri</button>
  `).join('');
}

function changeEBDTrimestre(t) {
  ebdData.trimestre = t;
  saveEBDToStorage();
  renderEBDCaderneta();
}

function switchEBDTab(el, tab) {
  ebdCurrentTab = tab;
  document.querySelectorAll('.ebd-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.ebd-tab-content').forEach(c => c.classList.remove('active'));
  renderEBDActiveTab();
}

function renderEBDActiveTab() {
  document.querySelectorAll('.ebd-tab-content').forEach(c => c.classList.remove('active'));
  if (ebdCurrentTab === 'chamada') {
    document.getElementById('ebdTabChamada').classList.add('active');
    renderEBDChamada();
  } else if (ebdCurrentTab === 'alunos') {
    document.getElementById('ebdTabAlunos').classList.add('active');
    renderEBDAlunos();
  } else {
    document.getElementById('ebdTabResumo').classList.add('active');
    renderEBDResumo();
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ===== CHAMADA =====
function getEBDDomingos() {
  return gerarDomingosTrimestre(ebdData.trimestre, ebdData.ano);
}

function getInitials(nome) {
  return nome.split(' ').filter(p => p.length > 1).slice(0, 2).map(p => p[0]).join('').toUpperCase();
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return { dia: d.getDate(), mes: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '') };
}

function renderEBDChamada() {
  const container = document.getElementById('ebdTabChamada');
  const domingos = getEBDDomingos();
  const alunos = ebdData.alunos || [];

  // Garante que há entradas de chamada para os domingos
  domingos.forEach(d => {
    if (!ebdData.chamada[d]) ebdData.chamada[d] = {};
  });

  if (alunos.length === 0) {
    container.innerHTML = `
      <div class="ebd-empty">
        <div class="ebd-empty-icon">👥</div>
        <div class="ebd-empty-text">Nenhum aluno cadastrado.<br>Vá na aba "Alunos" para adicionar.</div>
      </div>`;
    return;
  }

  // Header de datas
  let headerCells = domingos.map(d => {
    const f = formatDateShort(d);
    return `<div class="ebd-grid-cell"><span class="ebd-date-day">${f.dia}</span><span>${f.mes}</span></div>`;
  }).join('');

  // Linhas de alunos
  let rows = alunos.map(a => {
    const cells = domingos.map(d => {
      const status = (ebdData.chamada[d] && ebdData.chamada[d][a.id]) || '';
      let cls = '';
      let label = '·';
      if (status === 'P') { cls = 'present'; label = '✓'; }
      else if (status === 'A') { cls = 'absent'; label = '✗'; }
      return `<div class="ebd-grid-cell"><button class="ebd-p-btn ${cls}" onclick="toggleEBDPresenca(${a.id},'${d}')" aria-label="Marcar presença">${label}</button></div>`;
    }).join('');
    return `
      <div class="ebd-grid-row">
        <div class="ebd-grid-name">
          <div class="ebd-mini-avatar">${getInitials(a.nome)}</div>
          <span class="ebd-student-name-text">${a.nome.split(' ')[0]}</span>
        </div>
        ${cells}
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="ebd-chamada-header">
      <span class="ebd-chamada-title">${domingos.length} domingos · ${alunos.length} alunos</span>
      <button class="ebd-chamada-add-btn" onclick="openModal('modalEBDData')"><i data-lucide="plus"></i> Data</button>
    </div>
    <div class="ebd-grid-wrapper">
      <div class="ebd-grid-scroll">
        <div class="ebd-grid">
          <div class="ebd-grid-row ebd-grid-header">
            <div class="ebd-grid-name">Aluno</div>
            ${headerCells}
          </div>
          ${rows}
        </div>
      </div>
    </div>`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function toggleEBDPresenca(alunoId, dateStr) {
  if (!ebdData.chamada[dateStr]) ebdData.chamada[dateStr] = {};
  const current = ebdData.chamada[dateStr][alunoId] || '';
  if (current === '') ebdData.chamada[dateStr][alunoId] = 'P';
  else if (current === 'P') ebdData.chamada[dateStr][alunoId] = 'A';
  else ebdData.chamada[dateStr][alunoId] = '';
  saveEBDToStorage();
  renderEBDChamada();
}

// ===== ALUNOS =====
function renderEBDAlunos() {
  const container = document.getElementById('ebdTabAlunos');
  const alunos = ebdData.alunos || [];
  const domingos = getEBDDomingos();

  let list = alunos.map(a => {
    // Calcular frequência
    let presencas = 0, total = 0;
    domingos.forEach(d => {
      if (ebdData.chamada[d] && ebdData.chamada[d][a.id]) {
        total++;
        if (ebdData.chamada[d][a.id] === 'P') presencas++;
      }
    });
    const pct = total > 0 ? Math.round((presencas / total) * 100) : 0;

    return `
      <div class="ebd-aluno-card">
        <div class="ebd-aluno-avatar">${getInitials(a.nome)}</div>
        <div class="ebd-aluno-info">
          <div class="ebd-aluno-name">${a.nome}</div>
          <div class="ebd-aluno-freq">${total > 0 ? `${presencas}/${total} presenças (${pct}%)` : 'Sem registros'}</div>
        </div>
        <div class="ebd-aluno-actions">
          <button class="ebd-aluno-action-btn edit" onclick="openEditEBDAluno(${a.id})" aria-label="Editar"><i data-lucide="pencil"></i></button>
          <button class="ebd-aluno-action-btn delete" onclick="removeEBDAluno(${a.id})" aria-label="Remover"><i data-lucide="trash-2"></i></button>
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="ebd-alunos-header">
      <span class="ebd-alunos-count">${alunos.length} aluno${alunos.length !== 1 ? 's' : ''} matriculado${alunos.length !== 1 ? 's' : ''}</span>
      <button class="ebd-add-aluno-btn" onclick="openAddEBDAluno()"><i data-lucide="user-plus"></i> Novo Aluno</button>
    </div>
    ${alunos.length === 0 ? `
      <div class="ebd-empty">
        <div class="ebd-empty-icon">📋</div>
        <div class="ebd-empty-text">Nenhum aluno na classe.<br>Toque em "Novo Aluno" para começar.</div>
      </div>` : list}`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function openAddEBDAluno() {
  document.getElementById('ebdAlunoEditId').value = '';
  document.getElementById('ebdAlunoNome').value = '';
  document.getElementById('ebdAlunoModalTitle').textContent = '➕ Novo Aluno';
  openModal('modalEBDAluno');
}

function openEditEBDAluno(id) {
  const a = ebdData.alunos.find(x => x.id === id);
  if (!a) return;
  document.getElementById('ebdAlunoEditId').value = id;
  document.getElementById('ebdAlunoNome').value = a.nome;
  document.getElementById('ebdAlunoModalTitle').textContent = '✏️ Editar Aluno';
  openModal('modalEBDAluno');
}

function saveEBDAluno(e) {
  e.preventDefault();
  const editId = document.getElementById('ebdAlunoEditId').value;
  const nome = document.getElementById('ebdAlunoNome').value.trim();
  if (!nome) return;

  if (editId) {
    const a = ebdData.alunos.find(x => x.id === parseInt(editId));
    if (a) a.nome = nome;
  } else {
    const maxId = ebdData.alunos.reduce((max, a) => Math.max(max, a.id), 0);
    ebdData.alunos.push({ id: maxId + 1, nome });
  }
  saveEBDToStorage();
  closeModal('modalEBDAluno');
  renderEBDActiveTab();
  loadStats();
  showToast(editId ? 'Aluno atualizado!' : 'Aluno adicionado!');
}

function removeEBDAluno(id) {
  if (!confirm('Remover este aluno da classe?')) return;
  ebdData.alunos = ebdData.alunos.filter(a => a.id !== id);
  // Limpar chamadas deste aluno
  Object.keys(ebdData.chamada).forEach(d => {
    if (ebdData.chamada[d][id]) delete ebdData.chamada[d][id];
  });
  saveEBDToStorage();
  renderEBDActiveTab();
  loadStats();
  showToast('Aluno removido', 'danger');
}

// ===== RESUMO =====
function renderEBDResumo() {
  const container = document.getElementById('ebdTabResumo');
  const domingos = getEBDDomingos();
  
  // Filtrar domingos que têm chamada registrada
  const domingosComChamada = domingos.filter(d => {
    const ch = ebdData.chamada[d];
    return ch && Object.keys(ch).length > 0;
  });

  if (domingosComChamada.length === 0) {
    container.innerHTML = `
      <div class="ebd-empty">
        <div class="ebd-empty-icon">📊</div>
        <div class="ebd-empty-text">Nenhuma chamada registrada neste trimestre.<br>Faça a chamada primeiro na aba "Chamada".</div>
      </div>`;
    return;
  }

  // Limitar index
  if (ebdResumoDateIndex >= domingosComChamada.length) ebdResumoDateIndex = domingosComChamada.length - 1;
  if (ebdResumoDateIndex < 0) ebdResumoDateIndex = 0;

  const dateKey = domingosComChamada[ebdResumoDateIndex];
  const chamadaDia = ebdData.chamada[dateKey] || {};
  const resumoDia = ebdData.resumos[dateKey] || {};

  const matriculados = ebdData.alunos.length;
  const presentes = Object.values(chamadaDia).filter(v => v === 'P').length;
  const ausentes = Object.values(chamadaDia).filter(v => v === 'A').length;
  const visitantes = resumoDia.visitantes || 0;
  const biblias = resumoDia.biblias || 0;
  const revistas = resumoDia.revistas || 0;
  const ofertas = resumoDia.ofertas || 'R$ 0,00';

  const dateFormatted = new Date(dateKey + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  container.innerHTML = `
    <div class="ebd-resumo-date-selector">
      <button class="ebd-resumo-nav-btn" onclick="navEBDResumo(-1)" ${ebdResumoDateIndex <= 0 ? 'disabled style="opacity:0.3"' : ''}><i data-lucide="chevron-left"></i></button>
      <span class="ebd-resumo-date-label">${dateFormatted}</span>
      <button class="ebd-resumo-nav-btn" onclick="navEBDResumo(1)" ${ebdResumoDateIndex >= domingosComChamada.length - 1 ? 'disabled style="opacity:0.3"' : ''}><i data-lucide="chevron-right"></i></button>
    </div>

    <div class="ebd-resumo-grid">
      <div class="ebd-resumo-card">
        <div class="ebd-resumo-card-icon">👥</div>
        <div class="ebd-resumo-card-value">${matriculados}</div>
        <div class="ebd-resumo-card-label">Matriculados</div>
      </div>
      <div class="ebd-resumo-card highlight">
        <div class="ebd-resumo-card-icon">✅</div>
        <div class="ebd-resumo-card-value">${presentes}</div>
        <div class="ebd-resumo-card-label">Presentes</div>
      </div>
      <div class="ebd-resumo-card warn">
        <div class="ebd-resumo-card-icon">❌</div>
        <div class="ebd-resumo-card-value">${ausentes}</div>
        <div class="ebd-resumo-card-label">Ausentes</div>
      </div>
      <div class="ebd-resumo-card">
        <div class="ebd-resumo-card-icon">🙋</div>
        <div class="ebd-resumo-card-value">${visitantes}</div>
        <div class="ebd-resumo-card-label">Visitantes</div>
      </div>
      <div class="ebd-resumo-card">
        <div class="ebd-resumo-card-icon">📖</div>
        <div class="ebd-resumo-card-value">${biblias}</div>
        <div class="ebd-resumo-card-label">Bíblias</div>
      </div>
      <div class="ebd-resumo-card">
        <div class="ebd-resumo-card-icon">📕</div>
        <div class="ebd-resumo-card-value">${revistas}</div>
        <div class="ebd-resumo-card-label">Revistas</div>
      </div>
    </div>
    
    <div class="ebd-resumo-card" style="margin-bottom:var(--sp-4)">
      <div class="ebd-resumo-card-icon">💰</div>
      <div class="ebd-resumo-card-value">${ofertas}</div>
      <div class="ebd-resumo-card-label">Ofertas do dia</div>
    </div>

    <button class="ebd-resumo-edit-btn" onclick="openEBDResumoEdit('${dateKey}')">
      <i data-lucide="edit-3"></i> Editar dados do dia
    </button>`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function navEBDResumo(dir) {
  ebdResumoDateIndex += dir;
  renderEBDResumo();
}

// ===== MODAIS =====
function openEBDConfig() {
  document.getElementById('ebdConfigNome').value = ebdData.nome;
  document.getElementById('ebdConfigTipo').value = ebdData.tipo;
  document.getElementById('ebdConfigAno').value = ebdData.ano;
  openModal('modalEBDConfig');
}

function saveEBDConfig(e) {
  e.preventDefault();
  ebdData.nome = document.getElementById('ebdConfigNome').value.trim();
  ebdData.tipo = document.getElementById('ebdConfigTipo').value;
  ebdData.ano = parseInt(document.getElementById('ebdConfigAno').value);
  saveEBDToStorage();
  closeModal('modalEBDConfig');
  renderEBDCaderneta();
  showToast('Classe atualizada!');
}

function saveEBDData(e) {
  e.preventDefault();
  const data = document.getElementById('ebdNovaData').value;
  if (!data) return;
  if (!ebdData.chamada[data]) {
    ebdData.chamada[data] = {};
    saveEBDToStorage();
    renderEBDChamada();
    showToast('Data adicionada!');
  } else {
    showToast('Essa data já existe', 'danger');
  }
  closeModal('modalEBDData');
  document.getElementById('formEBDData').reset();
}

function openEBDResumoEdit(dateKey) {
  const resumo = ebdData.resumos[dateKey] || {};
  document.getElementById('ebdResumoDataKey').value = dateKey;
  document.getElementById('ebdResumoVisitantes').value = resumo.visitantes || 0;
  document.getElementById('ebdResumoBiblias').value = resumo.biblias || 0;
  document.getElementById('ebdResumoRevistas').value = resumo.revistas || 0;
  document.getElementById('ebdResumoOfertas').value = resumo.ofertas || '';
  const dateFormatted = new Date(dateKey + 'T12:00:00').toLocaleDateString('pt-BR');
  document.getElementById('ebdResumoModalTitle').textContent = `📊 Resumo — ${dateFormatted}`;
  openModal('modalEBDResumo');
}

function saveEBDResumoData(e) {
  e.preventDefault();
  const dateKey = document.getElementById('ebdResumoDataKey').value;
  ebdData.resumos[dateKey] = {
    visitantes: parseInt(document.getElementById('ebdResumoVisitantes').value) || 0,
    biblias: parseInt(document.getElementById('ebdResumoBiblias').value) || 0,
    revistas: parseInt(document.getElementById('ebdResumoRevistas').value) || 0,
    ofertas: document.getElementById('ebdResumoOfertas').value || 'R$ 0,00'
  };
  saveEBDToStorage();
  closeModal('modalEBDResumo');
  renderEBDResumo();
  showToast('Resumo salvo!');
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

// === HARPA ===
const HARPA_AUDIO_BASE = 'https://harpa.nyc3.digitaloceanspaces.com/';
let currentHarpaTab = 'todos';
let currentHarpaHino = null;
let harpaIsPlaying = false;

// Mapeamento de URLs de áudio dos hinos
// NOTA: Estas são URLs de exemplo. Substitua por links reais de MP3 dos hinos.
// Formato sugerido: número do hino com 3 dígitos + .mp3
function getHarpaAudioUrl(numero) {
  const num = String(numero).padStart(3, '0');
  return `${HARPA_AUDIO_BASE}${num}.mp3`;
}

function getHarpaFavoritos() {
  try { return JSON.parse(localStorage.getItem(getUserStorageKey('harpaFav')) || '[]'); }
  catch { return []; }
}

function isHarpaFavorito(numero) {
  return getHarpaFavoritos().includes(numero);
}

function toggleHarpaFavorito(numero, e) {
  if (e) e.stopPropagation();
  let favs = getHarpaFavoritos();
  if (favs.includes(numero)) {
    favs = favs.filter(n => n !== numero);
    showToast('Removido dos favoritos');
  } else {
    favs.push(numero);
    showToast('Adicionado aos favoritos ⭐');
  }
  localStorage.setItem(getUserStorageKey('harpaFav'), JSON.stringify(favs));
  renderHarpa();
  // Atualiza botão de favorito no detalhe se estiver aberto
  const favBtn = document.getElementById('harpaFavBtn');
  if (favBtn) {
    const isFav = favs.includes(numero);
    favBtn.className = 'hymn-action-btn' + (isFav ? ' fav-active' : '');
    favBtn.innerHTML = (isFav ? '❤️' : '🤍') + ' Favorito';
  }
}

function showHarpaTab(tab, el) {
  currentHarpaTab = tab;
  document.querySelectorAll('#harpaTabs .tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  renderHarpa();
}

function renderHarpa(search = '') {
  let items = hinosHarpa;
  const favs = getHarpaFavoritos();

  if (currentHarpaTab === 'favoritos') {
    items = items.filter(h => favs.includes(h.numero));
  }

  if (search) {
    const s = normalizeText(search);
    items = items.filter(h => {
      const t = normalizeText(h.titulo);
      const n = h.numero.toString();
      const cat = normalizeText(h.categoria);
      
      const numMatch = n === search || n.startsWith(search);
      const titleMatch = t.includes(s);
      const catMatch = s.length > 3 && cat.includes(s);
      
      return numMatch || titleMatch || catMatch;
    });

    // Ordenar: Número exato > Título que começa com > Resto
    items.sort((a, b) => {
      if (a.numero.toString() === search) return -1;
      if (b.numero.toString() === search) return 1;
      
      const aStarts = normalizeText(a.titulo).startsWith(s);
      const bStarts = normalizeText(b.titulo).startsWith(s);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });
  }

  const container = document.getElementById('harpaLista');

  if (items.length === 0) {
    if (currentHarpaTab === 'favoritos') {
      container.innerHTML = `<div class="empty-state"><div class="empty-icon">⭐</div><div class="empty-title">Sem favoritos ainda</div><div class="empty-text">Toque no coração de um hino para adicioná-lo aqui</div></div>`;
    } else {
      container.innerHTML = `<div class="empty-state"><div class="empty-icon">🎵</div><div class="empty-title">Nenhum hino encontrado</div><div class="empty-text">Tente outro número ou título</div></div>`;
    }
    return;
  }

  container.innerHTML = items.map(h => {
    const isFav = favs.includes(h.numero);
    const isCurrentPlaying = currentHarpaHino && currentHarpaHino.numero === h.numero && harpaIsPlaying;
    return `
    <div class="list-item" onclick="showHarpaDetalhe(${h.numero})">
      <div class="hymn-number" ${isCurrentPlaying ? 'style="background:var(--navy);color:#fff"' : ''}>${isCurrentPlaying ? '♪' : h.numero}</div>
      <div class="list-item-content">
        <div class="list-item-title">${h.titulo}</div>
        <div class="list-item-sub">${h.categoria}</div>
      </div>
      <button class="hymn-fav-btn" onclick="toggleHarpaFavorito(${h.numero},event)">${isFav ? '❤️' : '🤍'}</button>
      <span class="list-item-arrow">→</span>
    </div>`;
  }).join('');
}

function filterHarpa() { renderHarpa(document.getElementById('searchHarpa').value); }

function showHarpaDetalhe(numero) {
  const h = hinosHarpa.find(x => x.numero === numero);
  if (!h) return;
  const isFav = isHarpaFavorito(numero);
  const isCurrentPlaying = currentHarpaHino && currentHarpaHino.numero === numero && harpaIsPlaying;

  document.getElementById('subHeaderTitle').textContent = 'Hino ' + h.numero;
  document.getElementById('harpaDetalheContent').innerHTML = `
    <div class="hymn-detail-header">
      <div class="hymn-detail-number">${h.numero}</div>
      <div class="hymn-detail-title">${h.titulo}</div>
      <div class="hymn-detail-cat">${h.categoria}</div>
      <div class="hymn-detail-actions">
        <button class="hymn-action-btn ${isFav ? 'fav-active' : ''}" id="harpaFavBtn" onclick="toggleHarpaFavorito(${h.numero})">
          ${isFav ? '❤️' : '🤍'} Favorito
        </button>
      </div>
    </div>

    <div class="hymn-play-card" onclick="playHarpaHino(${h.numero})">
      <div class="hymn-play-icon">${isCurrentPlaying ? '⏸' : '▶'}</div>
      <div class="hymn-play-text">
        <div class="hymn-play-label">${isCurrentPlaying ? 'Tocando agora' : 'Ouvir este hino'}</div>
        <div class="hymn-play-sub">Hino ${h.numero} — ${h.titulo}</div>
      </div>
    </div>

    <div class="section-label">Letra do Hino</div>
    <div class="hymn-letra-card">
      <div class="hymn-letra">${h.letra}</div>
    </div>
  `;
  showScreen('harpa-detalhe');
}

function reopenHarpaDetalhe() {
  if (currentHarpaHino) {
    showHarpaDetalhe(currentHarpaHino.numero);
  }
}

// === HARPA AUDIO PLAYER ===
function playHarpaHino(numero) {
  const h = hinosHarpa.find(x => x.numero === numero);
  if (!h) return;

  const audio = document.getElementById('harpaAudio');
  const floatingPlayer = document.getElementById('harpaFloatingPlayer');

  // Se já está tocando o mesmo hino, toggle pause
  if (currentHarpaHino && currentHarpaHino.numero === numero) {
    toggleHarpaPlay();
    return;
  }

  currentHarpaHino = h;
  const url = getHarpaAudioUrl(numero);

  // Reset UI
  harpaIsPlaying = false;
  document.getElementById('hfpPlayBtn').textContent = '⏳';
  document.getElementById('hfpProgressBar').style.width = '0%';
  document.getElementById('hfpCurrentTime').textContent = '0:00';
  document.getElementById('hfpDuration').textContent = 'Carregando...';
  document.getElementById('hfpTitle').textContent = h.titulo;
  document.getElementById('hfpSub').textContent = 'Hino ' + h.numero + ' — ' + h.categoria;

  // Show floating player
  floatingPlayer.style.display = 'block';

  // Set source
  audio.src = url;
  audio.volume = document.getElementById('hfpVolume').value / 100;
  audio.load();

  // Events
  audio.onloadedmetadata = function() {
    document.getElementById('hfpDuration').textContent = formatHarpaTime(audio.duration);
  };

  audio.ontimeupdate = function() {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      document.getElementById('hfpProgressBar').style.width = pct + '%';
      document.getElementById('hfpCurrentTime').textContent = formatHarpaTime(audio.currentTime);
    }
  };

  audio.onended = function() {
    harpaIsPlaying = false;
    document.getElementById('hfpPlayBtn').textContent = '▶';
    // Auto-avançar para próximo hino
    const idx = hinosHarpa.findIndex(x => x.numero === numero);
    if (idx >= 0 && idx < hinosHarpa.length - 1) {
      setTimeout(() => playHarpaHino(hinosHarpa[idx + 1].numero), 1500);
    }
    renderHarpa();
  };

  audio.onerror = function() {
    document.getElementById('hfpDuration').textContent = '--:--';
    document.getElementById('hfpPlayBtn').textContent = '▶';
    showToast('Áudio indisponível para o hino ' + numero, 'danger');
  };

  // Auto-play
  audio.play().then(() => {
    harpaIsPlaying = true;
    document.getElementById('hfpPlayBtn').textContent = '⏸';
    renderHarpa();
    // Refresh detalhe se estiver aberto
    if (currentScreen === 'harpa-detalhe') showHarpaDetalhe(numero);
  }).catch(() => {
    document.getElementById('hfpPlayBtn').textContent = '▶';
    showToast('Toque no play para iniciar', '');
  });
}

function playNextHarpa() {
  if (!currentHarpaHino) return;
  const idx = hinosHarpa.findIndex(x => x.numero === currentHarpaHino.numero);
  if (idx >= 0 && idx < hinosHarpa.length - 1) {
    const next = hinosHarpa[idx + 1];
    playHarpaHino(next.numero);
    if (currentScreen === 'harpa-detalhe') showHarpaDetalhe(next.numero);
  } else {
    showToast('Último hino da lista', '');
  }
}

function playPrevHarpa() {
  if (!currentHarpaHino) return;
  const idx = hinosHarpa.findIndex(x => x.numero === currentHarpaHino.numero);
  if (idx > 0) {
    const prev = hinosHarpa[idx - 1];
    playHarpaHino(prev.numero);
    if (currentScreen === 'harpa-detalhe') showHarpaDetalhe(prev.numero);
  } else {
    showToast('Primeiro hino da lista', '');
  }
}

function toggleHarpaPlay() {
  const audio = document.getElementById('harpaAudio');
  if (!audio.src || !currentHarpaHino) return;

  if (harpaIsPlaying) {
    audio.pause();
    harpaIsPlaying = false;
    document.getElementById('hfpPlayBtn').textContent = '▶';
  } else {
    audio.play().then(() => {
      harpaIsPlaying = true;
      document.getElementById('hfpPlayBtn').textContent = '⏸';
    }).catch(() => {
      showToast('Não foi possível reproduzir', 'danger');
    });
  }
  renderHarpa();
}

function seekHarpaAudio(event) {
  const audio = document.getElementById('harpaAudio');
  if (!audio.duration) return;
  const wrap = document.getElementById('hfpProgressWrap');
  const rect = wrap.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  audio.currentTime = pct * audio.duration;
}

function setHarpaVolume(val) {
  const audio = document.getElementById('harpaAudio');
  audio.volume = val / 100;
  const icon = document.querySelector('.hfp-vol-icon');
  if (val == 0) icon.textContent = '🔇';
  else if (val < 50) icon.textContent = '🔉';
  else icon.textContent = '🔊';
}

function toggleHarpaMute() {
  const audio = document.getElementById('harpaAudio');
  const slider = document.getElementById('hfpVolume');
  const icon = document.querySelector('.hfp-vol-icon');
  if (audio.volume > 0) {
    audio._prevVolume = audio.volume;
    audio.volume = 0;
    slider.value = 0;
    icon.textContent = '🔇';
  } else {
    audio.volume = audio._prevVolume || 0.8;
    slider.value = Math.round(audio.volume * 100);
    icon.textContent = '🔊';
  }
}

function formatHarpaTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function closeHarpaPlayer() {
  const audio = document.getElementById('harpaAudio');
  const floatingPlayer = document.getElementById('harpaFloatingPlayer');
  // Para o áudio
  audio.pause();
  audio.currentTime = 0;
  audio.src = '';
  // Reseta estado
  harpaIsPlaying = false;
  currentHarpaHino = null;
  // Esconde o player com animação
  floatingPlayer.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  floatingPlayer.style.opacity = '0';
  floatingPlayer.style.transform = 'translateY(20px)';
  setTimeout(() => {
    floatingPlayer.style.display = 'none';
    floatingPlayer.style.opacity = '';
    floatingPlayer.style.transform = '';
    floatingPlayer.style.transition = '';
  }, 250);
  // Atualiza lista se estiver visível
  renderHarpa();
}

// === SERMÃO TABS ===
function showSermaoTab(tab, el) {
  document.querySelectorAll('#sermaoTabs .tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  ['meus','ia','salvos'].forEach(t => {
    const container = document.getElementById('sermaoTab-' + t);
    if (container) container.style.display = t === tab ? 'block' : 'none';
  });
  if (tab === 'salvos') renderEsbocosSalvos();
}

// === ASSISTENTE IA PARA SERMÃO ===
let iaObjetivoSelecionado = 'Consolo';

function selectObjetivo(el, objetivo) {
  iaObjetivoSelecionado = objetivo;
  document.querySelectorAll('.ia-obj-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

function selectDuracao(el, minutos) {
  iaDuracaoSelecionada = minutos;
  document.querySelectorAll('.ia-duration-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

function getEsbocosStorage() {
  try { return JSON.parse(localStorage.getItem(getUserStorageKey('esbocos')) || '[]'); }
  catch { return []; }
}

function saveEsbocoStorage(esboco) {
  const esbocos = getEsbocosStorage();
  esboco.id = Date.now();
  esboco.dataCriacao = new Date().toISOString();
  esbocos.unshift(esboco);
  localStorage.setItem(getUserStorageKey('esbocos'), JSON.stringify(esbocos));
  return esboco;
}

function deleteEsbocoStorage(id) {
  let esbocos = getEsbocosStorage();
  esbocos = esbocos.filter(e => e.id !== id);
  localStorage.setItem(getUserStorageKey('esbocos'), JSON.stringify(esbocos));
}

// Simulação inteligente de IA
function gerarEsbocoIA() {
  const btn = document.getElementById('btnGerarIA');
  if (!btn) return;

  const temaRaw = document.getElementById('iaTema').value.trim();
  const versiculoRaw = document.getElementById('iaVersiculo').value.trim();
  
  // Sanitização básica para evitar quebra de template strings
  const tema = temaRaw.replace(/`/g, "'");
  const versiculo = versiculoRaw.replace(/`/g, "'");

  if (!tema) {
    showToast('Digite o tema da pregação', 'danger');
    document.getElementById('iaTema').focus();
    return;
  }

  // Verificar limite freemium
  if (!canGenerateIA()) {
    openPremiumModal();
    showToast('Limite de gerações atingido. Faça upgrade!', 'danger');
    return;
  }
  
  btn.disabled = true;
  btn.innerHTML = '<span class="ia-btn-icon ia-loading">⏳</span><span class="ia-btn-text">Gerando esboço...</span>';
  
  // Simular delay de IA
  setTimeout(() => {
    try {
      const objetivo = typeof iaObjetivoSelecionado !== 'undefined' ? iaObjetivoSelecionado : 'Consolo';
      const duracao = typeof iaDuracaoSelecionada !== 'undefined' ? iaDuracaoSelecionada : 40;
      const gerarPerguntas = document.getElementById('iaGerarPerguntas') ? document.getElementById('iaGerarPerguntas').checked : false;

      const esboco = gerarEsbocoSimulado(tema, versiculo, objetivo, duracao, gerarPerguntas);
      renderEsbocoGerado(esboco);
      
      incrementIAUsage();
      updateIAUsageBar();
      showToast('✨ Esboço gerado com sucesso!', 'success');
    } catch (err) {
      console.error('Erro ao gerar esboço:', err);
      showToast('Erro ao gerar esboço. Verifique os campos e tente novamente.', 'danger');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<span class="ia-btn-icon"><i data-lucide="sparkles"></i></span><span class="ia-btn-text">Gerar Esboço com IA</span>';
      }
      // O lucide-watcher cuidará dos ícones novos, mas chamamos por segurança se necessário
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  }, 1500 + Math.random() * 1000);
}


function gerarEsbocoSimulado(tema, versiculo, objetivo, duracao, gerarPerguntas) {
  const temaLower = tema.toLowerCase();
  
  // Banco de referências bíblicas por tema
  const refsPorTema = {
    'fé': ['Hebreus 11:1','Hebreus 11:6','Marcos 11:22-24','Romanos 10:17','2 Coríntios 5:7','Mateus 17:20','Tiago 2:17','Gálatas 2:20'],
    'amor': ['1 Coríntios 13:4-8','João 3:16','Romanos 5:8','1 João 4:8','1 João 4:19','Efésios 5:25','Mateus 22:37-39','Gálatas 5:22'],
    'esperança': ['Romanos 15:13','Jeremias 29:11','Romanos 8:28','Salmos 42:5','Hebreus 6:19','1 Pedro 1:3','Lamentações 3:22-23','Isaías 40:31'],
    'perdão': ['Efésios 4:32','Colossenses 3:13','Mateus 6:14-15','Mateus 18:21-22','1 João 1:9','Salmos 103:12','Isaías 43:25','Lucas 23:34'],
    'oração': ['Filipenses 4:6-7','1 Tessalonicenses 5:17','Mateus 7:7-8','Tiago 5:16','Lucas 18:1','Marcos 11:24','João 14:13-14','Salmos 145:18'],
    'graça': ['Efésios 2:8-9','2 Coríntios 12:9','Romanos 6:14','Tito 2:11','João 1:16','Romanos 3:24','2 Timóteo 1:9','Hebreus 4:16'],
    'cura': ['Isaías 53:5','Tiago 5:14-15','Salmos 103:3','Jeremias 30:17','3 João 1:2','Mateus 9:35','Marcos 16:18','Êxodo 15:26'],
    'paz': ['João 14:27','Filipenses 4:6-7','Isaías 26:3','Romanos 5:1','Colossenses 3:15','Salmos 29:11','2 Tessalonicenses 3:16','Números 6:26'],
    'família': ['Josué 24:15','Provérbios 22:6','Efésios 6:1-4','Salmos 127:3','Deuteronômio 6:6-7','Colossenses 3:18-21','Gênesis 2:24','Salmos 128:1-4'],
    'força': ['Isaías 40:31','Filipenses 4:13','2 Coríntios 12:10','Salmos 46:1','Efésios 6:10','Deuteronômio 31:6','Josué 1:9','Neemias 8:10'],
    'salvação': ['Romanos 10:9-10','Efésios 2:8-9','João 3:16','Atos 4:12','2 Coríntios 5:17','Tito 3:5','Romanos 6:23','João 14:6'],
    'santidade': ['1 Pedro 1:15-16','Hebreus 12:14','1 Tessalonicenses 4:3','Romanos 12:1-2','Levítico 20:26','2 Coríntios 7:1','Efésios 5:27','Salmos 51:10'],
    'servo': ['Marcos 10:45','Filipenses 2:5-8','Mateus 20:26-28','João 13:14-15','Gálatas 5:13','1 Pedro 4:10','Colossenses 3:23-24','Romanos 12:11'],
    'vitória': ['1 Coríntios 15:57','Romanos 8:37','1 João 5:4','2 Coríntios 2:14','Deuteronômio 20:4','Josué 1:9','Salmos 20:7','Apocalipse 12:11'],
    'avivamento': ['2 Crônicas 7:14','Habacuque 3:2','Salmos 85:6','Atos 2:1-4','Oséias 6:1-3','Isaías 44:3','Ezequiel 37:1-14','Joel 2:28-29']
  };
  
  // Encontrar referências relevantes
  let refs = ['Salmos 119:105','Provérbios 3:5-6','Romanos 8:28','Filipenses 4:13','Isaías 41:10'];
  for (const [key, value] of Object.entries(refsPorTema)) {
    if (temaLower.includes(key)) {
      refs = value;
      break;
    }
  }
  
  if (versiculo && !refs.includes(versiculo)) {
    refs = [versiculo, ...refs.slice(0, 5)];
  }
  
  // Gerar conteúdo baseado no objetivo
  const conteudosPorObjetivo = {
    'Consolo': {
      intro: `Em tempos de dificuldade, o tema "${tema}" nos lembra que Deus é nosso refúgio e fortaleza. Nesta mensagem, vamos explorar como a Palavra de Deus traz consolo real para corações aflitos, restaurando a esperança e a paz interior.`,
      p1: { titulo: 'Deus conhece a sua dor', conteudo: `O Senhor não é indiferente ao nosso sofrimento. Ele se compadece de nós e nos convida a lançar sobre Ele toda a nossa ansiedade, porque Ele tem cuidado de nós (1 Pedro 5:7). Quando pensamos em "${tema}", precisamos lembrar que o Deus que enxuga lágrimas está ao nosso lado.` },
      p2: { titulo: 'A Palavra como bálsamo para a alma', conteudo: `As Escrituras nos oferecem promessas que são verdadeiro bálsamo: "${refs[0]}" nos mostra que há esperança mesmo nos momentos mais escuros. O consolo divino não elimina a dor, mas nos dá forças para atravessá-la com graça e fé.` },
      p3: { titulo: 'Transformando dor em testemunho', conteudo: `Paulo nos ensina que o Deus de toda consolação nos consola em todas as nossas tribulações, para que possamos consolar os que estiverem em qualquer tribulação (2 Coríntios 1:3-4). Sua experiência com "${tema}" pode ser instrumento de cura para outros.` },
      conclusao: `Que o Espírito Santo traga paz ao seu coração hoje. Não importa qual seja a sua montanha, Deus é maior. Descanse no Senhor e abrace Suas promessas — Ele nunca falha.`
    },
    'Exortação': {
      intro: `A igreja precisa ouvir a verdade com amor. O tema "${tema}" nos desafia a examinar nossas vidas e alinhar nosso caminhar com a vontade de Deus. Não para condenar, mas para edificar e despertar o melhor que Deus colocou em cada um de nós.`,
      p1: { titulo: 'O chamado à santidade prática', conteudo: `Deus não nos chamou para a mediocridade espiritual. Quando refletimos sobre "${tema}", somos confrontados com o padrão divino. ${refs[0]} nos mostra que Deus espera de nós compromisso genuíno, não apenas aparência de piedade.` },
      p2: { titulo: 'Abandonando as desculpas', conteudo: `Muitos cristãos vivem na zona de conforto, justificando a falta de comprometimento. A Palavra é clara: não basta ouvir, é preciso praticar (Tiago 1:22). O tema "${tema}" nos chama a sair da passividade e agir com fé.` },
      p3: { titulo: 'O fruto de uma vida obediente', conteudo: `Quando escolhemos obedecer, mesmo quando é difícil, os frutos vêm. ${refs[1]} nos lembra que a obediência traz bênçãos. Deus honra aqueles que o honram e vivem de acordo com Seus princípios.` },
      conclusao: `Hoje é dia de decisão. Não adie mais o que Deus já te mostrou. Levante-se, sacuda a poeira da acomodação e caminhe na direção que o Senhor está apontando. O melhor de Deus está à frente!`
    },
    'Evangelismo': {
      intro: `O mundo precisa ouvir sobre "${tema}". Milhões vivem sem esperança, sem direção, sem conhecer o amor transformador de Cristo. Esta mensagem é para todos que buscam sentido e propósito: há resposta, e Seu nome é Jesus.`,
      p1: { titulo: 'A condição humana sem Cristo', conteudo: `Sem Deus, a humanidade vive em trevas espirituais. A busca por felicidade em conquistas, relacionamentos ou posses deixa sempre um vazio. O tema "${tema}" nos mostra que só em Cristo encontramos plenitude (João 10:10).` },
      p2: { titulo: 'O presente gratuito de Deus', conteudo: `${refs[0]} revela a essência do Evangelho: a salvação é um presente, não um pagamento. Deus, em Seu imenso amor, oferece perdão, restauração e vida eterna a todos que creem. "${tema}" é a porta para essa transformação.` },
      p3: { titulo: 'Uma nova vida começa agora', conteudo: `Aceitar a Cristo não é o fim, é o começo de uma jornada extraordinária. 2 Coríntios 5:17 declara: "Se alguém está em Cristo, nova criatura é." Não importa seu passado — Deus quer escrever uma nova história em sua vida.` },
      conclusao: `Se você nunca entregou sua vida a Jesus, ou se afastou do caminho, hoje é o dia da salvação. Deus está te chamando com amor. Abra seu coração, confesse seus pecados e aceite o presente mais precioso: a vida eterna em Cristo Jesus.`
    },
    'Ensino': {
      intro: `O estudo aprofundado de "${tema}" é essencial para o crescimento da igreja. Vamos mergulhar neste assunto à luz das Escrituras, analisando o contexto bíblico, os princípios teológicos e as aplicações práticas para nossa vida diária.`,
      p1: { titulo: 'Fundamento bíblico', conteudo: `Para compreender "${tema}", precisamos examinar o que as Escrituras ensinam sistematicamente. ${refs[0]} nos dá a base teológica. No contexto original, o autor estava se dirigindo a uma comunidade que precisava entender este princípio divino na prática.` },
      p2: { titulo: 'Análise e desdobramentos', conteudo: `Quando cruzamos referências, como ${refs[1]} e ${refs[2]}, o tema ganha profundidade. Não é um conceito isolado, mas está conectado a toda a narrativa bíblica da redenção e do plano de Deus para a humanidade.` },
      p3: { titulo: 'Aplicação prática e contemporânea', conteudo: `O conhecimento bíblico precisa gerar transformação. Como aplicar "${tema}" no dia a dia? Na família, no trabalho, na igreja — cada área da vida é afetada quando internalizamos este princípio. A Palavra de Deus é viva e eficaz (Hebreus 4:12).` },
      conclusao: `Que este estudo sobre "${tema}" produza fruto em nossas vidas. Não sejamos apenas ouvintes, mas praticantes da Palavra. Continue meditando nas Escrituras e permita que o Espírito Santo aprofunde este entendimento em seu coração.`
    },
    'Encorajamento': {
      intro: `Mais do que nunca, precisamos uns dos outros. O tema "${tema}" nos traz uma mensagem poderosa de encorajamento: Deus não nos abandonou, Suas promessas permanecem firmes e o melhor ainda está por vir.`,
      p1: { titulo: 'Você não está sozinho nesta caminhada', conteudo: `Josué 1:9 nos diz para sermos fortes e corajosos, pois o Senhor está conosco por onde quer que andemos. Quando pensamos em "${tema}", somos lembrados que mesmo nos vales mais profundos, Deus caminha ao nosso lado.` },
      p2: { titulo: 'Suas fraquezas, o palco da graça', conteudo: `Paulo aprendeu que o poder de Deus se aperfeiçoa na fraqueza (2 Coríntios 12:9). ${refs[0]} confirma que Deus usa situações improváveis para manifestar Sua glória. Não desista — Deus está trabalhando mesmo quando você não consegue ver.` },
      p3: { titulo: 'O amanhecer está chegando', conteudo: `"O choro pode durar uma noite, mas a alegria vem pela manhã" (Salmos 30:5). ${refs[1]} nos encoraja a manter a fé firme. A temporada difícil que você vive em relação a "${tema}" tem prazo de validade — a vitória de Deus não.` },
      conclusao: `Levante a cabeça, enxugue as lágrimas e creia: o Deus que começou a boa obra em você vai completá-la (Filipenses 1:6). Você é mais que vencedor por meio dAquele que nos amou!`
    },
    'Adoração': {
      intro: `Adorar é mais do que cantar — é um estilo de vida. O tema "${tema}" nos convida a entrar na presença de Deus com reverência, gratidão e entrega total. Quando adoramos em espírito e verdade, algo sobrenatural acontece.`,
      p1: { titulo: 'A essência da verdadeira adoração', conteudo: `Jesus declarou que o Pai procura verdadeiros adoradores, que o adorem em espírito e em verdade (João 4:23-24). O tema "${tema}" nos leva a refletir: adoração genuína nasce de um coração rendido, não de performances externas. ${refs[0]} reforça esta verdade.` },
      p2: { titulo: 'Adoração em todas as circunstâncias', conteudo: `Paulo e Silas adoraram na prisão e Deus abriu as portas (Atos 16:25-26). Jó adorou após perder tudo (Jó 1:20-21). Quando conectamos "${tema}" à adoração, descobrimos que louvar a Deus nos momentos difíceis libera poder sobrenatural.` },
      p3: { titulo: 'Vivendo uma vida de adoração', conteudo: `Romanos 12:1 nos exorta a apresentar nossos corpos como sacrifício vivo. ${refs[1]} completa este chamado. Cada ato do dia pode ser adoração — no trabalho, na família, no serviço — quando feito para a glória de Deus.` },
      conclusao: `Que nossa vida inteira seja um cântico ao Senhor. Não reserve sua adoração apenas para o domingo — viva em adoração contínua. O céu será assim para sempre, e podemos começar aqui e agora.`
    }
  };
  
  const conteudo = conteudosPorObjetivo[objetivo] || conteudosPorObjetivo['Ensino'];
  
  // Gerar pontos de acordo com a duração
  let pontos = [conteudo.p1, conteudo.p2, conteudo.p3];
  if (duracao === 20) {
    pontos = [conteudo.p1, conteudo.p2]; // Reduzido
  } else if (duracao === 60) {
    pontos = [conteudo.p1, conteudo.p2, conteudo.p3,
      { titulo: 'Aprofundamento teológico', conteudo: `Para uma compreensão mais profunda de "${tema}", precisamos examinar como este princípio se aplica na vida da igreja primitiva e nos nossos dias. ${refs[3] || refs[0]} nos dá uma perspectiva histórica que ilumina nossa prática contemporânea.` },
      { titulo: 'Aplicação prática e desafio', conteudo: `Como podemos viver "${tema}" na segunda-feira? O desafio não é apenas entender, mas corporificar estas verdades. Proponho que esta semana cada um de nós escolha uma área específica para aplicar o que aprendemos sobre este tema.` }
    ];
  }

  // Gerar perguntas para células
  let perguntas = null;
  if (gerarPerguntas) {
    perguntas = [
      `O que o tema "${tema}" significa para você pessoalmente?`,
      `Como ${refs[0]} se aplica ao nosso contexto como grupo?`,
      `Qual é o maior desafio que você enfrenta em relação a "${tema}"?`,
      `De que forma prática podemos viver este princípio nesta semana?`,
      `Existe algum testemunho que você gostaria de compartilhar sobre este assunto?`
    ];
  }
  
  return {
    tema: tema,
    versiculo: versiculo || refs[0],
    objetivo: objetivo,
    duracao: duracao,
    introducao: conteudo.intro,
    pontos: pontos,
    conclusao: conteudo.conclusao,
    referencias: refs.slice(0, 6),
    perguntas: perguntas
  };
}

function renderEsbocoGerado(esboco) {
  const container = document.getElementById('iaResultado');
  container.style.display = 'block';
  container.innerHTML = `
    <div class="ia-resultado-card">
      <div class="ia-resultado-header">
        <div class="ia-resultado-badge">✨ Esboço gerado pela IA</div>
        <div class="ia-resultado-titulo">${esboco.tema}</div>
        <div class="ia-resultado-meta">
          <span class="ia-meta-tag">${esboco.objetivo}</span>
          <span class="ia-meta-ref">📖 ${esboco.versiculo}</span>
        </div>
      </div>
      
      <div class="ia-secao">
        <div class="ia-secao-label">📝 Introdução</div>
        <div class="ia-secao-text">${esboco.introducao}</div>
      </div>
      
      ${esboco.pontos.map((p, i) => `
      <div class="ia-ponto">
        <div class="ia-ponto-num">${i + 1}</div>
        <div class="ia-ponto-body">
          <div class="ia-ponto-titulo">${p.titulo}</div>
          <div class="ia-ponto-conteudo">${p.conteudo}</div>
        </div>
      </div>
      `).join('')}
      
      <div class="ia-secao ia-secao-conclusao">
        <div class="ia-secao-label">🎯 Conclusão</div>
        <div class="ia-secao-text">${esboco.conclusao}</div>
      </div>
      
      <div class="ia-refs">
        <div class="ia-secao-label">📖 Referências Bíblicas</div>
        <div class="ia-refs-list">${esboco.referencias.map(r => `<span class="chip-ref">${r}</span>`).join('')}</div>
      </div>

      ${esboco.perguntas ? `
      <div class="ia-celula-card">
        <div class="ia-celula-title"><i data-lucide="message-circle"></i> Perguntas para Células / Pequenos Grupos</div>
        <ul class="ia-celula-list">
          ${esboco.perguntas.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
      ` : ''}
      
      <div class="ia-actions">
        <button class="btn-ia-salvar" onclick='salvarEsboco(this)' data-esboco="${JSON.stringify(esboco).replace(/"/g, '&quot;').replace(/'/g, '&#39;')}">💾 Salvar Esboço</button>
        <button class="btn-ia-pdf" onclick='exportarEsbocoPDF(this)' data-esboco="${JSON.stringify(esboco).replace(/"/g, '&quot;').replace(/'/g, '&#39;')}">📄 Exportar PDF</button>
      </div>
    </div>
  `;

  // Scroll suave para o resultado usando requestAnimationFrame para garantir renderização
  requestAnimationFrame(() => {
    const pageContent = container.closest('.page-content');
    if (pageContent) {
      const targetPos = container.offsetTop - 20;
      pageContent.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();
}


function salvarEsboco(btn) {
  const esboco = JSON.parse(btn.dataset.esboco);
  saveEsbocoStorage(esboco);
  showToast('💾 Esboço salvo com sucesso!', 'success');
  loadStats();
}

function exportarEsbocoPDF(btn) {
  const esboco = JSON.parse(btn.dataset.esboco);
  
  // Gerar HTML para PDF
  const htmlContent = `
    <div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;color:#1B2A4A;">
      <div style="text-align:center;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #C8A96E;">
        <div style="font-size:10px;color:#C8A96E;text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">✦ App Ministerial — Esboço de Pregação</div>
        <div style="font-size:22px;font-weight:800;color:#1B2A4A;line-height:1.3;">${esboco.tema}</div>
        <div style="font-size:12px;color:#B08D4F;font-weight:600;margin-top:6px;">📖 ${esboco.versiculo} · ${esboco.objetivo}</div>
        <div style="font-size:10px;color:#ADB5BD;margin-top:4px;">${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
      </div>
      
      <div style="margin-bottom:20px;">
        <div style="font-size:11px;font-weight:700;color:#C8A96E;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Introdução</div>
        <div style="font-size:13px;color:#495057;line-height:1.8;">${esboco.introducao}</div>
      </div>
      
      ${esboco.pontos.map((p, i) => `
      <div style="margin-bottom:20px;padding:16px;background:#FAF7F2;border-radius:8px;border-left:3px solid #C8A96E;">
        <div style="font-size:14px;font-weight:700;color:#1B2A4A;margin-bottom:8px;">${i + 1}. ${p.titulo}</div>
        <div style="font-size:13px;color:#495057;line-height:1.8;">${p.conteudo}</div>
      </div>
      `).join('')}
      
      <div style="margin-bottom:20px;padding:16px;background:linear-gradient(135deg,#1B2A4A,#2A3F6B);border-radius:8px;color:#fff;">
        <div style="font-size:11px;font-weight:700;color:#C8A96E;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Conclusão</div>
        <div style="font-size:13px;line-height:1.8;color:rgba(255,255,255,0.9);">${esboco.conclusao}</div>
      </div>
      
      <div style="margin-bottom:20px;">
        <div style="font-size:11px;font-weight:700;color:#C8A96E;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Referências Bíblicas</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${esboco.referencias.map(r => `<span style="padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;background:#F0EBE3;color:#1B2A4A;">${r}</span>`).join('')}
        </div>
      </div>
      
      <div style="text-align:center;padding-top:16px;border-top:1px solid #DEE2E6;">
        <div style="font-size:9px;color:#ADB5BD;">Gerado pelo Assistente de Pregação IA — App Ministerial</div>
      </div>
    </div>
  `;
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  document.body.appendChild(tempDiv);
  
  const opt = {
    margin: [10, 10, 10, 10],
    filename: `Sermao_${esboco.tema.replace(/[^a-zA-Z0-9À-ú ]/g, '').replace(/ /g, '_').substring(0, 40)}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(tempDiv).save().then(() => {
    document.body.removeChild(tempDiv);
    showToast('📄 PDF exportado com sucesso!', 'success');
  }).catch(() => {
    document.body.removeChild(tempDiv);
    showToast('Erro ao gerar PDF', 'danger');
  });
}

// === ESBOCOS SALVOS ===
function renderEsbocosSalvos() {
  const esbocos = getEsbocosStorage();
  const container = document.getElementById('esbocosSalvosLista');
  
  if (esbocos.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <div class="empty-title">Nenhum esboço salvo</div>
        <div class="empty-text">Use o Assistente IA para gerar e salvar esboços de pregação</div>
      </div>
    `;
    return;
  }
  
  container.innerHTML = esbocos.map(e => {
    const data = new Date(e.dataCriacao).toLocaleDateString('pt-BR');
    return `
    <div class="card esboco-card" onclick="showEsbocoDetalhe(${e.id})" style="margin-bottom:var(--sp-3);cursor:pointer">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--sp-2)">
        <div style="flex:1;min-width:0">
          <div class="esboco-card-badge">${e.objetivo}</div>
          <div style="font-size:var(--fs-sm);font-weight:700;color:var(--navy);margin-top:var(--sp-2)">${e.tema}</div>
          <div style="font-size:var(--fs-xs);color:var(--gold-dark);font-weight:600;margin-top:2px">📖 ${e.versiculo}</div>
        </div>
        <span style="font-size:1.2rem;flex-shrink:0;margin-left:var(--sp-2)">🤖</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:var(--sp-3)">
        <div style="font-size:var(--fs-xs);color:var(--gray-500)">${data} · ${e.pontos.length} pontos</div>
        <div style="display:flex;gap:var(--sp-2)">
          <button class="esboco-mini-btn" onclick="event.stopPropagation(); exportarEsbocoPDFById(${e.id})" title="Exportar PDF">📄</button>
          <button class="esboco-mini-btn esboco-mini-danger" onclick="event.stopPropagation(); confirmarDeleteEsboco(${e.id})" title="Excluir">🗑️</button>
        </div>
      </div>
    </div>
    `;
  }).join('');
}

function showEsbocoDetalhe(id) {
  const esbocos = getEsbocosStorage();
  const e = esbocos.find(x => x.id === id);
  if (!e) return;
  
  const data = new Date(e.dataCriacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  
  document.getElementById('esbocoDetalheContent').innerHTML = `
    <div style="margin-bottom:var(--sp-6)">
      <div class="esboco-card-badge" style="margin-bottom:var(--sp-3)">${e.objetivo}</div>
      <div style="font-size:var(--fs-xl);font-weight:800;color:var(--navy);margin-bottom:var(--sp-2);line-height:1.2">${e.tema}</div>
      <div style="font-size:var(--fs-sm);color:var(--gold-dark);font-weight:600">📖 ${e.versiculo}</div>
      <div style="font-size:var(--fs-xs);color:var(--gray-500);margin-top:var(--sp-2)">${data} · Gerado por IA</div>
    </div>
    
    <div class="card" style="margin-bottom:var(--sp-5)">
      <div class="section-label" style="margin-bottom:var(--sp-3)">📝 Introdução</div>
      <div style="font-size:var(--fs-sm);color:var(--gray-700);line-height:1.75">${e.introducao}</div>
    </div>
    
    <div class="section-label">Pontos Principais</div>
    ${e.pontos.map((p, i) => `
    <div class="sermon-topico">
      <div style="font-size:var(--fs-sm);font-weight:700;color:var(--navy);margin-bottom:var(--sp-2)">${i + 1}. ${p.titulo}</div>
      <div style="font-size:var(--fs-sm);color:var(--gray-700);line-height:1.75">${p.conteudo}</div>
    </div>
    `).join('')}
    
    <div class="card" style="margin-top:var(--sp-4);margin-bottom:var(--sp-4);background:linear-gradient(135deg,var(--navy),var(--navy-light));color:#fff;border:none">
      <div style="font-size:var(--fs-xs);font-weight:700;color:var(--gold-light);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:var(--sp-3)">🎯 Conclusão</div>
      <div style="font-size:var(--fs-sm);line-height:1.75;color:rgba(255,255,255,0.92)">${e.conclusao}</div>
    </div>
    
    <div class="section-label" style="margin-top:var(--sp-5)">📖 Referências Bíblicas</div>
    <div style="display:flex;flex-wrap:wrap;gap:var(--sp-2);margin-bottom:var(--sp-6)">${e.referencias.map(r => `<span class="chip-ref">${r}</span>`).join('')}</div>
    
    <div class="action-buttons">
      <button class="btn-primary" onclick="exportarEsbocoPDFById(${e.id})">📄 Exportar PDF</button>
      <button class="btn-danger" onclick="confirmarDeleteEsboco(${e.id})">🗑️ Excluir</button>
    </div>
  `;
  showScreen('esboco-detalhe');
}

function exportarEsbocoPDFById(id) {
  const esbocos = getEsbocosStorage();
  const e = esbocos.find(x => x.id === id);
  if (!e) return;
  
  // Reutilizar a mesma função, criando um botão virtual
  const virtualBtn = document.createElement('button');
  virtualBtn.dataset.esboco = JSON.stringify(e);
  exportarEsbocoPDF(virtualBtn);
}

function confirmarDeleteEsboco(id) {
  if (confirm('Tem certeza que deseja excluir este esboço?')) {
    deleteEsbocoStorage(id);
    showToast('Esboço excluído', 'danger');
    // Se estiver no detalhe, voltar
    if (currentScreen === 'esboco-detalhe') {
      goBack();
    }
    renderEsbocosSalvos();
    loadStats();
  }
}

// === MODAIS ===
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// === START ===
document.addEventListener('DOMContentLoaded', init);
