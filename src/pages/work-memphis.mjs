import { caseBody } from '../case.mjs';
import { plate } from '../lib.mjs';

const SITE = 'https://memphistasks.com';

export default {
  path: '/work/memphis/',
  slug: 'case',
  nav: 'work',
  priority: 0.8,
  title: 'Memphis, a task and timesheet app for agencies | Hyrum Whittier',
  description: 'Memphis is the task and timesheet app I built at my job. Start a timer on a task and the hours land on the right client. Our whole office uses it every day.',
  crumbs: [['Memphis', '/work/memphis/']],
  image: '/images/memphis-app-1600.webp',
  body: caseBody({
    name: 'Memphis',
    kicker: ['Task and timesheet app', 'Built at my job'],
    live: SITE + '/',
    shot: 'memphis-app',
    url: 'memphistasks.com',
    alt: 'My Tasks in Memphis: tasks grouped by due date, each with a client, a priority and a timer',
    phone: 'memphis-m',
    phoneAlt: 'The Memphis site on a phone, showing what a Tuesday looks like hour by hour',
    meta: [
      ['What I built', 'The app and its website'],
      ['Who uses it', 'Our whole office, every day'],
      ['Runs on', 'The web and iPhone'],
      ['Status', 'Live. Other agencies can ask for early access.'],
      ['See it', `<a href="${SITE}/">memphistasks.com</a>`],
    ],
    heading: 'The app our agency runs on',
    standfirst: "Our agency was tired of guessing its hours, so I built Memphis. You start a timer on a task and the time lands on the right client. We dropped Asana for it, and the whole office is in it every day.",
    body: `
        <p>Every task has a client and a due date. When a few people share one, each person ticks off their own part. A call on the calendar turns into logged time with one click.</p>
        <p>Start a second timer and Memphis asks if you want to pause the first, so nothing gets counted twice. Half an hour before you finish for the day, it checks in so you can log the last few minutes.</p>
        <p>There are project boards and onboarding checklists too. Every Friday evening it adds up the week's hours, and we keep its KPI board on the office TV.</p>
        <p>Every agency gets its own private copy with its own database. It also has an API, so other tools can add tasks and log time.</p>
        <p>I keep shipping to it. The changelog has 123 entries since July.</p>`,
    links: [
      [SITE + '/', 'memphistasks.com', 'ring'],
      [SITE + '/#changelog', 'The changelog'],
    ],
    plates: [
      plate('memphis-hours', 'memphistasks.com', "The Hours screen in Memphis: a running task timer and the day's time entries, each with its client", 'Hours', 'Timers and time entries, each one tied to a client.'),
      plate('memphis-clients', 'memphistasks.com', 'A client page in Memphis, with hours this month split by person and by task', 'A client page', 'Hours this month by person and by task.'),
    ],
    next: ['/work/tarmac/', 'Tarmac'],
  }),
};
