# Car Management System

A complete CRUD (Create, Read, Update, Delete) web application for managing cars built with Node.js, Express, MongoDB, and EJS.

## Features

- ✅ **Add New Cars** - Add cars with details like name, brand, model, year, price, and color
- ✅ **View All Cars** - Display all cars in a beautiful card layout
- ✅ **Edit Cars** - Update existing car information
- ✅ **Delete Cars** - Remove cars with confirmation dialog
- ✅ **Responsive Design** - Works perfectly on desktop and mobile devices
- ✅ **Beautiful UI** - Modern Bootstrap design with animations

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS Templates, Bootstrap 5, Font Awesome
- **Styling**: CSS3 with gradients and animations

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CAR-ADD-CRUD
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup MongoDB**
   - Make sure MongoDB is installed and running on your system
   - Update database configuration in `config/db_config.js` if needed

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:8000
   ```

## Project Structure

```
CAR-ADD-CRUD/
├── config/
│   └── db_config.js          # Database configuration
├── models/
│   └── car-models.js         # Car schema and model
├── views/
│   ├── home.ejs             # Main page with car list and add form
│   └── edit.ejs             # Edit car page
├── public/
│   └── style.css            # Custom styles
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## API Endpoints

- `GET /` - Home page with all cars and add form
- `POST /cars` - Add new car
- `GET /edit/:id` - Edit car page
- `POST /update/:id` - Update car
- `POST /delete/:id` - Delete car

## Car Model Schema

```javascript
{
  name: String (required),
  brand: String (required),
  model: String (required),
  year: Number (required),
  price: Number (required),
  color: String (required),
  timestamps: true
}
```

## Screenshots

### Home Page
![Home Page](README-IMG/Screenshot%20(1).png)
- Beautiful gradient background
- Add car form at the top
- Car cards with hover effects
- Edit and delete buttons for each car

### Add Car Form
![Add Car Form](README-IMG/Screenshot%20(2).png)
- Clean and intuitive form design
- All required fields validation
- Responsive layout

### Car Cards Display
![Car Cards](README-IMG/Screenshot%20(3).png)
- Modern card layout with hover effects
- Car details beautifully displayed
- Edit and delete action buttons

### Edit Page
![Edit Page](README-IMG/Screenshot%20(4).png)
- Pre-filled form with existing car data
- Update and back buttons
- Same beautiful design consistency


## Features in Detail

### Add Car
- Fill out the form with car details
- All fields are required
- Automatic redirect to home page after adding

### Edit Car
- Click "Edit" button on any car card
- Modify the car information
- Save changes and return to home page

### Delete Car
- Click "Delete" button on any car card
- Confirmation dialog prevents accidental deletion
- Car is permanently removed from database

## Development

To run in development mode with auto-restart:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the MIT License.

---

**Made with ❤️ for car enthusiasts!**