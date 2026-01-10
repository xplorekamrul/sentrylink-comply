# SentryLink Comply - Enterprise Compliance Management

A modern, enterprise-grade compliance management and evidence vault system built with Next.js, React, and TypeScript.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
npm run build
npm start
```

## 📋 Features

### Phase A - Current Implementation

#### 1. **Evidence Vault** (`/`)
- 📊 Searchable, filterable table of compliance documents
- 🔍 Real-time search with URL state persistence
- 📁 Filter by document type and status
- ✅ Bulk selection with floating action counter
- 📈 Status indicators (Active, Expiring, Expired)
- 🔗 Click to view document details

#### 2. **Evidence Detail** (`/evidence/[id]`)
- 📄 Complete document metadata
- 📚 Version timeline with upload history
- ⏱️ Relative timestamps (e.g., "2 days ago")
- 📤 Upload new version modal
- 💾 File size tracking
- 🔄 Loading states for uploads

#### 3. **Buyer Requests** (`/requests`)
- 🎯 Request cards with status tracking
- 📅 Due date management
- ✅ Fulfill workflow with modal
- 🔀 Tab-based selection (Vault/Upload)
- 📊 Status indicators (Pending, Fulfilled, Overdue)

#### 4. **Export Packs** (`/packs`)
- 📦 Create document packages
- 🔗 Shareable pack links
- ⏳ Async processing simulation
- 📥 Download tracking

#### 5. **UI/UX**
- 🌓 Dark mode toggle (bottom-right corner)
- 📱 Fully responsive design
- ✨ 3D-like shadows and depth effects
- 🎨 Enterprise color palette
- ⌨️ Keyboard accessible
- 🔄 Smooth transitions and animations

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- Next.js 16.1.1 - React framework with App Router
- React 19.2.3 - UI library
- TypeScript 5 - Type safety
- Tailwind CSS 4 - Utility-first styling
- Lucide React - Icon library

**State Management:**
- React hooks (useState, useEffect)
- URL query parameters for persistence
- In-memory mock data

**API:**
- Next.js API routes
- RESTful endpoints
- Mock data simulation

### Project Structure

```
sentrylink-comply/
├── app/
│   ├── api/                    # API routes
│   │   ├── requests/          # Request management
│   │   ├── packs/             # Pack export
│   │   └── share/             # Share links
│   ├── evidence/              # Evidence detail page
│   ├── requests/              # Buyer requests page
│   ├── packs/                 # Export packs page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Evidence vault
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # Reusable components
│   │   ├── Table.tsx
│   │   ├── Modal.tsx
│   │   ├── Button.tsx
│   │   └── StatusChip.tsx
│   ├── Sidebar.tsx            # Navigation sidebar
│   └── ThemeToggle.tsx        # Dark mode toggle
├── lib/
│   ├── types.ts               # TypeScript interfaces
│   ├── mockData.ts            # Mock data
│   ├── utils.ts               # Utility functions
│   └── access.ts              # Access control
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript config
└── DESIGN.md                  # Design document
```

## 🔐 Access Control

### Selective Disclosure Implementation

Buyers can only access evidence that was explicitly shared via:

1. **Fulfill Workflow** - Evidence shared when fulfilling a request
2. **Pack Export** - Evidence included in a shared pack
3. **Share Link** - Evidence shared via time-limited token

### Access Control Functions

```typescript
// Grant access to evidence
grantAccess(evidenceId, buyerId, 'fulfill', expiresAt)

// Check if buyer can access evidence
canAccessEvidence(buyerId, evidenceId)

// Get all accessible evidence for buyer
getAccessibleEvidenceIds(buyerId)

// Filter versions by access
filterAccessibleVersions(versions, buyerId, evidenceId)

// Get access history for audit
getAccessHistory(evidenceId)
```

## 📡 API Endpoints

### Requests

```bash
# Get all requests
GET /api/requests

# Create new request
POST /api/requests
Body: { docType, dueDate, buyerName }

# Get request status
GET /api/requests/:id

# Fulfill request
PUT /api/requests/:id/fulfill
Body: { evidenceId, buyerId, expiresAt? }
```

### Packs

```bash
# Get all packs
GET /api/packs

# Create pack (async processing)
POST /api/packs
Body: { name, evidenceIds, buyerId? }

# Get pack status
GET /api/packs/:id

# Delete pack
DELETE /api/packs/:id
```

### Share Links

```bash
# Create share link
POST /api/share
Body: { evidenceIds, expiryDays? }

# Access shared evidence
GET /api/share/:token

# Revoke share link
DELETE /api/share/:token
```

## 🎨 Design System

### Color Palette

- **Primary:** Indigo-600 (#4F46E5)
- **Success:** Emerald-700 (#047857)
- **Warning:** Amber-700 (#B45309)
- **Danger:** Rose-700 (#B91C1C)
- **Background:** Slate-50 (light) / Slate-950 (dark)

### Components

#### Table
- Sortable columns
- Selectable rows
- Hover states
- Empty states
- Responsive overflow

#### Modal
- Backdrop blur
- Smooth animations
- Keyboard accessible
- Portal-based rendering

#### Button
- Variants: primary, secondary, ghost
- Sizes: sm, md, lg
- Loading states
- Disabled states

#### StatusChip
- Status-based colors
- Customizable labels
- Responsive sizing

## 🧪 Testing

### Manual Testing Checklist

- [ ] Evidence Vault filters persist in URL
- [ ] Bulk selection works correctly
- [ ] Modal opens/closes smoothly
- [ ] Dark mode toggle works
- [ ] Responsive on mobile/tablet/desktop
- [ ] All links navigate correctly
- [ ] Form validation works
- [ ] Loading states display

### Running Tests

```bash
# Lint code
npm run lint

# Build for production
npm run build
```

## 📈 Performance

- **Lighthouse Score:** Target 90+
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Cumulative Layout Shift:** < 0.1

## 🔄 State Management

### URL Persistence

Evidence Vault filters are persisted in URL query parameters:

```
/?search=ISO&docType=Certificate&status=active
```

This allows:
- Bookmarking filtered views
- Sharing filtered results
- Browser back/forward navigation

### Local State

Component state managed with React hooks:

```typescript
const [evidence, setEvidence] = useState<Evidence[]>(mockEvidence)
const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
const [isModalOpen, setIsModalOpen] = useState(false)
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Deploy via Vercel dashboard
# or use Vercel CLI
vercel deploy
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 Documentation

- **Design Document:** See `DESIGN.md`
- **API Documentation:** See inline comments in `app/api/`
- **Component Documentation:** See inline comments in `components/`

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run linting: `npm run lint`
4. Submit a pull request

## 📝 License

Proprietary - SentryLink Comply

## 🆘 Support

For issues or questions, please contact the development team.

---

## Phase A Completion Summary

✅ **Completed:**
- Evidence Vault with URL state persistence
- Evidence Detail with version timeline
- Buyer Requests workflow
- Export Packs stub
- Dark mode toggle
- Responsive design
- Access control layer
- API route stubs
- Design documentation

🔄 **Next Phase (Phase B):**
- Backend database integration
- User authentication
- File upload handling
- Audit logging
- Production deployment

---

**Version:** 0.1.0  
**Last Updated:** January 2026  
**Status:** Phase A Complete ✅
