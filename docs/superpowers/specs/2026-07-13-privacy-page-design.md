# Privacy modal → dedicated page

## Problem
The Privacy Policy is currently a full-screen modal (`activePanel` state in `App.tsx`, animated in/out via `framer-motion`'s `AnimatePresence`, rendering `PortalPrivacy`). We want it as a real routable page (`/privacy`) instead, and the modal machinery removed.

## Approach
Add `react-router-dom` (no routing library exists in the project today).

- `src/main.tsx`: wrap `<App />` in `<BrowserRouter>`.
- `src/App.tsx`: reduced to a `<Routes>` block — `/` → `Home`, `/privacy` → `Privacy`.
- `src/pages/Home.tsx`: today's `App.tsx` page body (hero, mailing list, about, contact sections, `NavBar`, `Footer`), minus `activePanel` state and the `AnimatePresence` privacy overlay block.
- `src/pages/Privacy.tsx`: new page — `NavBar` + privacy content + `Footer`, static (no overlay animation).
- `src/components/PortalPrivacy.tsx`: drop the `onClose` prop and the "X" close button; keep the policy content as-is otherwise.
- `src/components/NavBar.tsx`: drop the unused `onPrivacyClick` prop. Logo becomes an internal `<Link to="/">` instead of an `onLogoClick` callback.
- `src/components/Footer.tsx`: "Privacy" button becomes an internal `<Link to="/privacy">`, dropping the `onPrivacyClick` prop.
- On `Privacy.tsx`, the `NavBar` Mission/Mailing List/Contact handlers and `Footer`'s Contact handler all `navigate("/")` (those sections don't exist on this page). On `Home.tsx` they keep today's `scrollIntoView` behavior.
- `netlify.toml`: add a catch-all SPA redirect (`from = "/*"`, `to = "/index.html"`, `status = 200`) *after* the existing `/api/*` rule, so a direct load or refresh of `/privacy` doesn't 404.

## Out of scope
- No visual/content redesign of the privacy policy text itself.
- No scroll-to-section-after-navigating-home behavior (e.g. clicking "Mission" from `/privacy` lands at the top of home, not scrolled to the Mission section).
- No other new routes/pages beyond `/` and `/privacy`.

## Testing
- Manual: `npm run dev`, visit `/`, click Privacy in footer → lands on `/privacy` with NavBar/Footer intact, no animation glitches. Direct-load `/privacy` and refresh it. Click nav buttons on `/privacy` → land on `/` homepage.
- `npm run build` succeeds (tsc + vite build) and `npm run lint` is clean.
