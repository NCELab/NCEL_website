---
title: Projects
nav:
  order: 2
  tooltip: Research projects
---

<style>
.proj-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 32px 80px;
}

.proj-page-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 40px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--light-gray);
}

.proj-page-header h1 {
  font-size: 1.8rem;
  font-weight: 300;
  margin: 0;
  text-align: left;
  text-transform: none;
  letter-spacing: 0;
}

.proj-page-header p {
  font-size: 0.85rem;
  color: var(--gray);
  margin: 0;
  max-width: 280px;
  text-align: right;
  line-height: 1.5;
}

/* ── Section label ── */
.proj-section-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gray);
  margin: 48px 0 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--light-gray);
  text-align: left;
}

/* ── Masonry columns ── */
.proj-masonry {
  columns: 3;
  column-gap: 20px;
}

@media (max-width: 900px) { .proj-masonry { columns: 2; } }
@media (max-width: 540px) { .proj-masonry { columns: 1; } }

/* ── Each card ── */
.proj-card {
  break-inside: avoid;
  display: block;
  margin-bottom: 20px;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  overflow: hidden;
  background: var(--background);
  transition: box-shadow 0.2s, transform 0.15s;
}

.proj-card:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.12);
  transform: translateY(-3px);
  border-color: var(--primary);
}

/* ── Image area ── */
.proj-card__img {
  width: 100%;
  display: block;
  object-fit: cover;
  background: var(--background-alt);
}

/* Make some cards taller for masonry effect */
.proj-card:nth-child(1) .proj-card__img { aspect-ratio: 4/5; }
.proj-card:nth-child(2) .proj-card__img { aspect-ratio: 4/3; }
.proj-card:nth-child(3) .proj-card__img { aspect-ratio: 3/4; }
.proj-card:nth-child(4) .proj-card__img { aspect-ratio: 16/9; }

.proj-card__img-fallback {
  width: 100%;
  background: linear-gradient(135deg, var(--light-gray) 0%, var(--background-alt) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--heading);
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--gray);
}

.proj-card:nth-child(1) .proj-card__img-fallback { aspect-ratio: 4/5; }
.proj-card:nth-child(2) .proj-card__img-fallback { aspect-ratio: 4/3; }
.proj-card:nth-child(3) .proj-card__img-fallback { aspect-ratio: 3/4; }
.proj-card:nth-child(4) .proj-card__img-fallback { aspect-ratio: 16/9; }

/* ── Text area ── */
.proj-card__body {
  padding: 14px 16px 16px;
}

.proj-card__title {
  font-family: var(--heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 4px;
  letter-spacing: 0.02em;
}

.proj-card__subtitle {
  font-size: 0.82rem;
  color: var(--gray);
  font-style: italic;
  line-height: 1.4;
  margin: 0 0 10px;
}

.proj-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}

.proj-card__tag {
  font-size: 0.68rem;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--secondary);
  color: var(--text);
  white-space: nowrap;
}

.proj-card__link {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--primary);
}
</style>

<div class="proj-page">

<div class="proj-page-header">
  <h1>Current Projects</h1>
  <p>Active studies from our lab, grouped by research theme.</p>
</div>

<div class="proj-section-label">Memory &amp; Trauma</div>
<div class="proj-masonry">
{% assign group_projects = site.projects | where: "group", "memory-trauma" %}
{% for proj in group_projects %}
<a href="{{ proj.url | relative_url }}" class="proj-card">
  {% if proj.image %}
    <img src="{{ proj.image | relative_url }}" alt="{{ proj.title }}" class="proj-card__img" loading="lazy">
  {% else %}
    <div class="proj-card__img-fallback">{{ proj.title }}</div>
  {% endif %}
  <div class="proj-card__body">
    <p class="proj-card__title">{{ proj.title }}</p>
    <p class="proj-card__subtitle">{{ proj.subtitle }}</p>
    {% if proj.tags %}
    <div class="proj-card__tags">
      {% for tag in proj.tags limit: 3 %}
      <span class="proj-card__tag">{{ tag }}</span>
      {% endfor %}
    </div>
    {% endif %}
    <span class="proj-card__link">Learn more →</span>
  </div>
</a>
{% endfor %}
</div>

<div class="proj-section-label">Attention &amp; Neurodevelopment</div>
<div class="proj-masonry">
{% assign group_projects = site.projects | where: "group", "attention-neurodevelopment" %}
{% for proj in group_projects %}
<a href="{{ proj.url | relative_url }}" class="proj-card">
  {% if proj.image %}
    <img src="{{ proj.image | relative_url }}" alt="{{ proj.title }}" class="proj-card__img" loading="lazy">
  {% else %}
    <div class="proj-card__img-fallback">{{ proj.title }}</div>
  {% endif %}
  <div class="proj-card__body">
    <p class="proj-card__title">{{ proj.title }}</p>
    <p class="proj-card__subtitle">{{ proj.subtitle }}</p>
    {% if proj.tags %}
    <div class="proj-card__tags">
      {% for tag in proj.tags limit: 3 %}
      <span class="proj-card__tag">{{ tag }}</span>
      {% endfor %}
    </div>
    {% endif %}
    <span class="proj-card__link">Learn more →</span>
  </div>
</a>
{% endfor %}
</div>

<div class="proj-section-label">Risk-Taking, Decision-Making &amp; Mental Health</div>
<div class="proj-masonry">
{% assign group_projects = site.projects | where: "group", "risk-decision-mental-health" %}
{% for proj in group_projects %}
<a href="{{ proj.url | relative_url }}" class="proj-card">
  {% if proj.image %}
    <img src="{{ proj.image | relative_url }}" alt="{{ proj.title }}" class="proj-card__img" loading="lazy">
  {% else %}
    <div class="proj-card__img-fallback">{{ proj.title }}</div>
  {% endif %}
  <div class="proj-card__body">
    <p class="proj-card__title">{{ proj.title }}</p>
    <p class="proj-card__subtitle">{{ proj.subtitle }}</p>
    {% if proj.tags %}
    <div class="proj-card__tags">
      {% for tag in proj.tags limit: 3 %}
      <span class="proj-card__tag">{{ tag }}</span>
      {% endfor %}
    </div>
    {% endif %}
    <span class="proj-card__link">Learn more →</span>
  </div>
</a>
{% endfor %}
</div>

</div>
                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                      </article>
                                                                                                                                                                                                                                                                                                                      </div>
