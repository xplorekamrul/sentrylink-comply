# SentryLink Comply - Quick Start Guide

## 🚀 Get Started in 2 Minutes

### 1. Start the Dev Server
```bash
npm run dev
```

The app will be available at **http://localhost:3001**

### 2. Explore the Features

#### 📊 Evidence Vault (Home Page)
- View all compliance documents
- Search by name
- Filter by type and status
- Select multiple documents
- Click a row to view details

**Try this:**
- Search for "ISO"
- Filter by "Certificate" type
- Select 2-3 documents
- Click "Add to Pack"

#### 📄 Evidence Detail
- View document metadata
- See version history
- Upload new version
- Track file sizes

**Try this:**
- Click any document in the vault
- Scroll down to see versions
- Click "Upload New" to add a version
- Enter notes and submit

#### 🎯 Buyer Requests
- View pending requests
- Fulfill requests with documents
- Track request status

**Try this:**
- Go to "Buyer Requests" in sidebar
- Click "Fulfill Request" on any card
- Choose a document from vault
- Click "Submit"

#### 🌓 Dark Mode
- Click the moon/sun icon (bottom-right)
- Theme persists across sessions

---

## 📁 Key Files to Know

### Pages
- `app/page.tsx` - Evidence Vault
- `app/evidence/[id]/page.tsx` - Evidence Detail
- `app/requests/page.tsx` - Buyer Requests
- `app/packs/page.tsx` - Export Packs

### Components
- `components/ui/Table.tsx` - Data table
- `components/ui/Modal.tsx` - Dialog overlay
- `components/ui/Button.tsx` - Buttons
- `components/ui/StatusChip.tsx` - Status badges
- `components/Sidebar.tsx` - Navigation
- `components/ThemeToggle.tsx` - Dark mode

### Data
- `lib/mockData.ts` - Sample data
- `lib/types.ts` - TypeScript types
- `lib/utils.ts` - Helper functions
- `lib/access.ts` - Access control

### API
- `app/api/requests/` - Request endpoints
- `app/api/packs/` - Pack endpoints
- `app/api/share/` - Share link endpoints

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  indigo: { 600: '#YOUR_COLOR' },
  // ...
}
```

### Add New Page
1. Create `app/newpage/page.tsx`
2. Add to sidebar in `components/Sidebar.tsx`
3. Import components and build UI

### Modify Mock Data
Edit `lib/mockData.ts` to change sample data

---

## 🔧 Common Tasks

### Add a New Component
```typescript
// components/ui/NewComponent.tsx
export const NewComponent: React.FC<Props> = ({ prop }) => {
  return <div>Component</div>;
};
```

### Add a New API Route
```typescript
// app/api/endpoint/route.ts
export async function GET(request: NextRequest) {
  return NextResponse.json({ data: [] });
}
```

### Add a New Page
```typescript
// app/newpage/page.tsx
export default function NewPage() {
  return <div>New Page</div>;
}
```

---

## 📱 Responsive Design

The app is fully responsive:
- **Mobile:** Single column, collapsible sidebar
- **Tablet:** Two columns, visible sidebar
- **Desktop:** Three columns, fixed sidebar

Test on different screen sizes:
- Open DevTools (F12)
- Click device toolbar icon
- Select different devices

---

## 🌙 Dark Mode

Dark mode is automatic:
- Detects system preference
- Can be toggled manually
- Persists in localStorage
- All components support it

---

## 🔍 Debugging

### Check Console
Open DevTools (F12) → Console tab

### Check Network
DevTools → Network tab to see API calls

### Check Performance
DevTools → Performance tab

### TypeScript Errors
Run: `npm run lint`

---

## 📚 Documentation

- **Full Design:** See `DESIGN.md`
- **Implementation:** See `IMPLEMENTATION_SUMMARY.md`
- **API Docs:** See `README.md`

---

## 🆘 Troubleshooting

### Port 3000 Already in Use
The app will automatically use port 3001 instead.

### Styles Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check `app/globals.css`

### Components Not Rendering
- Check browser console for errors
- Verify imports use `@/` alias
- Check TypeScript types

### Dark Mode Not Working
- Check localStorage in DevTools
- Verify `ThemeToggle.tsx` is in layout
- Check `tailwind.config.ts` has `darkMode: 'class'`

---

## 🚀 Next Steps

1. **Explore the Code** - Read through components
2. **Modify Data** - Change mock data in `lib/mockData.ts`
3. **Customize UI** - Update colors and styles
4. **Add Features** - Create new pages and components
5. **Connect Backend** - Replace mock data with API calls

---

## 📞 Need Help?

- Check `README.md` for full documentation
- Review `DESIGN.md` for architecture
- Look at component comments for usage
- Check TypeScript types for interfaces

---

**Happy coding! 🎉**
