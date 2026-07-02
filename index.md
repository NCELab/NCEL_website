---
hide_header: true
---
<section
  class="ncel-hero"
  data-hero-bg="{{ 'images/background.jpeg' | relative_url }}"
  style="--hero-bg: url('{{ 'images/background.jpeg' | relative_url }}')"
  aria-label="Lab hero"
>
  <div class="ncel-hero__content">

    <!-- 上方：Logo + 三行標題 -->
    <div class="ncel-hero__header-block">
      <div class="ncel-hero__logo-col">
        <img
          src="{{ 'images/NCEL-logo.png' | relative_url }}"
          alt="NCEL logo"
          class="ncel-hero__logo-img"
        />
      </div>
      <div class="ncel-hero__title-col">
        <span class="ncel-hero__eyebrow">Neuro-Cognition &amp; Emotion Lab</span>
        <h1 class="ncel-hero__title">
          <span class="ncel-hero__title-line">NEURO-COGNITION</span>
          <span class="ncel-hero__title-line">AND</span>
          <span class="ncel-hero__title-line">EMOTION LAB</span>
        </h1>
      </div>
    </div>

    <!-- 下方：副標題 + CTA -->
    <p class="ncel-hero__subtitle">
      We investigate how emotion and cognition interact to shape behavior and
      mental health across development — using EEG, fMRI, and behavioral methods.
    </p>
    <div class="ncel-hero__actions">
      <a href="{{ '/research/' | relative_url }}" class="ncel-hero__cta ncel-hero__cta--primary">Research</a>
      <a href="{{ '/projects/' | relative_url }}" class="ncel-hero__cta ncel-hero__cta--ghost">Projects</a>
      <a href="{{ '/people/' | relative_url }}" class="ncel-hero__cta ncel-hero__cta--primary"/People</a>
      <a href="{{ '/Media/' | relative_url }}" class="ncel-hero__cta ncel-hero__cta--primary">Media</a>
      <a href="{{ '/get-involved/' | relative_url }}" class="ncel-hero__cta ncel-hero__cta--primary">Get Inovlved</a>
      <a href="{{ '/contact/' | relative_url }}" class="ncel-hero__cta ncel-hero__cta--primary">Contact</a>
    </div>

  </div>

  <div class="ncel-hero__scroll-cue" aria-hidden="true">
    <span></span>
    <p>Scroll</p>
  </div>
</section>


{% include section.html %}

## Highlights

{% capture text %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

{%
  include button.html
  link="research/#open"
  text="See our publications"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/mri.jpeg"
  link="research"
  title="Our Research"
  text=text
%}

{% capture text %}

The Neuro-Cognition and Emotion Lab (NCEL) investigates the fundamental mechanisms underlying attention, memory, decision-making, and emotional regulation. We integrate cognitive neuroscience, clinical science, and computational approaches to understand how these processes interact to shape mental health across development.

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
  image="images/eeg.jpeg"
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
  link="people"
  text="Meet our team"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/photo.jpg"
  link="people"
  title="Our Team"
  text=text
%}
