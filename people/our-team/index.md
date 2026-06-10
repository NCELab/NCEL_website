---
title: Our Team
---

<style>
/* Our Team page section headings in Si digital style */
.team-section-heading {
  text-align: center;
  font-size: 1.1rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--primary);
  font-weight: 600;
  margin: 50px 0 0 0;
  padding: 30px 0 0 0;
}

.team-section-heading:first-child {
  margin-top: 0;
}
</style>

<p class="team-section-heading">Research Coordinator</p>

{% include list.html data="members" component="portrait" filter="role == 'rc'" sort="order" %}

<p class="team-section-heading">Research Assistants</p>

{% include list.html data="members" component="portrait" filter="role == 'ra'" sort="order" %}

<p class="team-section-heading">Interns</p>

{% include list.html data="members" component="portrait" filter="role == 'intern'" sort="order" %}

<p class="team-section-heading">Alumni</p>

{% include list.html data="members" component="portrait" filter="role == 'alumni'" sort="order" %}
