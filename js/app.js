const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category));
};
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

const newsDetailsLoad = (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/0${newsId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllNews(data.data));
};

const displayAllNews = (allNews) => {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  allNews.forEach((news) => {
    console.log(news);
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
                      <p class="card-text">${news.details}</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
            </div>
        `;
    newsContainer.appendChild(newsdetailsDiv);
  });
};

//globally load
// newsDetailsLoad(08);
loadCategories();
