const request = new Network();
let topHeadlinesArticles = [];
let healthArticles = [];
let technologyArticles = [];
let bitCoinArticles = [];


let flick = new Flickity('.carousel');


init();

function init() {
  // Top Headlines articles
  request.getArticles('https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=49f2cf2a45c9474d994c3e2ace863264')
  .then(showTopHeadline)
  .catch(err => console.log(err));

  // health articles
  request.getArticles('https://newsapi.org/v2/everything?q=health&pageSize=5&apiKey=49f2cf2a45c9474d994c3e2ace863264')
  .then(response => showArticles(response, 'health'))
  .catch(err => console.log(err));

  // technology articles
  request.getArticles('https://newsapi.org/v2/everything?q=technology&pageSize=5&apiKey=49f2cf2a45c9474d994c3e2ace863264')
  .then(response => showArticles(response, 'tech'))
  .catch(err => console.log(err));

  // bit coin articles
  request.getArticles('https://newsapi.org/v2/everything?q=bitcoin&pageSize=5&apiKey=49f2cf2a45c9474d994c3e2ace863264')
  .then(response => showArticles(response, 'bitcoin'))
  .catch(err => console.log(err));


  // event listeners
  document.querySelector('.carousel').addEventListener('click', openSelectArticle);

  document.querySelector('.section-health').addEventListener('click', et => openSelectArticle(et, 'health'));
  
  document.querySelector('.section-tech').addEventListener('click', et => openSelectArticle(et, 'tech'));

  document.querySelector('.section-bitcoin').addEventListener('click', et => openSelectArticle(et, 'bitcoin'));
}


function showTopHeadline(response) {
  topHeadlinesArticles = response.articles;

  topHeadlinesArticles.forEach((article) => {
    let cell = document.createElement('div');
    cell.className = 'carousel-cell';

    let img = document.createElement('img');
    img.src = article.urlToImage;
    img.className = 'cell-image';

    let heading = document.createElement('h2');
    let span = document.createElement('span');
    span.textContent = article.title;

    heading.appendChild(span);

    cell.appendChild(img);
    cell.appendChild(heading);


    flick.append(cell);
  });

  flick.playPlayer();
}

function showArticles(response, section) {
  switch (section) {
    case 'health': healthArticles = response.articles;
    break;

    case 'tech': technologyArticles = response.articles;
    break;
  
    case 'bitcoin': bitCoinArticles = response.articles;
    break;

  }

  response.articles.forEach((article) => {
    const card = createCard(article, section);

    document.querySelector(`.section-${section} .card-container`).appendChild(card);
  });
}

function openSelectArticle(et, section) {
  if (et.target.classList.contains('cell-image')) {
    open(topHeadlinesArticles[flick.selectedIndex].url);
  }
  else if (et.target.classList.contains('card-title')) {
    const parent = et.target.parentNode.parentNode.parentNode;

    const child = et.target.parentNode.parentNode;

    let index = Array.prototype.indexOf.call(parent.children, child);

    let url = '';
    switch (section) {
      case 'health' : url = healthArticles[index].url;
      break;

      case 'tech': url = technologyArticles[index].url;
      break;

      case 'bitcoin': url = bitCoinArticles[index].url;
      break;
    }

     open(url);
  }
}

function createCard(article, section) {
  let card = document.createElement('div');
  card.className = 'card';

  let cardImg = document.createElement('div');
  cardImg.className = 'card-img';
  cardImg.style.backgroundImage = `url(${article.urlToImage})`;

  let cardInfo = document.createElement('div');
  cardInfo.className = 'card-info';

  let cardAbout = document.createElement('div');
  cardAbout.className = 'card-about';

  let cardTag = document.createElement('a');
  cardTag.className = 'card-tag';
  cardTag.textContent = section;

  let cardTime = document.createElement('div');
  cardTime.className = 'card-time';

  const dt = new Date(article.publishedAt);
  cardTime.textContent = `${dt.getFullYear()}/${dt.getMonth() + 1}/${dt.getDate()}`;

  let cardTitle = document.createElement('h1');
  cardTitle.className = 'card-title';
  cardTitle.textContent = article.title;

  let cardCreator = document.createElement('div');
  cardCreator.className = 'card-creator';
  cardCreator.innerHTML = `by <a href='#'> ${article.author.split(' ').splice(0, 2).join(' ')} </a>`;

  cardAbout.appendChild(cardTag);
  cardAbout.appendChild(cardTime);

  cardInfo.appendChild(cardAbout);
  cardInfo.appendChild(cardTitle);
  cardInfo.appendChild(cardCreator);

  card.appendChild(cardImg);
  card.appendChild(cardInfo);

  return card;
}

