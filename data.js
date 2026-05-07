/* === Sample data layer — Workday demo ===
   Multi-employee. Reads from localStorage('wd_employee') for current selection.
*/

window.WD_EMPLOYEES = {
  sarah: {
    id: 'sarah',
    firstName: 'Sarah',
    lastName: 'Kim',
    title: 'Senior Product Designer',
    dept: 'Design',
    manager: 'Sarah Chen',
    location: 'New York, NY',
    employeeId: 'EMP-04829',
    email: 'sarah.kim@acme.com',
    startDate: '2022-03-15',
    avatar: 'SK',
    color: '#0a0a0a',
    salary: 125000,
    nextPay: { date: '2026-05-15', amount: 8420.50, gross: 10416.67 },
    pto: { vacation: { used: 7.5, total: 22, balance: 14.5 }, sick: { used: 1, total: 5, balance: 4 }, personal: { used: 0, total: 3, balance: 3 } },
    upcomingHolidays: [
      { date: '2026-05-25', name: 'Memorial Day' },
      { date: '2026-07-03', name: 'Independence Day (observed)' },
      { date: '2026-09-07', name: 'Labor Day' },
    ],
    timeOffRequests: [
      { id: 'r1', type: 'Vacation', from: '2026-06-08', to: '2026-06-12', days: 5, status: 'Approved', approver: 'Sarah Chen' },
      { id: 'r2', type: 'Personal', from: '2026-07-15', to: '2026-07-15', days: 1, status: 'Pending', approver: 'Sarah Chen' },
    ],
    benefits: {
      health: { plan: 'Anthem Blue Cross PPO', tier: 'Employee + Spouse', monthly: 348, deductible: 1500 },
      dental: { plan: 'Delta Dental Premier', tier: 'Family', monthly: 42 },
      vision: { plan: 'VSP Choice', tier: 'Family', monthly: 12 },
      retirement: { plan: '401(k) Traditional', contribution: 8, match: 6, balance: 87420.18 },
      hsa: { balance: 2840.50, employerContribution: 1500, ytd: 2200 },
      life: { plan: 'Basic Life 1x salary', coverage: 125000, monthly: 0 },
    },
    payslips: [
      { date: '2026-05-01', gross: 10416.67, net: 8420.50, taxes: 1521.20, deductions: 474.97 },
      { date: '2026-04-15', gross: 10416.67, net: 8420.50, taxes: 1521.20, deductions: 474.97 },
      { date: '2026-04-01', gross: 10416.67, net: 8420.50, taxes: 1521.20, deductions: 474.97 },
      { date: '2026-03-15', gross: 10416.67, net: 8420.50, taxes: 1521.20, deductions: 474.97 },
    ],
    bonus: { lastYear: 12500, ytd: 0, eligibleNext: '2026-12-31' },
    expenses: [
      { id: 'e1', date: '2026-05-02', vendor: 'Uber', category: 'Transport', amount: 42.30, status: 'Submitted' },
      { id: 'e2', date: '2026-04-28', vendor: 'Marriott', category: 'Lodging', amount: 312.00, status: 'Pending receipt' },
      { id: 'e3', date: '2026-04-26', vendor: 'Sweetgreen', category: 'Meals', amount: 28.45, status: 'Pending receipt' },
      { id: 'e4', date: '2026-04-26', vendor: 'Boingo', category: 'Other', amount: 14.95, status: 'Pending receipt' },
    ],
    goals: [
      { id: 'g1', title: 'Ship redesigned onboarding flow', status: 'Done', progress: 100, due: '2026-04-30' },
      { id: 'g2', title: 'Hire 2 senior designers', status: 'Done', progress: 100, due: '2026-04-15' },
      { id: 'g3', title: 'Run 6 user studies on payments', status: 'Done', progress: 100, due: '2026-05-01' },
      { id: 'g4', title: 'Launch design system v2', status: 'In progress', progress: 60, due: '2026-06-30' },
      { id: 'g5', title: 'Reduce drop-off at signup by 15%', status: 'In progress', progress: 35, due: '2026-06-30' },
    ],
    review: { period: 'Q2 2026', dueDate: '2026-06-30', selfReview: false, peerReviews: 0 },
    learning: [
      { id: 'l1', title: 'Annual Security & Privacy Training', required: true, due: '2026-05-10', progress: 40 },
      { id: 'l2', title: 'Manager Foundations', required: false, due: null, progress: 25 },
      { id: 'l3', title: 'Inclusive Hiring Practices', required: true, due: '2026-06-30', progress: 0 },
      { id: 'l4', title: 'Advanced Figma & Prototyping', required: false, due: null, progress: 80 },
    ],
    team: [
      { name: 'Sarah Chen', role: 'VP Design (manager)', avatar: 'SC' },
      { name: 'James Mitchell', role: 'Product Designer', avatar: 'JM', status: 'On leave' },
      { name: 'Riya Krishnan', role: 'Sr Designer', avatar: 'RK', status: 'On leave' },
      { name: 'Noor Patel', role: 'Designer', avatar: 'NP' },
      { name: 'David Park', role: 'Sr Designer', avatar: 'DP' },
      { name: 'Elena Rodriguez', role: 'Researcher', avatar: 'ER' },
    ],
    tasks: [
      { id: 't1', title: "Approve James's PTO request", priority: 'high', age: '2h' },
      { id: 't2', title: 'Sign offer letter for Noor', priority: 'high', age: 'today' },
      { id: 't3', title: 'Submit Q1 expense report', priority: 'overdue', age: '2d overdue' },
      { id: 't4', title: 'Complete security training', priority: 'med', age: 'due 5/10' },
      { id: 't5', title: 'Review Q2 OKRs', priority: 'med', age: 'this week' },
      { id: 't6', title: 'Update emergency contact', priority: 'low', age: 'whenever' },
      { id: 't7', title: 'Confirm 401(k) contribution change', priority: 'low', age: 'whenever' },
    ],
    jobs: {
      applications: [
        { title: 'Sr. Product Designer — NYC', status: 'Interview Thu 2pm', stage: 'Interview' },
        { title: 'Design Lead — Remote', status: 'Application reviewed', stage: 'Reviewed' },
      ],
      saved: 1, viewed: 5,
    },
    documents: [
      { name: 'W-2 (2025)', type: 'Tax', date: '2026-01-31' },
      { name: 'W-4', type: 'Tax', date: '2024-03-15' },
      { name: 'Offer Letter', type: 'Onboarding', date: '2022-03-15' },
      { name: 'Employee Handbook v4.2', type: 'Policy', date: '2026-01-01' },
      { name: 'Direct Deposit Authorization', type: 'Pay', date: '2022-03-15' },
    ],
    schedule: [
      { time: '10:30', title: 'Design standup', type: 'meeting' },
      { time: '14:00', title: 'Interview — N. Patel', type: 'interview' },
      { time: '16:00', title: '1:1 with Sarah Chen', type: 'meeting' },
    ],
    messages: [
      { id: 'm1', from: 'Sarah Chen', avatar: 'SC', dept: 'VP Design', preview: 'Loved the new onboarding flow. Can we chat about the metrics tomorrow at 1:1?', time: '2h', unread: true, thread: [
        { from: 'Sarah Chen', text: 'Hey! Loved the new onboarding flow. The illustrations are gorgeous.', time: '2h ago' },
        { from: 'Sarah Chen', text: 'Can we chat about the metrics tomorrow at 1:1?', time: '2h ago' },
      ]},
      { id: 'm2', from: 'Workday HR', avatar: 'HR', dept: 'System', preview: 'Reminder: complete annual security training by May 10', time: '6h', unread: true, system: true },
      { id: 'm3', from: 'Noor Patel', avatar: 'NP', dept: 'Designer', preview: 'Got the offer letter — signing today! 🎉 Thanks for everything.', time: '1d', unread: false },
      { id: 'm4', from: 'Sarah Chen', avatar: 'SC', dept: 'VP Design', preview: 'Approved your June vacation request. Have fun in Lisbon!', time: '2d', unread: false },
      { id: 'm5', from: 'Recruiting', avatar: 'RC', dept: 'System', preview: 'Interview scheduled for Sr. Product Designer role — Thu 2pm', time: '3d', unread: false, system: true },
      { id: 'm6', from: 'James Mitchell', avatar: 'JM', dept: 'Product Designer', preview: 'Out until June 1 — coverage doc is in the team drive', time: '5d', unread: false },
    ],
  },

  marcus: {
    id: 'marcus', firstName: 'Marcus', lastName: 'Johnson',
    title: 'Engineering Manager', dept: 'Engineering', manager: 'Priya Anand',
    location: 'Seattle, WA', employeeId: 'EMP-03104', email: 'marcus.johnson@acme.com',
    startDate: '2019-08-22', avatar: 'MJ', color: '#1e40af', salary: 185000,
    nextPay: { date: '2026-05-15', amount: 11890.20, gross: 15416.67 },
    pto: { vacation: { used: 12, total: 25, balance: 13 }, sick: { used: 0, total: 5, balance: 5 }, personal: { used: 1, total: 3, balance: 2 } },
    upcomingHolidays: [{ date: '2026-05-25', name: 'Memorial Day' }, { date: '2026-07-03', name: 'Independence Day (observed)' }],
    timeOffRequests: [{ id: 'r1', type: 'Vacation', from: '2026-08-10', to: '2026-08-21', days: 10, status: 'Pending', approver: 'Priya Anand' }],
    benefits: {
      health: { plan: 'Anthem Blue Cross PPO', tier: 'Family', monthly: 612, deductible: 3000 },
      dental: { plan: 'Delta Dental Premier', tier: 'Family', monthly: 42 },
      vision: { plan: 'VSP Choice', tier: 'Family', monthly: 12 },
      retirement: { plan: '401(k) Roth', contribution: 12, match: 6, balance: 248920.40 },
      hsa: { balance: 4120.00, employerContribution: 1500, ytd: 2800 },
      life: { plan: 'Supplemental Life 3x salary', coverage: 555000, monthly: 18 },
    },
    payslips: [{ date: '2026-05-01', gross: 15416.67, net: 11890.20, taxes: 2820.10, deductions: 706.37 }],
    bonus: { lastYear: 28000, ytd: 0, eligibleNext: '2026-12-31' },
    expenses: [{ id: 'e1', date: '2026-05-03', vendor: 'AWS re:Invent', category: 'Conferences', amount: 1840, status: 'Submitted' }],
    goals: [
      { id: 'g1', title: 'Migrate auth to new SSO', status: 'In progress', progress: 70, due: '2026-06-30' },
      { id: 'g2', title: 'Reduce p95 latency by 40%', status: 'In progress', progress: 55, due: '2026-06-30' },
      { id: 'g3', title: 'Hire 3 senior engineers', status: 'In progress', progress: 33, due: '2026-07-31' },
    ],
    review: { period: 'Q2 2026', dueDate: '2026-06-30', selfReview: true, peerReviews: 2 },
    learning: [
      { id: 'l1', title: 'Annual Security & Privacy Training', required: true, due: '2026-05-10', progress: 100 },
      { id: 'l2', title: 'Leading Through Change', required: false, due: null, progress: 50 },
    ],
    team: [
      { name: 'Priya Anand', role: 'VP Eng (manager)', avatar: 'PA' },
      { name: 'Tom Brennan', role: 'Sr Engineer', avatar: 'TB' },
      { name: 'Aisha Williams', role: 'Engineer', avatar: 'AW' },
      { name: 'Ken Tanaka', role: 'Sr Engineer', avatar: 'KT' },
      { name: 'Maya Sharma', role: 'Engineer', avatar: 'MS' },
    ],
    tasks: [
      { id: 't1', title: 'Approve 3 PTO requests', priority: 'high', age: '1d' },
      { id: 't2', title: 'Complete self-review', priority: 'high', age: 'due 5/15' },
      { id: 't3', title: 'Sign 2 offer letters', priority: 'high', age: 'today' },
    ],
    jobs: { applications: [], saved: 0, viewed: 0 },
    documents: [{ name: 'W-2 (2025)', type: 'Tax', date: '2026-01-31' }, { name: 'Offer Letter', type: 'Onboarding', date: '2019-08-22' }],
    schedule: [
      { time: '09:00', title: 'Eng leadership sync', type: 'meeting' },
      { time: '11:00', title: 'Architecture review', type: 'meeting' },
      { time: '15:00', title: '1:1 with Priya', type: 'meeting' },
    ],
    messages: [
      { id: 'm1', from: 'Priya Anand', avatar: 'PA', dept: 'VP Eng', preview: 'Reviewed your self-review draft. Strong work — minor edits attached.', time: '4h', unread: true, thread: [
        { from: 'Priya Anand', text: 'Reviewed your self-review draft. Strong work — minor edits attached.', time: '4h ago' },
      ]},
      { id: 'm2', from: 'Tom Brennan', avatar: 'TB', dept: 'Sr Engineer', preview: 'SSO migration RFC is ready for review when you have a moment', time: '1d', unread: true },
      { id: 'm3', from: 'Workday HR', avatar: 'HR', dept: 'System', preview: 'Your Aug 10–21 vacation request is pending Priya\'s approval', time: '2d', unread: false, system: true },
      { id: 'm4', from: 'Aisha Williams', avatar: 'AW', dept: 'Engineer', preview: 'Pushed the latency fix — p95 down 18% on staging', time: '3d', unread: false },
    ],
  },

  priya: {
    id: 'priya', firstName: 'Priya', lastName: 'Sharma',
    title: 'Marketing Coordinator', dept: 'Marketing', manager: 'Linda Foster',
    location: 'Austin, TX', employeeId: 'EMP-05921', email: 'priya.sharma@acme.com',
    startDate: '2024-09-09', avatar: 'PS', color: '#7c3aed', salary: 72000,
    nextPay: { date: '2026-05-15', amount: 4680.30, gross: 6000 },
    pto: { vacation: { used: 2, total: 15, balance: 13 }, sick: { used: 0, total: 5, balance: 5 }, personal: { used: 0, total: 3, balance: 3 } },
    upcomingHolidays: [{ date: '2026-05-25', name: 'Memorial Day' }],
    timeOffRequests: [],
    benefits: {
      health: { plan: 'Anthem Blue Cross PPO', tier: 'Employee Only', monthly: 168, deductible: 1500 },
      dental: { plan: 'Delta Dental Basic', tier: 'Employee Only', monthly: 18 },
      vision: { plan: 'VSP Choice', tier: 'Employee Only', monthly: 6 },
      retirement: { plan: '401(k) Roth', contribution: 4, match: 6, balance: 8420.10 },
      hsa: { balance: 720, employerContribution: 1500, ytd: 600 },
      life: { plan: 'Basic Life 1x salary', coverage: 72000, monthly: 0 },
    },
    payslips: [{ date: '2026-05-01', gross: 6000, net: 4680.30, taxes: 980.40, deductions: 339.30 }],
    bonus: { lastYear: 4500, ytd: 0, eligibleNext: '2026-12-31' },
    expenses: [],
    goals: [
      { id: 'g1', title: 'Launch Q2 brand campaign', status: 'In progress', progress: 80, due: '2026-06-15' },
      { id: 'g2', title: 'Grow newsletter to 50k', status: 'In progress', progress: 45, due: '2026-09-30' },
    ],
    review: { period: 'Q2 2026', dueDate: '2026-06-30', selfReview: false, peerReviews: 0 },
    learning: [
      { id: 'l1', title: 'Annual Security & Privacy Training', required: true, due: '2026-05-10', progress: 0 },
      { id: 'l2', title: 'Brand Voice & Storytelling', required: false, due: null, progress: 30 },
    ],
    team: [
      { name: 'Linda Foster', role: 'CMO (manager)', avatar: 'LF' },
      { name: 'Carlos Mendez', role: 'Brand Lead', avatar: 'CM' },
      { name: 'Wei Zhang', role: 'Content Strategist', avatar: 'WZ' },
    ],
    tasks: [
      { id: 't1', title: 'Complete security training', priority: 'overdue', age: 'overdue' },
      { id: 't2', title: 'Submit Q2 campaign brief', priority: 'high', age: 'today' },
    ],
    jobs: { applications: [], saved: 2, viewed: 8 },
    documents: [{ name: 'Offer Letter', type: 'Onboarding', date: '2024-09-09' }],
    schedule: [
      { time: '10:00', title: 'Campaign planning', type: 'meeting' },
      { time: '13:30', title: 'Content review w/ Linda', type: 'meeting' },
    ],
    messages: [
      { id: 'm1', from: 'Linda Foster', avatar: 'LF', dept: 'CMO', preview: 'Q2 brief looks great. Let\'s ship it.', time: '1h', unread: true },
      { id: 'm2', from: 'Workday HR', avatar: 'HR', dept: 'System', preview: 'OVERDUE: Annual security training was due May 1', time: '2d', unread: true, system: true },
      { id: 'm3', from: 'Carlos Mendez', avatar: 'CM', dept: 'Brand Lead', preview: 'Newsletter draft v3 — your turn for copy edits', time: '4d', unread: false },
    ],
  },
};

window.WD = {
  current() {
    const id = localStorage.getItem('wd_employee') || 'sarah';
    return window.WD_EMPLOYEES[id] || window.WD_EMPLOYEES.sarah;
  },
  set(id) {
    localStorage.setItem('wd_employee', id);
  },
  fmt: {
    money(n) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); },
    moneyShort(n) { return '$' + Math.round(n).toLocaleString(); },
    date(s) {
      const d = new Date(s + 'T12:00');
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },
    dateShort(s) {
      const d = new Date(s + 'T12:00');
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    },
  },
};
