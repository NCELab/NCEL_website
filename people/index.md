---
title: People
nav:
  order: 3
  tooltip: Meet our team
---

<div class="member-grid-page">

    <div class="team-section">
      <div class="member-card-grid">
        {% include list.html data="members" component="portrait" filter="role == 'pi'" sort="order" %}
        {% include list.html data="members" component="portrait" filter="role == 'rc'" sort="order" %}
        {% include list.html data="members" component="portrait" filter="role == 'ra'" sort="order" %}
        {% include list.html data="members" component="portrait" filter="role == 'intern'" sort="order" %}
      </div>
    </div>
</div>
