---
title: People
nav:
  order: 3
  tooltip: Meet our team
---

<div class="member-grid-page">

<div class="team-section">
<h3 class="team-section-title">Principal Investigator</h3>
<div class="member-card-grid">
{% include list.html data="members" component="portrait" filter="role == 'pi'" sort="order" %}
</div>
</div>

<div class="team-section">
<h3 class="team-section-title">Collaborator</h3>
<div class="member-card-grid">
{% include list.html data="members" component="portrait" filter="role == 'coi'" sort="order" %}
</div>
</div>

<div class="team-section">
<h3 class="team-section-title">Research Coordinator &amp; Research Assistant</h3>
<div class="member-card-grid">
{% include list.html data="members" component="portrait" filter="role == 'rc'" sort="order" %}
{% include list.html data="members" component="portrait" filter="role == 'ra'" sort="order" %}
</div>
</div>

<div class="team-section">
<h3 class="team-section-title">Interns</h3>
<div class="member-card-grid">
{% include list.html data="members" component="portrait" filter="role == 'intern'" sort="order" %}
</div>
</div>

</div>
