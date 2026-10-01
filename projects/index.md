---
title: Projects
nav:
  order: 2
  tooltip: Research projects
---
# Current Projects
 
 <div class="proj-scroll-page">

  <div class="proj-scroll-track-wrapper">
    <div class="proj-scroll-track" id="proj-track" tabindex="0" aria-label="Current projects, scroll horizontally">

      {% assign all_groups = "memory-trauma,attention-neurodevelopment,risk-decision-mental-health" | split: "," %}
      {% assign group_labels = "Memory & Trauma,Attention & Neurodevelopment,Risk-Taking & Mental Health" | split: "," %}

      {% for group in all_groups %}
        {% assign group_projects = site.projects | where: "group", group %}
        {% assign group_label = group_labels[forloop.index0] %}
        {% for proj in group_projects %}
          {% if proj.description %}
            {% assign proj_summary = proj.description %}
          {% else %}
            {% assign proj_summary = proj.excerpt | strip_html | normalize_whitespace | truncatewords: 55 %}
          {% endif %}
          <a href="{{ proj.url | relative_url }}" class="proj-scroll-card">
            <span class="proj-scroll-card__group">{{ group_label }}</span>
            <span class="proj-scroll-card__acronym">{{ proj.title }}</span>
            <p class="proj-scroll-card__subtitle">{{ proj.subtitle }}</p>
            <p class="proj-scroll-card__summary">{{ proj_summary }}</p>
            {% if proj.tags %}
              <ul class="proj-scroll-card__tags">
                {% for tag in proj.tags %}<li>{{ tag }}</li>{% endfor %}
              </ul>
            {% endif %}
            <span class="proj-scroll-card__link">Learn more →</span>
          </a>
        {% endfor %}
      {% endfor %}

    </div>
  </div>

  <div class="proj-scroll-nav">
    <button id="proj-prev" aria-label="previous">←</button>
    <span id="proj-counter" aria-live="polite">1 / 1</span>
    <button id="proj-next" aria-label="next">→</button>
  </div>

</div>
