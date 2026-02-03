# Dealership Management System - Premium Frontend UI

A professional, production-grade admin interface for used car dealership management.

## Features

### 📊 Dashboard
- Real-time KPI cards (Inventory, Revenue, Leads, Sales)
- Interactive sales chart with Chart.js
- Recent activity feed
- Performance metrics with trend indicators

### 🚗 Inventory Management
- Grid and list view toggle
- Premium car cards with images
- Advanced filtering (Make, Year, Status)
- Add/Edit vehicle modal with comprehensive form
- Status badges (Available, Sold, Reserved)
- Image upload functionality

### 👥 Leads & CRM
- Lead cards with priority indicators (Hot, Warm, Cold)
- Follow-up alerts and reminders
- Contact information display
- Budget and interest tracking
- Quick contact actions

### 💰 Sales & Finance
- Monthly and quarterly revenue summaries
- Average sale price tracking
- Recent sales table with status
- Sales representative performance

### 👔 Staff Management
- Staff profile cards
- Performance metrics per employee
- Sales and revenue tracking
- Role-based display

### ⚙️ Settings
- Dealership information management
- Notification preferences with toggle switches
- Security and password management
- Clean, organized settings layout

## Design Features

- **Light Theme**: Clean, professional white background with premium blue accents
- **Smooth Animations**: Fade-in effects, hover transitions, and scroll animations
- **Responsive Layout**: Desktop-first design with mobile considerations
- **Modern UI Components**: Cards, modals, badges, and interactive elements
- **Professional Typography**: Inter font family for clarity
- **Intuitive Navigation**: Sidebar navigation with active states
- **Data Visualization**: Chart.js integration for analytics

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for interactions
- **Chart.js**: Data visualization
- **Font Awesome**: Icon library
- **Google Fonts**: Inter font family

## File Structure

```
DES/
├── index.html      # Main HTML structure
├── styles.css      # Complete styling
├── script.js       # JavaScript interactions
└── README.md       # Documentation
```

## Usage

1. Open `index.html` in a modern web browser
2. Navigate through different sections using the sidebar
3. Click "Add Vehicle" to open the car form modal
4. Toggle between grid and list views in inventory
5. Explore all features without backend dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #2563eb;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
}
```

### Branding
Update the logo in `index.html`:
```html
<div class="logo">
    <i class="fas fa-car-side"></i>
    <span>Your Brand</span>
</div>
```

## Future Enhancements

- Backend API integration
- Real-time data updates
- Advanced search and filtering
- Export functionality
- Print reports
- Multi-language support
- Dark mode toggle

## License

This is a frontend UI template for demonstration purposes.
