# book-quote-scanner.app

Landing page for **Book Quote Scanner** (iOS).

## Deploy

Hosted on [GitHub Pages](https://pages.github.com/) with custom domain `book-quote-scanner.app`.

```bash
git push origin main
```

## GitHub Pages setup

1. Create repo `book-quote-scanner` on GitHub (public)
2. Push this folder
3. **Settings → Pages →** deploy from `main` branch, root `/`
4. Set custom domain: `book-quote-scanner.app`
5. Enable **Enforce HTTPS** after DNS check passes

## Cloudflare DNS

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `moonmoonnotsun.github.io` |

Use DNS only (grey cloud).

## Links

- App Store: https://apps.apple.com/us/app/book-quote-scanner/id6744657207
- Privacy: https://mpc-app-c2e7a.web.app/clarify-privacy.html
- Terms: https://mpc-app-c2e7a.web.app/clarify-terms.html

## Assets

Placeholder images from decibel-meter — replace in `assets/images/book-quote-scanner/` when ready.
