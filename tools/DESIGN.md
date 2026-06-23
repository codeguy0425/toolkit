# RentEase Design System

## Overview

RentEase is a practical, comparison-friendly design system built for rental listing and tenant management platforms. Its purple primary color conveys modernity and trust, while green signals affordability and availability. The system prioritizes efficient data scanning, side-by-side comparison layouts, and clear call-to-action hierarchy for renters and landlords alike.

---

## Colors

- **Primary Purple** (#7C3AED): Primary actions, key accents
- **Secondary Green** (#22C55E): Availability, pricing
- **Tertiary Gray** (#6B7280): Metadata, secondary content
- **Background** (#FFFFFF): Page background
- **Surface Default** (#FFFFFF): Card backgrounds
- **Success** (#22C55E): Available, lease signed
- **Warning** (#F59E0B): Application pending, expiring
- **Error** (#EF4444): Unavailable, overdue, errors
- **Info** (#7C3AED): Featured, new listing

## Typography

- **Headline Font**: Work Sans
- **Body Font**: DM Sans
- **Mono Font**: IBM Plex Mono

- **Display**: Work Sans 36px bold, 1.2 line height
- **H1**: Work Sans 30px bold, 1.25 line height
- **H2**: Work Sans 24px semibold, 1.3 line height
- **H3**: Work Sans 20px semibold, 1.35 line height
- **H4**: Work Sans 16px medium, 1.4 line height
- **Body LG**: DM Sans 18px regular, 1.6 line height
- **Body**: DM Sans 16px regular, 1.6 line height
- **Body SM**: DM Sans 14px regular, 1.5 line height
- **Caption**: DM Sans 12px medium, 1.4 line height
- **Code**: IBM Plex Mono 14px regular, 1.6 line height

---

## Spacing

Base unit: **8px**
- **xs**: 4px — Inline icon gaps
- **sm**: 8px — Tight component padding
- **md**: 16px — Default padding
- **lg**: 24px — Card padding
- **xl**: 32px — Section gaps
- **2xl**: 48px — Layout sections
- **3xl**: 64px — Page-level spacing

## Border Radius

- **sm** (4px): Chips, badges
- **DEFAULT** (8px): Buttons, cards, inputs
- **md** (12px): Modals, larger containers
- **lg** (16px): Image containers
- **full** (9999px): Avatars, status dots

## Elevation

Subtle, neutral shadows for clean layering.
- **sm**: 1px offset, 2px blur, #000000 at 5%. Buttons, chips.
- **DEFAULT**: 2px offset, 6px blur, #000000 at 7%. Cards, dropdowns.
- **md**: 4px offset, 14px blur, #000000 at 9%. Elevated cards.
- **lg**: 8px offset, 28px blur, #000000 at 12%. Modals, drawers.

## Components

### Buttons
#### Variants
- **Primary**: #7C3AED fill, #FFFFFF text, no border, #6D28D9 fill.
- **Secondary**: transparent fill, #7C3AED text, 1px #7C3AED border, #7C3AED0C fill.
- **Ghost**: transparent fill, #111827 text, no border, #F3F4F6 fill.
- **Destructive**: #EF4444 fill, #FFFFFF text, no border, #DC2626 fill.
#### Sizes
Sizes: sm (6px 12px, 14px, 32px), md (8px 20px, 16px, 40px), lg (12px 28px, 18px, 48px).
#### Disabled State
0.5 opacity.
- disabled cursor
- All interactions suppressed
---

### Cards
- **Default**: #FFFFFF fill, 1px #E5E7EB border, sm shadow, 8px radius.
- **Elevated**: #FFFFFF fill, no border, md shadow, 8px radius.
** 20px **padding, ** top slot, border-radius 8px 8px 0 0 **image area, ** cards align in 2-3 column grids with matching row heights **comparison mode.
---

### Inputs
- **Default**: 1px #E5E7EB border, #FFFFFF fill, no shadow.
- **Hover**: 1px #7C3AED border, #FFFFFF fill, no shadow.
- **Focus**: 2px #7C3AED border, #FFFFFF fill, 3px ring #7C3AED25 shadow.
- **Error**: 2px #EF4444 border, #FFFFFF fill, 3px ring #EF444425 shadow.
- **Disabled**: 1px #E5E7EB border, #F3F4F6 fill, no shadow.
** 40px | **Padding:** 8px 12px | **Radius:** 8px **height, ** DM Sans 14px/500, color #111827, bottom margin 6px **label, ** DM Sans 12px/400, color #6B7280, top margin 4px **helper text, ** DM Sans 12px/400, color #EF4444, top margin 4px **error text.
---

### Chips
- **Filter**: #FFFFFF fill, #111827 text, 1px #E5E7EB border.
- **Filter Active**: #7C3AED fill, #FFFFFF text, no border.
- **Status Success**: #22C55E18 fill, #16A34A text, no border.
- **Status Warning**: #F59E0B18 fill, #B45309 text, no border.
- **Status Error**: #EF444418 fill, #DC2626 text, no border.
** 4px 12px | **Radius:** 4px | **Font:** 12px/500 **padding.
---

### Lists
** 48px **row height, ** 8px 16px **padding, ** 1px #F3F4F6 **divider, ** #F9FAFB **hover background, ** #7C3AED08 **active background, ** DM Sans 16px/400 for label, 14px/400 #6B7280 for description **font, ** alternating rows with #F9FAFB for comparison tables **striped variant.
---

### Checkboxes
** 18px x 18px | **Radius:** 4px **size, ** border 2px #D1D5DB, background #FFFFFF **unchecked, ** background #7C3AED, border none, checkmark #FFFFFF **checked, ** background #7C3AED, dash #FFFFFF **indeterminate, ** 50% opacity, disabled cursor **disabled, ** 8px left of label text **label spacing.
---

### Radio Buttons
** 18px x 18px | **Radius:** full (circle) **size, ** border 2px #D1D5DB, background #FFFFFF **unchecked, ** border 2px #7C3AED, inner dot 8px #7C3AED **selected, ** 50% opacity, disabled cursor **disabled, ** 8px left of label text **label spacing.
---

### Tooltips
** #111827 **background, ** #FFFFFF, DM Sans 12px/400 **text, ** 6px 12px | **Radius:** 8px **padding, ** 6px triangle matching background **arrow, ** 240px **max width, ** 200ms show, 0ms hide **delay.
---

## Do's and Don'ts

1. **Do** prioritize comparison layouts; renters always evaluate multiple listings side-by-side.
2. **Do** use Purple (#7C3AED) for all primary CTAs -- schedule tour, apply, contact landlord.
3. **Do** show rent price, move-in cost, and availability date prominently on every listing card.
4. **Don't** bury lease terms or fees; surface total monthly cost calculations early.
5. **Don't** use green for decorative purposes; reserve it strictly for availability and pricing signals.
6. **Do** use striped list rows for long comparison tables to improve scannability.
7. **Don't** use heavy imagery when data density is more useful -- renters care about specs.
8. **Do** provide filter chips for pet-friendly, parking, laundry, and other common amenity filters.
9. **Don't** require sign-up to view listing details; gate only for applications and messaging.
10. **Do** ensure financial figures (rent, deposits, fees) always use the Mono font for alignment and clarity.