# Project Analysis: Healthcare Dashboard → Marketplace Dashboard

## 📋 Project Overview

This is a **React + TypeScript + Vite** healthcare dashboard application called **"Healix"** that needs to be transformed into a marketplace dashboard while maintaining the same design system, colors, structure, and styles.

---

## 🎨 Design System (TO BE PRESERVED)

### Color Palette
- **Primary Brand Color (Cyan/Turquoise):** `#3BC1CF` (RGB: 59, 193, 207)
- **Secondary Brand Color (Blue):** `#1974BB` (RGB: 25, 116, 187)
- **Gradient:** Linear gradient from `#3BC1CF` to `#1974BB`
- **Brand Color Scale:** Full 50-900 scale defined for both primary and secondary
- **Status Colors:** Success (green), Warning (orange), Danger (red), Info (blue)

### Typography
- **Font Family:** Inter (sans-serif)
- **Font Sizes:** Responsive scale (sm, base, lg, xl, 2xl, 3xl, 4xl)

### Spacing & Layout
- **Border Radius:** `0.5rem` (--radius)
- **Shadows:** Custom shadow system (2xs, xs, sm, md, lg, xl, 2xl)
- **Spacing:** Tailwind-based spacing system

### Theme Support
- ✅ Light mode
- ✅ Dark mode
- ✅ System theme detection
- Theme-aware logo switching (`Logos-Healix.png` / `Logos-Healix-White.png`)

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Layout.tsx                    # Main layout wrapper
│   ├── shared/
│   │   ├── sidebar/                  # Navigation sidebar
│   │   ├── table/                    # Data table components
│   │   ├── stats/                    # Statistics cards
│   │   ├── page-header/              # Page headers
│   │   └── notifications/            # Notification system
│   └── ui/                           # UI primitives (31 components)
├── features/                         # Feature-based modules
│   ├── dashboard/                    # Dashboard overview
│   ├── profile/                      # User profile
│   ├── working-hours/                # Working hours management
│   ├── appointments/                 # Appointments management
│   ├── payments/                     # Payment management
│   ├── services/                     # Services management
│   ├── support/                      # Support tickets
│   └── settings/                     # Settings page
├── pages/                            # Standalone pages
│   ├── Login.tsx                     # Authentication
│   ├── ForgotPassword.tsx
│   ├── VerifyOTP.tsx
│   └── ...
├── contexts/
│   └── AuthContext.tsx                # Authentication state
└── lib/                              # Utilities
```

---

## 📄 Current Pages & Features

### Public Pages
1. **Login** (`/login`) - Authentication page with Healix branding
2. **Forgot Password** (`/forgot-password`)
3. **Verify OTP** (`/verify-otp`)

### Protected Pages (Dashboard)
1. **Dashboard** (`/`) - Overview with stats, charts, appointments
2. **Profile** (`/profile`) - User profile management
3. **Services** (`/services`) - Healthcare services management
4. **Working Hours** (`/working-hours`) - Schedule management
5. **Appointments** (`/appointments`) - Appointment booking/management
6. **Payments** (`/payments`) - Payment history and transactions
7. **Support** (`/support`) - Support ticket system
8. **Settings** (`/settings`) - Application settings

---

## 🔄 Healthcare-Specific Content to Replace

### Branding & Names
- **Brand Name:** "Healix" → Needs marketplace name
- **Logo Files:** `Logos-Healix.png`, `Logos-Healix-White.png` → New marketplace logos
- **Email Domains:** `@healix.com` → Marketplace domain

### Terminology Mapping

| Healthcare Term | Marketplace Equivalent |
|----------------|----------------------|
| Patient | Customer/Buyer |
| Doctor/Provider | Seller/Vendor |
| Appointment | Order/Booking |
| Service | Product/Listing |
| Consultation | Product/Service |
| Clinic/Practice | Store/Shop |
| Medical Record | Order Details |
| Prescription | Order Items |
| Working Hours | Availability/Schedule |
| Appointment Status | Order Status |
| Patient Growth | Customer Growth |
| Revenue | Sales/Revenue |
| Healthcare Services | Products/Listings |

### Feature-Specific Content

#### Dashboard (`/`)
- "Welcome back! Here's what's happening with your practice today."
- Stats: Upcoming Appointments, Confirmed Appointments, Month Revenue, Total Patients
- Charts: Revenue Chart, Patient Growth Chart, Appointments Chart, Service Distribution Chart
- Components: UpcomingAppointments, ConfirmedAppointments

#### Services (`/services`)
- "Manage your healthcare services, pricing, and availability"
- Categories: Consultation, Dental, Therapy, Laboratory, etc.
- Fields: name, category, provider, price, duration, bookings, status

#### Appointments (`/appointments`)
- Appointment booking and management
- Status types: pending, confirmed, completed, cancelled
- Patient information, service details, doctor notes
- Analysis results, conversation history

#### Payments (`/payments`)
- Payment history
- Transaction history
- Withdrawals
- Healthcare-specific payment context

#### Profile (`/profile`)
- Professional section (medical credentials)
- Financial section
- Statistics (patients, appointments, revenue)

#### Working Hours (`/working-hours`)
- Schedule management for healthcare providers
- Time slots for appointments

#### Support (`/support`)
- Ticket types: technical, billing, appointment, general, feedback, complaint
- Healthcare-specific support context

#### Settings (`/settings`)
- HCP (Healthcare Provider) data section
- Medical credentials
- Healthcare-specific settings

---

## 🎯 Key Files to Update

### Critical Files (Branding & Navigation)
1. `src/components/Layout.tsx` - Line 67: "Healix" breadcrumb
2. `src/components/shared/sidebar/SidebarLogo.tsx` - Logo paths
3. `src/pages/Login.tsx` - Logo, welcome text, email placeholder
4. `src/pages/ForgotPassword.tsx` - Branding references
5. `src/pages/VerifyOTP.tsx` - Logo references
6. `public/Logos-Healix.png` - Logo file
7. `public/Logos-Healix-White.png` - Logo file

### Feature Files (Content Replacement)
1. `src/features/dashboard/` - All dashboard content
2. `src/features/appointments/` - Appointment → Order conversion
3. `src/features/services/` - Services → Products conversion
4. `src/features/payments/` - Payment context updates
5. `src/features/profile/` - Profile content updates
6. `src/features/working-hours/` - Schedule context updates
7. `src/features/support/` - Support ticket types and context
8. `src/features/settings/` - Settings content updates

### Data Files (Mock Data)
- All `mockData.ts` files in features
- `src/data/` directory
- Mock services, appointments, payments, etc.

### Type Definitions
- `src/types/` - Type definitions may need updates
- Feature-specific types in `src/features/*/types/`

---

## ✅ What to Keep (Design System)

### Visual Elements
- ✅ All color variables and CSS custom properties
- ✅ Gradient system (`from-[#3BC1CF] to-[#1974BB]`)
- ✅ Shadow system
- ✅ Border radius system
- ✅ Typography system
- ✅ Spacing system
- ✅ Component styles and animations
- ✅ Dark mode support
- ✅ Responsive breakpoints

### Structure & Architecture
- ✅ Component structure
- ✅ Feature-based organization
- ✅ Routing structure
- ✅ Layout system
- ✅ Sidebar navigation structure
- ✅ Table components
- ✅ Form components
- ✅ UI component library

### Functionality
- ✅ Authentication system
- ✅ Protected routes
- ✅ Theme switching
- ✅ Notification system
- ✅ Search and filtering
- ✅ Pagination
- ✅ Sorting
- ✅ Form validation

---

## 📝 Next Steps

1. **Replace Branding**
   - Update all "Healix" references
   - Replace logo files
   - Update email domains

2. **Update Navigation**
   - Review sidebar navigation items
   - Update route titles and descriptions
   - Adjust icons if needed

3. **Transform Content**
   - Replace healthcare terminology
   - Update mock data
   - Modify feature descriptions
   - Update form labels and placeholders

4. **Update Types & Schemas**
   - Modify TypeScript interfaces
   - Update form validation schemas
   - Adjust data structures

5. **Test & Verify**
   - Ensure all routes work
   - Verify theme switching
   - Test responsive design
   - Validate form submissions

---

## 🎨 Design System Reference

### CSS Variables (from `src/index.css`)
```css
--brand-primary: 59 193 207;        /* #3BC1CF */
--brand-secondary: 25 116 187;      /* #1974BB */
--brand-gradient-from: #3BC1CF;
--brand-gradient-to: #1974BB;
```

### Tailwind Classes Used
- `bg-linear-to-r from-[#3BC1CF] to-[#1974BB]` - Gradient backgrounds
- `text-[#3BC1CF]` / `text-[#1974BB]` - Brand colors
- `border-[#3BC1CF]` - Brand borders
- Custom shadow utilities
- Responsive utilities (sm:, md:, lg:)

---

## 📦 Dependencies (No Changes Needed)
- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router 7
- TanStack Query
- TanStack Table
- Radix UI components
- Lucide React icons
- React Hook Form + Zod
- Recharts (for charts)

---

**Ready to proceed with content replacement!** 🚀
