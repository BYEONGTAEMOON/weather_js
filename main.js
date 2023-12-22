const API_KEY = '866f40c6c75b4b7b97d7e8aa8744163f';
let newsList = [];
const menus = document.querySelectorAll('.menus button');
menus.forEach((menu) =>
    menu.addEventListener('click', (event) => getNewsByCategory(event))
);

let url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getLatestNews = async () => {
    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
    );

    getNews();
};

const getNews = async () => {
    try {
        url.searchParams.set('page', page);
        url.searchParams.set('pageSize', pageSize);
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error('no result for this search');
            }
            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            paginationRender();
        } else {
            throw new Error(date.message);
        }
    } catch (error) {
        errorRender(error.message);
    }
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent;
    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
    );
    getNews();
};

const getNewsByKeyword = async () => {
    const keyword = document.getElementById('search-input').value;
    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
    );
    getNews();
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

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
${errorMessage}
</div>`;
    document.getElementById('news-board').innerHTML = errorHTML;
};

const paginationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);

    let lastPage = pageGroup * groupSize;

    if (lastPage > totalPages) {
        lastPage = totalPages;
    }

    const firstPage =
        lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHTML = `<li class="page-item" onClick="moveToPage(${
        page - 1
    })"><a class="page-link" href="#">Previous</a></li>`;
    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${
            i === page ? 'active' : ''
        }" onClick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }
    paginationHTML += `    <li class="page-item" onClick="moveToPage(${
        page + 1
    })"><a class="page-link" href="#">Next</a></li>`;
    document.querySelector('.pagination').innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
    console.log('movetopage', pageNum);
    page = pageNum;
    getNews();
};

getLatestNews();
