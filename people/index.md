---
title: People
nav:
  order: 3
  tooltip: Meet our team
---

<style>
.people-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 40px 20px;
  font-family: var(--heading);
}

.people-tree-row {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.people-tree-label {
  text-align: center;
  font-size: 0.85rem;
  font-weight: var(--semi-bold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text);
  opacity: 0.6;
  margin-bottom: 16px;
}

.headshot-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text);
  transition: opacity 0.2s;
}

.headshot-card:hover {
  opacity: 0.75;
}

.headshot-img {
  width: 120px;
  height: 120px;
  border-radius: 999px;
  object-fit: cover;
  box-shadow: var(--shadow);
}

.headshot-name {
  font-size: 0.9rem;
  font-weight: var(--semi-bold);
  text-align: center;
  max-width: 130px;
}

.headshot-role {
  font-size: 0.78rem;
  opacity: 0.6;
  text-align: center;
  max-width: 130px;
}

.tree-connector {
  width: 2px;
  height: 30px;
  background: var(--text);
  opacity: 0.2;
  margin: 0 auto;
}

.tree-row-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>

<div class="people-tree">

  <!-- PI Row -->
  <div class="tree-row-divider">
    <div class="people-tree-label">Principal Investigator</div>
    <div class="people-tree-row">
      {% assign pi_members = site.members | where: "role", "pi" | sort: "order" %}
      {% for member in pi_members %}
      <a href="{{ member.url | relative_url }}" class="headshot-card">
        <img src="{{ member.image | relative_url }}" alt="{{ member.name }}" class="headshot-img">
        <span class="headshot-name">{{ member.name }}</span>
        <span class="headshot-role">{{ member.description }}</span>
      </a>
      {% endfor %}
    </div>
  </div>

  <div class="tree-connector"></div>

  <!-- Collaborator Row -->
  <div class="tree-row-divider">
    <div class="people-tree-label">Collaborator</div>
    <div class="people-tree-row">
      {% assign coi_members = site.members | where: "role", "coi" | sort: "order" %}
      {% for member in coi_members %}
      <a href="{{ member.url | relative_url }}" class="headshot-card">
        <img src="{{ member.image | relative_url }}" alt="{{ member.name }}" class="headshot-img">
        <span class="headshot-name">{{ member.name }}</span>
        <span class="headshot-role">{{ member.description }}</span>
      </a>
      {% endfor %}
    </div>
  </div>

  <div class="tree-connector"></div>

  <!-- Research Coordinator & Research Assistant Row -->
  <div class="tree-row-divider">
    <div class="people-tree-label">Research Coordinator &amp; Research Assistant</div>
    <div class="people-tree-row">
      {% assign rc_members = site.members | where: "role", "rc" | sort: "order" %}
      {% for member in rc_members %}
      <a href="{{ member.url | relative_url }}" class="headshot-card">
        <img src="{{ member.image | relative_url }}" alt="{{ member.name }}" class="headshot-img">
        <span class="headshot-name">{{ member.name }}</span>
        <span class="headshot-role">{{ member.description }}</span>
      </a>
      {% endfor %}
      {% assign ra_members = site.members | where: "role", "ra" | sort: "order" %}
      {% for member in ra_members %}
      <a href="{{ member.url | relative_url }}" class="headshot-card">
        <img src="{{ member.image | relative_url }}" alt="{{ member.name }}" class="headshot-img">
        <span class="headshot-name">{{ member.name }}</span>
        <span class="headshot-role">{{ member.description }}</span>
      </a>
      {% endfor %}
    </div>
  </div>

  <div class="tree-connector"></div>

  <!-- Interns Row -->
  <div class="tree-row-divider">
    <div class="people-tree-label">Interns</div>
    <div class="people-tree-row">
      {% assign intern_members = site.members | where: "role", "intern" | sort: "order" %}
      {% for member in intern_members %}
      <a href="{{ member.url | relative_url }}" class="headshot-card">
        <img src="{{ member.image | relative_url }}" alt="{{ member.name }}" class="headshot-img">
        <span class="headshot-name">{{ member.name }}</span>
        <span class="headshot-role">{{ member.description }}</span>
      </a>
      {% endfor %}
    </div>
  </div>

</div>
