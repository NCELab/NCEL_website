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

<!-- ═══════════════════════════════════════════════════════════════════════
     EDITORIAL PROJECTS INDEX  ·  id="projects" for anchor linking
     Grouped by research category, staggered asymmetric grid
     ═══════════════════════════════════════════════════════════════════════ -->
<div id="projects" class="ncel-projects-page">

  <header class="ncel-projects-header">
    <span class="ncel-projects-header__eyebrow">Research</span>
    <h2 class="ncel-projects-header__title">Current Projects</h2>
    <p class="ncel-projects-header__description">
      Active studies from our lab, grouped by research theme.
    </p>
  </header>

  <!-- ── Category 1: Memory & Trauma ───────────────────────────────────── -->
  <section class="ncel-projects-category" aria-labelledby="cat-memory-trauma">
    <div class="ncel-projects-category__label">
      <span id="cat-memory-trauma" class="ncel-projects-category__name">Memory &amp; Trauma</span>
      <span class="ncel-projects-category__rule" aria-hidden="true"></span>
    </div>

    <div class="ncel-projects-grid ncel-projects-grid--layout-a">

      <!-- ITT -->
      {% assign proj = site.projects | where: "title", "ITT" | first %}
      <article class="ncel-project-item">
        <div class="ncel-project-item__img-wrap">
          {% if proj.image %}
            <img
              src="{{ proj.image | relative_url }}"
              alt="{{ proj.title }} project"
              class="ncel-project-item__img"
              loading="lazy"
            />
          {% else %}
            <div class="ncel-project-item__img-wrap--no-img">
              <span class="ncel-project-item__img-fallback" aria-hidden="true">ITT</span>
            </div>
          {% endif %}
        </div>
        <div class="ncel-project-item__body">
          <h3 class="ncel-project-item__title">
            {% if proj %}{{ proj.title }}{% else %}ITT{% endif %}
          </h3>
          <p class="ncel-project-item__subtitle">
            {% if proj %}{{ proj.subtitle }}{% else %}Intergenerational Trauma and Transmission{% endif %}
          </p>
          {% if proj %}<a href="{{ proj.url | relative_url }}" class="ncel-project-item__link">Learn more</a>{% endif %}
        </div>
      </article>

      <!-- ENM -->
      {% assign proj = site.projects | where: "title", "ENM" | first %}
      <article class="ncel-project-item">
        <div class="ncel-project-item__img-wrap">
          {% if proj.image %}
            <img
              src="{{ proj.image | relative_url }}"
              alt="{{ proj.title }} project"
              class="ncel-project-item__img"
              loading="lazy"
            />
          {% else %}
            <div class="ncel-project-item__img-wrap--no-img">
              <span class="ncel-project-item__img-fallback" aria-hidden="true">ENM</span>
            </div>
          {% endif %}
        </div>
        <div class="ncel-project-item__body">
          <h3 class="ncel-project-item__title">
            {% if proj %}{{ proj.title }}{% else %}ENM{% endif %}
          </h3>
          <p class="ncel-project-item__subtitle">
            {% if proj %}{{ proj.subtitle }}{% else %}Emotion &amp; Memory Study{% endif %}
          </p>
          {% if proj %}<a href="{{ proj.url | relative_url }}" class="ncel-project-item__link">Learn more</a>{% endif %}
        </div>
      </article>

      <!-- CF -->
      {% assign proj = site.projects | where: "title", "CF" | first %}
      <article class="ncel-project-item">
        <div class="ncel-project-item__img-wrap">
          {% if proj.image %}
            <img
              src="{{ proj.image | relative_url }}"
              alt="{{ proj.title }} project"
              class="ncel-project-item__img"
              loading="lazy"
            />
          {% else %}
            <div class="ncel-project-item__img-wrap--no-img">
              <span class="ncel-project-item__img-fallback" aria-hidden="true">CF</span>
            </div>
          {% endif %}
        </div>
        <div class="ncel-project-item__body">
          <h3 class="ncel-project-item__title">
            {% if proj %}{{ proj.title }}{% else %}CF{% endif %}
          </h3>
          <p class="ncel-project-item__subtitle">
            {% if proj %}{{ proj.subtitle }}{% else %}Cognitive Decline Study{% endif %}
          </p>
          {% if proj %}<a href="{{ proj.url | relative_url }}" class="ncel-project-item__link">Learn more</a>{% endif %}
        </div>
      </article>

      <!-- EMLAS -->
      {% assign proj = site.projects | where: "title", "EMLAS" | first %}
      <article class="ncel-project-item">
        <div class="ncel-project-item__img-wrap">
          {% if proj.image %}
            <img
              src="{{ proj.image | relative_url }}"
              alt="{{ proj.title }} project"
              class="ncel-project-item__img"
              loading="lazy"
            />
          {% else %}
            <div class="ncel-project-item__img-wrap--no-img">
              <span class="ncel-project-item__img-fallback" aria-hidden="true">EMLAS</span>
            </div>
          {% endif %}
        </div>
        <div class="ncel-project-item__body">
          <h3 class="ncel-project-item__title">
            {% if proj %}{{ proj.title }}{% else %}EMLAS{% endif %}
          </h3>
          <p class="ncel-project-item__subtitle">
            {% if proj %}{{ proj.subtitle }}{% else %}Episodic Memory and Life Stories Study{% endif %}
          </p>
          {% if proj %}<a href="{{ proj.url | relative_url }}" class="ncel-project-item__link">Learn more</a>{% endif %}
        </div>
      </article>

    </div>
  </section>

  <!-- ── Category 2: Attention & Neurodevelopment ───────────────────────── -->
  <section class="ncel-projects-category" aria-labelledby="cat-attention">
    <div class="ncel-projects-category__label">
      <span id="cat-attention" class="ncel-projects-category__name">Attention &amp; Neurodevelopment</span>
      <span class="ncel-projects-category__rule" aria-hidden="true"></span>
    </div>

    <div class="ncel-projects-grid ncel-projects-grid--layout-solo">
      {% assign proj = site.projects | where: "title", "ADR" | first %}
      <article class="ncel-project-item">
        <div class="ncel-project-item__img-wrap">
          {% if proj.image %}
            <img
              src="{{ proj.image | relative_url }}"
              alt="{{ proj.title }} project"
              class="ncel-project-item__img"
              loading="lazy"
            />
          {% else %}
            <div class="ncel-project-item__img-wrap--no-img">
              <span class="ncel-project-item__img-fallback" aria-hidden="true">ADR</span>
            </div>
          {% endif %}
        </div>
        <div class="ncel-project-item__body">
          <h3 class="ncel-project-item__title">
            {% if proj %}{{ proj.title }}{% else %}ADR{% endif %}
          </h3>
          <p class="ncel-project-item__subtitle">
            {% if proj %}{{ proj.subtitle }}{% else %}Attention Dysregulation Research{% endif %}
          </p>
          {% if proj %}<a href="{{ proj.url | relative_url }}" class="ncel-project-item__link">Learn more</a>{% endif %}
        </div>
      </article>
    </div>
  </section>

  <!-- ── Category 3: Risk-Taking, Decision-Making & Mental Health ──────── -->
  <section class="ncel-projects-category" aria-labelledby="cat-risk">
    <div class="ncel-projects-category__label">
      <span id="cat-risk" class="ncel-projects-category__name">Risk-Taking, Decision-Making &amp; Mental Health</span>
      <span class="ncel-projects-category__rule" aria-hidden="true"></span>
    </div>

    <div class="ncel-projects-grid ncel-projects-grid--layout-solo">
      {% assign proj = site.projects | where: "title", "NERD" | first %}
      <article class="ncel-project-item">
        <div class="ncel-project-item__img-wrap">
          {% if proj.image %}
            <img
              src="{{ proj.image | relative_url }}"
              alt="{{ proj.title }} project"
              class="ncel-project-item__img"
              loading="lazy"
            />
          {% else %}
            <div class="ncel-project-item__img-wrap--no-img">
              <span class="ncel-project-item__img-fallback" aria-hidden="true">NERD</span>
            </div>
          {% endif %}
        </div>
        <div class="ncel-project-item__body">
          <h3 class="ncel-project-item__title">
            {% if proj %}{{ proj.title }}{% else %}NERD{% endif %}
          </h3>
          <p class="ncel-project-item__subtitle">
            {% if proj %}{{ proj.subtitle }}{% else %}Neuroeconomic Approach to Risk Behavior in Adolescents with Depression{% endif %}
          </p>
          {% if proj %}<a href="{{ proj.url | relative_url }}" class="ncel-project-item__link">Learn more</a>{% endif %}
        </div>
      </article>
    </div>
  </section>

</div>
