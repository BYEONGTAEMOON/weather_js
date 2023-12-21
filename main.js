const API_KEY = '866f40c6c75b4b7b97d7e8aa8744163f';
let newsList = [];
const menus = document.querySelectorAll('.menus button');
menus.forEach((menu) =>
    menu.addEventListener('click', (event) => getNewsByCategory(event))
);

const getLatestNews = async () => {
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
    );

    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log('dddd', newsList);
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent;
    console.log('category', category);
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    console.log('Ddd', data);
    newsList = data.articles;
    render();
};

const render = () => {
    const newsHTML = newsList
        .map(
            (news) => ` <div class="row news">
    <div class="col-lg-4">
        <img
            class="news-img-size"
            src="${news.urlToImage}"
        />
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description}</p>
        <div>${news.source.name} * ${news.publishedAt}</div>
    </div>
</div>`
        )
        .join('');
    document.getElementById('news-board').innerHTML = newsHTML;
};

getLatestNews();
