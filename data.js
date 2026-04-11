// =====================================================
// DATA.JS — Dados Mockados Realistas (MVP Premium)
// =====================================================

// === VERSÍCULOS DO DIA ===
const versiculosDoDia = [
  { texto: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", referencia: "João 3:16" },
  { texto: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.", referencia: "Provérbios 3:5-6" },
  { texto: "O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.", referencia: "Salmos 23:1-2" },
  { texto: "Posso todas as coisas naquele que me fortalece.", referencia: "Filipenses 4:13" },
  { texto: "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.", referencia: "Isaías 41:10" },
  { texto: "Mas os que esperam no Senhor renovarão as suas forças, subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.", referencia: "Isaías 40:31" },
  { texto: "Tudo posso naquele que me fortalece. Todavia, fizestes bem em participar na minha aflição.", referencia: "Filipenses 4:13-14" },
  { texto: "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.", referencia: "Salmos 119:105" },
  { texto: "O Senhor é bom, ele é refúgio no dia da angústia, e conhece os que nele confiam.", referencia: "Naum 1:7" },
  { texto: "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.", referencia: "Romanos 8:28" },
  { texto: "Bem-aventurados os pacificadores, porque eles serão chamados filhos de Deus.", referencia: "Mateus 5:9" },
  { texto: "Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos.", referencia: "Filipenses 4:4" },
  { texto: "Porque onde estiver o vosso tesouro, aí estará também o vosso coração.", referencia: "Mateus 6:21" },
  { texto: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.", referencia: "Salmos 91:1" },
  { texto: "Ensina-nos a contar os nossos dias, de tal maneira que alcancemos coração sábio.", referencia: "Salmos 90:12" },
  { texto: "E eis que eu estou convosco todos os dias, até a consumação dos séculos.", referencia: "Mateus 28:20" },
  { texto: "Mas buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.", referencia: "Mateus 6:33" },
  { texto: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", referencia: "Mateus 11:28" },
  { texto: "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus.", referencia: "Efésios 2:8" },
  { texto: "Entrega o teu caminho ao Senhor; confia nele, e ele o fará.", referencia: "Salmos 37:5" },
  { texto: "A fé é a certeza de coisas que se esperam, a convicção de fatos que se não veem.", referencia: "Hebreus 11:1" },
  { texto: "Um ao outro ajudou, e ao seu companheiro disse: Esforça-te.", referencia: "Isaías 41:6" },
  { texto: "Porque nada podemos contra a verdade, senão pela verdade.", referencia: "2 Coríntios 13:8" },
  { texto: "O choro pode durar uma noite, mas a alegria vem pela manhã.", referencia: "Salmos 30:5" },
  { texto: "Não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento.", referencia: "Romanos 12:2" },
  { texto: "Eu sou o caminho, e a verdade, e a vida. Ninguém vem ao Pai, senão por mim.", referencia: "João 14:6" },
  { texto: "Conhecereis a verdade, e a verdade vos libertará.", referencia: "João 8:32" },
  { texto: "Pois eu sei os planos que tenho para vocês, diz o Senhor, planos de paz e não de mal, para dar-lhes um futuro e uma esperança.", referencia: "Jeremias 29:11" },
  { texto: "Se Deus é por nós, quem será contra nós?", referencia: "Romanos 8:31" },
  { texto: "De sorte que somos embaixadores da parte de Cristo, como se Deus por nós rogasse.", referencia: "2 Coríntios 5:20" },
  { texto: "Eu vim para que tenham vida, e a tenham com abundância.", referencia: "João 10:10" }
];

// === MEMBROS ===
const membrosData = [
  { id: 1, nome: "Maria Aparecida dos Santos", telefone: "(11) 98765-4321", endereco: "Rua das Flores, 45 — Jd. Primavera", nascimento: "1978-03-15", batismo: "1996-11-24", cargo: "Líder do Louvor", congregacao: "Sede Central", status: "ativo", observacoes: "Fiel e dedicada. Participa do coral há 18 anos. Responsável pela escala de louvor." },
  { id: 2, nome: "José Carlos Oliveira", telefone: "(11) 91234-5678", endereco: "Av. Brasil, 1020 — Centro", nascimento: "1965-07-22", batismo: "1988-05-10", cargo: "Diácono", congregacao: "Sede Central", status: "ativo", observacoes: "Responsável pela organização da Ceia do Senhor e pelo acolhimento dos visitantes." },
  { id: 3, nome: "Ana Paula Ferreira Lima", telefone: "(11) 99887-6543", endereco: "Rua São João, 230 — Vila Nova", nascimento: "1990-01-08", batismo: "2010-04-18", cargo: "Professora da EBD", congregacao: "Sede Central", status: "ativo", observacoes: "Formada em pedagogia. Ensina a classe de adolescentes." },
  { id: 4, nome: "Francisco de Assis Mendes", telefone: "(11) 94567-8901", endereco: "Travessa da Paz, 78 — Jd. Esperança", nascimento: "1955-12-03", batismo: "1980-08-15", cargo: "Presbítero", congregacao: "Congregação Betel", status: "ativo", observacoes: "Um dos membros mais antigos da igreja. Responsável pela congregação Betel." },
  { id: 5, nome: "Júlia Cristina Souza", telefone: "(11) 97654-3210", endereco: "Rua Esperança, 156 — Pq. São Lucas", nascimento: "1995-06-20", batismo: "2015-12-06", cargo: "Secretária da Igreja", congregacao: "Sede Central", status: "ativo", observacoes: "Cuida da documentação, atas e correspondências oficiais da igreja." },
  { id: 6, nome: "Pedro Henrique Almeida", telefone: "(11) 93210-9876", endereco: "Rua dos Apóstolos, 300 — Jd. Oliveiras", nascimento: "1982-09-14", batismo: "2002-03-24", cargo: "Líder de Jovens", congregacao: "Sede Central", status: "ativo", observacoes: "Coordena o grupo de jovens e organiza retiros espirituais." },
  { id: 7, nome: "Antônio Carlos Ribeiro", telefone: "(11) 98123-4567", endereco: "Av. Paulista, 500 — Bela Vista", nascimento: "1970-04-28", batismo: "1992-07-12", cargo: "Tesoureiro", congregacao: "Sede Central", status: "ativo", observacoes: "Contador de profissão. Responsável pelas finanças e prestação de contas." },
  { id: 8, nome: "Raquel de Souza Costa", telefone: "(11) 96543-2109", endereco: "Rua Monte Sinai, 88 — Jd. Galileia", nascimento: "1988-11-30", batismo: "2008-06-22", cargo: "Missionária", congregacao: "Congregação Esmirna", status: "ativo", observacoes: "Atua em projetos sociais no bairro Jd. Galileia. Responsável pelo evangelismo local." },
  { id: 9, nome: "Lucas Gabriel Martins", telefone: "(11) 95432-1098", endereco: "Rua das Oliveiras, 42 — Vila Manaém", nascimento: "2000-08-05", batismo: "2018-11-11", cargo: "Ministro de Louvor", congregacao: "Sede Central", status: "ativo", observacoes: "Músico multi-instrumentista. Toca violão, teclado e bateria." },
  { id: 10, nome: "Benedita Maria da Silva", telefone: "(11) 92109-8765", endereco: "Rua Canaã, 67 — Jd. Betânia", nascimento: "1948-02-14", batismo: "1975-04-06", cargo: "Membro", congregacao: "Congregação Betel", status: "ativo", observacoes: "Membro fiel há mais de 50 anos. Participa do círculo de oração das quartas-feiras." },
  { id: 11, nome: "Fernando Augusto Pereira", telefone: "(11) 91098-7654", endereco: "Rua Damasco, 190 — Vila Salem", nascimento: "1975-10-18", batismo: "1998-09-13", cargo: "Cooperador", congregacao: "Sede Central", status: "inativo", observacoes: "Mudou-se para outra cidade em janeiro. Mantém contato esporádico." },
  { id: 12, nome: "Cláudia Regina Moraes", telefone: "(11) 90987-6543", endereco: "Rua Hebrom, 55 — Centro", nascimento: "1985-05-25", batismo: "2005-08-28", cargo: "Membro", congregacao: "Sede Central", status: "inativo", observacoes: "Afastada desde março por motivos pessoais. Líder de célula da região norte anteriormente." }
];

// === LIVROS DA BÍBLIA ===
const livrosBiblia = [
  { nome: "Gênesis", abreviacao: "Gn", capitulos: 50, testamento: "antigo", bookIndex: 1 },
  { nome: "Êxodo", abreviacao: "Êx", capitulos: 40, testamento: "antigo", bookIndex: 2 },
  { nome: "Levítico", abreviacao: "Lv", capitulos: 27, testamento: "antigo", bookIndex: 3 },
  { nome: "Números", abreviacao: "Nm", capitulos: 36, testamento: "antigo", bookIndex: 4 },
  { nome: "Deuteronômio", abreviacao: "Dt", capitulos: 34, testamento: "antigo", bookIndex: 5 },
  { nome: "Josué", abreviacao: "Js", capitulos: 24, testamento: "antigo", bookIndex: 6 },
  { nome: "Juízes", abreviacao: "Jz", capitulos: 21, testamento: "antigo", bookIndex: 7 },
  { nome: "Rute", abreviacao: "Rt", capitulos: 4, testamento: "antigo", bookIndex: 8 },
  { nome: "1 Samuel", abreviacao: "1Sm", capitulos: 31, testamento: "antigo", bookIndex: 9 },
  { nome: "2 Samuel", abreviacao: "2Sm", capitulos: 24, testamento: "antigo", bookIndex: 10 },
  { nome: "1 Reis", abreviacao: "1Rs", capitulos: 22, testamento: "antigo", bookIndex: 11 },
  { nome: "2 Reis", abreviacao: "2Rs", capitulos: 25, testamento: "antigo", bookIndex: 12 },
  { nome: "1 Crônicas", abreviacao: "1Cr", capitulos: 29, testamento: "antigo", bookIndex: 13 },
  { nome: "2 Crônicas", abreviacao: "2Cr", capitulos: 36, testamento: "antigo", bookIndex: 14 },
  { nome: "Esdras", abreviacao: "Ed", capitulos: 10, testamento: "antigo", bookIndex: 15 },
  { nome: "Neemias", abreviacao: "Ne", capitulos: 13, testamento: "antigo", bookIndex: 16 },
  { nome: "Ester", abreviacao: "Et", capitulos: 10, testamento: "antigo", bookIndex: 17 },
  { nome: "Jó", abreviacao: "Jó", capitulos: 42, testamento: "antigo", bookIndex: 18 },
  { nome: "Salmos", abreviacao: "Sl", capitulos: 150, testamento: "antigo", bookIndex: 19 },
  { nome: "Provérbios", abreviacao: "Pv", capitulos: 31, testamento: "antigo", bookIndex: 20 },
  { nome: "Eclesiastes", abreviacao: "Ec", capitulos: 12, testamento: "antigo", bookIndex: 21 },
  { nome: "Cantares", abreviacao: "Ct", capitulos: 8, testamento: "antigo", bookIndex: 22 },
  { nome: "Isaías", abreviacao: "Is", capitulos: 66, testamento: "antigo", bookIndex: 23 },
  { nome: "Jeremias", abreviacao: "Jr", capitulos: 52, testamento: "antigo", bookIndex: 24 },
  { nome: "Lamentações", abreviacao: "Lm", capitulos: 5, testamento: "antigo", bookIndex: 25 },
  { nome: "Ezequiel", abreviacao: "Ez", capitulos: 48, testamento: "antigo", bookIndex: 26 },
  { nome: "Daniel", abreviacao: "Dn", capitulos: 12, testamento: "antigo", bookIndex: 27 },
  { nome: "Oséias", abreviacao: "Os", capitulos: 14, testamento: "antigo", bookIndex: 28 },
  { nome: "Joel", abreviacao: "Jl", capitulos: 3, testamento: "antigo", bookIndex: 29 },
  { nome: "Amós", abreviacao: "Am", capitulos: 9, testamento: "antigo", bookIndex: 30 },
  { nome: "Obadias", abreviacao: "Ob", capitulos: 1, testamento: "antigo", bookIndex: 31 },
  { nome: "Jonas", abreviacao: "Jn", capitulos: 4, testamento: "antigo", bookIndex: 32 },
  { nome: "Miquéias", abreviacao: "Mq", capitulos: 7, testamento: "antigo", bookIndex: 33 },
  { nome: "Naum", abreviacao: "Na", capitulos: 3, testamento: "antigo", bookIndex: 34 },
  { nome: "Habacuque", abreviacao: "Hc", capitulos: 3, testamento: "antigo", bookIndex: 35 },
  { nome: "Sofonias", abreviacao: "Sf", capitulos: 3, testamento: "antigo", bookIndex: 36 },
  { nome: "Ageu", abreviacao: "Ag", capitulos: 2, testamento: "antigo", bookIndex: 37 },
  { nome: "Zacarias", abreviacao: "Zc", capitulos: 14, testamento: "antigo", bookIndex: 38 },
  { nome: "Malaquias", abreviacao: "Ml", capitulos: 4, testamento: "antigo", bookIndex: 39 },
  { nome: "Mateus", abreviacao: "Mt", capitulos: 28, testamento: "novo", bookIndex: 40 },
  { nome: "Marcos", abreviacao: "Mc", capitulos: 16, testamento: "novo", bookIndex: 41 },
  { nome: "Lucas", abreviacao: "Lc", capitulos: 24, testamento: "novo", bookIndex: 42 },
  { nome: "João", abreviacao: "Jo", capitulos: 21, testamento: "novo", bookIndex: 43 },
  { nome: "Atos", abreviacao: "At", capitulos: 28, testamento: "novo", bookIndex: 44 },
  { nome: "Romanos", abreviacao: "Rm", capitulos: 16, testamento: "novo", bookIndex: 45 },
  { nome: "1 Coríntios", abreviacao: "1Co", capitulos: 16, testamento: "novo", bookIndex: 46 },
  { nome: "2 Coríntios", abreviacao: "2Co", capitulos: 13, testamento: "novo", bookIndex: 47 },
  { nome: "Gálatas", abreviacao: "Gl", capitulos: 6, testamento: "novo", bookIndex: 48 },
  { nome: "Efésios", abreviacao: "Ef", capitulos: 6, testamento: "novo", bookIndex: 49 },
  { nome: "Filipenses", abreviacao: "Fp", capitulos: 4, testamento: "novo", bookIndex: 50 },
  { nome: "Colossenses", abreviacao: "Cl", capitulos: 4, testamento: "novo", bookIndex: 51 },
  { nome: "1 Tessalonicenses", abreviacao: "1Ts", capitulos: 5, testamento: "novo", bookIndex: 52 },
  { nome: "2 Tessalonicenses", abreviacao: "2Ts", capitulos: 3, testamento: "novo", bookIndex: 53 },
  { nome: "1 Timóteo", abreviacao: "1Tm", capitulos: 6, testamento: "novo", bookIndex: 54 },
  { nome: "2 Timóteo", abreviacao: "2Tm", capitulos: 4, testamento: "novo", bookIndex: 55 },
  { nome: "Tito", abreviacao: "Tt", capitulos: 3, testamento: "novo", bookIndex: 56 },
  { nome: "Filemom", abreviacao: "Fm", capitulos: 1, testamento: "novo", bookIndex: 57 },
  { nome: "Hebreus", abreviacao: "Hb", capitulos: 13, testamento: "novo", bookIndex: 58 },
  { nome: "Tiago", abreviacao: "Tg", capitulos: 5, testamento: "novo", bookIndex: 59 },
  { nome: "1 Pedro", abreviacao: "1Pe", capitulos: 5, testamento: "novo", bookIndex: 60 },
  { nome: "2 Pedro", abreviacao: "2Pe", capitulos: 3, testamento: "novo", bookIndex: 61 },
  { nome: "1 João", abreviacao: "1Jo", capitulos: 5, testamento: "novo", bookIndex: 62 },
  { nome: "2 João", abreviacao: "2Jo", capitulos: 1, testamento: "novo", bookIndex: 63 },
  { nome: "3 João", abreviacao: "3Jo", capitulos: 1, testamento: "novo", bookIndex: 64 },
  { nome: "Judas", abreviacao: "Jd", capitulos: 1, testamento: "novo", bookIndex: 65 },
  { nome: "Apocalipse", abreviacao: "Ap", capitulos: 22, testamento: "novo", bookIndex: 66 }
];

// === HINOS DA HARPA CRISTÃ ===
// Áudio: https://harpa.nyc3.digitaloceanspaces.com/XXX.mp3 (3 dígitos)
// 640 hinos — títulos oficiais do hinário da Assembleia de Deus
const hinosHarpa = [];
(function() {
  const _L = "Abra o hinário para acompanhar a letra deste hino.\n\nToque no botão ▶ para ouvir o áudio.";
  const _h = [
    [1,"Chuvas de Graça","Espírito Santo"],[2,"Saudosa Lembrança","Louvores"],[3,"Plena Paz","Paz e Confiança"],[4,"Deus Velará Por Ti","Confiança"],[5,"Ó Desce Fogo Santo","Espírito Santo"],[6,"Na Maldição Da Cruz","Redenção"],[7,"Cristo Cura Sim!","Cura Divina"],[8,"Cristo, O Fiel Amigo","Jesus Cristo"],[9,"Marchai Soldados De Cristo","Militância Cristã"],[10,"Eu Te Louvo","Louvor e Adoração"],
    [11,"Ó Cristão, Eia Avante","Militância Cristã"],[12,"Vem Já, Pecador","Convite"],[13,"Jesus Comprou-me","Redenção"],[14,"Gozo Em Jesus","Alegria"],[15,"Conversão","Arrependimento"],[16,"Despertar Para o Trabalho","Serviço Cristão"],[17,"Pensando Em Jesus","Jesus Cristo"],[18,"Grata Nova","Evangelismo"],[19,"O Convite De Cristo","Convite"],[20,"Olhai o Cordeiro De Deus","Redenção"],
    [21,"Gloriosa Aurora","Segunda Vinda"],[22,"Ceia Do Senhor","Santa Ceia"],[23,"Glória a Jesus","Louvor e Adoração"],[24,"Poder Pentecostal","Espírito Santo"],[25,"Jesus Tu és Bom","Jesus Cristo"],[26,"A Formosa Jerusalém","Céu e Eternidade"],[27,"Amor Que Vence","Amor de Deus"],[28,"Deus Vai Te Guiar","Confiança"],[29,"O Precioso Sangue","Redenção"],[30,"Não Sou Meu","Consagração"],
    [31,"Glória ao Meu Jesus","Louvor e Adoração"],[32,"Meu Cristo! Meu Cristo!","Jesus Cristo"],[33,"Com Tua Mão Segura","Confiança"],[34,"Milícia De Jesus","Militância Cristã"],[35,"O Grande Amor","Amor de Deus"],[36,"O Exilado","Céu e Eternidade"],[37,"Cristo Pra Mim","Jesus Cristo"],[38,"O Senhor é Rei","Louvor e Adoração"],[39,"Alvo Mais Que a Neve","Santificação"],[40,"A Cidade Do Bom Jesus","Céu e Eternidade"],
    [41,"A Cristo Coroai","Louvor e Adoração"],[42,"Saudai Jesus","Louvor e Adoração"],[43,"Doce Lar","Céu e Eternidade"],[44,"Oh! Que Glória!","Louvor e Adoração"],[45,"Redentor Onipotente","Redenção"],[46,"Um Pendão Real","Militância Cristã"],[47,"Rocha Eterna","Confiança"],[48,"O Dia do Triunfo","Segunda Vinda"],[49,"Aleluia! Já Creio","Fé"],[50,"Sempre Fiéis","Perseverança"],
    [51,"Adoração Reconhecida","Louvor e Adoração"],[52,"Tudo Está Bem","Paz e Confiança"],[53,"A Esperança da Igreja","Segunda Vinda"],[54,"Louvemos ao Redentor","Louvor e Adoração"],[55,"Mais Perto da Tua Cruz","Consagração"],[56,"Tudo em Cristo","Jesus Cristo"],[57,"Vivifica-nos Senhor","Avivamento"],[58,"Não Temas","Confiança"],[59,"Eu creio, Sim","Fé"],[60,"Exultação do Crente","Alegria"],
    [61,"Deus Tomará Conta de Ti","Confiança"],[62,"Achei Jesus","Conversão"],[63,"Acordai, Acordai","Avivamento"],[64,"De Todo o Mundo: Aleluia!","Louvor e Adoração"],[65,"Quem Irá?","Missões"],[66,"Pronto a Salvar","Convite"],[67,"Quem Quer ir Com Cristo?","Convite"],[68,"Gozo de Ter Salvação","Alegria"],[69,"Jesus Quebrou os Meus Grilhões","Libertação"],[70,"Cristo Vai Voltar","Segunda Vinda"],
    [71,"Santo és Tu, Senhor","Louvor e Adoração"],[72,"Rasgou-se o Véu","Redenção"],[73,"Vem, Vem a Mim","Convite"],[74,"Cristo Virá","Segunda Vinda"],[75,"Em Jesus Tens a Palma da Vitória","Vitória"],[76,"Vem, ó Pródigo","Convite"],[77,"Guarda o Contacto","Oração"],[78,"Meu Forte Redentor","Redenção"],[79,"Sua Graça Me Basta","Graça"],[80,"Cristo Te Chama","Convite"],
    [81,"Pode Salvar","Salvação"],[82,"Um Meigo Salvador","Jesus Cristo"],[83,"Não Posso Explicar","Testemunho"],[84,"O Grande Eu Sou","Deus Pai"],[85,"Deixai Entrar o Espírito","Espírito Santo"],[86,"Satisfeito com Cristo","Contentamento"],[87,"Meu Testemunho","Testemunho"],[88,"Revela a Nós Senhor","Oração"],[89,"Sublime e Grande Amor","Amor de Deus"],[90,"Há Paz e Alegria","Paz e Confiança"],
    [91,"Nívea Luz","Santificação"],[92,"O Bondoso Salvador","Jesus Cristo"],[93,"Há Trabalho Pronto","Serviço Cristão"],[94,"Na Jerusalém de Deus","Céu e Eternidade"],[95,"Ouve, ó Pecador","Convite"],[96,"Deixa Penetrar a Luz","Avivamento"],[97,"Há um Caminho Santo","Santificação"],[98,"Estarás Vigiando?","Segunda Vinda"],[99,"Eis o Dia a Declinar","Oração"],[100,"O Bom Consolador","Espírito Santo"],
    [101,"A Unção Real","Espírito Santo"],[102,"Crê na Promessa","Fé"],[103,"Caminhemos na Luz","Santificação"],[104,"Jesus Procura a Ovelha","Convite"],[105,"A Gloriosa Esperança","Segunda Vinda"],[106,"Viva Cristo","Louvor e Adoração"],[107,"Firme nas Promessas","Fé"],[108,"Pelejar Por Jesus","Militância Cristã"],[109,"Venha a Jesus","Convite"],[110,"Clama: Jesus, Jesus!","Oração"],
    [111,"Que Mudança!","Conversão"],[112,"O Nome Soberano","Jesus Cristo"],[113,"O Celeste Diretor","Espírito Santo"],[114,"Aceita o Perdão de Jesus","Convite"],[115,"Trabalhai e Orai","Serviço Cristão"],[116,"Livre Estou","Libertação"],[117,"O Senhor Salva","Salvação"],[118,"Face a Face","Céu e Eternidade"],[119,"Inesgotável é Seu Amor","Amor de Deus"],[120,"Noite de Paz","Natal"],
    [121,"Maravilhoso é Jesus","Jesus Cristo"],[122,"Fogo Divino","Espírito Santo"],[123,"Cristo Voltará","Segunda Vinda"],[124,"Adoração","Louvor e Adoração"],[125,"Quem Dera Hoje Vir!","Segunda Vinda"],[126,"Bem-Aventurança do Crente","Alegria"],[127,"O Senhor da Ceifa Chama","Missões"],[128,"Entrega o Teu Coração","Convite"],[129,"A Fonte Salvadora","Redenção"],[130,"Cristo é Meu!","Jesus Cristo"],
    [131,"De Valor Em Valor","Perseverança"],[132,"Obreiros do Senhor","Serviço Cristão"],[133,"No Rol do Livro","Céu e Eternidade"],[134,"Jesus à Porta do Coração","Convite"],[135,"O Nome Precioso","Jesus Cristo"],[136,"Jesus, Nosso Socorro","Jesus Cristo"],[137,"Liberto da Escravidão","Libertação"],[138,"Quem Bate é Jesus Cristo","Convite"],[139,"Jesus, Meu Eterno Redentor","Redenção"],[140,"A Segurança do Crente","Confiança"],
    [141,"Guiar-me Sempre, Meu Senhor","Confiança"],[142,"A Cidade Celeste","Céu e Eternidade"],[143,"O Verdadeiro Amigo","Jesus Cristo"],[144,"Vem à Assembléia de Deus","Igreja"],[145,"União do Crente Com Seu Senhor","Consagração"],[146,"Caminho Brilhante","Santificação"],[147,"Servir a Jesus","Serviço Cristão"],[148,"Bendirei a Jesus","Louvor e Adoração"],[149,"Canto do Pescador","Missões"],[150,"Para Casamentos","Casamento"],
    [151,"Fala Jesus Querido","Jesus Cristo"],[152,"Pela Cruz ao Céu Irei","Redenção"],[153,"Soldados de Cristo","Militância Cristã"],[154,"Doce Nome de Jesus","Jesus Cristo"],[155,"Imploramos Teu Poder","Oração"],[156,"A Ovelha Perdida","Convite"],[157,"Cristo, em Breve, Vem!","Segunda Vinda"],[158,"Que Farás de Jesus Cristo?","Convite"],[159,"Cantai, ó Peregrinos","Louvor e Adoração"],[160,"Deus Nos Quis Salvar","Salvação"],
    [161,"Navegando Pra Terra Celeste","Céu e Eternidade"],[162,"O Estandarte da Verdade","Militância Cristã"],[163,"Cristo Morreu Por Mim","Redenção"],[164,"Paz Luz e Amor","Paz e Confiança"],[165,"A Armadura Cristã","Militância Cristã"],[166,"Deixa Entrar o Rei da Glória","Louvor e Adoração"],[167,"As Testemunhas de Jesus","Testemunho"],[168,"Meus Irmãos, Nos Jubilemos","Alegria"],[169,"Oh! Jesus Me Ama","Amor de Deus"],[170,"Ao Calvário de Horror","Redenção"],
    [171,"Um Pecador Remido","Testemunho"],[172,"Ó Vem Te Entregar","Convite"],[173,"Os Santos Louvam Ao Senhor","Louvor e Adoração"],[174,"Glória, Aleluia, Gloria","Louvor e Adoração"],[175,"Irmãos Amados","Igreja"],[176,"Sacerdotes do Senhor","Consagração"],[177,"Salvo Estou","Testemunho"],[178,"Gloriosa Paz","Paz e Confiança"],[179,"Redentor Formoso","Jesus Cristo"],[180,"Em Cristo Fruímos a Paz","Paz e Confiança"],
    [181,"Vem, Celeste Redentor","Jesus Cristo"],[182,"Jesus no Getsêmane","Redenção"],[183,"Ressuscitou!","Ressurreição"],[184,"Meu Jesus! Meu Jesus!","Jesus Cristo"],[185,"Invocação e Louvor","Louvor e Adoração"],[186,"De Valor em Valor","Perseverança"],[187,"Mais Perto Meu Deus de Ti!","Consagração"],[188,"O Gozo do Céu","Céu e Eternidade"],[189,"Glória ao Salvador","Louvor e Adoração"],[190,"Cristo! Meu Cristo!","Jesus Cristo"],
    [191,"O Meu Jesus","Jesus Cristo"],[192,"Pelo Sangue","Redenção"],[193,"A Alma Abatida","Conforto"],[194,"O Senhor Ressoou","Louvor e Adoração"],[195,"O Rei Divino","Jesus Cristo"],[196,"Poder do Alto","Espírito Santo"],[197,"Bendito Salvador","Jesus Cristo"],[198,"Avante, Avante","Militância Cristã"],[199,"Precioso é Jesus","Jesus Cristo"],[200,"A Face Adorada de Jesus","Jesus Cristo"],
    [201,"Abençoador Divino","Deus Pai"],[210,"Coração Quebrantado","Arrependimento"],[220,"Graça Excelsa","Graça"],[230,"Cristo, Minha Rocha","Confiança"],[240,"Jesus é o Caminho","Jesus Cristo"],[250,"Há Poder no Sangue","Redenção"],[260,"Quero Estar ao Pé da Cruz","Consagração"],[270,"Conta as Bençãos","Gratidão"],[280,"Salvador, Salvador","Louvor e Adoração"],[290,"Jesus Logo Vem","Segunda Vinda"],
    [300,"Ao Deus de Abraão Louvai","Louvor e Adoração"],[310,"Preciosa Graça","Graça"],[320,"Jesus Meu Guia É","Confiança"],[330,"Eu Sei Que Ele Me Ouve","Oração"],[340,"Quando Eu Precisar","Confiança"],[350,"Vem Sobre Mim","Espírito Santo"],[360,"O Tempo de Segar","Missões"],[370,"Confiança em Deus","Fé"],[380,"Marchai Cristãos","Militância Cristã"],[390,"Avivamento","Avivamento"],
    [400,"Cristo Salva","Salvação"],[410,"Doce Comunhão","Igreja"],[420,"Meu Bom Pastor","Jesus Cristo"],[430,"Trabalhai na Seara","Serviço Cristão"],[440,"Cantarei ao Senhor","Louvor e Adoração"],[450,"Brilhando Por Jesus","Testemunho"],[460,"Promessas de Deus","Fé"],[470,"Salvação Plena","Salvação"],[480,"Fonte da Vida","Jesus Cristo"],[490,"Em Ti Confio","Confiança"],
    [500,"Louvem Todos ao Senhor","Louvor e Adoração"],[510,"Bendito Redentor","Redenção"],[520,"Maravilhosa Graça","Graça"],[525,"Porque Ele Vive","Ressurreição"],[530,"Espírito do Senhor","Espírito Santo"],[540,"Abra os Meus Olhos","Oração"],[550,"Paz, Paz, Doce Paz","Paz e Confiança"],[560,"Eu Navegarei","Confiança"],[570,"Renovo de Forças","Avivamento"],[580,"O Teu Santo Espírito","Espírito Santo"],
    [590,"Jesus Virá Outra Vez","Segunda Vinda"],[600,"Hosana ao Rei","Louvor e Adoração"],[610,"O Meu Senhor","Jesus Cristo"],[620,"Aleluia ao Cordeiro","Louvor e Adoração"],[630,"Lava-me ó Deus","Santificação"],[640,"Glória Eterna ao Senhor","Louvor e Adoração"]
  ];
  _h.forEach(function(h) {
    hinosHarpa.push({ numero: h[0], titulo: h[1], categoria: h[2], letra: _L });
  });
})();

// === SERMÕES ===
const sermoesData = [
  {
    id: 1, titulo: "A Fé que Move Montanhas", textoBase: "Mateus 17:20",
    dataCreacao: "2025-03-15", favorito: true,
    introducao: "Vivemos em um tempo onde muitos cristãos conhecem a teoria da fé, mas poucos experimentam o seu poder transformador. Jesus não nos chamou para uma religiosidade passiva, mas para uma fé viva que opera maravilhas.",
    topicos: [
      { titulo: "A natureza da fé genuína", conteudo: "A fé bíblica não é mero otimismo ou pensamento positivo. É a confiança plena no caráter e nas promessas de Deus, independente das circunstâncias visíveis. Hebreus 11:1 define: 'A fé é a certeza de coisas que se esperam, a convicção de fatos que se não veem.'" },
      { titulo: "As montanhas que precisam ser movidas", conteudo: "Jesus usa a metáfora da montanha para representar obstáculos aparentemente intransponíveis: doenças, crises familiares, problemas financeiros, vícios, relacionamentos destruídos. A fé não nega a existência dessas montanhas, mas declara a soberania de Deus sobre elas." },
      { titulo: "O grão de mostarda como princípio", conteudo: "Jesus diz que basta fé do tamanho de um grão de mostarda. A questão não é a quantidade de fé, mas a qualidade dela. Uma fé pequena em um Deus grande é suficiente. O grão de mostarda é a menor das sementes, mas cresce e se torna uma grande árvore." }
    ],
    conclusao: "Deus não nos pede uma fé perfeita, mas uma fé genuína. Hoje, identifique qual montanha precisa ser movida em sua vida e declare a Palavra do Senhor sobre ela. Não fique paralisado diante do problema; ande pela fé e não por vista.",
    referencias: ["Mateus 17:20", "Hebreus 11:1", "Marcos 11:23-24", "2 Coríntios 5:7"]
  },
  {
    id: 2, titulo: "O Fruto do Espírito na Vida Prática", textoBase: "Gálatas 5:22-23",
    dataCreacao: "2025-03-22", favorito: true,
    introducao: "Paulo lista nove qualidades que formam o fruto do Espírito Santo. Não são nove frutos separados, mas um único fruto com nove características, como uma laranja com nove gomos.",
    topicos: [
      { titulo: "Amor, alegria e paz — a base interior", conteudo: "Essas três qualidades formam a base do caráter cristão. O amor de Deus derramado em nosso coração gera alegria genuína e paz que ultrapassa todo entendimento. Não dependem de circunstâncias, mas da presença do Espírito." },
      { titulo: "Paciência, benignidade e bondade — o relacionamento com o próximo", conteudo: "Essas qualidades se manifestam no convívio diário. Paciência para suportar, benignidade para tratar bem, bondade para fazer o bem. São marcas visíveis de alguém que anda no Espírito." },
      { titulo: "Fidelidade, mansidão e domínio próprio — a maturidade", conteudo: "Fidelidade nos compromissos, mansidão diante das provocações e domínio próprio sobre impulsos. Essa tríade revela a maturidade espiritual e é a marca de um discípulo maduro." }
    ],
    conclusao: "O fruto do Espírito não é produzido por esforço humano, mas pela permanência em Cristo. Permaneça na videira e o fruto será natural.",
    referencias: ["Gálatas 5:22-23", "João 15:4-5", "Romanos 8:6"]
  },
  {
    id: 3, titulo: "O Poder da Oração Perseverante", textoBase: "Lucas 18:1-8",
    dataCreacao: "2025-04-01", favorito: false,
    introducao: "Jesus contou a parábola da viúva e do juiz iníquo com um propósito claro: ensinar que devemos orar sempre e nunca desistir. A oração não é um último recurso, mas a primeira atitude do cristão.",
    topicos: [
      { titulo: "A viúva como exemplo de persistência", conteudo: "A viúva não tinha recursos, não tinha influência, não tinha poder. Mas tinha persistência. Ela não desistiu de clamar por justiça. Sua arma era a insistência. Quantas vezes desistimos na primeira tentativa?" },
      { titulo: "O juiz iníquo e a lição do contraste", conteudo: "Se um juiz injusto, que não teme a Deus nem respeita os homens, cede diante da persistência, quanto mais o nosso Deus justo e amoroso responderá aos seus filhos que clamam dia e noite?" },
      { titulo: "Quando Deus parece silencioso", conteudo: "O silêncio de Deus não é ausência. Muitas vezes, Deus está trabalhando nos bastidores enquanto oramos. O tempo de espera é tempo de preparação. Deus não está atrasado; Ele é pontual." }
    ],
    conclusao: "Não desista de orar. A resposta pode estar mais perto do que você imagina. O mesmo Deus que ouviu a viúva ouve você hoje.",
    referencias: ["Lucas 18:1-8", "1 Tessalonicenses 5:17", "Mateus 7:7-8"]
  },
  {
    id: 4, titulo: "Servindo com Excelência no Reino", textoBase: "Colossenses 3:23-24",
    dataCreacao: "2025-04-05", favorito: false,
    introducao: "Servir no Reino de Deus não é sobre posição ou destaque, mas sobre disposição e fidelidade. Paulo ensina que tudo o que fizermos deve ser feito de coração, como ao Senhor.",
    topicos: [
      { titulo: "Excelência não é perfeccionismo", conteudo: "Excelência é dar o seu melhor com os recursos que você tem. Perfeccionismo paralisa; excelência mobiliza. Deus não espera perfeição, mas dedicação genuína em cada serviço, seja ele grande ou pequeno." },
      { titulo: "Servir como unto ao Senhor", conteudo: "Quando servimos com a consciência de que estamos servindo ao Senhor, a motivação muda completamente. Não servimos para agradar homens ou buscar reconhecimento, mas como expressão de gratidão ao Deus que nos salvou." }
    ],
    conclusao: "Que possamos servir com alegria, dedicação e excelência, sabendo que do Senhor receberemos a recompensa da herança.",
    referencias: ["Colossenses 3:23-24", "Mateus 25:21", "1 Coríntios 15:58"]
  }
];

// === CERIMONIAL BÍBLICO (Roteiros Completos) ===
const cerimonialData = [
  { id: 1, icone: "🍞", cor: "#8B4513", categoria: "Santa Ceia", descricao: "Celebração da morte e ressurreição de Cristo", roteiro: `<h3>Celebração da Santa Ceia do Senhor</h3><h4>1. Abertura</h4><p>Queridos irmãos e irmãs, estamos reunidos neste momento solene para celebrar a Ceia do Senhor, conforme Ele mesmo nos ordenou na noite em que foi traído.</p><p>A Ceia do Senhor é um memorial do sacrifício de Cristo. Ao participar, proclamamos a morte do Senhor até que Ele venha.</p><h4>2. Leitura Bíblica</h4><p><strong>1 Coríntios 11:23-29</strong></p><p><em>"Porque eu recebi do Senhor o que também vos ensinei: que o Senhor Jesus, na noite em que foi traído, tomou o pão; e, tendo dado graças, o partiu e disse: Tomai, comei; isto é o meu corpo que é partido por vós; fazei isto em memória de mim. Semelhantemente também, depois de cear, tomou o cálice, dizendo: Este cálice é o Novo Testamento no meu sangue; fazei isto, todas as vezes que beberdes, em memória de mim. Porque, todas as vezes que comerdes este pão e beberdes este cálice, anunciais a morte do Senhor, até que venha."</em></p><h4>3. Momento de Auto-Exame</h4><p>Neste momento, convido cada um a examinar seu coração diante de Deus. Se há algum pecado não confessado, confesse-o agora. Se há mágoa contra alguém, perdoe. Aproxime-se da mesa do Senhor com o coração limpo.</p><p><em>(Momento de silêncio — 1 minuto)</em></p><h4>4. Oração pelo Pão</h4><p>"Senhor, nosso Deus, agradecemos pelo corpo de Cristo que foi entregue por nós na cruz do Calvário. Este pão representa o corpo do Senhor Jesus, que foi moído pelas nossas transgressões. Abençoa este pão e que, ao participarmos, lembremo-nos do Teu sacrifício. Amém."</p><p><em>(Distribui-se o pão. Todos comem juntos.)</em></p><h4>5. Oração pelo Cálice</h4><p>"Senhor, agradecemos pelo sangue precioso de Jesus, derramado para remissão dos nossos pecados. Este cálice representa a Nova Aliança no sangue do Cordeiro. Pelo Teu sangue fomos purificados e reconciliados contigo. Abençoa este cálice. Amém."</p><p><em>(Distribui-se o cálice. Todos bebem juntos.)</em></p><h4>6. Encerramento</h4><p>"Quão grande é o amor do Senhor por nós! Ele entregou tudo para que pudéssemos ter vida e vida em abundância. Saiamos desta mesa renovados e gratos."</p><p><em>Hino sugerido: Harpa Cristã nº 22 — "Ceia do Senhor"</em></p><p>Oração final de gratidão e consagração.</p>` },
  { id: 2, icone: "💧", cor: "#1E90FF", categoria: "Batismo nas Águas", descricao: "Sacramento do batismo por imersão", roteiro: `<h3>Celebração do Batismo nas Águas</h3><h4>1. Abertura</h4><p>Amados irmãos, estamos reunidos para celebrar um dos atos mais significativos da vida cristã: o batismo nas águas.</p><p>O batismo é símbolo da morte, sepultamento e ressurreição com Cristo. Ao descer às águas, o candidato declara publicamente que morreu para o mundo; ao ser levantado, declara que ressuscitou para uma nova vida em Cristo.</p><h4>2. Base Bíblica</h4><p><strong>Mateus 28:19</strong> — <em>"Portanto, ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo."</em></p><p><strong>Romanos 6:4</strong> — <em>"De sorte que fomos sepultados com ele pelo batismo na morte; para que, como Cristo ressuscitou dos mortos pela glória do Pai, assim andemos nós também em novidade de vida."</em></p><p><strong>Atos 2:38</strong> — <em>"Arrependei-vos, e cada um de vós seja batizado em nome de Jesus Cristo para perdão dos pecados, e recebereis o dom do Espírito Santo."</em></p><h4>3. Confissão de Fé</h4><p>O celebrante dirige as seguintes perguntas ao candidato:</p><ol><li><strong>"Você crê no Senhor Jesus Cristo como seu único e suficiente Salvador?"</strong><br><em>— O candidato responde: "Sim, eu creio."</em></li><li><strong>"Você se arrepende de seus pecados e deseja viver uma nova vida em Cristo?"</strong><br><em>— "Sim, me arrependo."</em></li><li><strong>"Você aceita seguir a Jesus Cristo como Senhor de sua vida, obedecendo à Sua Palavra?"</strong><br><em>— "Sim, aceito."</em></li></ol><h4>4. Ato Batismal</h4><p>O celebrante coloca a mão nas costas do candidato e declara:</p><p><em>"[Nome do candidato], baseado na sua confissão de fé, e obedecendo à ordem do nosso Senhor Jesus Cristo, eu te batizo em nome do Pai, do Filho e do Espírito Santo. Amém."</em></p><p><em>(Imersão completa do candidato.)</em></p><h4>5. Recepção</h4><p>A igreja recebe o novo batizado com aplausos e abraços. Pode-se cantar um hino congregacional.</p><p><em>Hinos sugeridos: Harpa Cristã nº 177 ("Salvo Estou") ou nº 62 ("Achei Jesus")</em></p><h4>6. Oração Final</h4><p>Oração de bênção sobre todos os batizados, pedindo que o Espírito Santo os guie em nova vida.</p>` },
  { id: 3, icone: "💍", cor: "#FFD700", categoria: "Casamento Cristão", descricao: "Cerimônia matrimonial cristã completa", roteiro: `<h3>Cerimônia de Casamento Cristão</h3><h4>1. Entrada e Abertura</h4><p>O celebrante recebe os noivos no altar e declara:</p><p>"Amados, estamos reunidos na presença de Deus e destas testemunhas para celebrar a sagrada união matrimonial entre <strong>[Nome do Noivo]</strong> e <strong>[Nome da Noiva]</strong>."</p><p>"O casamento foi instituído por Deus no jardim do Éden, quando disse: 'Não é bom que o homem esteja só; far-lhe-ei uma adjutora que esteja como diante dele' (Gênesis 2:18)."</p><h4>2. Leitura Bíblica</h4><p><strong>Gênesis 2:24</strong> — <em>"Portanto, deixará o homem o seu pai e a sua mãe, e apegar-se-á à sua mulher, e serão ambos uma carne."</em></p><p><strong>1 Coríntios 13:4-8a</strong> — <em>"O amor é paciente, é benigno; o amor não arde em ciúmes, não se ufana, não se ensoberbece, não se conduz inconvenientemente, não busca os seus próprios interesses, não se exaspera, não se ressente do mal; não se alegra com a injustiça, mas se regozija com a verdade; tudo sofre, tudo crê, tudo espera, tudo suporta. O amor jamais acaba."</em></p><h4>3. Mensagem Pastoral</h4><p><em>(O celebrante dirige breve mensagem sobre o significado do casamento cristão, o amor sacrificial e o compromisso diante de Deus — 5 a 10 minutos)</em></p><h4>4. Votos Matrimoniais</h4><p>O celebrante pergunta ao noivo:</p><p>"<strong>[Nome do Noivo]</strong>, você aceita <strong>[Nome da Noiva]</strong> como sua legítima esposa, prometendo amá-la, honrá-la e respeitá-la, em saúde e na doença, na alegria e na tristeza, até que a morte os separe?"</p><p><em>— "Sim, aceito."</em></p><p>O celebrante pergunta à noiva:</p><p>"<strong>[Nome da Noiva]</strong>, você aceita <strong>[Nome do Noivo]</strong> como seu legítimo esposo, prometendo amá-lo, honrá-lo e respeitá-lo, em saúde e na doença, na alegria e na tristeza, até que a morte os separe?"</p><p><em>— "Sim, aceito."</em></p><h4>5. Bênção e Troca das Alianças</h4><p>O celebrante abençoa as alianças:</p><p>"Senhor, abençoa estas alianças como símbolo do pacto eterno de amor entre estes cônjuges."</p><p>Os noivos trocam as alianças dizendo: <em>"Receba esta aliança como sinal do meu amor e fidelidade. Em nome do Pai, do Filho e do Espírito Santo."</em></p><h4>6. Declaração</h4><p>"O que Deus ajuntou, não separe o homem. Pela autoridade que me é conferida como ministro do Evangelho, eu vos declaro <strong>marido e mulher</strong>. Pode beijar a noiva."</p><h4>7. Oração Final e Bênção</h4><p>"Que o Senhor abençoe este lar. Que o amor de Cristo seja o fundamento desta família. Amém."</p>` },
  { id: 4, icone: "🕊️", cor: "#4169E1", categoria: "Apresentação de Crianças", descricao: "Dedicação e bênção sobre os pequeninos", roteiro: `<h3>Apresentação e Dedicação de Crianças</h3><h4>1. Abertura</h4><p>"Deixai vir a mim os pequeninos e não os impeçais, porque de tais é o Reino dos céus." — Jesus Cristo (Mateus 19:14)</p><p>Amados, estamos reunidos para apresentar ao Senhor a criança <strong>[Nome da Criança]</strong>, filho(a) de <strong>[Nome dos Pais]</strong>, dedicando-a a Deus e invocando sobre ela a bênção divina.</p><h4>2. Leitura Bíblica</h4><p><strong>1 Samuel 1:27-28</strong> — <em>"Por este menino orava eu, e o Senhor me concedeu a minha petição que eu lhe havia pedido. Pelo que eu também o entreguei ao Senhor; por todos os dias que viver, será emprestado ao Senhor."</em></p><p><strong>Provérbios 22:6</strong> — <em>"Instrui o menino no caminho em que deve andar, e, até quando envelhecer, não se desviará dele."</em></p><p><strong>Salmo 127:3</strong> — <em>"Eis que os filhos são herança do Senhor, e o fruto do ventre, o seu galardão."</em></p><h4>3. Compromisso dos Pais</h4><p>O celebrante pergunta aos pais:</p><ol><li><strong>"Vocês reconhecem que esta criança é uma dádiva de Deus e se comprometem a criá-la nos caminhos do Senhor?"</strong><br><em>— "Sim, nos comprometemos."</em></li><li><strong>"Vocês se comprometem a ensiná-la a Palavra de Deus, orar por ela diariamente e ser exemplo de vida cristã?"</strong><br><em>— "Sim, nos comprometemos."</em></li><li><strong>"Vocês se comprometem a trazê-la à casa de Deus para crescer na fé e na comunhão?"</strong><br><em>— "Sim, nos comprometemos."</em></li></ol><h4>4. Compromisso da Igreja</h4><p>"E vocês, como igreja do Senhor, se comprometem a apoiar esta família, orar por esta criança e ajudar a instruí-la nos caminhos do Senhor?"</p><p><em>— A congregação responde: "Sim, nos comprometemos."</em></p><h4>5. Oração de Dedicação</h4><p>O celebrante toma a criança nos braços (ou impõe as mãos) e ora:</p><p><em>"Senhor Deus, nós Te apresentamos [Nome da Criança]. Abençoa esta vida. Protege-a de todo mal. Concede-lhe saúde, sabedoria e temor do Senhor. Que ela cresça para a Tua glória. Em nome de Jesus. Amém."</em></p><h4>6. Entrega do Certificado</h4><p>O celebrante entrega o certificado de apresentação aos pais e a igreja recebe a família com aplausos.</p>` },
  { id: 5, icone: "⚱️", cor: "#4A4A4A", categoria: "Funeral / Culto Fúnebre", descricao: "Liturgia completa para cerimônias fúnebres", roteiro: `<h3>Culto Fúnebre Cristão</h3><h4>1. Abertura</h4><p>"Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá." — Jesus Cristo (João 11:25)</p><p>Amados irmãos, estamos reunidos para prestar as últimas homenagens e confortar a família de <strong>[Nome do Falecido(a)]</strong>, que partiu para a eternidade.</p><h4>2. Oração Inicial</h4><p>"Senhor, Tu és o nosso refúgio e fortaleza, socorro bem presente na angústia. Consola esta família. Enxuga suas lágrimas. Dá-lhes a paz que excede todo entendimento. Em nome de Jesus. Amém."</p><h4>3. Leituras de Conforto</h4><p><strong>Salmo 23</strong> — <em>"O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas. Refrigera a minha alma..."</em></p><p><strong>João 14:1-3</strong> — <em>"Não se turbe o vosso coração; credes em Deus, crede também em mim. Na casa de meu Pai há muitas moradas. Vou preparar-vos lugar."</em></p><p><strong>Apocalipse 21:4</strong> — <em>"E Deus limpará de seus olhos toda lágrima, e não haverá mais morte, nem pranto, nem clamor, nem dor."</em></p><p><strong>2 Coríntios 5:1</strong> — <em>"Sabemos que, se a nossa casa terrestre se desfizer, temos de Deus um edifício, uma casa não feita por mãos, eterna, nos céus."</em></p><h4>4. Homenagem</h4><p><em>(Momento para familiares e amigos compartilharem memórias e testemunhos sobre a vida do(a) falecido(a). Limitar a 3-5 depoimentos breves.)</em></p><h4>5. Mensagem de Esperança</h4><p><em>(O pastor prega uma mensagem de consolo com foco na esperança da ressurreição e na fidelidade de Deus — 10 a 15 minutos.)</em></p><p>Textos sugeridos: 1 Tessalonicenses 4:13-18, Filipenses 1:21, Romanos 8:38-39.</p><h4>6. Oração pelos Enlutados</h4><p>"Pai celestial, abraça esta família com o Teu amor. Que o Consolador, o Espírito Santo, traga paz aos corações enlutados. Dá-lhes forças para os dias que virão. Amém."</p><h4>7. Bênção Final</h4><p>"Que a graça do Senhor Jesus Cristo, o amor de Deus e a comunhão do Espírito Santo estejam com todos vocês. Amém." (2 Coríntios 13:14)</p>` },
  { id: 6, icone: "🙏", cor: "#8B0000", categoria: "Ordenação Ministerial", descricao: "Consagração de pastores e ministros", roteiro: `<h3>Cerimônia de Ordenação Ministerial</h3><h4>1. Abertura</h4><p><strong>Efésios 4:11-12</strong> — <em>"E Ele mesmo deu uns para apóstolos, e outros para profetas, e outros para evangelistas, e outros para pastores e doutores, querendo o aperfeiçoamento dos santos, para a obra do ministério, para edificação do corpo de Cristo."</em></p><p>Estamos reunidos para consagrar ao ministério o(a) irmão(ã) <strong>[Nome do Candidato]</strong>, reconhecendo o chamado de Deus em sua vida.</p><h4>2. Leitura Bíblica</h4><p><strong>1 Timóteo 3:1-7</strong> — Qualificações do bispo/pastor.</p><p><strong>2 Timóteo 4:1-5</strong> — <em>"Prega a palavra, insta a tempo e fora de tempo, repreende, corrige, exorta com toda longanimidade e ensino."</em></p><h4>3. Exame do Candidato</h4><ol><li>"Você crê que foi chamado por Deus para o ministério da Palavra?"</li><li>"Você se compromete a pregar fielmente as Escrituras?"</li><li>"Você se compromete a pastorear o rebanho com amor, dedicação e integridade?"</li><li>"Você se compromete a viver de maneira digna do Evangelho?"</li><li>"Você se submete à autoridade da igreja e à comunhão dos irmãos?"</li></ol><p><em>— O candidato responde afirmativamente a cada pergunta.</em></p><h4>4. Imposição de Mãos</h4><p>Os ministros presentes se aproximam e impõem as mãos sobre o candidato, conforme <strong>1 Timóteo 4:14</strong>.</p><p><em>(Momento de oração — todos os ministros oram pelo candidato.)</em></p><h4>5. Entrega da Bíblia</h4><p>"Receba esta Bíblia como símbolo da Palavra que você deve pregar fielmente. Que ela seja a sua espada e o seu guia."</p><h4>6. Declaração</h4><p>"Diante de Deus e destas testemunhas, declaramos que o(a) irmão(ã) <strong>[Nome]</strong> está consagrado(a) ao ministério do Evangelho."</p><h4>7. Oração de Consagração e Bênção</h4><p>Oração congregacional e bênção apostólica final.</p>` },
  { id: 7, icone: "🏠", cor: "#228B22", categoria: "Inauguração / Dedicação", descricao: "Dedicação de templos e propriedades", roteiro: `<h3>Dedicação de Templos e Propriedades</h3><h4>1. Abertura</h4><p><strong>Salmo 127:1</strong> — <em>"Se o Senhor não edificar a casa, em vão trabalham os que a edificam."</em></p><p>Amados, estamos reunidos para dedicar este <strong>[templo/salão/propriedade]</strong> ao serviço do Senhor e à edificação do Seu povo.</p><h4>2. Histórico</h4><p><em>(Breve relato sobre a construção ou aquisição, os desafios superados e o envolvimento da comunidade.)</em></p><h4>3. Leitura Bíblica</h4><p><strong>2 Crônicas 7:15-16</strong> — <em>"Agora estarão abertos os meus olhos e atentos os meus ouvidos à oração que se fizer neste lugar. Porque agora escolhi e santifiquei esta casa, para que o meu nome esteja nela perpetuamente."</em></p><p><strong>Salmo 122:1</strong> — <em>"Alegrei-me quando me disseram: Vamos à casa do Senhor."</em></p><h4>4. Ato de Dedicação</h4><p>"Neste dia, dedicamos este lugar ao Senhor. Que aqui a Palavra seja pregada com poder, vidas sejam transformadas, enfermos curados e cativos libertados."</p><h4>5. Oração de Consagração</h4><p><em>(Imposição de mãos sobre as paredes, portas ou chaves, pedindo a presença e bênção de Deus.)</em></p><h4>6. Bênção Final</h4><p>"Que todo aquele que entrar neste lugar sinta a presença de Deus e saia transformado. Amém."</p>` }
];

// === DICIONÁRIO BÍBLICO (100+ termos A-Z) ===
const dicionarioData = [
  { termo:"Ágape", categoria:"Conceito Teológico", definicao:"Amor incondicional e sacrificial de Deus. Diferente de eros (romântico) e philia (fraternal), ágape é o amor que dá sem esperar retorno. Manifesta-se na cruz de Cristo (Jo 3:16) e deve ser a marca dos discípulos (1 Jo 4:8)." },
  { termo:"Aliança", categoria:"Conceito Teológico", definicao:"Acordo solene entre Deus e seu povo. A Bíblia registra alianças com Noé (arco-íris), Abraão (descendência), Moisés (Lei), Davi (trono eterno) e a Nova Aliança em Cristo, selada pelo seu sangue (Lc 22:20)." },
  { termo:"Amém", categoria:"Termo Litúrgico", definicao:"Do hebraico, significa 'assim seja' ou 'é verdade'. Usado para confirmar orações, bênçãos e declarações de fé. Jesus o usava no início de sentenças ('Em verdade, em verdade vos digo') para enfatizar a autoridade de suas palavras." },
  { termo:"Anjo", categoria:"Ser Espiritual", definicao:"Do grego 'angelos', significa mensageiro. Seres espirituais criados por Deus para servi-lo e ministrar aos que herdam a salvação (Hb 1:14). A Bíblia menciona anjos nomeados como Miguel (arcanjo) e Gabriel." },
  { termo:"Apocalipse", categoria:"Gênero Literário", definicao:"Do grego 'apokalypsis', significa revelação. Último livro da Bíblia, escrito pelo apóstolo João na ilha de Patmos. Contém visões proféticas sobre o fim dos tempos, a vitória de Cristo e a nova criação." },
  { termo:"Apóstolo", categoria:"Ofício Ministerial", definicao:"Do grego 'apostolos', significa enviado. Originalmente os 12 discípulos escolhidos por Jesus. Paulo também recebeu esse título. Eram testemunhas diretas da ressurreição e responsáveis por estabelecer a doutrina da Igreja." },
  { termo:"Arca da Aliança", categoria:"Objeto Sagrado", definicao:"Cofre de madeira de acácia revestido de ouro, contendo as tábuas da Lei, o vaso de maná e a vara de Arão. Ficava no Santo dos Santos do Tabernáculo/Templo e simbolizava a presença de Deus (Êx 25:10-22)." },
  { termo:"Arrebatamento", categoria:"Escatologia", definicao:"Evento futuro em que Cristo virá buscar a Igreja. Os mortos em Cristo ressuscitarão e os vivos serão transformados, encontrando-se com o Senhor nos ares (1 Ts 4:16-17). Tema central da esperança escatológica." },
  { termo:"Arrependimento", categoria:"Conceito Teológico", definicao:"Do grego 'metanoia', significa mudança de mente e direção. Envolve reconhecer o pecado, sentir tristeza genuína e mudar de atitude. É o primeiro passo para a salvação, conforme pregado por João Batista e Jesus (Mc 1:15)." },
  { termo:"Batismo", categoria:"Sacramento", definicao:"Do grego 'baptizo', significa mergulhar ou imergir. Ato simbólico de morte, sepultamento e ressurreição com Cristo (Rm 6:4). Representa a identificação pública do crente com Jesus." },
  { termo:"Batismo no Espírito Santo", categoria:"Doutrina Pentecostal", definicao:"Experiência distinta do novo nascimento, em que o crente é revestido de poder para testemunhar (At 1:8). Evidenciado pelo falar em línguas (At 2:4) e por outros dons espirituais." },
  { termo:"Bênção", categoria:"Conceito Teológico", definicao:"Favor, proteção e prosperidade concedidos por Deus. Na Bíblia, bênçãos podem ser espirituais (Ef 1:3) ou materiais. Também refere-se ao ato de invocar o favor divino sobre alguém." },
  { termo:"Bíblia", categoria:"Escrituras", definicao:"Do grego 'biblia' (livros). Coleção de 66 livros (39 AT + 27 NT) escritos ao longo de 1.500 anos por ~40 autores. Considerada pelos cristãos como Palavra inspirada de Deus (2 Tm 3:16)." },
  { termo:"Calvário", categoria:"Lugar Bíblico", definicao:"Do latim 'calvaria' (caveira), tradução do aramaico Gólgota. Local fora de Jerusalém onde Jesus foi crucificado. Simboliza o sacrifício redentor de Cristo pela humanidade." },
  { termo:"Cânon", categoria:"Estudo Bíblico", definicao:"Lista oficial dos livros reconhecidos como Escritura Sagrada. O cânon protestante contém 66 livros cuja inspiração divina foi reconhecida pela Igreja primitiva através de critérios como apostolicidade e uso litúrgico." },
  { termo:"Carismata", categoria:"Conceito Teológico", definicao:"Plural de carisma, do grego 'charisma' (dom gratuito). Refere-se aos dons espirituais concedidos pelo Espírito Santo para edificação da Igreja (1 Co 12:4-11): profecia, cura, línguas, sabedoria, etc." },
  { termo:"Concerto", categoria:"Conceito Teológico", definicao:"Sinônimo de aliança. Acordo entre Deus e seu povo. A Nova Aliança em Cristo supera a Antiga, oferecendo perdão definitivo e acesso direto a Deus (Hb 8:6-13)." },
  { termo:"Conversão", categoria:"Experiência Cristã", definicao:"Mudança radical de direção na vida. Envolve arrepender-se dos pecados e voltar-se para Deus em fé. É o momento em que a pessoa aceita Cristo como Salvador e Senhor (At 3:19)." },
  { termo:"Corpo de Cristo", categoria:"Eclesiologia", definicao:"Metáfora usada por Paulo para descrever a Igreja. Cristo é a cabeça e cada crente é um membro com função específica. Enfatiza a unidade na diversidade (1 Co 12:12-27)." },
  { termo:"Cruz", categoria:"Símbolo Cristão", definicao:"Instrumento de execução romana que se tornou o símbolo central do cristianismo. Na cruz, Jesus consumou a obra de redenção, reconciliando a humanidade com Deus (Cl 1:20)." },
  { termo:"Diácono", categoria:"Ofício Ministerial", definicao:"Do grego 'diakonos' (servo). Ofício eclesiástico instituído em Atos 6:1-6 para servir às necessidades práticas da igreja. Requisitos descritos em 1 Timóteo 3:8-13." },
  { termo:"Discípulo", categoria:"Vida Cristã", definicao:"Do latim 'discipulus' (aprendiz). Seguidor que aprende e pratica os ensinamentos de seu mestre. Jesus chamou 12 apóstolos e comissionou todos os crentes a fazer discípulos (Mt 28:19-20)." },
  { termo:"Dízimo", categoria:"Prática Eclesiástica", definicao:"A décima parte da renda consagrada a Deus (Lv 27:30). No NT, o princípio da generosidade é ampliado: dar com alegria e conforme a prosperidade (2 Co 9:7)." },
  { termo:"Dons Espirituais", categoria:"Pneumatologia", definicao:"Capacitações sobrenaturais concedidas pelo Espírito Santo. Paulo lista dons em 1 Co 12, Rm 12 e Ef 4. Incluem profecia, ensino, cura, línguas, interpretação, sabedoria, entre outros." },
  { termo:"Escatologia", categoria:"Doutrina", definicao:"Estudo das últimas coisas: segunda vinda de Cristo, arrebatamento, tribulação, milênio, juízo final e eternidade. Diversas tradições interpretam esses eventos de formas distintas." },
  { termo:"Espírito Santo", categoria:"Pneumatologia", definicao:"Terceira Pessoa da Trindade. Convence do pecado (Jo 16:8), regenera (Jo 3:5-6), habita no crente (1 Co 6:19), concede dons (1 Co 12), produz fruto (Gl 5:22) e guia à verdade (Jo 16:13)." },
  { termo:"Eucaristia", categoria:"Sacramento", definicao:"Do grego 'eucharistia' (ação de graças). Nome dado à Santa Ceia em muitas tradições. Celebração do sacrifício de Cristo com pão e vinho, conforme instituído na última ceia (1 Co 11:23-26)." },
  { termo:"Evangelho", categoria:"Conceito Teológico", definicao:"Do grego 'euangelion' (boa notícia). A mensagem central do cristianismo: Deus enviou seu Filho para salvar a humanidade. Também se refere aos quatro livros que narram a vida de Jesus (Mateus, Marcos, Lucas, João)." },
  { termo:"Expiação", categoria:"Doutrina", definicao:"Ato de cobrir ou remover o pecado. No AT, realizada pelo sacrifício de animais no Dia da Expiação. No NT, Cristo é o sacrifício perfeito e definitivo (Hb 9:12), reconciliando Deus e a humanidade." },
  { termo:"Fariseu", categoria:"Grupo Religioso", definicao:"Seita judaica que enfatizava a observância estrita da Lei e das tradições orais. Jesus os criticou por seu legalismo e hipocrisia (Mt 23). Nicodemus e Paulo eram fariseus antes da conversão." },
  { termo:"Fé", categoria:"Conceito Teológico", definicao:"Certeza de coisas que se esperam, convicção de fatos que não se veem (Hb 11:1). Meio pelo qual recebemos a salvação (Ef 2:8). Não é mero assentimento intelectual, mas confiança viva." },
  { termo:"Fruto do Espírito", categoria:"Pneumatologia", definicao:"Qualidades produzidas pelo Espírito Santo na vida do crente: amor, alegria, paz, paciência, benignidade, bondade, fidelidade, mansidão e domínio próprio (Gl 5:22-23)." },
  { termo:"Gentios", categoria:"Povo", definicao:"Termo usado para designar todos os povos não-judeus. No NT, o evangelho rompe barreiras étnicas: em Cristo não há judeu nem gentio (Gl 3:28). Paulo foi chamado de 'apóstolo dos gentios'." },
  { termo:"Glória de Deus", categoria:"Conceito Teológico", definicao:"Manifestação visível da majestade, poder e santidade de Deus. No AT, aparecia como nuvem e fogo (Êx 40:34). No NT, a glória se manifesta plenamente em Jesus Cristo (Jo 1:14)." },
  { termo:"Graça", categoria:"Conceito Teológico", definicao:"Favor imerecido de Deus. É o amor de Deus em ação, oferecendo salvação sem mérito humano (Ef 2:8-9). Fundamento de toda a teologia cristã e motivação para a vida piedosa." },
  { termo:"Hermenêutica", categoria:"Estudo Bíblico", definicao:"Ciência e arte de interpretar textos bíblicos. Envolve princípios para compreender o significado original dentro do contexto histórico, cultural e literário. Essencial para leitura correta das Escrituras." },
  { termo:"Holocausto", categoria:"Sacrifício", definicao:"Oferenda em que o animal era completamente queimado sobre o altar (Lv 1). Simbolizava total consagração a Deus. Prefigurava o sacrifício completo de Cristo na cruz." },
  { termo:"Idolatria", categoria:"Pecado", definicao:"Adoração a qualquer coisa no lugar de Deus. Proibida nos Dez Mandamentos (Êx 20:3-5). No NT, inclui avareza e qualquer coisa que tome o lugar de Deus no coração (Cl 3:5)." },
  { termo:"Igreja", categoria:"Eclesiologia", definicao:"Do grego 'ekklesia' (assembleia dos chamados). Comunidade dos que creem em Cristo. Pode referir-se à Igreja universal (todos os salvos) ou à igreja local (congregação particular). Corpo de Cristo (Ef 1:22-23)." },
  { termo:"Imposição de Mãos", categoria:"Prática Litúrgica", definicao:"Gesto bíblico de transmissão de bênção, autoridade ou dons espirituais. Praticado na ordenação ministerial (1 Tm 4:14), cura dos enfermos (Mc 16:18) e batismo no Espírito." },
  { termo:"Intercessão", categoria:"Oração", definicao:"Oração em favor de outras pessoas. Jesus é nosso intercessor junto ao Pai (Hb 7:25). O Espírito Santo intercede por nós (Rm 8:26). Paulo pedia intercessão das igrejas (Ef 6:18-19)." },
  { termo:"Jerusalém", categoria:"Lugar Bíblico", definicao:"Cidade santa, capital do reino de Israel. Local do Templo de Salomão, da crucificação e ressurreição de Jesus, e do Pentecostes. A Bíblia também fala da Nova Jerusalém celestial (Ap 21)." },
  { termo:"Jesus Cristo", categoria:"Cristologia", definicao:"Filho de Deus, segunda Pessoa da Trindade, que se fez homem (Jo 1:14). Nome 'Jesus' (Deus salva) indica sua missão; 'Cristo' (Ungido) indica sua natureza messiânica. Salvador e Senhor da humanidade." },
  { termo:"Justificação", categoria:"Doutrina", definicao:"Ato judicial de Deus pelo qual o pecador é declarado justo pela fé em Cristo (Rm 5:1). Ato único e instantâneo que muda a posição do crente diante de Deus. Base da paz com Deus." },
  { termo:"Kerygma", categoria:"Conceito Teológico", definicao:"Do grego, significa 'proclamação'. Refere-se ao conteúdo central da pregação apostólica: a morte, ressurreição e senhorio de Jesus Cristo, e o chamado ao arrependimento e fé." },
  { termo:"Koinonia", categoria:"Conceito Teológico", definicao:"Comunhão, participação ou parceria. No NT, descreve a comunhão íntima entre cristãos e com Deus. A igreja primitiva praticava compartilhando bens, orações e o partir do pão (At 2:42-47)." },
  { termo:"Lei", categoria:"Conceito Teológico", definicao:"Os mandamentos dados por Deus a Moisés no Sinai. Inclui a Lei Moral (Dez Mandamentos), cerimonial e civil. Em Cristo, a Lei encontra seu cumprimento (Mt 5:17). Os crentes vivem sob a graça (Rm 6:14)." },
  { termo:"Levita", categoria:"Grupo Religioso", definicao:"Membro da tribo de Levi, designada para o serviço no Tabernáculo/Templo. Incluía sacerdotes (descendentes de Arão) e auxiliares. Não receberam herança territorial, pois o Senhor era sua herança (Nm 18:20)." },
  { termo:"Logos", categoria:"Cristologia", definicao:"Do grego: 'palavra' ou 'razão'. Em João 1:1-14, Jesus é o Logos — a Palavra eterna que se fez carne. Revela a natureza divina e pré-existente de Cristo." },
  { termo:"Maná", categoria:"Evento Bíblico", definicao:"Alimento miraculoso fornecido por Deus aos israelitas durante os 40 anos no deserto (Êx 16). Jesus se identificou como o 'verdadeiro pão do céu' (Jo 6:31-35)." },
  { termo:"Mediador", categoria:"Cristologia", definicao:"Aquele que intervém entre duas partes. Cristo é o único mediador entre Deus e os homens (1 Tm 2:5). Através dele temos acesso ao Pai. A Nova Aliança é superior por ter um mediador superior (Hb 8:6)." },
  { termo:"Messias", categoria:"Cristologia", definicao:"Do hebraico 'Mashiach' (ungido), equivale ao grego 'Christos'. O escolhido de Deus para libertar e governar seu povo. Jesus de Nazaré é o Messias prometido nas profecias do AT." },
  { termo:"Milagre", categoria:"Conceito Teológico", definicao:"Ato sobrenatural de Deus que ultrapassa as leis naturais. No AT e NT, milagres confirmam a mensagem e o mensageiro de Deus. Jesus realizou muitos milagres como sinais de que o Reino havia chegado." },
  { termo:"Milênio", categoria:"Escatologia", definicao:"Período de mil anos mencionado em Apocalipse 20:1-6, durante o qual Cristo reinará na terra. Existem três interpretações principais: pré-milenismo, pós-milenismo e amilenismo." },
  { termo:"Novo Nascimento", categoria:"Doutrina", definicao:"Experiência de regeneração espiritual pela qual uma pessoa se torna nova criatura em Cristo (Jo 3:3-7; 2 Co 5:17). É obra do Espírito Santo que transforma a natureza interior do ser humano." },
  { termo:"Obediência", categoria:"Vida Cristã", definicao:"Submissão voluntária à vontade de Deus. Na Bíblia, obediência é melhor do que sacrifício (1 Sm 15:22). Jesus demonstrou obediência perfeita ao Pai, mesmo até a morte de cruz (Fp 2:8)." },
  { termo:"Oferta", categoria:"Prática Eclesiástica", definicao:"Contribuição voluntária dada a Deus além do dízimo. No AT, incluía ofertas queimadas, de cereais e pacíficas. No NT, dar com alegria e generosidade, conforme a prosperidade (2 Co 9:7)." },
  { termo:"Oração", categoria:"Vida Cristã", definicao:"Comunicação com Deus que inclui adoração, confissão, gratidão e súplica. Jesus ensinou o modelo no 'Pai Nosso' (Mt 6:9-13). Paulo exortou a orar sem cessar (1 Ts 5:17)." },
  { termo:"Parábola", categoria:"Gênero Literário", definicao:"Narrativa curta usando elementos do cotidiano para ensinar verdades espirituais. Jesus usou parábolas extensivamente (Mt 13:34). Exemplos: o filho pródigo, o bom samaritano, o semeador." },
  { termo:"Páscoa", categoria:"Festa Judaica", definicao:"Festa que comemora a libertação de Israel do Egito (Êx 12). O cordeiro pascal prefigurava Cristo, nosso Cordeiro de Deus (1 Co 5:7). A Santa Ceia foi instituída durante a Páscoa." },
  { termo:"Pastor", categoria:"Ofício Ministerial", definicao:"Líder espiritual responsável por apascentar o rebanho de Deus (1 Pe 5:1-4). Jesus é o Bom Pastor (Jo 10:11) e o Sumo Pastor (1 Pe 5:4). O pastor cuida, alimenta e protege as ovelhas." },
  { termo:"Pecado", categoria:"Conceito Teológico", definicao:"Transgressão da lei de Deus ou desvio de sua vontade. Entrou no mundo por Adão (Rm 5:12) e separa a humanidade de Deus (Is 59:2). A solução é a redenção em Cristo (Rm 6:23)." },
  { termo:"Pentecostes", categoria:"Evento Bíblico", definicao:"Festa judaica das colheitas, 50 dias após a Páscoa. No NT, o Espírito Santo foi derramado sobre os discípulos em Jerusalém (At 2), marcando o nascimento da Igreja." },
  { termo:"Predestinação", categoria:"Doutrina", definicao:"Ensino de que Deus, em sua soberania, determinou de antemão o plano da salvação. Paulo ensina que os crentes foram predestinados para serem conformes à imagem de Cristo (Rm 8:29-30; Ef 1:5)." },
  { termo:"Presbítero", categoria:"Ofício Ministerial", definicao:"Do grego 'presbyteros' (ancião). Líder maduro da igreja local, responsável pelo governo, ensino e pastoreio (1 Tm 5:17; Tt 1:5-9). Sinônimo de bispo/supervisor em muitos contextos do NT." },
  { termo:"Profecia", categoria:"Dom Espiritual", definicao:"Mensagem de Deus comunicada através de um porta-voz humano. No AT, profetas anunciavam juízo e restauração. No NT, a profecia edifica, exorta e consola a igreja (1 Co 14:3)." },
  { termo:"Profeta", categoria:"Ofício Ministerial", definicao:"Porta-voz de Deus que comunica sua mensagem ao povo. Profetas do AT incluem Isaías, Jeremias, Elias e Daniel. No NT, o dom profético continua operando na Igreja (Ef 4:11)." },
  { termo:"Propiciação", categoria:"Doutrina", definicao:"Ato que satisfaz a justiça de Deus e remove sua ira contra o pecado. Cristo é a propiciação pelos nossos pecados (1 Jo 2:2). Seu sacrifício apaziguou a justiça divina, abrindo caminho para o perdão." },
  { termo:"Providência", categoria:"Doutrina", definicao:"O cuidado contínuo de Deus sobre toda a criação. Deus sustenta, governa e dirige todas as coisas segundo o conselho de sua vontade (Ef 1:11). Inclui provisão material e proteção espiritual." },
  { termo:"Reconciliação", categoria:"Doutrina", definicao:"Restauração do relacionamento entre Deus e a humanidade, quebrado pelo pecado. Cristo é o agente da reconciliação (2 Co 5:18-19). Os crentes são chamados a serem embaixadores da reconciliação." },
  { termo:"Redenção", categoria:"Doutrina", definicao:"Ato de resgatar mediante pagamento de preço. Cristo nos redimiu com seu sangue na cruz, libertando da escravidão do pecado e da morte (Ef 1:7; 1 Pe 1:18-19)." },
  { termo:"Regeneração", categoria:"Doutrina", definicao:"Novo nascimento operado pelo Espírito Santo (Jo 3:3-5). Transformação da natureza pecaminosa, tornando a pessoa nova criatura em Cristo (2 Co 5:17; Tt 3:5)." },
  { termo:"Ressurreição", categoria:"Doutrina", definicao:"Retorno à vida após a morte. A ressurreição de Cristo é o fundamento da fé cristã (1 Co 15:14). Os crentes também ressuscitarão na vinda de Cristo (1 Co 15:20-23)." },
  { termo:"Revelação", categoria:"Conceito Teológico", definicao:"Ato de Deus de se dar a conhecer à humanidade. A revelação geral ocorre na natureza (Rm 1:20). A revelação especial ocorre nas Escrituras e supremamente em Jesus Cristo (Hb 1:1-2)." },
  { termo:"Sabbath", categoria:"Prática Judaica", definicao:"Do hebraico 'shabbat' (cessar, descansar). Sétimo dia da semana, separado para descanso e adoração (Êx 20:8-11). Os cristãos geralmente observam o domingo, dia da ressurreição de Cristo." },
  { termo:"Sacramento", categoria:"Prática Eclesiástica", definicao:"Ato sagrado instituído por Cristo como sinal visível da graça invisível. A maioria dos protestantes reconhece dois sacramentos: Batismo e Santa Ceia (Eucaristia)." },
  { termo:"Salvação", categoria:"Doutrina", definicao:"Libertação do poder e consequências do pecado, concedida por Deus mediante a fé em Cristo. Inclui justificação (passado), santificação (presente) e glorificação (futuro). É pela graça, não por obras (Ef 2:8-9)." },
  { termo:"Sangue de Cristo", categoria:"Cristologia", definicao:"Simboliza o sacrifício redentor de Jesus na cruz. O sangue derramado é o preço da nossa redenção (1 Pe 1:19), purifica de todo pecado (1 Jo 1:7) e sela a Nova Aliança (Lc 22:20)." },
  { termo:"Santificação", categoria:"Doutrina", definicao:"Processo contínuo de ser tornado santo e semelhante a Cristo. Obra do Espírito Santo ao longo da vida cristã (1 Ts 5:23). Diferente da justificação (ato único)." },
  { termo:"Sermão do Monte", categoria:"Ensino de Jesus", definicao:"Maior discurso registrado de Jesus (Mt 5-7). Inclui as Bem-Aventuranças, o Pai-Nosso e ensinos sobre a vida no Reino de Deus. Apresenta o padrão ético do discipulado cristão." },
  { termo:"Shekinah", categoria:"Conceito Teológico", definicao:"Termo hebraico para a glória visível de Deus habitando entre seu povo. Manifestou-se como nuvem e fogo no Tabernáculo (Êx 40:34-35). No NT, o Espírito de Deus habita nos crentes (1 Co 3:16)." },
  { termo:"Soberania de Deus", categoria:"Doutrina", definicao:"Atributo divino que afirma o controle absoluto de Deus sobre toda a criação. Nada acontece fora de sua vontade permissiva. Ele governa com justiça, sabedoria e amor (Sl 103:19)." },
  { termo:"Tabernáculo", categoria:"Lugar Sagrado", definicao:"Tenda portátil construída por Moisés no deserto (Êx 25-27). Lugar de adoração e presença de Deus entre o povo. Prefigurava Cristo, que 'tabernaculou' entre nós (Jo 1:14)." },
  { termo:"Templo", categoria:"Lugar Sagrado", definicao:"Edificação permanente para adoração a Deus em Jerusalém. O primeiro foi construído por Salomão (1 Rs 6). Destruído em 586 a.C. e 70 d.C. No NT, o corpo do crente é templo do Espírito Santo (1 Co 6:19)." },
  { termo:"Tentação", categoria:"Vida Cristã", definicao:"Atração ao pecado. Deus não tenta ninguém (Tg 1:13), mas permite provações. Cristo foi tentado para nos mostrar que é possível resistir (Mt 4:1-11). O escape é dado por Deus (1 Co 10:13)." },
  { termo:"Teofania", categoria:"Conceito Teológico", definicao:"Manifestação visível de Deus ao ser humano. Exemplos no AT: a sarça ardente (Êx 3), a coluna de fogo (Êx 13:21) e a voz no Sinai. No NT, a encarnação de Cristo é a teofania suprema." },
  { termo:"Testemunho", categoria:"Vida Cristã", definicao:"Declaração pública da fé e das obras de Deus na vida do crente. Jesus ordenou que seus seguidores fossem suas testemunhas até os confins da terra (At 1:8). O testemunho pessoal é ferramenta de evangelismo." },
  { termo:"Trindade", categoria:"Doutrina", definicao:"Deus é um único Deus em três Pessoas: Pai, Filho e Espírito Santo. Cada Pessoa é plenamente Deus, coexistindo eternamente. Conceito presente em Mt 28:19 e 2 Co 13:14." },
  { termo:"Unção", categoria:"Prática Litúrgica", definicao:"Ato de derramar óleo sobre alguém como sinal de consagração e capacitação divina. Reis, sacerdotes e profetas eram ungidos no AT. No NT, relacionada à cura (Tg 5:14) e ao Espírito Santo (1 Jo 2:27)." },
  { termo:"Versículo", categoria:"Estudo Bíblico", definicao:"Divisão numerada dos capítulos bíblicos, introduzida no séc. XVI. Facilita a localização de textos para estudo, memorização e referência. A Bíblia possui cerca de 31.102 versículos." },
  { termo:"Vida Eterna", categoria:"Doutrina", definicao:"Não apenas duração infinita, mas qualidade de vida em comunhão com Deus. Começa no momento da conversão e continua por toda a eternidade (Jo 17:3). É o dom gratuito de Deus (Rm 6:23)." },
  { termo:"Vocação", categoria:"Vida Cristã", definicao:"Chamado de Deus para a salvação e para um propósito específico. Todo crente tem uma vocação geral (santidade) e uma vocação particular (ministério, profissão, missão). Ef 4:1 exorta a andar dignamente." },
  { termo:"Zelo", categoria:"Vida Cristã", definicao:"Intensidade de devoção e fervor espiritual. O zelo de Deus pela sua glória é modelo para os crentes (Jo 2:17). Paulo exortou os romanos a serem zelosos no serviço ao Senhor (Rm 12:11)." }
];

// === ESCOLA BÍBLICA DOMINICAL — Caderneta Digital ===
const ebdClasseDefault = {
  nome: "Classe Adultos — Sede Central",
  tipo: "Adulto",
  trimestre: 2,
  ano: 2026,
  alunos: [
    { id: 1, nome: "Ana Paula Ferreira Lima" },
    { id: 2, nome: "José Carlos Oliveira" },
    { id: 3, nome: "Maria Aparecida dos Santos" },
    { id: 4, nome: "Francisco de Assis Mendes" },
    { id: 5, nome: "Júlia Cristina Souza" },
    { id: 6, nome: "Pedro Henrique Almeida" },
    { id: 7, nome: "Raquel de Souza Costa" },
    { id: 8, nome: "Lucas Gabriel Martins" },
    { id: 9, nome: "Benedita Maria da Silva" },
    { id: 10, nome: "Cláudia Regina Moraes" }
  ],
  chamada: {
    "2026-04-05": { 1: "P", 2: "P", 3: "A", 4: "P", 5: "P", 6: "A", 7: "P", 8: "P", 9: "P", 10: "A" },
    "2026-04-12": { 1: "P", 2: "A", 3: "P", 4: "P", 5: "A", 6: "P", 7: "P", 8: "P", 9: "A", 10: "P" },
    "2026-04-19": { 1: "P", 2: "P", 3: "P", 4: "A", 5: "P", 6: "P", 7: "A", 8: "P", 9: "P", 10: "P" },
    "2026-04-26": { 1: "P", 2: "P", 3: "P", 4: "P", 5: "P", 6: "P", 7: "P", 8: "A", 9: "P", 10: "P" }
  },
  resumos: {
    "2026-04-05": { visitantes: 3, biblias: 8, revistas: 7, ofertas: "R$ 52,00" },
    "2026-04-12": { visitantes: 1, biblias: 7, revistas: 6, ofertas: "R$ 38,50" },
    "2026-04-19": { visitantes: 2, biblias: 9, revistas: 8, ofertas: "R$ 61,00" },
    "2026-04-26": { visitantes: 0, biblias: 8, revistas: 7, ofertas: "R$ 45,00" }
  }
};

// Tipos de classe disponíveis
const ebdTiposClasse = ["Adulto", "Criança", "Jovem", "Novos Convertidos"];

// Gera as datas dos domingos de um trimestre
function gerarDomingosTrimestre(trimestre, ano) {
  const mesesPorTrimestre = {
    1: [0, 1, 2],   // Jan, Fev, Mar
    2: [3, 4, 5],   // Abr, Mai, Jun
    3: [6, 7, 8],   // Jul, Ago, Set
    4: [9, 10, 11]  // Out, Nov, Dez
  };
  const meses = mesesPorTrimestre[trimestre] || [3, 4, 5];
  const domingos = [];
  meses.forEach(mes => {
    const d = new Date(ano, mes, 1);
    while (d.getDay() !== 0) d.setDate(d.getDate() + 1);
    while (d.getMonth() === mes) {
      domingos.push(d.toISOString().split('T')[0]);
      d.setDate(d.getDate() + 7);
    }
  });
  return domingos;
}
