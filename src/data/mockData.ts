// ============================================================
// MOCK DATA — Personal Operating System
// ============================================================

export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'delegated';
export type MeetingStatus = 'upcoming' | 'in-progress' | 'done';

// ── Projects ────────────────────────────────────────────────
export const projects = [
  { id: 'p1', name: 'Platform Relaunch', color: '#6366f1', status: 'at-risk' },
  { id: 'p2', name: 'Q2 Hiring Wave', color: '#0ea5e9', status: 'on-track' },
  { id: 'p3', name: 'Enterprise Migration', color: '#f59e0b', status: 'at-risk' },
  { id: 'p4', name: 'Customer Success', color: '#10b981', status: 'on-track' },
  { id: 'p5', name: 'Data Infrastructure', color: '#8b5cf6', status: 'delayed' },
];

// ── Team Members ────────────────────────────────────────────
export const teamMembers = [
  {
    id: 'm1',
    name: 'Sophie Laurent',
    role: 'Engineering Lead',
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
    skills: ['Strategy', 'Roadmap', 'Analytics'],
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
    skills: ['Figma', 'UX Research', 'Design Systems'],
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
    skills: ['Enterprise Sales', 'CRM', 'Negotiation'],
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

// ── Urgent Items ─────────────────────────────────────────────
export const urgentItems = [
  {
    id: 'u1',
    title: 'Acme Corp migration blocked — DB schema conflict',
    project: 'p3',
    priority: 'critical' as Priority,
    suggestedAction: 'Schedule war-room with Sophie and Thomas today',
    assignedTo: null,
    dueDate: 'Today 3pm',
    type: 'issue',
  },
  {
    id: 'u2',
    title: 'Q2 budget approval deadline tomorrow',
    project: 'p2',
    priority: 'critical' as Priority,
    suggestedAction: 'Review & sign off budget doc in Notion',
    assignedTo: null,
    dueDate: 'Tomorrow 9am',
    type: 'decision',
  },
  {
    id: 'u3',
    title: 'Platform load test failing at 5k users',
    project: 'p1',
    priority: 'high' as Priority,
    suggestedAction: 'Assign to Sophie — needs infra review',
    assignedTo: 'm1',
    dueDate: 'Today EOD',
    type: 'issue',
  },
  {
    id: 'u4',
    title: 'Client NPS dropped 12 points this month',
    project: 'p4',
    priority: 'high' as Priority,
    suggestedAction: 'Review support tickets and escalate top 3',
    assignedTo: null,
    dueDate: 'This week',
    type: 'alert',
  },
];

// ── AI Recommendations ──────────────────────────────────────
export const aiRecommendations = [
  {
    id: 'r1',
    type: 'staffing',
    title: 'Reassign Julien to Platform Relaunch',
    rationale: 'Julien has 50% capacity and p1 frontend is behind schedule by 8 days.',
    confidence: 92,
    action: 'Reassign',
    impact: 'high',
  },
  {
    id: 'r2',
    type: 'priority',
    title: 'Delay Data Infrastructure to Q3',
    rationale: 'Thomas is overloaded and p5 has no hard deadline. Shifting frees 30% of his capacity.',
    confidence: 78,
    action: 'Defer project',
    impact: 'medium',
  },
  {
    id: 'r3',
    type: 'risk',
    title: 'Enterprise Migration may slip Q2 deadline',
    rationale: 'Current velocity is 60% of target. Acme blocker adds 3 days minimum.',
    confidence: 85,
    action: 'Review plan',
    impact: 'high',
  },
  {
    id: 'r4',
    type: 'staffing',
    title: 'Open 2 Backend Engineer positions',
    rationale: 'Sophie is at 95% load for 3 consecutive weeks. Team velocity declining.',
    confidence: 88,
    action: 'Start hiring',
    impact: 'high',
  },
];

// ── Weak Signals ─────────────────────────────────────────────
export const weakSignals = [
  {
    id: 'ws1',
    type: 'burnout-risk',
    message: 'Sophie has worked 50h+ for 3 weeks in a row',
    severity: 'high',
    member: 'm1',
    hint: 'Consider redistributing load or offering a day off',
  },
  {
    id: 'ws2',
    type: 'client-frustration',
    message: 'Acme Corp mentioned "disappointing" twice in last 3 emails',
    severity: 'medium',
    hint: 'Proactive check-in call recommended',
  },
  {
    id: 'ws3',
    type: 'project-drift',
    message: 'Platform Relaunch has missed 2 milestones without update',
    severity: 'medium',
    project: 'p1',
    hint: 'Request status update from Marcus',
  },
  {
    id: 'ws4',
    type: 'overload',
    message: '3 team members above 80% load simultaneously',
    severity: 'high',
    hint: 'Review Q2 priorities and consider pushing non-critical items',
  },
];

// ── Tasks ────────────────────────────────────────────────────
export const tasks = [
  {
    id: 't1',
    title: 'Review Q2 OKRs and update scores',
    priority: 'critical' as Priority,
    status: 'todo' as TaskStatus,
    deadline: 'Today',
    project: 'p2',
    assignedTo: 'me',
    section: 'today',
    aiSuggested: true,
    estimatedMinutes: 30,
  },
  {
    id: 't2',
    title: 'Sign off Platform Relaunch go/no-go',
    priority: 'critical' as Priority,
    status: 'todo' as TaskStatus,
    deadline: 'Today 5pm',
    project: 'p1',
    assignedTo: 'me',
    section: 'today',
    aiSuggested: true,
    estimatedMinutes: 45,
  },
  {
    id: 't3',
    title: 'Call with Acme Corp — migration status',
    priority: 'high' as Priority,
    status: 'todo' as TaskStatus,
    deadline: 'Today',
    project: 'p3',
    assignedTo: 'me',
    section: 'today',
    aiSuggested: false,
    estimatedMinutes: 60,
  },
  {
    id: 't4',
    title: 'Prepare board presentation slides',
    priority: 'high' as Priority,
    status: 'in-progress' as TaskStatus,
    deadline: 'Tomorrow',
    project: 'p1',
    assignedTo: 'me',
    section: 'today',
    aiSuggested: false,
    estimatedMinutes: 120,
  },
  {
    id: 't5',
    title: 'Interview candidate for Senior Backend role',
    priority: 'medium' as Priority,
    status: 'todo' as TaskStatus,
    deadline: 'Wed Mar 25',
    project: 'p2',
    assignedTo: 'me',
    section: 'upcoming',
    aiSuggested: false,
    estimatedMinutes: 60,
  },
  {
    id: 't6',
    title: 'Draft Q3 roadmap proposal',
    priority: 'medium' as Priority,
    status: 'todo' as TaskStatus,
    deadline: 'Fri Mar 27',
    project: 'p1',
    assignedTo: 'me',
    section: 'upcoming',
    aiSuggested: false,
    estimatedMinutes: 90,
  },
  {
    id: 't7',
    title: 'Review and merge data pipeline PRs',
    priority: 'low' as Priority,
    status: 'delegated' as TaskStatus,
    deadline: 'Thu Mar 26',
    project: 'p5',
    assignedTo: 'm4',
    section: 'delegated',
    aiSuggested: false,
    estimatedMinutes: 45,
  },
  {
    id: 't8',
    title: 'Update customer onboarding docs',
    priority: 'low' as Priority,
    status: 'delegated' as TaskStatus,
    deadline: 'Next week',
    project: 'p4',
    assignedTo: 'm3',
    section: 'delegated',
    aiSuggested: false,
    estimatedMinutes: 60,
  },
  {
    id: 't9',
    title: 'Audit cloud costs for April',
    priority: 'medium' as Priority,
    status: 'todo' as TaskStatus,
    deadline: 'Apr 1',
    project: 'p5',
    assignedTo: 'me',
    section: 'upcoming',
    aiSuggested: false,
    estimatedMinutes: 60,
  },
];

// ── Meetings ─────────────────────────────────────────────────
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
    summary: 'Sophie flagged infra blocker. Marcus confirmed go-live date at risk.',
    prepPoints: [],
    color: '#6366f1',
  },
  {
    id: 'meet2',
    title: 'Platform Relaunch — War Room',
    start: '10:30',
    end: '11:30',
    participants: ['m1', 'm2', 'm6'],
    project: 'p1',
    day: 'today',
    status: 'upcoming' as MeetingStatus,
    summary: null,
    prepPoints: [
      'Review load test results from last night',
      'Confirm go/no-go criteria with team',
      'Prepare fallback plan if tests fail again',
    ],
    color: '#f59e0b',
    conflict: false,
  },
  {
    id: 'meet3',
    title: '1:1 with Sophie Laurent',
    start: '14:00',
    end: '14:30',
    participants: ['m1'],
    project: null,
    day: 'today',
    status: 'upcoming' as MeetingStatus,
    summary: null,
    prepPoints: [
      'Address workload concerns — she\'s at 95%',
      'Discuss potential hire timeline',
      'Check team morale',
    ],
    color: '#6366f1',
    conflict: false,
  },
  {
    id: 'meet4',
    title: 'Acme Corp — Migration Review',
    start: '15:00',
    end: '16:00',
    participants: ['m4', 'm5'],
    project: 'p3',
    day: 'today',
    status: 'upcoming' as MeetingStatus,
    summary: null,
    prepPoints: [
      'Summarize DB schema conflict and propose fix',
      'Give revised timeline (+3 days minimum)',
      'Have Elena present account context',
    ],
    color: '#ec4899',
    conflict: false,
  },
  {
    id: 'meet5',
    title: 'Q2 Budget Review',
    start: '09:30',
    end: '10:30',
    participants: ['m2', 'm5'],
    project: 'p2',
    day: 'tomorrow',
    status: 'upcoming' as MeetingStatus,
    summary: null,
    prepPoints: ['Bring signed budget doc', 'Prepare headcount justification'],
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
    title: 'Investor Update Call',
    start: '15:30',
    end: '16:30',
    participants: ['m2'],
    project: null,
    day: 'tomorrow',
    status: 'upcoming' as MeetingStatus,
    summary: null,
    prepPoints: ['Prepare Q2 metrics slide', 'Highlight Platform Relaunch milestone'],
    color: '#8b5cf6',
    conflict: false,
  },
];

// ── Emails ───────────────────────────────────────────────────
export const emails = [
  {
    id: 'e1',
    sender: 'David Park',
    senderEmail: 'david.park@acmecorp.com',
    senderAvatar: 'DP',
    senderColor: '#f59e0b',
    subject: 'RE: Migration Timeline — Critical Update Needed',
    summary: 'David is frustrated with the repeated delays and is asking for a definitive go-live date by EOD Friday.',
    body: `Hi,

I wanted to follow up on our call last week. We're getting to a point where the delays are impacting our own internal timelines significantly.

Our team has been waiting for this migration for 6 weeks now. Each time we get a new date, it slips again. I need a definitive go-live date by EOD Friday, otherwise we'll have to escalate internally and reconsider our contract terms.

I know your team is working hard, but our CTO is asking for answers I can't give without firm commitments from you.

Please advise.

David Park
Director of Technology, Acme Corp`,
    receivedAt: '9:42 AM',
    isRead: false,
    priority: 'critical' as Priority,
    project: 'p3',
    aiSuggestedReply: `Hi David,

Thank you for your candid message — I completely understand your frustration and I take full responsibility for the delays.

I've just come out of an internal war-room this morning specifically to address this. Here's where we stand:

- The DB schema conflict has been identified and our team is on it today
- We will have a confirmed go-live date by **Wednesday noon** at the latest
- I'm committing to daily updates until we're live

I'd also like to schedule a brief call tomorrow to walk you through the revised plan directly. Would 10am or 3pm work?

Apologies again for the friction. We're fully committed to getting this right.

Best,
[Your name]`,
    suggestedActions: ['Reply', 'Schedule call', 'Escalate internally'],
  },
  {
    id: 'e2',
    sender: 'Marie Fontaine',
    senderEmail: 'marie.fontaine@board.com',
    senderAvatar: 'MF',
    senderColor: '#8b5cf6',
    subject: 'Board Deck — Missing Q2 Projections',
    summary: 'Marie is asking for the Q2 financial projections to be added to the board deck before Thursday.',
    body: `Hi,

Quick note before Thursday's board meeting — I noticed the Q2 financial projections are still missing from the deck.

Could you make sure those are added before EOD Wednesday? The board members will need time to review.

Also, please ensure the headcount section is updated to reflect the new hires in March.

Thanks,
Marie`,
    receivedAt: 'Yesterday, 4:15 PM',
    isRead: false,
    priority: 'high' as Priority,
    project: null,
    aiSuggestedReply: `Hi Marie,

Thanks for the heads-up. I'll have the Q2 projections and updated headcount section added to the deck by Wednesday noon — well ahead of the board meeting.

I'll send you a preview link once it's updated.

Best,
[Your name]`,
    suggestedActions: ['Reply', 'Delegate to Marcus', 'Add to tasks'],
  },
  {
    id: 'e3',
    sender: 'Alex Torres',
    senderEmail: 'alex.torres@techstartup.io',
    senderAvatar: 'AT',
    senderColor: '#10b981',
    subject: 'Partnership Opportunity — AI Integration',
    summary: 'Alex is proposing a technical partnership for AI feature integration. Seems promising but not urgent.',
    body: `Hi,

I came across your platform and I think there could be a strong mutual benefit in exploring a technical integration between our AI layer and your existing workflow.

We've done similar integrations with 3 other SaaS companies in your space and the results have been impressive — avg 23% user engagement increase.

Would you be open to a 20-minute call this week or next?

Alex Torres
CEO, TechStartup.io`,
    receivedAt: 'Yesterday, 11:30 AM',
    isRead: true,
    priority: 'medium' as Priority,
    project: null,
    aiSuggestedReply: `Hi Alex,

Thanks for reaching out — the integration sounds interesting. I'm currently heads-down on a major product launch, but I'd be happy to connect in 2-3 weeks.

Could you send over a brief overview of the integration specs in the meantime? That'll help me loop in the right people.

Best,
[Your name]`,
    suggestedActions: ['Reply', 'Schedule for later', 'Ignore'],
  },
  {
    id: 'e4',
    sender: 'Lena Braun',
    senderEmail: 'lena.braun@investor.vc',
    senderAvatar: 'LB',
    senderColor: '#6366f1',
    subject: 'Q1 MRR Numbers — Request Before Friday',
    summary: 'Lena is requesting final Q1 MRR figures for the investor report. Needs by Friday.',
    body: `Hi,

As we're wrapping up the Q1 investor report, we need the final MRR numbers confirmed by Friday EOD.

Please also include any notable churn events or expansion revenue from the quarter.

Looking forward to strong numbers!

Lena Braun
Partner, Venture Capital`,
    receivedAt: 'Mar 22, 3:00 PM',
    isRead: true,
    priority: 'high' as Priority,
    project: null,
    aiSuggestedReply: `Hi Lena,

I'll have the confirmed Q1 MRR figures to you by Friday noon, including the churn and expansion breakdown.

Quick preview: it's been a solid quarter — will share the full picture Friday.

Best,
[Your name]`,
    suggestedActions: ['Reply', 'Delegate to Finance', 'Add to tasks'],
  },
  {
    id: 'e5',
    sender: 'Thomas Mercier',
    senderEmail: 'thomas.mercier@company.com',
    senderAvatar: 'TM',
    senderColor: '#f59e0b',
    subject: 'Data Pipeline — Incident Report',
    summary: 'Thomas is flagging a data pipeline failure from last night. Impact was limited but needs sign-off.',
    body: `Hi,

Just flagging last night's data pipeline incident. We had a 2-hour window (11pm–1am) where the ETL job failed silently, causing ~3% of events to be dropped.

Root cause: a schema change in the upstream source that wasn't communicated. We've added a validation step to prevent recurrence.

No customer impact. I'll post the full incident report in Notion by end of day.

Let me know if you need anything else.

Thomas`,
    receivedAt: 'Today, 8:15 AM',
    isRead: false,
    priority: 'medium' as Priority,
    project: 'p5',
    aiSuggestedReply: `Hi Thomas,

Thanks for the quick flag and the clear RCA. Glad impact was contained.

The validation step sounds like the right fix — good thinking. Please make sure the incident report in Notion includes a timeline and the schema change process improvement.

I'll mention it briefly in today's standup.

Thanks,
[Your name]`,
    suggestedActions: ['Reply', 'Acknowledge', 'Create post-mortem task'],
  },
];

// ── Helper: Get project by id ──────────────────────────────
export function getProject(id: string | null) {
  return projects.find((p) => p.id === id) ?? null;
}

export function getTeamMember(id: string | null) {
  return teamMembers.find((m) => m.id === id) ?? null;
}
