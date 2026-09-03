## Trend Radar product spec

Reel Lab should not only analyze a pasted Reel. It should continuously discover what is rising in the creator's market and niche.

### Required signals
- Rising Reels formats and templates
- Trending audio/sounds
- Memes and creator formats
- Festivals, holidays and cultural moments
- News/events that can become content opportunities
- Niche-specific adoption velocity
- Saturation / how late the trend is
- Regional/language relevance

### Output
For every user, show: trend name, trend heat, rising/peaking/saturated state, niche fit, why it is moving, 2-3 ways to adapt it, and a warning when copying is already saturated.

### Example
For Janmashtami 2026, current research shows Krishna/Radha AI transformation and festive visual content gaining attention. The app should discover such an opportunity automatically rather than requiring the creator to know the trend exists.

### Architecture
GitHub Pages is only the frontend. The live engine needs a secure backend for authorized Instagram/Meta data, trend/search collection, caching, AI analysis and the user's historical Reel metrics. Never put access tokens in the frontend.
