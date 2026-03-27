# Subject 013 Content Schema

Use this schema for every post entry. Keep keys consistent so homepage, archive, and post pages stay easy to maintain.

```txt
id: unique-number-or-slug
slug: "leaving-stable-role"
title: "Leaving the stable role for contract work"
date: "2026-03-27"
updatedAt: "2026-03-28"            # optional
readTime: "6 min"
rationalityScore: 67               # 0-100
riskLevel: "High"                  # Low | High | Fatal
tag: "Career"                      # Career | Health | Learning | Money | Relationships
summary: "Cash flow variance modeled against sleep debt."
coverImage: "/assets/images/role-switch.jpg"
status: "Open"                     # Open | Resolved | Ongoing
featured: true                     # for homepage latest/featured
outcomeWindow: "14 days"           # when measured
metrics:
  roi: 67
  empathyCost: 31
  stressDelta: "+12%"
seo:
  title: "Leaving stable role - Subject 013"
  description: "A clinical breakdown of role transition decisions."
```

## Notes

- Keep `slug` URL-safe and unique.
- Keep `summary` under ~140 characters for card previews.
- Use only `Low`, `High`, or `Fatal` for `riskLevel`.
- Use absolute root-style paths for `coverImage` (e.g., `/assets/images/...`).
