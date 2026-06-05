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
  gap: 36px;
  padding: 40px 20px;
  font-family: var(--heading);
}

.people-tree-row {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.people-tree-label {
  text-align: center;
  font-size: 0.78rem;
  font-weight: var(--semi-bold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text);
  opacity: 0.5;
  margin-bottom: 14px;
}

.headshot-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text);
  transition: opacity 0.2s, transform 0.2s;
}

.headshot-card:hover {
  opacity: 0.8;
  transform: translateY(-3px);
}

.headshot-img {
  width: 150px;
  height: 150px;
  border-radius: 999px;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.headshot-name {
  font-size: 0.88rem;
  font-weight: var(--semi-bold);
  text-align: center;
  max-width: 155px;
  line-height: 1.3;
}

.headshot-role {
  font-size: 0.75rem;
  opacity: 0.55;
  text-align: center;
  max-width: 155px;
  line-height: 1.3;
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
