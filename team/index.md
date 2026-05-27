---
title: Team
nav:
  order: 3
  tooltip: About our team
---

# {% include icon.html icon="fa-solid fa-users" %}Team

Meet our team.

{% include section.html %}

## PI
<div class="grid" style="--repeat: 2;">
{% include list.html data="members" component="portrait" filter="role == 'pi'" sort="order" %}
</div>

## Interns

<div class="grid" style="--repeat: 2;">
{% include list.html data="members" component="portrait" filter="role == 'intern'" sort="order" %}
</div>

## Alumni
<div class="grid" style="--repeat: 2;">
{% include list.html data="members" component="portrait" filter="role == 'alumni'" sort="order" %}
</div>
