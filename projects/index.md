---
title: Projects
nav:
  order: 2
  tooltip: Research projects
---
# Current Projects
 
 <div class="proj-scroll-page">

  <div class="proj-scroll-track-wrapper">
    <div class="proj-scroll-track" id="proj-track">

      {% assign all_groups = "memory-trauma,attention-neurodevelopment,risk-decision-mental-health" | split: "," %}
      {% assign group_labels = "Memory & Trauma,Attention & Neurodevelopment,Risk-Taking & Mental Health" | split: "," %}

      {% for group in all_groups %}
        {% assign group_projects = site.projects | where: "group", group %}
        {% for proj in group_projects %}
          <a href="{{ proj.url | relative_url }}" class="proj-scroll-card" data-index="{{ forloop.index }}">
            {% if proj.image %}
              <img src="{{ proj.image | relative_url }}" alt="{{ proj.title }}" class="proj-scroll-card__img" loading="lazy">
            {% else %}
              <div class="proj-scroll-card__img proj-scroll-card__img--fallback">
                <span>{{ proj.title }}</span>
              </div>
            {% endif %}
            <div class="proj-scroll-card__overlay"></div>
            <div class="proj-scroll-card__info">
              <span class="proj-scroll-card__index">○ {{ proj.title }}</span>
              <p class="proj-scroll-card__subtitle">{{ proj.subtitle }}</p>
            </div>
          </a>
        {% endfor %}
      {% endfor %}

    </div>
  </div>

  <div class="proj-scroll-nav">
    <button id="proj-prev" aria-label="previous">←</button>
    <span id="proj-counter">1 / 1</span>
    <button id="proj-next" aria-label="next">→</button>
  </div>

</div>
