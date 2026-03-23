// ============================================================
// DONNÉES MOCK — Système d'exploitation personnel
// ============================================================

export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'delegated';
export type MeetingStatus = 'upcoming' | 'in-progress' | 'done';

// ── Projets ─────────────────────────────────────────────────
export const projects = [
  { id: 'p1', name: 'Refonte Platform', color: '#6366f1', status: 'at-risk' },
  { id: 'p2', name: 'Recrutements Q2', color: '#0ea5e9', status: 'on-track' },
  { id: 'p3', name: 'Migration Enterprise', color: '#f59e0b', status: 'at-risk' },
  { id: 'p4', name: 'Succès Client', color: '#10b981', status: 'on-track' },
  { id: 'p5', name: 'Infrastructure Data', color: '#8b5cf6', status: 'delayed' },
];

// ── Membres de l'équipe ──────────────────────────────────────
export const teamMembers = [
  {
    id: 'm1',
    name: 'Sophie Laurent',
    role: 'Lead Engineering',
    avatar: 'SL',
    avatarColor: '#6366f1',
    load: 95,
    skills: ['Backend', 'Architecture', 'Python'],
    projects: ['p1', 'p5'],
    availability: 'overloaded',
    status: 'online',
  },
  {
    id: 'm2',
    name: 'Marcus Chen',
    role: 'Product Manager',
    avatar: 'MC',
    avatarColor: '#0ea5e9',
    load: 70,
    skills: ['Stratégie', 'Roadmap', 'Analytics'],
    projects: ['p1', 'p3'],
    availability: 'available',
    status: 'online',
  },
  {
    id: 'm3',
    name: 'Aisha Okonkwo',
    role: 'Senior Designer',
    avatar: 'AO',
    avatarColor: '#10b981',
    load: 60,
    skills: ['Figma', 'UX Research', 'Design System'],
    projects: ['p1', 'p4'],
    availability: 'available',
    status: 'away',
  },
  {
    id: 'm4',
    name: 'Thomas Mercier',
    role: 'Data Engineer',
    avatar: 'TM',
    avatarColor: '#f59e0b',
    load: 88,
    skills: ['dbt', 'Spark', 'Airflow'],
    projects: ['p5'],
    availability: 'busy',
    status: 'online',
  },
  {
    id: 'm5',
    name: 'Elena Volkov',
    role: 'Account Executive',
    avatar: 'EV',
    avatarColor: '#ec4899',
    load: 75,
    skills: ['Ventes Enterprise', 'CRM', 'Négociation'],
    projects: ['p3', 'p4'],
    availability: 'available',
    status: 'offline',
  },
  {
    id: 'm6',
    name: 'Julien Petit',
    role: 'Frontend Engineer',
    avatar: 'JP',
    avatarColor: '#8b5cf6',
    load: 50,
    skills: ['React', 'TypeScript', 'Performance'],
    projects: ['p1'],
    availability: 'available',
    status: 'online',
  },
];

// ── Éléments urgents ─────────────────────────────────────────
export const urgentItems = [
  {
    id: 'u1',
    title: 'Migration Acme bloquée — conflit de schéma DB',
    project: 'p3',
    priority: 'critical' as Priority,
    suggestedAction: 'Organiser une war-room avec Sophie et Thomas aujourd\'hui',
    assignedTo: null,
    dueDate: 'Aujourd\'hui 15h',
    type: 'issue',
  },
  {
    id: 'u2',
    title: 'Validation budget Q2 — deadline demain matin',
    project: 'p2',
    priority: 'critical' as Priority,
    suggestedAction: 'Réviser et signer le document budget dans Notion',
    assignedTo: null,
    dueDate: 'Demain 9h',
    type: 'decision',
  },
  {
    id: 'u3',
    title: 'Test de charge Platform : échec à 5 000 utilisateurs',
    project: 'p1',
    priority: 'high' as Priority,
    suggestedAction: 'Assigner à Sophie — révision infra nécessaire',
    assignedTo: 'm1',
    dueDate: 'Aujourd\'hui EOD',
    type: 'issue',
  },
  {
    id: 'u4',
    title: 'NPS client en baisse de 12 points ce mois-ci',
    project: 'p4',
    priority: 'high' as Priority,
    suggestedAction: 'Revoir les tickets support et remonter les 3 critiques',
    assignedTo: null,
    dueDate: 'Cette semaine',
    type: 'alert',
  },
];

// ── Recommandations IA ───────────────────────────────────────
export const aiRecommendations = [
  {
    id: 'r1',
    type: 'staffing',
    title: 'Réaffecter Julien à la Refonte Platform',
    rationale: 'Julien a 50% de capacité libre et le frontend p1 accuse 8 jours de retard.',
    confidence: 92,
    action: 'Réaffecter',
    impact: 'high',
  },
  {
    id: 'r2',
    type: 'priority',
    title: 'Reporter Infrastructure Data au T3',
    rationale: 'Thomas est surchargé et p5 n\'a pas d\'échéance fixe. Décaler libère 30% de sa capacité.',
    confidence: 78,
    action: 'Reporter le projet',
    impact: 'medium',
  },
  {
    id: 'r3',
    type: 'risk',
    title: 'Migration Enterprise risque de glisser au-delà du T2',
    rationale: 'Vélocité actuelle à 60% de la cible. Le blocage Acme ajoute 3 jours minimum.',
    confidence: 85,
    action: 'Revoir le plan',
    impact: 'high',
  },
  {
    id: 'r4',
    type: 'staffing',
    title: 'Ouvrir 2 postes Backend Engineer',
    rationale: 'Sophie est à 95% de charge depuis 3 semaines. La vélocité de l\'équipe diminue.',
    confidence: 88,
    action: 'Lancer le recrutement',
    impact: 'high',
  },
];

// ── Signaux faibles ───────────────────────────────────────────
export const weakSignals = [
  {
    id: 'ws1',
    type: 'burnout-risk',
    message: 'Sophie fait 50h+ par semaine depuis 3 semaines d\'affilée',
    severity: 'high',
    member: 'm1',
    hint: 'Envisager de redistribuer la charge ou proposer un jour de congé',
  },
  {
    id: 'ws2',
    type: 'client-frustration',
    message: 'Acme Corp a écrit "décevant" 2× dans les 3 derniers emails',
    severity: 'medium',
    hint: 'Appel proactif de check-in recommandé',
  },
  {
    id: 'ws3',
    type: 'project-drift',
    message: 'Refonte Platform a raté 2 jalons sans mise à jour',
    severity: 'medium',
    project: 'p1',
    hint: 'Demander un point de situation à Marcus',
  },
  {
    id: 'ws4',
    type: 'overload',
    message: '3 membres de l\'équipe simultanément au-dessus de 80% de charge',
    severity: 'high',
    hint: 'Revoir les priorités Q2, reporter les éléments non critiques',
  },
];

// ── Tâches ────────────────────────────────────────────────────
export const tasks = [
  {
    id: 't1',
    title: 'Revoir les OKRs Q2 et mettre à jour les scores',
    priority: 'critical' as Priority,
    status: 'todo' as TaskStatus,
    deadline: 'Aujourd\'hui',
    project: 'p2',
    assignedTo: 'me',
    section: 'today',
    aiSuggested: true,
    estimatedMinutes: 30,
  },
  {
    id: 't2',
    title: 'Valider le go/no-go Refonte Platform',
    priority: 'critical' as Priority,
    status: 'todo' as TaskStatus,
    deadline: 'Aujourd\'hui 17h',
    project: 'p1',
    assignedTo: 'me',
    section: 'today',
    aiSuggested: true,
    estimatedMinutes: 45,
  },
  {
    id: 't3',
    title: 'Appel Acme Corp — état de la migration',
    priority: 'high' as Priority,
    status: 'todo' as TaskStatus,
    deadline: 'Aujourd\'hui',
    project: 'p3',
    assignedTo: 'me',
    section: 'today',
    aiSuggested: false,
    estimatedMinutes: 60,
  },
  {
    id: 't4',
    title: 'Préparer les slides de présentation board',
    priority: 'high' as Priority,
    status: 'in-progress' as TaskStatus,
    deadline: 'Demain',
    project: 'p1',
    assignedTo: 'me',
    section: 'today',
    aiSuggested: false,
    estimatedMinutes: 120,
  },
  {
    id: 't5',
    title: 'Entretien candidat — poste Senior Backend',
    priority: 'medium' as Priority,
    status: 'todo' as TaskStatus,
    deadline: 'Mer 25 Mars',
    project: 'p2',
    assignedTo: 'me',
    section: 'upcoming',
    aiSuggested: false,
    estimatedMinutes: 60,
  },
  {
    id: 't6',
    title: 'Rédiger la proposition de roadmap Q3',
    priority: 'medium' as Priority,
    status: 'todo' as TaskStatus,
    deadline: 'Ven 27 Mars',
    project: 'p1',
    assignedTo: 'me',
    section: 'upcoming',
    aiSuggested: false,
    estimatedMinutes: 90,
  },
  {
    id: 't7',
    title: 'Revoir et merger les PRs data pipeline',
    priority: 'low' as Priority,
    status: 'delegated' as TaskStatus,
    deadline: 'Jeu 26 Mars',
    project: 'p5',
    assignedTo: 'm4',
    section: 'delegated',
    aiSuggested: false,
    estimatedMinutes: 45,
  },
  {
    id: 't8',
    title: 'Mettre à jour la documentation onboarding client',
    priority: 'low' as Priority,
    status: 'delegated' as TaskStatus,
    deadline: 'Semaine prochaine',
    project: 'p4',
    assignedTo: 'm3',
    section: 'delegated',
    aiSuggested: false,
    estimatedMinutes: 60,
  },
  {
    id: 't9',
    title: 'Audit des coûts cloud pour avril',
    priority: 'medium' as Priority,
    status: 'todo' as TaskStatus,
    deadline: '1 Avr',
    project: 'p5',
    assignedTo: 'me',
    section: 'upcoming',
    aiSuggested: false,
    estimatedMinutes: 60,
  },
];

// ── Réunions ─────────────────────────────────────────────────
export const meetings = [
  {
    id: 'meet1',
    title: 'Daily Standup',
    start: '09:00',
    end: '09:15',
    participants: ['m1', 'm2', 'm4'],
    project: 'p1',
    day: 'today',
    status: 'done' as MeetingStatus,
    summary: 'Sophie a signalé un blocage infra. Marcus a confirmé la date de mise en prod à risque.',
    prepPoints: [],
    color: '#6366f1',
  },
  {
    id: 'meet2',
    title: 'Refonte Platform — War Room',
    start: '10:30',
    end: '11:30',
    participants: ['m1', 'm2', 'm6'],
    project: 'p1',
    day: 'today',
    status: 'upcoming' as MeetingStatus,
    summary: null,
    prepPoints: [
      'Revoir les résultats du test de charge de la nuit',
      'Confirmer les critères go/no-go avec l\'équipe',
      'Préparer le plan B si les tests échouent encore',
    ],
    color: '#f59e0b',
    conflict: false,
  },
  {
    id: 'meet3',
    title: '1:1 avec Sophie Laurent',
    start: '14:00',
    end: '14:30',
    participants: ['m1'],
    project: null,
    day: 'today',
    status: 'upcoming' as MeetingStatus,
    summary: null,
    prepPoints: [
      'Aborder la surcharge — elle est à 95%',
      'Discuter du calendrier de recrutement',
      'Prendre la température de l\'équipe',
    ],
    color: '#6366f1',
    conflict: false,
  },
  {
    id: 'meet4',
    title: 'Acme Corp — Revue Migration',
    start: '15:00',
    end: '16:00',
    participants: ['m4', 'm5'],
    project: 'p3',
    day: 'today',
    status: 'upcoming' as MeetingStatus,
    summary: null,
    prepPoints: [
      'Résumer le conflit de schéma DB et proposer un fix',
      'Donner un calendrier révisé (+3 jours minimum)',
      'Elena présente le contexte client',
    ],
    color: '#ec4899',
    conflict: false,
  },
  {
    id: 'meet5',
    title: 'Revue Budget Q2',
    start: '09:30',
    end: '10:30',
    participants: ['m2', 'm5'],
    project: 'p2',
    day: 'tomorrow',
    status: 'upcoming' as MeetingStatus,
    summary: null,
    prepPoints: ['Apporter le document budget signé', 'Justification des effectifs'],
    color: '#0ea5e9',
    conflict: false,
  },
  {
    id: 'meet6',
    title: 'Design Sync',
    start: '11:00',
    end: '11:45',
    participants: ['m3', 'm6'],
    project: 'p1',
    day: 'tomorrow',
    status: 'upcoming' as MeetingStatus,
    summary: null,
    prepPoints: [],
    color: '#10b981',
    conflict: false,
  },
  {
    id: 'meet7',
    title: 'Appel Investisseurs',
    start: '15:30',
    end: '16:30',
    participants: ['m2'],
    project: null,
    day: 'tomorrow',
    status: 'upcoming' as MeetingStatus,
    summary: null,
    prepPoints: ['Préparer la slide métriques Q2', 'Mettre en avant le jalon Refonte Platform'],
    color: '#8b5cf6',
    conflict: false,
  },
];

// ── Emails ────────────────────────────────────────────────────
export const emails = [
  {
    id: 'e1',
    sender: 'David Park',
    senderEmail: 'david.park@acmecorp.com',
    senderAvatar: 'DP',
    senderColor: '#f59e0b',
    subject: 'RE: Planning Migration — Mise à jour critique requise',
    summary: 'David est frustré des retards répétés et demande une date de mise en prod définitive avant vendredi EOD.',
    body: `Bonjour,

Je fais suite à notre appel de la semaine dernière. Nous sommes à un point où les retards impactent significativement nos propres plannings internes.

Notre équipe attend cette migration depuis 6 semaines maintenant. À chaque fois qu'on nous donne une nouvelle date, elle glisse encore. J'ai besoin d'une date de mise en prod définitive avant vendredi EOD, sinon nous devrons escalader en interne et reconsidérer les termes de notre contrat.

Je sais que votre équipe travaille dur, mais notre CTO me demande des réponses que je ne peux pas donner sans engagements fermes de votre part.

Merci de me revenir.

David Park
Directeur Technique, Acme Corp`,
    receivedAt: '9h42',
    isRead: false,
    priority: 'critical' as Priority,
    project: 'p3',
    aiSuggestedReply: `Bonjour David,

Merci pour votre message direct — je comprends parfaitement votre frustration et j'en prends l'entière responsabilité.

Je sors justement d'une war-room interne ce matin spécifiquement pour adresser ce sujet. Voici où nous en sommes :

- Le conflit de schéma DB a été identifié et notre équipe est dessus aujourd'hui
- Nous aurons une date de mise en prod confirmée **mercredi midi** au plus tard
- Je m'engage à des mises à jour quotidiennes jusqu'à la mise en prod

Je souhaite également planifier un bref appel demain pour vous présenter le plan révisé directement. 10h ou 15h vous conviendrait ?

Toutes mes excuses pour les frictions. Nous sommes pleinement engagés à bien faire les choses.

Cordialement,
[Votre nom]`,
    suggestedActions: ['Répondre', 'Planifier un appel', 'Escalader en interne'],
  },
  {
    id: 'e2',
    sender: 'Marie Fontaine',
    senderEmail: 'marie.fontaine@board.com',
    senderAvatar: 'MF',
    senderColor: '#8b5cf6',
    subject: 'Deck Board — Projections Q2 manquantes',
    summary: 'Marie demande l\'ajout des projections financières Q2 au deck avant jeudi.',
    body: `Bonjour,

Un rapide message avant la réunion du board jeudi — j'ai remarqué que les projections financières Q2 sont toujours manquantes dans le deck.

Pourriez-vous vous assurer qu'elles soient ajoutées avant mercredi EOD ? Les membres du board auront besoin de temps pour les analyser.

Merci aussi de mettre à jour la section effectifs pour refléter les nouveaux recrutements de mars.

Merci,
Marie`,
    receivedAt: 'Hier, 16h15',
    isRead: false,
    priority: 'high' as Priority,
    project: null,
    aiSuggestedReply: `Bonjour Marie,

Merci pour le rappel. J'aurai les projections Q2 et la section effectifs mise à jour dans le deck avant mercredi midi — bien avant la réunion du board.

Je vous enverrai un lien de prévisualisation dès que c'est fait.

Cordialement,
[Votre nom]`,
    suggestedActions: ['Répondre', 'Déléguer à Marcus', 'Ajouter aux tâches'],
  },
  {
    id: 'e3',
    sender: 'Alex Torres',
    senderEmail: 'alex.torres@techstartup.io',
    senderAvatar: 'AT',
    senderColor: '#10b981',
    subject: 'Opportunité Partenariat — Intégration IA',
    summary: 'Alex propose un partenariat technique pour l\'intégration de fonctionnalités IA. Prometteur mais non urgent.',
    body: `Bonjour,

J'ai découvert votre plateforme et je pense qu'il pourrait y avoir une vraie synergie à explorer entre notre couche IA et votre workflow existant.

Nous avons réalisé des intégrations similaires avec 3 autres SaaS de votre secteur et les résultats sont impressionnants — +23% d'engagement utilisateur en moyenne.

Seriez-vous ouvert à un appel de 20 minutes cette semaine ou la suivante ?

Alex Torres
CEO, TechStartup.io`,
    receivedAt: 'Hier, 11h30',
    isRead: true,
    priority: 'medium' as Priority,
    project: null,
    aiSuggestedReply: `Bonjour Alex,

Merci pour votre message — l'intégration semble intéressante. Je suis actuellement concentré sur un lancement produit majeur, mais je serais ravi d'échanger dans 2-3 semaines.

Pourriez-vous m'envoyer une présentation succincte des specs d'intégration en attendant ? Cela m'aidera à impliquer les bonnes personnes.

Cordialement,
[Votre nom]`,
    suggestedActions: ['Répondre', 'Planifier pour plus tard', 'Ignorer'],
  },
  {
    id: 'e4',
    sender: 'Lena Braun',
    senderEmail: 'lena.braun@investor.vc',
    senderAvatar: 'LB',
    senderColor: '#6366f1',
    subject: 'Chiffres MRR Q1 — Demande avant vendredi',
    summary: 'Lena demande les chiffres MRR Q1 définitifs pour le rapport investisseurs. À envoyer avant vendredi.',
    body: `Bonjour,

Pour la finalisation du rapport investisseurs Q1, nous avons besoin des chiffres MRR définitifs confirmés avant vendredi EOD.

Merci d'inclure également les événements de churn notables et les revenus d'expansion du trimestre.

Dans l'attente de bons chiffres !

Lena Braun
Partner, Venture Capital`,
    receivedAt: '22 Mar, 15h00',
    isRead: true,
    priority: 'high' as Priority,
    project: null,
    aiSuggestedReply: `Bonjour Lena,

Je vous transmettrai les chiffres MRR Q1 confirmés vendredi midi, avec le détail churn et expansion.

Aperçu rapide : c'est un bon trimestre — je vous enverrai le tableau complet vendredi.

Cordialement,
[Votre nom]`,
    suggestedActions: ['Répondre', 'Déléguer à Finance', 'Ajouter aux tâches'],
  },
  {
    id: 'e5',
    sender: 'Thomas Mercier',
    senderEmail: 'thomas.mercier@company.com',
    senderAvatar: 'TM',
    senderColor: '#f59e0b',
    subject: 'Pipeline Data — Rapport d\'incident',
    summary: 'Thomas signale une panne du pipeline data cette nuit. Impact limité mais nécessite validation.',
    body: `Bonjour,

Je signale l'incident data de la nuit dernière. Nous avons eu une fenêtre de 2h (23h–1h) où le job ETL a échoué silencieusement, causant la perte de ~3% des événements.

Cause racine : un changement de schéma en amont non communiqué. Nous avons ajouté une étape de validation pour éviter la récurrence.

Aucun impact client. Je posterai le rapport d'incident complet dans Notion en fin de journée.

Fais-moi signe si tu as besoin d'autre chose.

Thomas`,
    receivedAt: 'Aujourd\'hui, 8h15',
    isRead: false,
    priority: 'medium' as Priority,
    project: 'p5',
    aiSuggestedReply: `Bonjour Thomas,

Merci pour le signalement rapide et l'analyse claire. Content que l'impact soit limité.

L'étape de validation est la bonne approche. Assure-toi que le rapport Notion inclut une timeline et l'amélioration du process de communication des changements de schéma.

J'en ferai mention brièvement au standup de demain.

Merci,
[Votre nom]`,
    suggestedActions: ['Répondre', 'Accuser réception', 'Créer une tâche post-mortem'],
  },
];

// ── Helpers ────────────────────────────────────────────────
export function getProject(id: string | null) {
  return projects.find((p) => p.id === id) ?? null;
}

export function getTeamMember(id: string | null) {
  return teamMembers.find((m) => m.id === id) ?? null;
}
