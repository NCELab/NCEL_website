---
title: Research
nav:
  order: 1
  tooltip: Publications and projects
---

# {% include icon.html icon="fa-solid fa-microscope" %} Research

The Neuro-Cognition and Emotion Lab (NCEL) investigates the fundamental mechanisms underlying attention, memory, decision-making, and emotional regulation. We integrate cognitive neuroscience, clinical science, and computational approaches to understand how these processes interact to shape mental health across development.

Our research combines behavioral assessments, neurophysiological methods (including EEG), neuroimaging, and innovative analytic approaches such as natural language processing to capture real-world expressions of cognition and emotion.

{% include section.html %}

{% include research-browser.html %}

---

<header class="ncel-current-projects-header">
  <span class="ncel-cph__label">RESEARCH</span>span>
    <h2 class="ncel-cph__title">Current Projects</h2>h2>
      <p class="ncel-cph__desc">Active studies from our lab, grouped by research theme.</p>p>
</header>header>

<div class="ncel-research-projects-overview">

<section class="ncel-rpo__group">
  <h3 class="ncel-rpo__group-label">Memory &amp; Trauma</h3>h3>
    <div class="ncel-rpo__grid">

    {% assign projects_mt = site.projects | where: "group", "memory-trauma" %}
    {% for proj in projects_mt %}
    <a href="{{ proj.url | relative_url }}" class="ncel-rpo__tile">
      <span class="ncel-rpo__tile-acronym">{{ proj.title }}</span>
        <span class="ncel-rpo__tile-name">{{ proj.subtitle }}</span>
          {% if proj.tags %}
            <ul class="ncel-rpo__tile-tags">
                {% for tag in proj.tags %}
                    <li class="ncel-rpo__tile-tag">{{ tag }}</li>
                        {% endfor %}
                          </ul>
                            {% endif %}
                              <span class="ncel-rpo__tile-link">Learn more</span>
                              </a>
                              {% endfor %}

                                </div>
                                </section>

                                <section class="ncel-rpo__group">
                                  <h3 class="ncel-rpo__group-label">Attention &amp; Neurodevelopment</h3>
                                    <div class="ncel-rpo__grid">

                                    {% assign projects_an = site.projects | where: "group", "attention-neurodevelopment" %}
                                    {% for proj in projects_an %}
                                    <a href="{{ proj.url | relative_url }}" class="ncel-rpo__tile">
                                      <span class="ncel-rpo__tile-acronym">{{ proj.title }}</span>
                                        <span class="ncel-rpo__tile-name">{{ proj.subtitle }}</span>
                                          {% if proj.tags %}
                                            <ul class="ncel-rpo__tile-tags">
                                                {% for tag in proj.tags %}
                                                    <li class="ncel-rpo__tile-tag">{{ tag }}</li>
                                                        {% endfor %}
                                                          </ul>
                                                            {% endif %}
                                                              <span class="ncel-rpo__tile-link">Learn more</span>
                                                              </a>
                                                              {% endfor %}

                                                                </div>
                                                                </section>

                                                                <section class="ncel-rpo__group">
                                                                  <h3 class="ncel-rpo__group-label">Risk-Taking, Decision-Making &amp; Mental Health</h3>
                                                                    <div class="ncel-rpo__grid">

                                                                    {% assign projects_rd = site.projects | where: "group", "risk-decision-mental-health" %}
                                                                    {% for proj in projects_rd %}
                                                                    <a href="{{ proj.url | relative_url }}" class="ncel-rpo__tile">
                                                                      <span class="ncel-rpo__tile-acronym">{{ proj.title }}</span>
                                                                        <span class="ncel-rpo__tile-name">{{ proj.subtitle }}</span>
                                                                          {% if proj.tags %}
                                                                            <ul class="ncel-rpo__tile-tags">
                                                                                {% for tag in proj.tags %}
                                                                                    <li class="ncel-rpo__tile-tag">{{ tag }}</li>
                                                                                        {% endfor %}
                                                                                          </ul>
                                                                                            {% endif %}
                                                                                              <span class="ncel-rpo__tile-link">Learn more</span>
                                                                                              </a>
                                                                                              {% endfor %}

                                                                                                </div>
                                                                                                </section>

                                                                                                </div>
