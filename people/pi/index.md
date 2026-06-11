---
title: Directors and collaborator
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

<p class="team-section-heading">Directors</p>

{% include list.html data="members" component="portrait" filter="role == 'pi'" sort="order" %}

<p class="team-section-heading">Collaborators</p>

{% include list.html data="members" component="portrait" filter="role == 'coi'" sort="order" %}

</div>
