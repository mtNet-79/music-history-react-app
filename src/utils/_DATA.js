import { formatComposer, formatUser, formatPerformer } from "./helpers";

let generateRandomAvatar = () => {
  return "";
  // fetch("https://avatar-endpoint.herokuapp.com/api/").then((res) => {
  //   res.blob().then((blobRes) => {
  //     let data = blobRes;
  //     let urlCreator = window.URL || window.webkitURL;
  //     let urlObj = urlCreator.createObjectURL(data);
  //     return urlObj;
  //   });
  // });
};

let users = {
  mthornton: {
    id: "mthornton",
    password: "password",
    name: "Mike Thornton",
    avatarURL: "https://avatar-endpoint.herokuapp.com/api/",
    answers: {},
    polls: [],
  },
  sarahedo: {
    id: "sarahedo",
    password: "password123",
    name: "Sarah Edo",
    avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    polls: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  tylermcginnis: {
    id: "tylermcginnis",
    password: "abc321",
    name: "Tyler McGinnis",
    avatarURL: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    polls: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
  mtsamis: {
    id: "mtsamis",
    password: "xyz123",
    name: "Mike Tsamis",
    avatarURL: null,
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
    },
    polls: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
  },
  zoshikanlu: {
    id: "zoshikanlu",
    password: "pass246",
    name: "Zenobia Oshikanlu",
    avatarURL: null,
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
    },
    polls: [],
  },
};

let nations = [
  "Austria",
  "Belgium",
  "Canada",
  "Cezch",
  "Denmark",
  "Ecuador",
  "Finland",
  "French",
  "Greece",
  "German",
  "German-British",
  "Honduras",
  "Ireland",
  "Japan",
  "Kuwait",
  "Luxembourg",
  "Mexico",
  "Norway",
  "Oman",
  "Polish",
  "Portugal",
  "Qatar",
  "Russia",
  "Sweden",
  "Thailand",
  "Uruguay",
  "Vietnam",
  "Yemen",
  "Zimbabwe",
];

nations = nations.map((nation, index) => {
  nations[index] = {
    id: index + 1,
    name: nation,
    composers: [],
    performers: [],
  };
});

let styles = [
  { id: 1, name: "Concerto" },
  { id: 2, name: "Opera" },
  {
    id: 3,
    name: "Oratorio",
  },
  {
    id: 4,
    name: "Chamber music",
  },
  {
    id: 5,
    name: "Symphony",
  },
  {
    id: 6,
    name: "Sonata",
  },
  {
    id: 7,
    name: "Aria",
  },
  {
    id: 8,
    name: "Ballet",
  },
  {
    id: 9,
    name: "Cantata",
  },
  {
    id: 10,
    name: "Chorale",
  },
  {
    id: 11,
    name: "Consort",
  },
  {
    id: 12,
    name: "Fantasia",
  },
  {
    id: 13,
    name: "Fugue",
  },
  {
    id: 14,
    name: "Mass",
  },
  {
    id: 15,
    name: "Nocturne",
  },
  {
    id: 16,
    name: "Overture",
  },
  {
    id: 17,
    name: "Passacaglia",
  },
  {
    id: 18,
    name: "Prelude",
  },
  {
    id: 19,
    name: "Serenade",
  },
  {
    id: 20,
    name: "Suite",
  },
  {
    id: 21,
    name: "Symphonic poem",
  },
  {
    id: 22,
    name: "Variation",
  },
];
styles = styles.map((style) => ({
  id: style.id,
  name: style.name,
  composers: [],
}));

let titles = [
  "Conductor",
  "Composer",
  "Pianist",
  "Violinist",
  "Cellist",
  "Soprano",
  "Mezzo-Soprano",
  "Tenor",
  "Baritone",
  "Bass",
  "Orchestra",
  "Choir",
  "Chorus Master",
  "Musicologist",
  "Music critic",
  "Opera Director",
  "Stage Director",
  "Librettist",
  "Arranger",
  "Harpsichordist",
  "Guitarist",
  "Flutist",
  "Clarinetist",
  "Oboist",
  "Bassoonist",
  "Trumpeter",
  "Trombonist",
  "French Horn Player",
  "Tuba Player",
  "Organist",
  "Harmonica Player",
  "Accordionist",
];

titles = titles.map((title, index) => ({
  id: index + 1,
  name: title.name,
  performers: [],
}));

let periods = [
  // ...period data

  {
    id: 1,
    name: "Medieval",
    dates: "500-1400",
  },
  {
    id: 2,
    name: "Renaissance",
    dates: "1400-1600",
  },
  {
    id: 3,
    name: "Baroque",
    dates: "1600-1750",
  },
  {
    id: 4,
    name: "Classical",
    dates: "1750-1820",
  },
  {
    id: 5,
    name: "Romantic",
    dates: "1815-1910",
  },
  {
    id: 6,
    name: "20th Century",
    dates: "1900-2000",
  },
  {
    id: 7,
    name: "Modern",
    dates: "2000-current",
  },
];

periods = periods.map((period) => ({
  id: period.id,
  name: period.name,
  dates: period.dates,
  composers: [],
}));

let composers = [
  // ...composer data
  {
    id: 1,
    name: "Ludwig van Beethoven",
    birthdate: new Date("1770-12-16"),
    deathdate: new Date("1827-03-26"),
    nationalities: [1],
    author: "mthornton",
    image: null,
    styles: [],
    contemporaries: [],
    compositions: [],
    period_id: 4, // Beethoven belongs to the Classical period
  },
  {
    id: 2,
    name: "Wolfgang Amadeus Mozart",
    birthdate: new Date("1756-01-27"),
    deathdate: new Date("1791-12-05"),
    nationalities: [1],
    author: "mthornton",
    image: null,
    styles: [],
    contemporaries: [],
    compositions: [],
    period_id: 4, // Mozart also belongs to the Classical period
  },
  {
    id: 3,
    name: "Johann Sebastian Bach",
    birthdate: new Date("1685-03-21"),
    deathdate: new Date("1750-07-28"),
    nationalities: [1],
    author: "mthornton",
    image: null,
    styles: [],
    contemporaries: [],
    compositions: [],
    period_id: 3, // Bach is from the Baroque period
  },
  {
    id: 4,
    name: "Pyotr Ilyich Tchaikovsky",
    birthdate: new Date("1840-05-07"),
    deathdate: new Date("1893-11-06"),
    nationalities: [1],
    author: "zoshikanlu",
    image: null,
    styles: [],
    contemporaries: [],
    compositions: [],
    period_id: 5, // Tchaikovsky is from the Romantic period
  },
  {
    id: 5,
    name: "Antonín Dvořák",
    birthdate: new Date("1841-09-08"),
    deathdate: new Date("1904-05-01"),
    nationalities: [1],
    author: "zoshikanlu",
    image: null,
    styles: [],
    contemporaries: [],
    compositions: [],
    period_id: 5, // Dvořák is also from the Romantic period
  },
  {
    id: 6,
    name: "Frédéric Chopin",
    birthdate: new Date("1810-03-01"),
    deathdate: new Date("1849-10-17"),
    nationalities: [1],
    author: "zoshikanlu",
    image: null,
    styles: [],
    contemporaries: [],
    compositions: [],
    period_id: 5, // Chopin is from the Romantic period
  },
  {
    id: 7,
    name: "Franz Schubert",
    birthdate: new Date("1797-01-31"),
    deathdate: new Date("1828-11-19"),
    nationalities: [1],
    author: "zoshikanlu",
    image: null,
    styles: [],
    contemporaries: [],
    compositions: [],
    period_id: 4, // Schubert is also from the Classical period
  },
  {
    id: 8,
    name: "George Frideric Handel",
    birthdate: new Date("1685-02-23"),
    deathdate: new Date("1759-04-14"),
    nationalities: [1],
    image: null,
    styles: [],
    contemporaries: [],
    compositions: [],
    period_id: 3,
  },
  {
    id: 9,
    name: "Johannes Brahms",
    birthdate: new Date("1833-05-07"),
    deathdate: new Date("1897-04-03"),
    nationalities: [1],
    author: "mthornton",
    image: null,
    styles: [],
    contemporaries: [],
    compositions: [],
    period_id: 5,
  },
  {
    id: 10,
    name: "Gustav Mahler",
    birthdate: new Date("1860-07-07"),
    deathdate: new Date("1911-05-18"),
    nationalities: [1],
    author: "mthornton",
    image: null,
    styles: [],
    contemporaries: [],
    compositions: [],
    period_id: 5,
  },
  {
    id: 11,
    name: "Claude Debussy",
    birthdate: new Date("1862-08-22"),
    deathdate: new Date("1918-03-25"),
    nationalities: [1],
    author: "mthornton",
    image: null,
    styles: [],
    contemporaries: [],
    compositions: [],
    period_id: 5,
  },
  {
    id: 12,
    name: "Igor Stravinsky",
    birthdate: new Date("1882-06-17"),
    deathdate: new Date("1971-04-06"),
    nationalities: [1],
    author: "sarahedo",
    image: null,
    styles: [],
    contemporaries: [],
    compositions: [],
    period_id: 6,
  },
];

const compositions = [
  {
    id: "1",
    name: "Le nozze di Figaro",
    composer_id: 2,
    style_id: 5,
    image: null,
    date: "1786-04-29",
  },
  {
    id: "2",
    name: "Symphony No. 5 in C Minor",
    composer_id: 1,
    style_id: 3,
    image: null,
    date: "1808-12-22",
  },
  {
    id: "3",
    name: "Symphony No. 9 in D Minor",
    composer_id: 1,
    style_id: 3,
    image: null,
    date: "1824-05-07",
  },
  {
    id: "4",
    name: "Don Giovanni",
    composer_id: 2,
    style_id: 2,
    image: null,
    date: "1787-10-29",
  },
];

const recordings = [
  {
    id: "1",
    name: "Brahms: Violin Concerto",
    performer_id: 1,
    style_id: 1,
    image: null,
    date: "1983-01-01",
  },
  {
    id: "2",
    name: "Dvorak: Cello Concerto",
    performer_id: 2,
    style_id: 1,
    image: null,
    date: "1993-01-01",
  },
  {
    id: "3",
    name: "Tchaikovsky: Piano Concerto No.1",
    performer_id: 3,
    style_id: 1,
    image: null,
    date: "2004-01-01",
  },
  {
    id: "4",
    name: "Beethoven: Violin Sonata No. 9",
    performer_id: 4,
    style_id: 6,
    image: null,
    date: "1989-01-01",
  },
  {
    id: "5",
    name: "Sibelius: Violin Concerto",
    performer_id: 5,
    style_id: 1,
    image: null,
    date: "2001-01-01",
  },
  {
    id: "6",
    name: "Chopin: Piano Concerto No. 1 in E Minor, Op. 11",
    performer_id: 6,
    style_id: 1,
    image: null,
    date: "1990-01-01",
  },
  {
    id: "7",
    name: "Vivaldi: The Four Seasons",
    performer_id: 7,
    style_id: 1,
    image: null,
    date: "1989-10-04",
  },
];

let performers = [
  // ...performer data
  {
    id: 1,
    name: "Itzhak Perlman",
    birthdate: new Date("1945-08-31"),
    deathdate: null,
    nationality: "Israeli",
    nationalities: [1],
    author: "sarahedo",
    image: null,
    styles: [],
    contemporaries: [],
    recordings: [],
  },
  {
    id: 2,
    name: "Yo-Yo Ma",
    birthdate: new Date("1955-10-07"),
    deathdate: null,
    nationalities: [1],
    author: "zoshikanlu",
    image: null,
    styles: [],
    contemporaries: [],
    recordings: [],
  },
  {
    id: 3,
    name: "Lang Lang",
    birthdate: new Date("1982-06-14"),
    deathdate: null,
    nationalities: [1],
    author: "zoshikanlu",
    image: null,
    styles: [],
    contemporaries: [],
    recordings: [],
  },
  {
    id: 4,
    name: "Anne-Sophie Mutter",
    birthdate: new Date("1963-06-29"),
    deathdate: null,
    nationalities: [1],
    author: "tylermcginnis",
    image: null,
    styles: [],
    contemporaries: [],
    recordings: [],
  },
  {
    id: 5,
    name: "Joshua Bell",
    birthdate: new Date("1967-12-09"),
    deathdate: null,
    nationalities: [1],
    author: "tylermcginnis",
    image: null,
    styles: [],
    contemporaries: [],
    recordings: [],
  },
  {
    id: 6,
    name: "Maria João Pires",
    birthdate: new Date("1944-07-23"),
    deathdate: null,
    nationalities: [1],
    author: "mthornton",
    image: null,
    styles: [],
    contemporaries: [],
    recordings: [],
  },
  {
    id: 7,
    name: "Nigel Kennedy",
    birthdate: new Date("1956-12-28"),
    deathdate: null,
    nationalities: [1],
    author: "mtsamis",
    image: null,
    styles: [],
    contemporaries: [],
    recordings: [],
  },
  {
    id: 8,
    name: "Vladimir Horowitz",
    birthdate: new Date("1903-10-01"),
    deathdate: new Date("1989-11-05"),
    nationalities: [1],
    author: "mthornton",
    image: null,
    styles: [],
    contemporaries: [],
    recordings: [],
  },
];

// app.get('/api/testdata', (req, res) => {
//   res.json(testdata);
// });
export function _getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...users }), 1000);
  });
}
export function _getComposers() {
  console.log("why not loaded", composers)
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...composers }), 1000);
  });
}

export function _getPerformers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...performers }), 1000);
  });
}
export function _getTitles() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...titles }), 1000);
  });
}
export function _getStyles() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...styles }), 1000);
  });
}
export function _getCompositions() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...compositions }), 1000);
  });
}
export function _getRecordings() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...recordings }), 1000);
  });
}

// NO STATE FOR THESE TWO, NOT INTIALLY LOADED
export function _getNations() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...nations }), 1000);
  });
}

export function _getPeriods() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...periods }), 1000);
  });
}

export function _saveComposer(composer) {
  return new Promise((resolve, reject) => {
    // TODO: ensure required data if need :TODO
    // if (!poll.optionOneText || !poll.optionTwoText || !poll.author) {
    //   reject("Please provide optionOneText, optionTwoText, and author");
    // }
    let formattedComposer = formatComposer(composer);
    setTimeout(() => {
      composers = {
        ...composers,
        [formattedComposer.id]: formattedComposer,
      };

      users = {
        ...users,
        [composer.author]: {
          ...users[composer.author],
          composers: [
            ...users[composer.author].composers,
            formattedComposer.id,
          ],
        },
      };

      resolve(formattedComposer);
    }, 1000);
  });
}
export function _updateComposer(composer) {
  return new Promise((resolve, reject) => {
    // TODO: ensure required data if need :TODO
    // if (!poll.optionOneText || !poll.optionTwoText || !poll.author) {
    //   reject("Please provide optionOneText, optionTwoText, and author");
    // }
    let formattedComposer = formatComposer(composer);
    setTimeout(() => {
      composers = {
        ...composers,
        [formattedComposer.id]: formattedComposer,
      };

      users = {
        ...users,
        [composer.author]: {
          ...users[composer.author],
          composers: [
            ...users[composer.author].composers,
            formattedComposer.id,
          ],
        },
      };

      resolve(formattedComposer);
    }, 1000);
  });
}
export function _savePerformer(performer) {
  return new Promise((resolve, reject) => {
    // TODO: ensure required data if need :TODO
    // if (!poll.optionOneText || !poll.optionTwoText || !poll.author) {
    //   reject("Please provide optionOneText, optionTwoText, and author");
    // }
    let formattedPerformer = formatPerformer(performer);
    setTimeout(() => {
      performers = {
        ...performers,
        [formattedPerformer.id]: formattedPerformer,
      };

      users = {
        ...users,
        [performer.author]: {
          ...users[performer.author],
          performers: [
            ...users[performer.author].performers,
            formattedPerformer.id,
          ],
        },
      };

      resolve(formattedPerformer);
    }, 1000);
  });
}

// export function _saveComposition(composition) {
//   return new Promise((resolve, reject) => {
//     // TODO: ensure required data if need :TODO
//     // if (!poll.optionOneText || !poll.optionTwoText || !poll.author) {
//     //   reject("Please provide optionOneText, optionTwoText, and author");
//     // }
//     let formattedPerformer = formatPerformer(performer);
//     setTimeout(() => {
//       performers = {
//         ...performers,
//         [formattedPerformer.id]: formattedPerformer,
//       };

//       users = {
//         ...users,
//         [performer.author]: {
//           ...users[performer.author],
//           performers: [
//             ...users[performer.author].performers,
//             formattedPerformer.id,
//           ],
//         },
//       };

//       resolve(formattedPerformer);
//     }, 1000);
//   });
// }

export function _saveUser(info) {
  return new Promise((resolve, reject) => {
    let formattedUser = formatUser(info);
    if (formattedUser) {
      setTimeout(() => {
        users = {
          ...users,
          [formattedUser.id]: formattedUser,
        };

        resolve(formattedUser);
      }, 1000);
    } else {
      reject("Please provide a unique user name");
    }
  });
}

// export function _savePollAnswer({ authedUser, pid, answer }) {
//   return new Promise((resolve, reject) => {
//     if (!authedUser || !pid || !answer) {
//       reject("Please provide authedUser, pid, and answer");
//     }
//     setTimeout(() => {
//       users = {
//         ...users,
//         [authedUser]: {
//           ...users[authedUser],
//           answers: {
//             ...users[authedUser].answers,
//             [pid]: answer,
//           },
//         },
//       };

//       polls = {
//         ...polls,
//         [pid]: {
//           ...polls[pid],
//           [answer]: {
//             ...polls[pid][answer],
//             votes: polls[pid][answer].votes.concat([authedUser]),
//           },
//         },
//       };

//       resolve(true);
//     }, 500);
//   });
// }
