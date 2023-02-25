const nations = [
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
  
  const transformedNations = nations.map((nation, index) => ({
    id: index + 1,
    name: nation,
  }));
  
  const composers = [
    {
      id: 1,
      name: "Ludwig van Beethoven",
      birthdate: new Date("1770-12-16"),
      deathdate: new Date("1827-03-26"),
      nationality: "German"
    },
    {
      id: 2,
      name: "Wolfgang Amadeus Mozart",
      birthdate: new Date("1756-01-27"),
      deathdate: new Date("1791-12-05"),
      nationality: "Austrian"
    },
    {
      id: 3,
      name: "Johann Sebastian Bach",
      birthdate: new Date("1685-03-21"),
      deathdate: new Date("1750-07-28"),
      nationality: "German"
    },
    {
      id: 4,
      name: "Pyotr Ilyich Tchaikovsky",
      birthdate: new Date("1840-05-07"),
      deathdate: new Date("1893-11-06"),
      nationality: "Russian"
    },
    {
      id: 5,
      name: "Antonín Dvořák",
      birthdate: new Date("1841-09-08"),
      deathdate: new Date("1904-05-01"),
      nationality: "Czech"
    },
    {
      id: 6,
      name: "Frédéric Chopin",
      birthdate: new Date("1810-03-01"),
      deathdate: new Date("1849-10-17"),
      nationality: "Polish"
    },
    {
      id: 7,
      name: "Franz Schubert",
      birthdate: new Date("1797-01-31"),
      deathdate: new Date("1828-11-19"),
      nationality: "Austrian"
    },
    {
      id: 8,
      name: "George Frideric Handel",
      birthdate: new Date("1685-02-23"),
      deathdate: new Date("1759-04-14"),
      nationality: "German-British"
    },
    {
      id: 9,
      name: "Johannes Brahms",
      birthdate: new Date("1833-05-07"),
      deathdate: new Date("1897-04-03"),
      nationality: "German"
    },
    {
      id: 10,
      name: "Gustav Mahler",
      birthdate: new Date("1860-07-07"),
      deathdate: new Date("1911-05-18"),
      nationality: "Austrian"
    },
    {
      id: 11,
      name: "Claude Debussy",
      birthdate: new Date("1862-08-22"),
      deathdate: new Date("1918-03-25"),
      nationality: "French"
    },
    {
      id: 12,
      name: "Igor Stravinsky",
      birthdate: new Date("1882-06-17"),
      deathdate: new Date("1971-04-06"),
      nationality: "Russian"
    },
  ];
  
  const styles = [
    { id: 1, name: "Classical" },
    { id: 2, name: "Romantic" },
    { id: 3, name: "Baroque" },
    { id: 4, name: "Impressionist" },
    { id: 5, name: "20th Century" },
    { id: 6, name: "Minimalist" },
    { id: 7, name: "Contemporary" },
    { id: 8, name: "Experimental" },
    { id: 9, name: "Electronic" },
    { id: 10, name: "Jazz" },
    { id: 11, name: "Folk" },
    { id: 12, name: "Pop" }
  ];
  
  const periods = [
    { id: 1, name: 'Medieval' },
    { id: 2, name: 'Renaissance' },
    { id: 3, name: 'Baroque' },
    { id: 4, name: 'Classical' },
    { id: 5, name: 'Romantic' },
    { id: 6, name: 'Modern' },
  ];
  
  const performers = [
    {
      id: 1,
      name: "Itzhak Perlman",
      birthdate: new Date("1945-08-31"),
      deathdate: null,
      nationality: "Israeli",
    },
    {
      id: 2,
      name: "Yo-Yo Ma",
      birthdate: new Date("1955-10-07"),
      deathdate: null,
      nationality: "American",
    },
    {
      id: 3,
      name: "Lang Lang",
      birthdate: new Date("1982-06-14"),
      deathdate: null,
      nationality: "Chinese",
    },
    {
      id: 4,
      name: "Anne-Sophie Mutter",
      birthdate: new Date("1963-06-29"),
      deathdate: null,
      nationality: "German",
    },
    {
      id: 5,
      name: "Joshua Bell",
      birthdate: new Date("1967-12-09"),
      deathdate: null,
      nationality: "American",
    },
    {
      id: 6,
      name: "Maria João Pires",
      birthdate: new Date("1944-07-23"),
      deathdate: null,
      nationality: "Portuguese",
    },
    {
      id: 7,
      name: "Nigel Kennedy",
      birthdate: new Date("1956-12-28"),
      deathdate: null,
      nationality: "British",
    },
    {
      id: 8,
      name: "Vladimir Horowitz",
      birthdate: new Date("1903-10-01"),
      deathdate: new Date("1989-11-05"),
      nationality: "Ukrainian",
    },
    {
      id: 9,
      name: "Mstislav Rostropovich",
      birthdate: new Date("1927-03-27"),
      deathdate: new Date("2007-04-27"),
      nationality: "Russian",
    },
    {
      id: 10,
      name: "Arthur Rubinstein",
      birthdate: new Date("1887-01-28"),
      deathdate: new Date("1982-12-20"),
      nationality: "Polish",
    },
    {
      id: 11,
      name: "Yehudi Menuhin",
      birthdate: new Date("1916-04-22"),
      deathdate: new Date("1999-03-12"),
      nationality: "American",
    },
    {
      id: 12,
      name: "Jascha Heifetz",
      birthdate: new Date("1901-02-02"),
      deathdate: new Date("1987-12-10"),
      nationality: "Lithuanian-American",
    },
  ];
  