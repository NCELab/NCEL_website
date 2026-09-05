---
title: Media
nav:
  order: 4
  tooltip: News and articles
  external_url: https://www.psychologytoday.com/us/blog/the-stories-our-brains-tell-us/202603/when-everything-becomes-trauma
---
<script>
function sortArticles() {
  const container = document.getElementById('media-list');
  const cards = Array.from(container.getElementsByClassName('media-card'));
  const sortBy = document.getElementById('sort-select').value;

  cards.sort((a, b) => {
    const dateA = new Date(a.getAttribute('data-date'));
    const dateB = new Date(b.getAttribute('data-date'));
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  cards.forEach(card => container.appendChild(card));
}
</script>

# News / Articles

<div class="filter-container" style="margin-bottom: 20px;">
  <label for="sort-select">Sort by: </label>
  <select id="sort-select" onchange="sortArticles()">
    <option value="newest">Date: Newest first</option>
    <option value="oldest">Date: Oldest first</option>
  </select>
</div>

<div id="media-list">
{% assign posts = site.posts | sort: "date" | reverse %}
{% for post in posts %}
  <article class="media-card" data-date="{{ post.date | date: '%Y-%m-%d' }}">
    <div class="media-card__body">
      <time class="media-card__date" datetime="{{ post.date | date_to_xmlschema }}">
        {{ post.date | date: "%d/%m/%Y" }}
      </time>
      <h2 class="media-card__title">
        {% if post.external_url %}
          <a href="{{ post.external_url }}" target="_blank" rel="noopener noreferrer">{{ post.title }}</a>
        {% else %}
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        {% endif %}
      </h2>
      <p class="media-card__excerpt">
        {{ post.excerpt | strip_html | truncatewords: 30 }}
      </p>
      {% if post.external_url %}
        <a href="{{ post.external_url }}" class="media-card__read-more" target="_blank" rel="noopener noreferrer">Read More →</a>
      {% else %}
        <a href="{{ post.url | relative_url }}" class="media-card__read-more">Read More →</a>
      {% endif %}
    </div>
  </article>
{% endfor %}
</div>
