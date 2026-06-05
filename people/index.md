---
title: People
nav:
  order: 3
  tooltip: Meet our team
---

<style>
.people-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px 60px;
  font-family: var(--body);
}

.people-section {
  margin-bottom: 48px;
}

.people-section-label {
  font-size: 0.78rem;
  font-weight: var(--semi-bold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text);
  opacity: 0.5;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.people-card {
  display: flex;
  align-items: flex-start;
  gap: 28px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  text-decoration: none;
  color: var(--text);
  transition: opacity 0.2s;
}

.people-card:last-child {
  border-bottom: none;
}

.people-card:hover {
  opacity: 0.8;
}

.people-card-img {
  width: 110px;
  height: 110px;
  border-radius: 999px;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  flex-shrink: 0;
}

.people-card-info {
  flex: 1;
}

.people-card-name {
  font-family: var(--heading);
  font-size: 1.2rem;
  font-weight: var(--semi-bold);
  margin: 0 0 4px 0;
  color: var(--text);
}

.people-card-role {
  font-size: 0.95rem;
  color: var(--primary);
  font-weight: var(--semi-bold);
  margin: 0 0 10px 0;
}

.people-card-blurb {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text);
  opacity: 0.85;
  margin: 0;
}
</style>

<div class="people-page">

<!-- PI -->
<div class="people-section">
<div class="people-section-label">Principal Investigator</div>
{% assign pi_members = site.members | where: "role", "pi" | sort: "order" %}
{% for member in pi_members %}
<a href="{{ member.url | relative_url }}" class="people-card">
  <img src="{{ member.image | relative_url }}" alt="{{ member.name }}" class="people-card-img" onerror="this.src='/NCEL_website/images/photo.jpg'">
  <div class="people-card-info">
    <p class="people-card-name">{{ member.name }}</p>
    <p class="people-card-role">{{ member.description }}</p>
    {% if member.content and member.content != "" %}
    <p class="people-card-blurb">{{ member.content | strip_html | truncatewords: 60 }}</p>
    {% endif %}
  </div>
</a>
{% endfor %}
</div>

<!-- Collaborator -->
<div class="people-section">
<div class="people-section-label">Collaborator</div>
{% assign coi_members = site.members | where: "role", "coi" | sort: "order" %}
{% for member in coi_members %}
<a href="{{ member.url | relative_url }}" class="people-card">
  <img src="{{ member.image | relative_url }}" alt="{{ member.name }}" class="people-card-img" onerror="this.src='/NCEL_website/images/photo.jpg'">
  <div class="people-card-info">
    <p class="people-card-name">{{ member.name }}</p>
    <p class="people-card-role">{{ member.description }}</p>
    {% if member.content and member.content != "" %}
    <p class="people-card-blurb">{{ member.content | strip_html | truncatewords: 60 }}</p>
    {% endif %}
  </div>
</a>
{% endfor %}
</div>

<!-- Research Coordinator & Research Assistant -->
<div class="people-section">
<div class="people-section-label">Research Coordinator &amp; Research Assistant</div>
{% assign rc_members = site.members | where: "role", "rc" | sort: "order" %}
{% assign ra_members = site.members | where: "role", "ra" | sort: "order" %}
{% assign rc_ra_members = rc_members | concat: ra_members %}
{% for member in rc_ra_members %}
<a href="{{ member.url | relative_url }}" class="people-card">
  <img src="{{ member.image | relative_url }}" alt="{{ member.name }}" class="people-card-img" onerror="this.src='/NCEL_website/images/photo.jpg'">
  <div class="people-card-info">
    <p class="people-card-name">{{ member.name }}</p>
    <p class="people-card-role">{{ member.description }}</p>
    {% if member.content and member.content != "" %}
    <p class="people-card-blurb">{{ member.content | strip_html | truncatewords: 60 }}</p>
    {% endif %}
  </div>
</a>
{% endfor %}
</div>

<!-- Interns -->
<div class="people-section">
<div class="people-section-label">Interns</div>
{% assign intern_members = site.members | where: "role", "intern" | sort: "order" %}
{% for member in intern_members %}
<a href="{{ member.url | relative_url }}" class="people-card">
  <img src="{{ member.image | relative_url }}" alt="{{ member.name }}" class="people-card-img" onerror="this.src='/NCEL_website/images/photo.jpg'">
  <div class="people-card-info">
    <p class="people-card-name">{{ member.name }}</p>
    <p class="people-card-role">{{ member.description }}</p>
    {% if member.content and member.content != "" %}
    <p class="people-card-blurb">{{ member.content | strip_html | truncatewords: 60 }}</p>
    {% endif %}
  </div>
</a>
{% endfor %}
</div>

</div>
