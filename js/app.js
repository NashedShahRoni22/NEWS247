// load category items
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category));
};
// display category items
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <li onclick="newsDetailsLoad(${category.category_id})">${category.category_name}</li>
        `;
    categoryContainer.appendChild(li);
  });
};
// load category all news
const newsDetailsLoad = (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/0${newsId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllNews(data.data));
};
// display category all news
const displayAllNews = (allNews) => {
  //spinner start
  const spinner = document.getElementById('spinner');
  spinner.classList.remove('d-none');
  //display all news
  const newsItems = document.getElementById('news-items');
  newsItems.innerText = allNews.length;
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  allNews.forEach((news) => {
    const newsdetailsDiv = document.createElement("div");
    newsdetailsDiv.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${news.title}</h5>
                      <p class="card-text">${news.details.slice(0,200)}...</p>
                    </div>
                    <div class="d-flex align-items-center justify-content-between px-3 py-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="img-left">
                    <img src="${news.author.img}" alt="" class="rounded-circle">
                  </div>
                  <div class="content-right">
                      <p>${news.author.name?news.author.name :  '<p class="text-danger">No Data Found</p>'}</p>
                      <p>${news.author.published_date?news.author.published_date : '<p class="text-danger">No Data Found</p>'}</p>
                  </div>
                </div>
                <div>
                  <i class="fa-regular fa-eye"></i>
                  <span>${news.total_view?news.total_view:'<p class="text-danger">No Views</p>'}</span>
                </div>
                <div>
                <i class="fa-solid fa-arrow-right"></i>
                </div>
              </div>
                  </div>
                </div>
            </div>
        `;
    newsContainer.appendChild(newsdetailsDiv);
    //spinner end
    spinner.classList.add('d-none');
  });
};

//globally load
newsDetailsLoad(08);
loadCategories();
