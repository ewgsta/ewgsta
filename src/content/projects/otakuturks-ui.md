---
title: OtakuTurks UI
description: A Vue 3 UI component library.
featured: true
link: https://github.com/OtakuTurks/ui
tech:
  - Vue.js
  - JS
  - CSS3
---
# OtakuTurks UI

[![npm version](https://img.shields.io/npm/v/@otakuturks/ui?style=flat-square&labelColor=343b41&color=377dff)](https://www.npmjs.com/package/@otakuturks/ui)
[![License: GPL v3](https://img.shields.io/badge/License-GPL_v3-blue?style=flat-square&labelColor=343b41)](https://www.gnu.org/licenses/gpl-3.0)
![Vue](https://img.shields.io/badge/Vue.js_3-4FC08D?style=flat-square&logo=vue.js&logoColor=white&labelColor=343b41)
![JavaScript](https://img.shields.io/badge/JavaScript-3178C6?style=flat-square&logo=javascript&logoColor=white&labelColor=343b41)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white&labelColor=343b41)

A Vue 3 UI component library.

## Installation

```bash
# npm
npm install @otakuturks/ui

# yarn
yarn add @otakuturks/ui

# pnpm
pnpm add @otakuturks/ui
```

## Quick Start

### Global Registration

```javascript
import { createApp } from 'vue'
import OtakuturksUI from '@otakuturks/ui'
import '@otakuturks/ui/style.css'

const app = createApp(App)
app.use(OtakuturksUI)
app.mount('#app')
```

### Individual Components

```javascript
import { OtButton, OtInput, OtCard, OtModal } from '@otakuturks/ui'
import '@otakuturks/ui/style.css'
```

## Components

### Form Components

| Component          | Description                                                                  |
| ------------------ | ---------------------------------------------------------------------------- |
| `OtButton`         | Button with multiple variants (primary, secondary, danger, warning, success) |
| `OtInput`          | Input field with password toggle, adornment, and error states                |
| `OtTextarea`       | Auto-resizable textarea with character counter                               |
| `OtSelect`         | Native select dropdown                                                       |
| `OtDropdown`       | Custom select dropdown with keyboard navigation                              |
| `OtCheckbox`       | Checkbox with indeterminate state                                            |
| `OtCheckboxGroup`  | Group of checkboxes                                                          |
| `OtRadio`          | Radio button                                                                 |
| `OtRadioGroup`     | Group of radio buttons                                                       |
| `OtSwitch`         | Toggle switch                                                                |
| `OtSlider`         | Range slider                                                                 |
| `OtRangeSlider`    | Dual-handle range slider                                                     |
| `OtNumberInput`    | Number input with increment/decrement buttons                                |
| `OtDateInput`      | Date picker input                                                            |
| `OtTimeInput`      | Time picker input                                                            |
| `OtDateRangeInput` | Date range picker                                                            |
| `OtFileInput`      | File upload input                                                            |
| `OtColorPicker`    | Color picker                                                                 |
| `OtAutocomplete`   | Autocomplete input with filtering                                            |
| `OtMaskInput`      | Masked input for phone, credit card, etc.                                    |
| `OtInputGroup`     | Group inputs with addons                                                     |
| `OtFormField`      | Form field wrapper with label and validation                                 |
| `OtForm`           | Form wrapper with validation support                                         |
| `OtIconButton`     | Icon-only button                                                             |

### Layout Components

| Component    | Description                                               |
| ------------ | --------------------------------------------------------- |
| `OtGrid`     | Responsive grid system                                    |
| `OtCard`     | Card container with variants (elevated, outlined, filled) |
| `OtDivider`  | Horizontal/vertical divider                               |
| `OtCollapse` | Collapsible content panel                                 |

### Navigation Components

| Component          | Description                                 |
| ------------------ | ------------------------------------------- |
| `OtTabs`           | Tabs navigation (line and pills variants)   |
| `OtTab`            | Tab content wrapper                         |
| `OtBreadcrumb`     | Breadcrumb navigation                       |
| `OtBreadcrumbItem` | Breadcrumb item                             |
| `OtBreadcrumbTree` | Collapsible breadcrumb for deep hierarchies |
| `OtPagination`     | Pagination controls                         |
| `OtStepper`        | Step-by-step navigation                     |
| `OtWizard`         | Multi-step form wizard                      |

### Overlay Components

| Component       | Description                                   |
| --------------- | --------------------------------------------- |
| `OtModal`       | Modal dialog                                  |
| `OtDrawer`      | Side drawer                                   |
| `OtTooltip`     | Tooltip on hover/focus                        |
| `OtPopover`     | Popover overlay                               |
| `OtSearchModal` | Search modal with keyboard shortcuts (Ctrl+K) |

### Feedback Components

| Component          | Description                                     |
| ------------------ | ----------------------------------------------- |
| `OtAlert`          | Alert messages (info, success, warning, danger) |
| `OtProgress`       | Progress bar                                    |
| `OtSpinner`        | Loading spinner                                 |
| `OtSkeleton`       | Loading skeleton                                |
| `OtToast`          | Toast notifications                             |
| `OtToastContainer` | Toast container                                 |

### Data Display Components

| Component                                     | Description                            |
| --------------------------------------------- | -------------------------------------- |
| `OtTable`                                     | Basic table                            |
| `OtDataTable`                                 | Data table with sorting and pagination |
| `OtAvatar`                                    | User avatar with initials fallback     |
| `OtBadge`                                     | Badge/indicator                        |
| `OtTag`                                       | Tag/label                              |
| `OtChip` - Chip with avatar and remove button |
| `OtList`                                      | List container                         |
| `OtListItem`                                  | List item                              |
| `OtTree`                                      | Tree view                              |
| `OtTimeline`                                  | Timeline display                       |
| `OtTimelineItem`                              | Timeline item                          |
| `OtStatistic`                                 | Statistical display                    |
| `OtRating`                                    | Star rating                            |
| `OtEmptyState`                                | Empty state placeholder                |
| `OtCarousel`                                  | Image/content carousel                 |
| `OtImage`                                     | Image with lazy loading and fallback   |
| `OtAccordion`                                 | Accordion container                    |
| `OtAccordionItem`                             | Accordion item                         |
| `OtKbd`                                       | Keyboard key display                   |
| `OtSplitButton` - Button with dropdown        |

### Icons

Built-in SVG icons:

- `IconSearch`, `IconHome`, `IconUser`, `IconBookmark`, `IconPlay`
- `IconChevronLeft`, `IconChevronRight`, `IconClose`
- `IconEye`, `IconEyeOff`, `IconTrash`, `IconDirectory`
- `IconCheck`, `IconPlus`, `IconMinus`, `IconEdit`, `IconSettings`
- `IconMenu`, `IconStar`, `IconStarOutline`

## Design System

### Colors

```css
/* Primary Colors */
--ot-primary: #377dff;
--ot-danger: #ff715b;
--ot-warning: #ffbe3d;
--ot-success: #2dca8c;
--ot-white: #ffffff;

/* Gray Scale */
--ot-gray-100: #aab0b7;
--ot-gray-200: #858a8f;
--ot-gray-300: #2a2c34;
--ot-gray-400: #1e2029;
--ot-gray-500: #12141d;
```

### Typography

```css
--ot-font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--ot-font-xs: 0.75rem;
--ot-font-sm: 0.875rem;
--ot-font-base: 1rem;
--ot-font-lg: 1.25rem;
--ot-font-xl: 1.5rem;
```

### Spacing

```css
--ot-spacing-xs: 4px;
--ot-spacing-sm: 8px;
--ot-spacing-md: 16px;
--ot-spacing-lg: 24px;
--ot-spacing-xl: 32px;
--ot-spacing-2xl: 48px;
```

### Border Radius

```css
--ot-radius-sm: 4px;
--ot-radius-base: 8.7px;
--ot-radius-lg: 12px;
--ot-radius-xl: 16px;
--ot-radius-full: 999px;
```

### Shadows

```css
--ot-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--ot-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.4);
--ot-shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.5);
```

## Composables

### useToast

```javascript
import { useToast } from '@otakuturks/ui'

const toast = useToast()

toast.success('Success message', { title: 'Success' })
toast.error('Error message', { title: 'Error' })
toast.warning('Warning message', { title: 'Warning' })
toast.info('Info message', { title: 'Info' })
```

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/otakuturks/ui.git

# Install dependencies
yarn install

# Run storybook
yarn storybook

# Build library
yarn build:lib
```

### Scripts

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `yarn dev`       | Start development server              |
| `yarn storybook` | Start storybook for component preview |
| `yarn build`     | Build library and storybook           |
| `yarn build:lib` | Build library only                    |
| `yarn preview`   | Preview production build              |

## Links

- [Storybook](https://otakuturks-ui.web.app/)
- [NPM Package](https://www.npmjs.com/package/@otakuturks/ui)
- [GitHub Repository](https://github.com/otakuturks/ui)

- See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.
- See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for code of conduct.
- See [SECURITY.md](./SECURITY.md) for security policy.

[GPL-3.0](./LICENSE) © [OtakuTurks](https://github.com/otakuturks)
