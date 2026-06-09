---
---

<!-- Hero section: scroll-synced parallax, no autoplay
     data-hero-bg is read by parallax-loader.js to preload the image -->
<section
  class="ncel-hero"
  data-hero-bg="{{ 'images/background.jpeg' | relative_url }}"
  style="--hero-bg: url('{{ 'images/background.jpeg' | relative_url }}')"
  aria-label="Lab hero"
>
  <div class="ncel-hero__content">
    <span class="ncel-hero__eyebrow">Neuro-Cognition &amp; Emotion Lab</span>
    <h1 class="ncel-hero__title">
      Understanding <strong>emotion, memory,</strong><br>
      and decision-making
    </h1>
    <p class="ncel-hero__subtitle">
      We investigate how emotion and cognition interact to shape behavior and
      mental health across development — using EEG, fMRI, and behavioral methods.
    </p>
    <div class="ncel-hero__actions">
      <a href="{{ '/research/' | relative_url }}" class="ncel-hero__cta ncel-hero__cta--primary">Our Research</a>
      <a href="{{ '/research/' | relative_url }}" class="ncel-hero__cta ncel-hero__cta--ghost">View Projects</a>
    </div>
  </div>
  <div class="ncel-hero__scroll-cue" aria-hidden="true">
    <span></span>
    <p>Scroll</p>
  </div>
</section>

Welcome to the Neuro-Cognition and Emotion Lab (NCEL), where we explore how cognition and emotion interact to shape behavior and mental health across development.

{% include section.html %}

## Highlights

{% capture text %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

{%
  include button.html
  link="research"
  text="See our publications"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/photo.jpg"
  link="research"
  title="Our Research"
  text=text
%}

{% capture text %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

{%
  include button.html
  link="projects"
  text="Browse our projects"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/photo.jpg"
  link="projects"
  title="Our Projects"
  flip=true
  style="bare"
  text=text
%}

{% capture text %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

{%
  include button.html
  link="team"
  text="Meet our team"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/photo.jpg"
  link="team"
  title="Our Team"
  text=text
%}
