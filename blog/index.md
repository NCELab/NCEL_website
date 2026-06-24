---
title: Blog
nav:
  order: 5
  tooltip: News and articles
---

<div class="blog-page">

  <div class="blog-page__header">
    <h1 class="blog-page__title">News / Articles</h1>
  </div>

  <div class="blog-page__list">
    {% assign posts = site.posts | sort: "date" | reverse %}
    {% for post in posts %}
    <article class="blog-card">
      <a href="{{ post.url | relative_url }}" class="blog-card__image-link" aria-label="{{ post.title }}">
        {% if post.image %}
          <img
            src="{{ post.image | relative_url }}"
            alt="{{ post.title }}"
            class="blog-card__image"
            loading="lazy"
          >
        {% else %}
          <div class="blog-card__image blog-card__image--placeholder">
            <i class="fa-solid fa-newspaper"></i>
          </div>
        {% endif %}
      </a>

      <div class="blog-card__body">
        <time class="blog-card__date" datetime="{{ post.date | date_to_xmlschema }}">
          {{ post.date | date: "%d/%m/%Y" }}
        </time>

        <h2 class="blog-card__title">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h2>

        <p class="blog-card__excerpt">
          {{ post.excerpt | strip_html | truncatewords: 30 }}
        </p>

        {% if post.external_url %}
          <a href="{{ post.external_url }}" class="blog-card__read-more" target="_blank" rel="noopener noreferrer">
          Read More →
          </a>
        {% else %}
          <a href="{{ post.url | relative_url }}" class="blog-card__read-more">
            Read More →
          </a>
        {% endif %}
      </div>
    </article>
    {% endfor %}
  </div>

</div>
