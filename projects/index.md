---
title: Projects
nav:
  order: 2
  tooltip: Research projects
---

    <header class="ncel-current-projects-header">
      <span class="ncel-cph__label">RESEARCH</span>
        <h1 class="ncel-cph__title">Current Projects</h1>
          <p class="ncel-cph__desc">Active studies from our lab, grouped by research theme.</p>
          </header>

          {% include section.html %}

          ## Memory & Trauma
          {: #memory-trauma }

          <div class="ncel-projects-grid ncel-projects-grid--layout-a">

          <!-- ITT -->
          {% assign proj = site.projects | where: "title", "ITT" | first %}
          <article class="ncel-project-item">
            <div class="ncel-project-item__img-wrap">
                {% if proj.image %}
                    <img src="{{ proj.image | relative_url }}" alt="{{ proj.title }} project" class="ncel-project-item__img" loading="lazy" />
                        {% else %}
                            <div class="ncel-project-item__img-wrap--no-img">
                                  <span class="ncel-project-item__img-fallback" aria-hidden="true">ITT</span>
                                      </div>
                                          {% endif %}
                                            </div>
                                              <div class="ncel-project-item__body">
                                                  <h3 class="ncel-project-item__title">{% if proj %}{{ proj.title }}{% else %}ITT{% endif %}</h3>
                                                      <p class="ncel-project-item__subtitle">{% if proj %}{{ proj.subtitle }}{% else %}Intergenerational Trauma and Transmission{% endif %}</p>
                                                          {% if proj %}<a href="{{ proj.url | relative_url }}" class="ncel-project-item__link">Learn more</a>{% endif %}
                                                            </div>
                                                            </article>

                                                            <!-- ENM -->
                                                            {% assign proj = site.projects | where: "title", "ENM" | first %}
                                                            <article class="ncel-project-item">
                                                              <div class="ncel-project-item__img-wrap">
                                                                  {% if proj.image %}
                                                                      <img src="{{ proj.image | relative_url }}" alt="{{ proj.title }} project" class="ncel-project-item__img" loading="lazy" />
                                                                          {% else %}
                                                                              <div class="ncel-project-item__img-wrap--no-img">
                                                                                    <span class="ncel-project-item__img-fallback" aria-hidden="true">ENM</span>
                                                                                        </div>
                                                                                            {% endif %}
                                                                                              </div>
                                                                                                <div class="ncel-project-item__body">
                                                                                                    <h3 class="ncel-project-item__title">{% if proj %}{{ proj.title }}{% else %}ENM{% endif %}</h3>
                                                                                                        <p class="ncel-project-item__subtitle">{% if proj %}{{ proj.subtitle }}{% else %}Emotion &amp; Memory Study{% endif %}</p>
                                                                                                            {% if proj %}<a href="{{ proj.url | relative_url }}" class="ncel-project-item__link">Learn more</a>{% endif %}
                                                                                                              </div>
                                                                                                              </article>
                                                                                                              
                                                                                                              <!-- CF -->
                                                                                                              {% assign proj = site.projects | where: "title", "CF" | first %}
                                                                                                              <article class="ncel-project-item">
                                                                                                                <div class="ncel-project-item__img-wrap">
                                                                                                                    {% if proj.image %}
                                                                                                                        <img src="{{ proj.image | relative_url }}" alt="{{ proj.title }} project" class="ncel-project-item__img" loading="lazy" />
                                                                                                                            {% else %}
                                                                                                                                <div class="ncel-project-item__img-wrap--no-img">
                                                                                                                                      <span class="ncel-project-item__img-fallback" aria-hidden="true">CF</span>
                                                                                                                                          </div>
                                                                                                                                              {% endif %}
                                                                                                                                                </div>
                                                                                                                                                  <div class="ncel-project-item__body">
                                                                                                                                                      <h3 class="ncel-project-item__title">{% if proj %}{{ proj.title }}{% else %}CF{% endif %}</h3>
                                                                                                                                                          <p class="ncel-project-item__subtitle">{% if proj %}{{ proj.subtitle }}{% else %}Cognitive Decline Study{% endif %}</p>
                                                                                                                                                              {% if proj %}<a href="{{ proj.url | relative_url }}" class="ncel-project-item__link">Learn more</a>{% endif %}
                                                                                                                                                                </div>
                                                                                                                                                                </article>
                                                                                                                                                                
                                                                                                                                                                <!-- EMLAS -->
                                                                                                                                                                {% assign proj = site.projects | where: "title", "EMLAS" | first %}
                                                                                                                                                                <article class="ncel-project-item">
                                                                                                                                                                  <div class="ncel-project-item__img-wrap">
                                                                                                                                                                      {% if proj.image %}
                                                                                                                                                                          <img src="{{ proj.image | relative_url }}" alt="{{ proj.title }} project" class="ncel-project-item__img" loading="lazy" />
                                                                                                                                                                              {% else %}
                                                                                                                                                                                  <div class="ncel-project-item__img-wrap--no-img">
                                                                                                                                                                                        <span class="ncel-project-item__img-fallback" aria-hidden="true">EMLAS</span>
                                                                                                                                                                                            </div>
                                                                                                                                                                                                {% endif %}
                                                                                                                                                                                                  </div>
                                                                                                                                                                                                    <div class="ncel-project-item__body">
                                                                                                                                                                                                        <h3 class="ncel-project-item__title">{% if proj %}{{ proj.title }}{% else %}EMLAS{% endif %}</h3>
                                                                                                                                                                                                            <p class="ncel-project-item__subtitle">{% if proj %}{{ proj.subtitle }}{% else %}Episodic Memory and Life Stories Study{% endif %}</p>
                                                                                                                                                                                                                {% if proj %}<a href="{{ proj.url | relative_url }}" class="ncel-project-item__link">Learn more</a>{% endif %}
                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                  </article>
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  {% include section.html %}
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  ## Attention & Neurodevelopment
                                                                                                                                                                                                                  {: #attention-neurodevelopment }
                                                                                                                                                                                                                  
                                                                                                                                                                                                                  <div class="ncel-projects-grid ncel-projects-grid--layout-solo">
                                                                                                                                                                                                                  {% assign proj = site.projects | where: "title", "ADR" | first %}
                                                                                                                                                                                                                  <article class="ncel-project-item">
                                                                                                                                                                                                                    <div class="ncel-project-item__img-wrap">
                                                                                                                                                                                                                        {% if proj.image %}
                                                                                                                                                                                                                            <img src="{{ proj.image | relative_url }}" alt="{{ proj.title }} project" class="ncel-project-item__img" loading="lazy" />
                                                                                                                                                                                                                                {% else %}
                                                                                                                                                                                                                                    <div class="ncel-project-item__img-wrap--no-img">
                                                                                                                                                                                                                                          <span class="ncel-project-item__img-fallback" aria-hidden="true">ADR</span>
                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                  {% endif %}
                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                      <div class="ncel-project-item__body">
                                                                                                                                                                                                                                                          <h3 class="ncel-project-item__title">{% if proj %}{{ proj.title }}{% else %}ADR{% endif %}</h3>
                                                                                                                                                                                                                                                              <p class="ncel-project-item__subtitle">{% if proj %}{{ proj.subtitle }}{% else %}Attention Dysregulation Research{% endif %}</p>
                                                                                                                                                                                                                                                                  {% if proj %}<a href="{{ proj.url | relative_url }}" class="ncel-project-item__link">Learn more</a>{% endif %}
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                    </article>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                    {% include section.html %}
                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                    ## Risk-Taking, Decision-Making & Mental Health
                                                                                                                                                                                                                                                                    {: #risk-decision-mental-health }
                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                    <div class="ncel-projects-grid ncel-projects-grid--layout-solo">
                                                                                                                                                                                                                                                                    {% assign proj = site.projects | where: "title", "NERD" | first %}
                                                                                                                                                                                                                                                                    <article class="ncel-project-item">
                                                                                                                                                                                                                                                                      <div class="ncel-project-item__img-wrap">
                                                                                                                                                                                                                                                                          {% if proj.image %}
                                                                                                                                                                                                                                                                              <img src="{{ proj.image | relative_url }}" alt="{{ proj.title }} project" class="ncel-project-item__img" loading="lazy" />
                                                                                                                                                                                                                                                                                  {% else %}
                                                                                                                                                                                                                                                                                      <div class="ncel-project-item__img-wrap--no-img">
                                                                                                                                                                                                                                                                                            <span class="ncel-project-item__img-fallback" aria-hidden="true">NERD</span>
                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                    {% endif %}
                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                        <div class="ncel-project-item__body">
                                                                                                                                                                                                                                                                                                            <h3 class="ncel-project-item__title">{% if proj %}{{ proj.title }}{% else %}NERD{% endif %}</h3>
                                                                                                                                                                                                                                                                                                                <p class="ncel-project-item__subtitle">{% if proj %}{{ proj.subtitle }}{% else %}Neuroeconomic Approach to Risk Behavior in Adolescents with Depression{% endif %}</p>
                                                                                                                                                                                                                                                                                                                    {% if proj %}<a href="{{ proj.url | relative_url }}" class="ncel-project-item__link">Learn more</a>{% endif %}
                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                      </article>
                                                                                                                                                                                                                                                                                                                      </div>
