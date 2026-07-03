---
title: Media
nav:
  order: 4
  tooltip: News and articles
  external_url: https://www.psychologytoday.com/us/blog/the-stories-our-brains-tell-us/202603/when-everything-becomes-trauma
---

<div class=" Media-page">

  <div class=" Media-page__header">
    <h1 class=" Media-page__title">News / Articles</h1>
  </div>

  <div class=" Media-page__list">
    {% assign posts = site.posts | sort: "date" | reverse %}
    {% for post in posts %}
    <article class=" Media-card">
      <a href="{{ post.url | relative_url }}" class="Media-card__image-link" aria-label="{{ post.title }}">
        {% if post.image %}
          <img
            src="{{ post.image | relative_url }}"
            alt="{{ post.title }}"
            class=" Media-card__image"
            loading="lazy"
          >
        {% else %}
          <div class=" Media-card__image  Media-card__image--placeholder">
            <i class="fa-solid fa-newspaper"></i>
          </div>
        {% endif %}
      </a>

      <div class=" Media-card__body">
        <time class=" Media-card__date" datetime="{{ post.date | date_to_xmlschema }}">
          {{ post.date | date: "%d/%m/%Y" }}
        </time>

      <h2 class=" Media-card__title">
          {% if post.external_url %}
            <a href="{{ post.external_url }}" target="_blank" rel="noopener noreferrer">{{ post.title }}</a>
          {% else %}
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          {% endif %}
      </h2>

        <p class=" Media-card__excerpt">
          {{ post.excerpt | strip_html | truncatewords: 30 }}
        </p>

        {% if post.external_url %}
          <a href="{{ post.external_url }}" class="Media-card__read-more" target="_blank" rel="noopener noreferrer">
          Read More →
          </a>
        {% else %}
          <a href="{{ post.url | relative_url }}" class="Media-card__read-more">
            Read More →
          </a>
        {% endif %}
      </div>
    </article>
    {% endfor %}
  </div>

</div>
