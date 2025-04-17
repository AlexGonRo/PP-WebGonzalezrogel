// Fetch the latest blog posts from the WordPress REST API and
// insert them into my front page.
const blogContainer = document.getElementById('js-blog-entries');
const entryApiUrl = 'https://blog.gonzalezrogel.com/wp-json/wp/v2/posts?per_page=3&_embed';

fetch(entryApiUrl)
.then(response => response.json())
.then(posts => {
    posts.forEach(post => {
        // Create a blog entry for each post
        const blogEntry = document.createElement('div');
        blogEntry.className = 'col-md-4 d-flex animate-object';
        blogEntry.innerHTML = `
            <div class="blog-entry justify-content-end">
                <a href="${post.link}" class="block-20" style="background-image: url('${post._embedded["wp:featuredmedia"][0].link || 'images/default-image.jpg'}');">
                </a>
                <div class="text mt-3 float-right d-block">
                    <h3 class="heading m-0"><a href="${post.link}">${post.title.rendered}</a></h3>
                    <div class="d-flex align-items-center mb-3 meta">
                        <p class="mb-0">
                            <span class="me-2">${new Date(post.date).toLocaleDateString()}</span>
                        </p>
                    </div>
                    <p>${post.excerpt.rendered.replace(/<[^>]+>/g, '')}</p>
                </div>
            </div>
        `;
        blogContainer.appendChild(blogEntry);
    });
})
.catch(error => {
    console.error('Error fetching blog posts:', error);
    blogContainer.innerHTML = '<p>Unable to load blog posts at this time. Please try again later.</p>';
});
