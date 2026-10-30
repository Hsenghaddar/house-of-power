# House of Power — React storefront prototype

Local React + Vite website for House of Power, Ghazieh, Lebanon. Built from the supplied visual reference and the business's public Instagram profile.

## Run

```powershell
npm.cmd install
npm.cmd run dev
```

Open the Local URL printed by Vite (normally http://127.0.0.1:5173).

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

`dist/` is the production static output. Production hosting must rewrite unknown paths to `index.html` for React Router deep links.

## Included

- Responsive landing, one unified Shop, about, contact and help pages. Categories and the On offer toggle are integrated into Shop; legacy category/offer URLs redirect there.
- 29 catalog entries: 14 from Instagram posts/highlight covers, 9 groups from authenticated Accessories stories, and 6 illustrative supplement selections with official manufacturer photos.
- Search, category / brand / price filters, sorting and saved items.
- Product details, original source links, requested size / colour options, quantity controls and image gallery where two source photos were available.
- Persistent local shopping bag, separate variants, quantity editing and removal.
- Checkout enquiry: delivery or pickup, customer details, message review and WhatsApp handoff. Nothing is sent automatically.
- Original Instagram images, real manufacturer product photos and an external Unsplash hero photo saved locally. No AI-generated imagery.
- Accessible labels, keyboard focus, Escape-to-close dialogs, focus trapping, reduced-motion support and header access to search, favourites and the bag.

## Content and limits

See `SOURCE_NOTES.md` for the exact provenance and content limitations. Prices are the USD amounts advertised in the visible artwork; they are not a live price feed. The initial descriptions transcribed visible artwork. After sign-in, the exposed captions and highlight imagery were also inspected and source notes updated. Some images are highlight covers and have limited resolution.

Sizes are enquiry options, not verified inventory. The map is a labelled area illustration with a Google Maps search link, not a claimed precise location pin. Opening hours, delivery fees, return terms, exact product models and supplement SKUs have not been invented. The business confirms them directly.

This is a client-side prototype, with local storage for bag and favourites. It has no payment processor, admin, server inventory, real user accounts or automatic order submission. The checkout prepares a message for the verified business WhatsApp number; the visitor reviews and sends it there.

## Edit

- `src/data.js`: business information, catalog, source links, prices and source-derived descriptions.
- `src/App.jsx`: React pages, shared components and state.
- `src/main.jsx`: React entry point.
- `src/cart.js`: bag and order-enquiry logic.
- `src/styles.css`: responsive design.
- `public/images/`: Instagram images bundled for local use.

The header uses the original downloaded Instagram profile logo, cropped in CSS to show its HP mark; the complete original file is retained in the images folder. No contact information from the supplied mockup was treated as verified unless present in Instagram artwork.

## Design revision

Modernised typography, larger body and product text, quieter borders, rounded image surfaces, cleaner product photography, more whitespace and a simpler navigation. The shop now contains category tabs, search, a filter drawer, sorting and the On offer toggle in one place. Added supplements have explicit prototype markers and illustrative prices. See SOURCE_NOTES.md for manufacturer and hero-photo attribution.

Authenticated highlight update: nine further product groups use actual Accessories story images. Their original stories and gallery images are retained locally; prices remain on enquiry where not shown. Older highlights do not imply current availability.

Customer-facing copy now uses ordinary product descriptions. Internal provenance and illustrative-inventory metadata remain in SOURCE_NOTES.md and data.js, rather than customer-facing badges or sourcing notes.

The homepage now includes Build your setup shopping guides instead of an Instagram image feed. The home-gym, strength and recovery links open matching product collections within Shop and combine with its existing filters.

Mobile Shop: a native category selector exposes every category on phones, with separate full-width search and touch-friendly filter/sort controls. Product action targets are larger. Favourites remain beside Search in the header and the fixed bottom navigation has been removed.
