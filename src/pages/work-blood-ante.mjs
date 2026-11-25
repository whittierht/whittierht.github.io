import { plate, SITE } from '../lib.mjs';
import { caseBody } from '../case.mjs';

const BA = 'https://bloodantegame.web.app/';

export default {
  path: '/work/blood-ante/',
  slug: 'case',
  nav: 'work',
  priority: 0.7,
  title: 'Blood Ante, a browser card game | Hyrum Whittier',
  description: 'Blood Ante is a pixel-art card game I made. It runs in the browser on a phone or a computer, with four knights, leaderboards and every old version still playable.',
  crumbs: [['Blood Ante', '/work/blood-ante/']],
  image: '/images/ba-title-1600.webp',
  schema: [{
    '@type': 'VideoGame',
    '@id': BA + '#game',
    name: 'Blood Ante',
    url: BA,
    image: SITE + '/images/ba-title-1600.webp',
    author: { '@id': SITE + '/#person' },
    gamePlatform: 'Web browser',
    applicationCategory: 'Game',
    operatingSystem: 'Any',
  }],
  body: caseBody({
    name: 'Blood Ante',
    kicker: ['My own game', 'Plays in the browser'],
    live: BA,
    liveLabel: 'Play it',
    shot: 'ba-title',
    url: 'bloodantegame.web.app',
    alt: 'The Blood Ante title screen: a red swirl behind pixel-art cards',
    meta: [
      ['What it is', 'A card game for the browser'],
      ['Runs on', 'A phone or a computer'],
      ['Built with', 'Vanilla JavaScript and canvas, no build step'],
      ['Play at', `<a href="${BA}">bloodantegame.web.app</a>`],
    ],
    heading: 'How it plays',
    standfirst: "I make a game on the side. It's a pixel-art card game that runs in the browser, on a phone or a computer.",
    body: `
        <p class="tagline">Ten floors an ante. Find the doors. Build the deck from nothing.</p>
        <p>Your weapons fire on their own. You pick up playing cards along the way and play them as hands, and damage is might times mult.</p>
        <p>There are four knights to pick from, difficulty from Easy to Extremely Hard, and leaderboards. Sign-in is optional, and every old version is still there to play.</p>`,
    plates: [
      plate('ba-knights', 'bloodantegame.web.app', 'Choose Your Knight: four pixel-art knights', 'Choose your knight', 'Four knights to pick from.'),
      plate('ba-play', 'bloodantegame.web.app', 'A floor in play, with cards dropping and damage numbers', 'A floor in play', 'Weapons fire on their own while you collect cards.'),
    ],
    next: ['/work/memphis/', 'Memphis'],
  }),
};
