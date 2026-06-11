---
title: Our Team
---

<style>
  .team-section{margin-bottom:48px}.team-section-title{font-family:var(--heading);font-size:.75rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--gray,#888);margin:0 0 20px 0;padding-bottom:8px;border-bottom:1px solid rgba(0,0,0,.08)}.member-card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:28px 20px}a.member-card-link{text-decoration:none;color:inherit;display:block}a.member-card-link:hover .member-card-item{transform:translateY(-4px);box-shadow:0 8px 28px rgba(0,0,0,.13)}.member-card-item{background:var(--background);border-radius:10px;overflow:hidden;transition:transform .22s ease,box-shadow .22s ease;box-shadow:0 2px 10px rgba(0,0,0,.07)}.member-card-photo-wrap{width:100%;aspect-ratio:1/1;overflow:hidden;background:var(--light-gray,#f0f0f0)}.member-card-photo{width:100%;height:100%;object-fit:cover;object-position:top center;display:block;transition:transform .3s ease}a.member-card-link:hover .member-card-photo{transform:scale(1.04)}.member-card-info{padding:12px 14px 14px}.member-card-name{font-family:var(--heading);font-size:.97rem;font-weight:600;color:var(--text);margin:0 0 4px 0;line-height:1.3}.member-card-role{font-size:.78rem;color:var(--gray,#888);margin:0;line-height:1.4;text-transform:uppercase;letter-spacing:.05em}@media(max-width:600px){.member-card-grid{grid-template-columns:repeat(2,1fr);gap:16px 12px}}
  </style>

  ## Our Team

  <div class="team-section"><p class="team-section-title">Research Coordinator</p>p><div class="member-card-grid">{% include list.html data="members" component="portrait" filter="role == 'rc'" sort="order" %}</div>div></div>div>

  <div class="team-section"><p class="team-section-title">Research Assistants</p>p><div class="member-card-grid">{% include list.html data="members" component="portrait" filter="role == 'ra'" sort="order" %}</div>div></div>div>

  <div class="team-section"><p class="team-section-title">Interns</p>p><div class="member-card-grid">{% include list.html data="members" component="portrait" filter="role == 'intern'" sort="order" %}</div>div></div>div>

  <div class="team-section"><p class="team-section-title">Alumni</p>p><div class="member-card-grid">{% include list.html data="members" component="portrait" filter="role == 'alumni'" sort="order" %}</div>div></div>div>
</style>
