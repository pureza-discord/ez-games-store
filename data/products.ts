export interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  popular?: boolean
  games?: string[]
  type?: 'pack' | 'individual'
  online?: boolean
}

export const categories = [
  'Todos',
  'Ação',
  'RPG',
  'Terror',
  'Corrida',
  'Estratégia',
  'Indie',
  'Esportes',
  'Simulação',
  'Aventura',
  'Luta'
]

export const products: Product[] = [
  {
    id: 'souls-complete',
    name: "SoulsLike Complete",
    price: 60.00,
    description: 'Coleção completa de SoulsLike: Dark Souls I, II, III, Elden Ring e Sekiro',
    category: 'RPG',
    popular: true,
    type: 'pack',
    online: false,
    games: ['Dark Souls I Remastered', 'Dark Souls II Scholar', 'Dark Souls III', 'Elden Ring', 'Sekiro']
  },
  {
    id: 'resident-evil',
    name: "Resident Evil Complete",
    price: 30.00,
    description: 'Saga completa: RE 0, 1, 2, 3, 4, 5, 6, 7, 8 + Remakes',
    category: 'Terror',
    popular: true,
    type: 'pack',
    online: false,
    games: ['RE 0-8', 'RE2 Remake', 'RE3 Remake', 'RE4 Remake']
  },
  {
    id: 'gta-collection',
    name: "GTA Collection",
    price: 30.00,
    description: 'Saga Grand Theft Auto: III, Vice City, San Andreas, IV, V (Modo história)',
    category: 'Ação',
    popular: true,
    type: 'pack',
    online: false,
    games: ['GTA III', 'GTA Vice City', 'GTA San Andreas', 'GTA IV', 'GTA V']
  },
  {
    id: 'call-of-duty',
    name: "Call of Duty Pack",
    price: 30.00,
    description: 'COD: Modern Warfare 1-3, Black Ops 1-4, WWII, Advanced Warfare',
    category: 'Ação',
    popular: false,
    type: 'pack',
    online: false,
    games: ['COD MW 1-3', 'COD Black Ops 1-4', 'COD WWII']
  },
  {
    id: 'assassins-creed',
    name: "Assassin's Creed Saga",
    price: 30.00,
    description: 'AC completo: I até Mirage, incluindo Black Flag, Origins, Odyssey, Valhalla',
    category: 'Ação',
    popular: false,
    type: 'pack',
    online: false,
    games: ['AC I-Mirage', 'AC Black Flag', 'AC Origins', 'AC Odyssey', 'AC Valhalla']
  },
  {
    id: 'far-cry',
    name: "Far Cry Ultimate",
    price: 30.00,
    description: 'Todos os Far Cry: 3, 4, 5, 6, Primal, New Dawn',
    category: 'Ação',
    type: 'pack',
    online: false,
    games: ['Far Cry 3-6', 'Far Cry Primal', 'Far Cry New Dawn']
  },
  {
    id: 'witcher',
    name: "The Witcher Complete",
    price: 30.00,
    description: 'Trilogia completa: The Witcher 1, 2, 3 GOTY',
    category: 'RPG',
    popular: true,
    type: 'pack',
    online: false,
    games: ['The Witcher 1', 'The Witcher 2', 'The Witcher 3 GOTY']
  },
  {
    id: 'elder-scrolls',
    name: "Elder Scrolls Collection",
    price: 30.00,
    description: 'Saga completa: Morrowind, Oblivion, Skyrim Special Edition',
    category: 'RPG',
    type: 'pack',
    online: false,
    games: ['Morrowind', 'Oblivion', 'Skyrim Special Edition']
  },
  {
    id: 'fallout',
    name: "Fallout Complete",
    price: 30.00,
    description: 'Todos os Fallout: 3, New Vegas, 4, 76',
    category: 'RPG',
    type: 'pack',
    online: false,
    games: ['Fallout 3', 'Fallout New Vegas', 'Fallout 4', 'Fallout 76']
  },
  {
    id: 'final-fantasy',
    name: "Final Fantasy Ultimate",
    price: 40.00,
    description: 'FF VII Remake, VIII, IX, X/X-2, XII, XIII, XV',
    category: 'RPG',
    type: 'pack',
    online: false,
    games: ['FF VII Remake', 'FF VIII-XV']
  },
  {
    id: 'need-for-speed',
    name: "Need for Speed Collection",
    price: 30.00,
    description: 'NFS: Heat, Payback, 2015, Rivals, Hot Pursuit, Most Wanted',
    category: 'Corrida',
    popular: true,
    type: 'pack',
    online: false,
    games: ['NFS Heat', 'NFS Payback', 'NFS 2015', 'NFS Rivals']
  },
  {
    id: 'forza',
    name: "Forza Ultimate",
    price: 30.00,
    description: 'Forza Horizon 3, 4, 5 + Motorsport 7 e 8',
    category: 'Corrida',
    popular: true,
    type: 'pack',
    online: true, // Forza funciona online!
    games: ['Forza Horizon 3-5', 'Forza Motorsport 7-8']
  },
  {
    id: 'batman',
    name: "Batman Arkham Saga",
    price: 30.00,
    description: 'Saga completa: Arkham Asylum, City, Origins, Knight',
    category: 'Ação',
    type: 'pack',
    online: false,
    games: ['Arkham Asylum', 'Arkham City', 'Arkham Origins', 'Arkham Knight']
  },
  {
    id: 'god-of-war',
    name: "God of War Saga",
    price: 30.00,
    description: 'GOW 1, 2, 3, Ascension, GOW 2018, Ragnarök',
    category: 'Ação',
    popular: true,
    type: 'pack',
    online: false,
    games: ['God of War 1-3', 'God of War 2018', 'God of War Ragnarök']
  },
  {
    id: 'indie-pack',
    name: "Mega Pack Indie",
    price: 50.00,
    description: 'Os melhores indies: Celeste, Dead Cells, Disco Elysium, Hades I e II, Hollow Knight, Ori',
    category: 'Indie',
    popular: true,
    type: 'pack',
    online: false,
    games: [
      'Celeste',
      'Dead Cells',
      'Disco Elysium - The Final Cut',
      'Hades',
      'Hades II',
      'Hollow Knight',
      'Hollow Knight Skillsong',
      'Ori and the Blind Forest - Definitive Edition',
      'Ori and the Will of the Wisps'
    ]
  },
  {
    id: 'sims-4',
    name: "The Sims 4 Complete",
    price: 30.00,
    description: 'The Sims 4 + Todas as expansões e pacotes',
    category: 'Simulação',
    popular: true,
    type: 'pack',
    online: false,
    games: ['The Sims 4 Base + Todas DLCs']
  },
  {
    id: 'total-war',
    name: "Total War Collection",
    price: 30.00,
    description: 'Warhammer I, II, III + Three Kingdoms + Rome II',
    category: 'Estratégia',
    type: 'pack',
    online: false,
    games: ['Total War Warhammer Trilogy', 'Total War Three Kingdoms']
  },
  {
    id: 'civilization',
    name: "Civilization Complete",
    price: 30.00,
    description: 'Civilization V Complete + Civilization VI Anthology',
    category: 'Estratégia',
    type: 'pack',
    online: false,
    games: ['Civilization V Complete', 'Civilization VI Anthology']
  },
  {
    id: 'dark-souls-trilogy',
    name: "Dark Souls Trilogy",
    price: 30.00,
    description: 'Dark Souls I Remastered, II Scholar, III Complete',
    category: 'RPG',
    type: 'pack',
    online: false,
    games: ['Dark Souls I', 'Dark Souls II', 'Dark Souls III']
  },
  {
    id: 'tomb-raider',
    name: "Tomb Raider Trilogy",
    price: 30.00,
    description: 'Tomb Raider 2013, Rise, Shadow',
    category: 'Aventura',
    type: 'pack',
    online: false,
    games: ['Tomb Raider 2013', 'Rise of the Tomb Raider', 'Shadow of the Tomb Raider']
  },
  {
    id: 'spider-man',
    name: "Spider-Man Bundle",
    price: 30.00,
    description: 'Spider-Man Remastered + Miles Morales Ultimate',
    category: 'Ação',
    popular: true,
    type: 'pack',
    online: false,
    games: ['Spider-Man Remastered', 'Spider-Man Miles Morales']
  },
  {
    id: 'red-dead',
    name: "Red Dead Collection",
    price: 30.00,
    description: 'Red Dead Redemption + Red Dead Redemption 2 (História)',
    category: 'Aventura',
    popular: true,
    type: 'pack',
    online: false,
    games: ['Red Dead Redemption', 'Red Dead Redemption 2']
  },
  {
    id: 'uncharted',
    name: "Uncharted Collection",
    price: 30.00,
    description: 'Nathan Drake Collection (1-3) + Uncharted 4 + Lost Legacy',
    category: 'Aventura',
    type: 'pack',
    online: false,
    games: ['Uncharted 1-4', 'Lost Legacy']
  },
  {
    id: 'horizon',
    name: "Horizon Bundle",
    price: 30.00,
    description: 'Horizon Zero Dawn Complete + Forbidden West Complete',
    category: 'Aventura',
    popular: true,
    type: 'pack',
    online: false,
    games: ['Horizon Zero Dawn', 'Horizon Forbidden West']
  },
  {
    id: 'last-of-us',
    name: "The Last of Us Pack",
    price: 30.00,
    description: 'The Last of Us Part I + Part II Remastered',
    category: 'Aventura',
    popular: true,
    type: 'pack',
    online: false,
    games: ['TLOU Part I', 'TLOU Part II']
  },
  {
    id: 'mass-effect',
    name: "Mass Effect Trilogy",
    price: 30.00,
    description: 'Mass Effect Legendary Edition (1-3 Remastered)',
    category: 'RPG',
    type: 'pack',
    online: false,
    games: ['Mass Effect 1-3 Legendary']
  },
  {
    id: 'dragon-age',
    name: "Dragon Age Trilogy",
    price: 30.00,
    description: 'Dragon Age Origins, II, Inquisition GOTY',
    category: 'RPG',
    type: 'pack',
    online: false,
    games: ['Dragon Age Origins', 'Dragon Age II', 'Dragon Age Inquisition']
  },
  {
    id: 'dead-space',
    name: "Dead Space Collection",
    price: 30.00,
    description: 'Dead Space 1, 2, 3 + Remake',
    category: 'Terror',
    type: 'pack',
    online: false,
    games: ['Dead Space 1-3', 'Dead Space Remake']
  },
  {
    id: 'silent-hill',
    name: "Silent Hill Pack",
    price: 30.00,
    description: 'Silent Hill 1, 2, 3, 4',
    category: 'Terror',
    type: 'pack',
    online: false,
    games: ['Silent Hill 1-4']
  },
  {
    id: 'outlast',
    name: "Outlast Bundle",
    price: 30.00,
    description: 'Outlast 1, 2, Whistleblower, Trials',
    category: 'Terror',
    type: 'pack',
    online: false,
    games: ['Outlast 1-2', 'Whistleblower', 'Trials']
  },
  {
    id: 'elden-ring',
    name: "Elden Ring",
    price: 10.00,
    description: 'O aclamado RPG de ação dos criadores de Dark Souls',
    category: 'RPG',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'cyberpunk',
    name: "Cyberpunk 2077",
    price: 12.00,
    description: 'RPG de ação em mundo aberto em Night City',
    category: 'RPG',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'witcher-3',
    name: "The Witcher 3",
    price: 12.00,
    description: 'Aventura épica de Geralt de Rivia',
    category: 'RPG',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'god-of-war-ragnarok',
    name: "God of War Ragnarök",
    price: 10.00,
    description: 'A continuação épica da jornada de Kratos',
    category: 'Ação',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'rdr2',
    name: "Red Dead Redemption 2",
    price: 10.00,
    description: 'Épico do velho oeste (Modo história)',
    category: 'Aventura',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'gta-v',
    name: "GTA V",
    price: 12.00,
    description: 'O clássico de Los Santos (Modo história)',
    category: 'Ação',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'sekiro',
    name: "Sekiro: Shadows Die Twice",
    price: 12.00,
    description: 'Desafie seus reflexos no Japão feudal',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'dark-souls-3',
    name: "Dark Souls III",
    price: 10.00,
    description: 'O aclamado RPG de ação desafiador',
    category: 'RPG',
    type: 'individual',
    online: false
  },
  {
    id: 'resident-evil-4',
    name: "Resident Evil 4 Remake",
    price: 15.00,
    description: 'Remake do clássico de terror',
    category: 'Terror',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'spider-man-pc',
    name: "Spider-Man Remastered",
    price: 12.00,
    description: 'Seja o Homem-Aranha em Nova York',
    category: 'Ação',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'dark-souls-1',
    name: "Dark Souls I Remastered",
    price: 10.00,
    description: 'O clássico que iniciou a saga',
    category: 'RPG',
    type: 'individual',
    online: false
  },
  {
    id: 'dark-souls-2',
    name: "Dark Souls II Scholar",
    price: 10.00,
    description: 'A continuação desafiadora',
    category: 'RPG',
    type: 'individual',
    online: false
  },
  {
    id: 're-2-remake',
    name: "Resident Evil 2 Remake",
    price: 10.00,
    description: 'Remake do clássico de terror',
    category: 'Terror',
    type: 'individual',
    online: false
  },
  {
    id: 're-3-remake',
    name: "Resident Evil 3 Remake",
    price: 10.00,
    description: 'Nemesis em alta definição',
    category: 'Terror',
    type: 'individual',
    online: false
  },
  {
    id: 're-7',
    name: "Resident Evil 7",
    price: 10.00,
    description: 'Terror em primeira pessoa',
    category: 'Terror',
    type: 'individual',
    online: false
  },
  {
    id: 're-8-village',
    name: "Resident Evil 8 Village",
    price: 12.00,
    description: 'A mais nova aventura de Ethan',
    category: 'Terror',
    type: 'individual',
    online: false
  },
  {
    id: 'gta-3',
    name: "GTA III",
    price: 10.00,
    description: 'O clássico que revolucionou os jogos',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'gta-vice-city',
    name: "GTA Vice City",
    price: 10.00,
    description: 'Volta aos anos 80',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'gta-san-andreas',
    name: "GTA San Andreas",
    price: 10.00,
    description: 'A lenda de CJ',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'gta-4',
    name: "GTA IV",
    price: 10.00,
    description: 'A história de Niko Bellic',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'cod-mw',
    name: "Call of Duty Modern Warfare",
    price: 10.00,
    description: 'O icônico FPS',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'cod-black-ops',
    name: "Call of Duty Black Ops",
    price: 10.00,
    description: 'Operações secretas',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'cod-ww2',
    name: "Call of Duty WWII",
    price: 10.00,
    description: 'De volta à Segunda Guerra',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'ac-black-flag',
    name: "Assassin's Creed Black Flag",
    price: 10.00,
    description: 'Seja um pirata no Caribe',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'ac-origins',
    name: "Assassin's Creed Origins",
    price: 10.00,
    description: 'Explore o Egito Antigo',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'ac-odyssey',
    name: "Assassin's Creed Odyssey",
    price: 10.00,
    description: 'Aventura na Grécia Antiga',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'ac-valhalla',
    name: "Assassin's Creed Valhalla",
    price: 10.00,
    description: 'A era dos Vikings',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'far-cry-3',
    name: "Far Cry 3",
    price: 10.00,
    description: 'Sobreviva nas ilhas',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'far-cry-4',
    name: "Far Cry 4",
    price: 10.00,
    description: 'Liberte Kyrat',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'far-cry-5',
    name: "Far Cry 5",
    price: 10.00,
    description: 'Confronte o culto',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'far-cry-6',
    name: "Far Cry 6",
    price: 10.00,
    description: 'Revolução em Yara',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'witcher-1',
    name: "The Witcher 1",
    price: 10.00,
    description: 'Início da saga de Geralt',
    category: 'RPG',
    type: 'individual',
    online: false
  },
  {
    id: 'witcher-2',
    name: "The Witcher 2",
    price: 10.00,
    description: 'Assassinos de Reis',
    category: 'RPG',
    type: 'individual',
    online: false
  },
  {
    id: 'skyrim',
    name: "Skyrim Special Edition",
    price: 10.00,
    description: 'O RPG mais icônico',
    category: 'RPG',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'fallout-4',
    name: "Fallout 4",
    price: 10.00,
    description: 'Sobreviva no wasteland',
    category: 'RPG',
    type: 'individual',
    online: false
  },
  {
    id: 'fallout-new-vegas',
    name: "Fallout New Vegas",
    price: 10.00,
    description: 'O melhor da série',
    category: 'RPG',
    type: 'individual',
    online: false
  },
  {
    id: 'nfs-heat',
    name: "Need for Speed Heat",
    price: 10.00,
    description: 'Corridas de rua em Palm City',
    category: 'Corrida',
    type: 'individual',
    online: false
  },
  {
    id: 'forza-horizon-5',
    name: "Forza Horizon 5",
    price: 10.00,
    description: 'Explore o México',
    category: 'Corrida',
    popular: true,
    type: 'individual',
    online: true
  },
  {
    id: 'forza-horizon-4',
    name: "Forza Horizon 4",
    price: 10.00,
    description: 'Aventura na Inglaterra',
    category: 'Corrida',
    type: 'individual',
    online: true
  },
  {
    id: 'batman-arkham-knight',
    name: "Batman Arkham Knight",
    price: 10.00,
    description: 'A conclusão da saga',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'god-of-war-2018',
    name: "God of War 2018",
    price: 15.00,
    description: 'Kratos e Atreus',
    category: 'Ação',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'hollow-knight',
    name: "Hollow Knight",
    price: 8.00,
    description: 'Metroidvania aclamado',
    category: 'Indie',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'celeste',
    name: "Celeste",
    price: 8.00,
    description: 'Plataforma desafiadora',
    category: 'Indie',
    type: 'individual',
    online: false
  },
  {
    id: 'dead-cells',
    name: "Dead Cells",
    price: 10.00,
    description: 'Roguelike de ação',
    category: 'Indie',
    type: 'individual',
    online: false
  },
  {
    id: 'hades',
    name: "Hades",
    price: 10.00,
    description: 'Escape do submundo',
    category: 'Indie',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'cuphead',
    name: "Cuphead",
    price: 10.00,
    description: 'Run and gun vintage',
    category: 'Indie',
    type: 'individual',
    online: false
  },
  {
    id: 'stardew-valley',
    name: "Stardew Valley",
    price: 10.00,
    description: 'Simulador de fazenda',
    category: 'Simulação',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'sims-4',
    name: "The Sims 4",
    price: 10.00,
    description: 'Simulador de vida',
    category: 'Simulação',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'tomb-raider-2013',
    name: "Tomb Raider 2013",
    price: 10.00,
    description: 'O renascimento de Lara',
    category: 'Aventura',
    type: 'individual',
    online: false
  },
  {
    id: 'miles-morales',
    name: "Spider-Man Miles Morales",
    price: 10.00,
    description: 'A história de Miles',
    category: 'Ação',
    type: 'individual',
    online: false
  },
  {
    id: 'red-dead-1',
    name: "Red Dead Redemption",
    price: 10.00,
    description: 'A saga de John Marston',
    category: 'Aventura',
    type: 'individual',
    online: false
  },
  {
    id: 'horizon-zero-dawn',
    name: "Horizon Zero Dawn",
    price: 10.00,
    description: 'Caçadora em mundo pós-apocalíptico',
    category: 'Aventura',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'horizon-forbidden-west',
    name: "Horizon Forbidden West",
    price: 10.00,
    description: 'Continue a jornada de Aloy',
    category: 'Aventura',
    type: 'individual',
    online: false
  },
  {
    id: 'tlou-1',
    name: "The Last of Us Part I",
    price: 10.00,
    description: 'Sobrevivência emocional',
    category: 'Aventura',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'tlou-2',
    name: "The Last of Us Part II",
    price: 10.00,
    description: 'A jornada de vingança',
    category: 'Aventura',
    popular: true,
    type: 'individual',
    online: false
  },
  {
    id: 'dead-space-remake',
    name: "Dead Space Remake",
    price: 10.00,
    description: 'Terror espacial renovado',
    category: 'Terror',
    type: 'individual',
    online: false
  },
  {
    id: 'silent-hill-2',
    name: "Silent Hill 2",
    price: 10.00,
    description: 'Terror psicológico clássico',
    category: 'Terror',
    type: 'individual',
    online: false
  },
  {
    id: 'outlast',
    name: "Outlast",
    price: 10.00,
    description: 'Terror em primeira pessoa',
    category: 'Terror',
    type: 'individual',
    online: false
  },
  {
    id: 'outlast-2',
    name: "Outlast 2",
    price: 10.00,
    description: 'Continue o pesadelo',
    category: 'Terror',
    type: 'individual',
    online: false
  },
]

