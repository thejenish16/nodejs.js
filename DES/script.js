// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        const page = item.dataset.page;
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page).classList.add('active');
        
        document.querySelector('.current-page').textContent = item.textContent.trim();
    });
});

// Sidebar Toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

if (sidebarToggle && sidebar && mainContent) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });
}

// Notification Dropdown
const notificationBtn = document.getElementById('notificationBtn');
const notificationDropdown = document.getElementById('notificationDropdown');
const notificationBackdrop = document.getElementById('notificationBackdrop');

if (notificationBtn && notificationDropdown) {
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('active');
        if (notificationBackdrop) {
            notificationBackdrop.classList.toggle('active');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
            notificationDropdown.classList.remove('active');
            if (notificationBackdrop) {
                notificationBackdrop.classList.remove('active');
            }
        }
    });

    // Mark all as read
    const markReadBtn = document.querySelector('.mark-read-btn');
    if (markReadBtn) {
        markReadBtn.addEventListener('click', () => {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            const badge = document.querySelector('.pulse-badge');
            if (badge) {
                badge.style.opacity = '0';
                setTimeout(() => badge.remove(), 300);
            }
            if (notificationBackdrop) {
                notificationBackdrop.classList.remove('active');
            }
        });
    }

    // Click on notification item
    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.remove('unread');
        });
    });
    
    // Close button
    const notificationCloseBtn = document.querySelector('.notification-close-btn');
    if (notificationCloseBtn) {
        notificationCloseBtn.addEventListener('click', () => {
            notificationDropdown.classList.remove('active');
            if (notificationBackdrop) {
                notificationBackdrop.classList.remove('active');
            }
        });
    }
}

// Redirect to Add Vehicle page
function showAddCarForm() {
    window.location.href = 'add-vehicle.html';
}

function closeCarForm() {
    document.getElementById('carFormModal').classList.remove('active');
}

function editCar(id) {
    const editPage = document.createElement('div');
    editPage.id = 'editCarPage';
    editPage.className = 'page active';
    editPage.innerHTML = `
        <div class="page-header">
            <div>
                <button class="btn-secondary" onclick="closeEditCarPage()" style="margin-bottom: 16px;">
                    <i class="fas fa-arrow-left"></i> Back to Inventory
                </button>
                <h1 class="page-title">Edit Vehicle</h1>
                <p class="page-subtitle">Update vehicle information</p>
            </div>
        </div>
        
        <div class="glass-panel floating" style="padding: 32px; border-radius: 20px;">
            <div class="form-section">
                <h3 class="section-title"><i class="fas fa-info-circle"></i> Vehicle Details</h3>
                <div class="form-grid-3d">
                    <div class="form-group-3d">
                        <label>Brand</label>
                        <input type="text" class="glass-input" value="BMW">
                    </div>
                    <div class="form-group-3d">
                        <label>Model</label>
                        <input type="text" class="glass-input" value="X5 M Sport">
                    </div>
                    <div class="form-group-3d">
                        <label>Year</label>
                        <input type="number" class="glass-input" value="2023">
                    </div>
                    <div class="form-group-3d">
                        <label>VIN Number</label>
                        <input type="text" class="glass-input" value="WBA12345678901234">
                    </div>
                    <div class="form-group-3d">
                        <label>Mileage (km)</label>
                        <input type="number" class="glass-input" value="15000">
                    </div>
                    <div class="form-group-3d">
                        <label>Color</label>
                        <input type="text" class="glass-input" value="Pearl White">
                    </div>
                    <div class="form-group-3d">
                        <label>Fuel Type</label>
                        <select class="glass-select">
                            <option>Petrol</option>
                            <option selected>Diesel</option>
                            <option>Hybrid</option>
                            <option>Electric</option>
                        </select>
                    </div>
                    <div class="form-group-3d">
                        <label>Transmission</label>
                        <select class="glass-select">
                            <option selected>Automatic</option>
                            <option>Manual</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="form-section">
                <h3 class="section-title"><i class="fas fa-rupee-sign"></i> Pricing & Profit</h3>
                <div class="form-grid-3d">
                    <div class="form-group-3d">
                        <label>Purchase Price</label>
                        <input type="number" class="glass-input" value="3740000">
                    </div>
                    <div class="form-group-3d">
                        <label>Selling Price</label>
                        <input type="number" class="glass-input" value="4590000">
                    </div>
                    <div class="form-group-3d full-width">
                        <div class="profit-preview glass-panel">
                            <div class="profit-item">
                                <span>Expected Profit</span>
                                <h3>₹8,50,000</h3>
                            </div>
                            <div class="profit-item">
                                <span>Margin</span>
                                <h3>18.5%</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-section">
                <h3 class="section-title"><i class="fas fa-globe"></i> Website Visibility</h3>
                <div class="website-toggle-group">
                    <div class="toggle-info">
                        <h4>Show on Website</h4>
                        <p>Make this vehicle visible to customers</p>
                    </div>
                    <label class="premium-toggle large">
                        <input type="checkbox" checked>
                        <span class="toggle-slider-3d"></span>
                    </label>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
                <button class="btn-secondary" onclick="closeEditCarPage()">Cancel</button>
                <button class="btn-premium">
                    <i class="fas fa-save"></i>
                    <span>Save Changes</span>
                    <div class="btn-glow"></div>
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('inventory').classList.remove('active');
    document.querySelector('.main-content').appendChild(editPage);
}

function closeEditCarPage() {
    const editPage = document.getElementById('editCarPage');
    if (editPage) {
        editPage.remove();
    }
    document.getElementById('inventory').classList.add('active');
}

// Animated Counter with smoother easing
function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2500;
    const startTime = performance.now();
    
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = Math.floor(target * easedProgress);
        
        const formatted = element.textContent.includes('₹') 
            ? `₹${current.toLocaleString('en-IN')}`
            : current.toString();
        element.textContent = formatted;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Trigger counters on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el);
    });
});

// 3D Tilt Effect with smoother motion
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;
        card.style.transition = 'transform 0.1s ease-out';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// Chart.js - Sales Chart
const salesCtx = document.getElementById('salesChart');
if (salesCtx) {
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [3850000, 4200000, 3950000, 4650000, 5100000, 4875000],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: '#d4af37',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 26, 0.9)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    borderColor: '#d4af37',
                    borderWidth: 1,
                    callbacks: {
                        label: (context) => `Revenue: ₹${context.parsed.y.toLocaleString('en-IN')}`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: { size: 12, weight: '600' },
                        color: '#3a3a3a',
                        callback: (value) => `₹${(value / 100000).toFixed(0)}L`
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { size: 12, weight: '600' },
                        color: '#3a3a3a'
                    }
                }
            }
        }
    });
}

// Profit Chart
const profitCtx = document.getElementById('profitChart');
if (profitCtx) {
    new Chart(profitCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Profit',
                    data: [850000, 920000, 780000, 1050000, 1180000, 1100000],
                    backgroundColor: 'rgba(5, 150, 105, 0.8)',
                    borderRadius: 8,
                    borderSkipped: false
                },
                {
                    label: 'Expense',
                    data: [450000, 480000, 420000, 510000, 550000, 520000],
                    backgroundColor: 'rgba(220, 38, 38, 0.8)',
                    borderRadius: 8,
                    borderSkipped: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 12, weight: '600' },
                        color: '#3a3a3a',
                        usePointStyle: true,
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: { size: 12, weight: '600' },
                        color: '#3a3a3a',
                        callback: (value) => `₹${(value / 100000).toFixed(0)}L`
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { size: 12, weight: '600' },
                        color: '#3a3a3a'
                    }
                }
            }
        }
    });
}

// Revenue Chart
const revenueCtx = document.getElementById('revenueChart');
if (revenueCtx) {
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [5835000, 6120000, 5890000, 6450000, 6980000, 6720000],
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: '#d4af37',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 26, 0.9)',
                    padding: 12,
                    borderColor: '#d4af37',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: {
                        font: { size: 12, weight: '600' },
                        color: '#3a3a3a',
                        callback: (value) => `₹${(value / 100000).toFixed(0)}L`
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { size: 12, weight: '600' },
                        color: '#3a3a3a'
                    }
                }
            }
        }
    });
}

// Smooth Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.floating').forEach(el => {
    observer.observe(el);
});

// Search Functionality
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching:', searchTerm);
    });
}

// Price Range Slider
const priceSlider = document.querySelector('.slider');
if (priceSlider) {
    const rangeValues = document.querySelector('.range-values');
    priceSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        const percentage = (value / 10000000) * 100;
        e.target.style.background = `linear-gradient(to right, var(--champagne) 0%, var(--champagne) ${percentage}%, rgba(0, 0, 0, 0.1) ${percentage}%)`;
        if (rangeValues) {
            rangeValues.innerHTML = `<span>₹0</span><span>₹${(value / 100000).toFixed(0)}L</span>`;
        }
    });
}

// File Upload Preview
document.querySelectorAll('.file-upload-3d input[type="file"]').forEach(input => {
    input.addEventListener('change', (e) => {
        const files = e.target.files;
        const parent = input.closest('.file-upload-3d');
        if (files.length > 0 && parent) {
            parent.querySelector('h4').textContent = `${files.length} file(s) selected`;
            parent.style.borderColor = '#d4af37';
            parent.style.background = 'rgba(212, 175, 55, 0.1)';
        }
    });
});

// Smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Navbar scroll transparency
window.addEventListener('scroll', () => {
    const topBar = document.querySelector('.top-bar');
    if (topBar) {
        if (window.scrollY > 50) {
            topBar.style.background = 'rgba(252, 252, 251, 0.7)';
        } else {
            topBar.style.background = 'rgba(252, 252, 251, 0.85)';
        }
    }
});


// Open KPI Page
function openKPIPage(type) {
    if (event) event.stopPropagation();
    
    document.getElementById('dashboard').classList.remove('active');
    
    const kpiData = {
        stock: {
            title: 'Total Stock Value Details',
            icon: 'fa-wallet',
            content: `
                <div class="kpi-details-grid">
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-car"></i> Inventory Breakdown</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>Luxury Vehicles</span>
                                <strong>₹3,45,00,000</strong>
                            </div>
                            <div class="stat-row">
                                <span>Mid-Range Vehicles</span>
                                <strong>₹1,85,50,000</strong>
                            </div>
                            <div class="stat-row">
                                <span>Economy Vehicles</span>
                                <strong>₹54,97,500</strong>
                            </div>
                        </div>
                    </div>
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-chart-pie"></i> Category Distribution</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>SUVs</span>
                                <strong>45 units (₹2.8Cr)</strong>
                            </div>
                            <div class="stat-row">
                                <span>Sedans</span>
                                <strong>52 units (₹1.9Cr)</strong>
                            </div>
                            <div class="stat-row">
                                <span>Hatchbacks</span>
                                <strong>30 units (₹1.1Cr)</strong>
                            </div>
                        </div>
                    </div>
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-calendar-alt"></i> Age Analysis</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>0-30 days</span>
                                <strong>68 vehicles</strong>
                            </div>
                            <div class="stat-row">
                                <span>31-60 days</span>
                                <strong>42 vehicles</strong>
                            </div>
                            <div class="stat-row">
                                <span>60+ days</span>
                                <strong>17 vehicles</strong>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        cars: {
            title: 'Available Cars Details',
            icon: 'fa-car',
            content: `
                <div class="kpi-details-grid">
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-tags"></i> By Brand</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>BMW</span>
                                <strong>18 units</strong>
                            </div>
                            <div class="stat-row">
                                <span>Mercedes-Benz</span>
                                <strong>15 units</strong>
                            </div>
                            <div class="stat-row">
                                <span>Audi</span>
                                <strong>12 units</strong>
                            </div>
                            <div class="stat-row">
                                <span>Toyota</span>
                                <strong>28 units</strong>
                            </div>
                            <div class="stat-row">
                                <span>Honda</span>
                                <strong>24 units</strong>
                            </div>
                            <div class="stat-row">
                                <span>Others</span>
                                <strong>30 units</strong>
                            </div>
                        </div>
                    </div>
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-gas-pump"></i> By Fuel Type</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>Petrol</span>
                                <strong>52 vehicles</strong>
                            </div>
                            <div class="stat-row">
                                <span>Diesel</span>
                                <strong>48 vehicles</strong>
                            </div>
                            <div class="stat-row">
                                <span>Hybrid</span>
                                <strong>18 vehicles</strong>
                            </div>
                            <div class="stat-row">
                                <span>Electric</span>
                                <strong>9 vehicles</strong>
                            </div>
                        </div>
                    </div>
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-tachometer-alt"></i> By Mileage</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>0-10K km</span>
                                <strong>35 vehicles</strong>
                            </div>
                            <div class="stat-row">
                                <span>10K-30K km</span>
                                <strong>52 vehicles</strong>
                            </div>
                            <div class="stat-row">
                                <span>30K-50K km</span>
                                <strong>28 vehicles</strong>
                            </div>
                            <div class="stat-row">
                                <span>50K+ km</span>
                                <strong>12 vehicles</strong>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        sold: {
            title: 'Cars Sold Details',
            icon: 'fa-check-circle',
            content: `
                <div class="kpi-details-grid">
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-calendar-week"></i> This Month</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>Week 1</span>
                                <strong>6 sales</strong>
                            </div>
                            <div class="stat-row">
                                <span>Week 2</span>
                                <strong>8 sales</strong>
                            </div>
                            <div class="stat-row">
                                <span>Week 3</span>
                                <strong>5 sales</strong>
                            </div>
                            <div class="stat-row">
                                <span>Week 4</span>
                                <strong>5 sales</strong>
                            </div>
                        </div>
                    </div>
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-user-tie"></i> Top Performers</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>Mike Johnson</span>
                                <strong>8 sales</strong>
                            </div>
                            <div class="stat-row">
                                <span>Sarah Williams</span>
                                <strong>7 sales</strong>
                            </div>
                            <div class="stat-row">
                                <span>Tom Anderson</span>
                                <strong>5 sales</strong>
                            </div>
                            <div class="stat-row">
                                <span>Others</span>
                                <strong>4 sales</strong>
                            </div>
                        </div>
                    </div>
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-trophy"></i> Best Selling Models</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>Toyota Fortuner</span>
                                <strong>5 units</strong>
                            </div>
                            <div class="stat-row">
                                <span>Honda City</span>
                                <strong>4 units</strong>
                            </div>
                            <div class="stat-row">
                                <span>BMW X5</span>
                                <strong>3 units</strong>
                            </div>
                            <div class="stat-row">
                                <span>Others</span>
                                <strong>12 units</strong>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        profit: {
            title: 'Net Profit Details',
            icon: 'fa-chart-line',
            content: `
                <div class="kpi-details-grid">
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-rupee-sign"></i> Revenue Breakdown</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>Total Sales</span>
                                <strong>₹5,83,52,000</strong>
                            </div>
                            <div class="stat-row">
                                <span>Cost of Goods</span>
                                <strong>₹4,35,72,000</strong>
                            </div>
                            <div class="stat-row">
                                <span>Net Profit</span>
                                <strong class="text-success">₹1,47,80,000</strong>
                            </div>
                        </div>
                    </div>
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-percentage"></i> Margin Analysis</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>Luxury Segment</span>
                                <strong>28.5%</strong>
                            </div>
                            <div class="stat-row">
                                <span>Mid-Range Segment</span>
                                <strong>22.3%</strong>
                            </div>
                            <div class="stat-row">
                                <span>Economy Segment</span>
                                <strong>18.7%</strong>
                            </div>
                            <div class="stat-row">
                                <span>Overall Average</span>
                                <strong>21.3%</strong>
                            </div>
                        </div>
                    </div>
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-chart-bar"></i> Monthly Comparison</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>This Month</span>
                                <strong>₹1,24,78,000</strong>
                            </div>
                            <div class="stat-row">
                                <span>Last Month</span>
                                <strong>₹1,08,50,000</strong>
                            </div>
                            <div class="stat-row">
                                <span>Growth</span>
                                <strong class="text-success">+15.0%</strong>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        leads: {
            title: 'Active Leads Details',
            icon: 'fa-users',
            content: `
                <div class="kpi-details-grid">
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-fire"></i> Lead Priority</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>Hot Leads</span>
                                <strong class="text-danger">12 leads</strong>
                            </div>
                            <div class="stat-row">
                                <span>Warm Leads</span>
                                <strong class="text-warning">18 leads</strong>
                            </div>
                            <div class="stat-row">
                                <span>Cold Leads</span>
                                <strong>13 leads</strong>
                            </div>
                        </div>
                    </div>
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-funnel-dollar"></i> Lead Source</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>Website</span>
                                <strong>18 leads</strong>
                            </div>
                            <div class="stat-row">
                                <span>Walk-in</span>
                                <strong>12 leads</strong>
                            </div>
                            <div class="stat-row">
                                <span>Referral</span>
                                <strong>8 leads</strong>
                            </div>
                            <div class="stat-row">
                                <span>Social Media</span>
                                <strong>5 leads</strong>
                            </div>
                        </div>
                    </div>
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-chart-line"></i> Conversion Rate</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>This Month</span>
                                <strong>32.5%</strong>
                            </div>
                            <div class="stat-row">
                                <span>Last Month</span>
                                <strong>28.8%</strong>
                            </div>
                            <div class="stat-row">
                                <span>Average Time</span>
                                <strong>12 days</strong>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        followup: {
            title: 'Pending Follow-ups Details',
            icon: 'fa-bell',
            content: `
                <div class="kpi-details-grid">
                    <div class="detail-card glass-panel urgent-card">
                        <h3><i class="fas fa-exclamation-circle"></i> Due Today</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>Michael Roberts</span>
                                <strong>BMW X5 Interest</strong>
                            </div>
                            <div class="stat-row">
                                <span>Priya Sharma</span>
                                <strong>Mercedes C-Class</strong>
                            </div>
                            <div class="stat-row">
                                <span>Raj Kumar</span>
                                <strong>Audi Q7 Test Drive</strong>
                            </div>
                        </div>
                    </div>
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-calendar-day"></i> This Week</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>Tomorrow</span>
                                <strong>2 follow-ups</strong>
                            </div>
                            <div class="stat-row">
                                <span>Day After</span>
                                <strong>1 follow-up</strong>
                            </div>
                            <div class="stat-row">
                                <span>Later This Week</span>
                                <strong>2 follow-ups</strong>
                            </div>
                        </div>
                    </div>
                    <div class="detail-card glass-panel">
                        <h3><i class="fas fa-user-clock"></i> By Sales Rep</h3>
                        <div class="detail-stats">
                            <div class="stat-row">
                                <span>Mike Johnson</span>
                                <strong>3 pending</strong>
                            </div>
                            <div class="stat-row">
                                <span>Sarah Williams</span>
                                <strong>3 pending</strong>
                            </div>
                            <div class="stat-row">
                                <span>Tom Anderson</span>
                                <strong>2 pending</strong>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    };
    
    const data = kpiData[type];
    const detailsPage = document.createElement('div');
    detailsPage.id = 'kpiDetailsPage';
    detailsPage.className = 'page active';
    detailsPage.innerHTML = `
        <div class="page-header">
            <div>
                <button class="btn-secondary" onclick="closeKPIPage()" style="margin-bottom: 16px;">
                    <i class="fas fa-arrow-left"></i> Back to Dashboard
                </button>
                <h1 class="page-title">${data.title}</h1>
                <p class="page-subtitle">Detailed analytics and insights</p>
            </div>
        </div>
        ${data.content}
    `;
    
    document.querySelector('.main-content').appendChild(detailsPage);
}

function closeKPIPage() {
    const detailsPage = document.getElementById('kpiDetailsPage');
    if (detailsPage) {
        detailsPage.remove();
    }
    document.getElementById('dashboard').classList.add('active');
}

function closeKPIDetails() {
    document.getElementById('kpiDetailsModal').classList.remove('active');
}

// Prevent modal content clicks from closing modal
document.addEventListener('DOMContentLoaded', () => {
    const kpiModal = document.getElementById('kpiDetailsModal');
    if (kpiModal) {
        const modalContent = kpiModal.querySelector('.modal-content-3d');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Prevent backdrop clicks from immediately closing
        const backdrop = kpiModal.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', (e) => {
                e.stopPropagation();
                closeKPIDetails();
            });
        }
    }
});
