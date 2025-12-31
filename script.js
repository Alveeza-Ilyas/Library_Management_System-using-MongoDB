// Global State Management
const libraryState = {
  books: [],
  members: [],
  transactions: [],
  currentPage: {
    books: 1,
    members: 1,
    transactions: 1
  },
  itemsPerPage: 10
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  loadSampleData();
  setupEventListeners();
  renderDashboard();
  renderBooks();
  renderMembers();
  renderTransactions();
  setupSmoothScroll();
});

function initializeApp() {
  // Set default dates
  const today = new Date().toISOString().split('T')[0];
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 14);
  const dueDate = futureDate.toISOString().split('T')[0];
  
  const borrowDateInput = document.getElementById('borrowDate');
  const dueDateInput = document.getElementById('dueDate');
  const returnDateInput = document.getElementById('returnDate');
  const memberValidityInput = document.getElementById('memberValidity');
  
  if (borrowDateInput) borrowDateInput.value = today;
  if (dueDateInput) dueDateInput.value = dueDate;
  if (returnDateInput) returnDateInput.value = today;
  if (memberValidityInput) {
    const yearLater = new Date();
    yearLater.setFullYear(yearLater.getFullYear() + 1);
    memberValidityInput.value = yearLater.toISOString().split('T')[0];
  }
  
  console.log('Library Management System Initialized');
}


function loadSampleData() {
  // Sample Books
  libraryState.books = [
    { id: 'B001', isbn: '978-0062315007', title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', publisher: 'HarperOne', year: 2014, copies: 5, available: 3, location: 'A-12', cover: 'https://cdn.pixabay.com/photo/2015/09/05/22/46/reading-925589_960_720.jpg' },
    { id: 'B002', isbn: '978-0451524935', title: '1984', author: 'George Orwell', genre: 'Fiction', publisher: 'Signet Classic', year: 1961, copies: 4, available: 2, location: 'A-15', cover: 'https://cdn.pixabay.com/photo/2016/02/19/11/19/book-1209805_960_720.jpg' },
    { id: 'B003', isbn: '978-0743273565', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', publisher: 'Scribner', year: 2004, copies: 6, available: 6, location: 'B-08', cover: 'https://cdn.pixabay.com/photo/2017/08/07/23/13/books-2607155_960_720.jpg' },
    { id: 'B004', isbn: '978-0735211292', title: 'Atomic Habits', author: 'James Clear', genre: 'Non-Fiction', publisher: 'Avery', year: 2018, copies: 8, available: 5, location: 'C-21', cover: 'https://cdn.pixabay.com/photo/2016/11/29/04/17/book-1868073_960_720.jpg' },
    { id: 'B005', isbn: '978-0439708180', title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genre: 'Fantasy', publisher: 'Scholastic', year: 1999, copies: 10, available: 7, location: 'D-05', cover: 'https://cdn.pixabay.com/photo/2017/01/30/15/50/book-2020467_960_720.jpg' },
    { id: 'B006', isbn: '978-0547928227', title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', publisher: 'Mariner Books', year: 2012, copies: 5, available: 4, location: 'D-12', cover: 'https://cdn.pixabay.com/photo/2017/04/05/01/11/book-2203639_960_720.jpg' },
    { id: 'B007', isbn: '978-0679783268', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', publisher: 'Modern Library', year: 1995, copies: 4, available: 4, location: 'E-18', cover: 'https://cdn.pixabay.com/photo/2015/09/05/21/51/book-925567_960_720.jpg' },
    { id: 'B008', isbn: '978-0553418026', title: 'The Martian', author: 'Andy Weir', genre: 'Science', publisher: 'Broadway Books', year: 2014, copies: 6, available: 3, location: 'F-09', cover: 'https://cdn.pixabay.com/photo/2016/02/19/10/59/book-1209790_960_720.jpg' },
    { id: 'B009', isbn: '978-0142424179', title: 'The Fault in Our Stars', author: 'John Green', genre: 'Fiction', publisher: 'Dutton Books', year: 2012, copies: 7, available: 5, location: 'A-25', cover: 'https://cdn.pixabay.com/photo/2016/03/27/19/57/book-1283865_960_720.jpg' },
    { id: 'B010', isbn: '978-1612680194', title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', genre: 'Non-Fiction', publisher: 'Plata Publishing', year: 2011, copies: 5, available: 2, location: 'C-33', cover: 'https://cdn.pixabay.com/photo/2016/08/13/12/56/book-1597032_960_720.jpg' },
  ];

  libraryState.members = [
    { id: 'M001', name: 'Malaika', email: 'malaika@email.com', phone: '+92 344 5678900', membership: 'premium', booksBorrowed: 3, joinDate: '2024-01-15', status: 'active' },
    { id: 'M002', name: 'Ali', email: 'ali@email.com', phone: '+92 334 5678901', membership: 'basic', booksBorrowed: 2, joinDate: '2024-02-20', status: 'active' },
    { id: 'M003', name: 'Saif', email: 'saif@email.com', phone: '+92 324 5678902', membership: 'student', booksBorrowed: 1, joinDate: '2024-03-10', status: 'active' },
    { id: 'M004', name: 'Laiba', email: 'laiba@email.com', phone: '+92 345 5678903', membership: 'premium', booksBorrowed: 5, joinDate: '2023-11-05', status: 'active' },
    { id: 'M005', name: 'Ahmad', email: 'ahmad@email.com', phone: '+92 336 5678904', membership: 'basic', booksBorrowed: 0, joinDate: '2024-04-01', status: 'active' },
  ];

  libraryState.transactions = [
    { id: 'T001', bookId: 'B001', bookTitle: 'The Alchemist', memberId: 'M002', memberName: 'Ali', borrowDate: '2024-05-01', dueDate: '2024-05-15', returnDate: null, fine: 0, status: 'borrowed' },
    { id: 'T002', bookId: 'B002', bookTitle: '1984', memberId: 'M004', memberName: 'Laiba', borrowDate: '2024-04-20', dueDate: '2024-05-04', returnDate: '2024-05-03', fine: 0, status: 'returned' },
    { id: 'T003', bookId: 'B004', bookTitle: 'Atomic Habits', memberId: 'M003', memberName: 'Saif', borrowDate: '2024-05-05', dueDate: '2024-05-19', returnDate: null, fine: 0, status: 'borrowed' },
    { id: 'T004', bookId: 'B008', bookTitle: 'The Martian', memberId: 'M005', memberName: 'Ahmad', borrowDate: '2024-04-15', dueDate: '2024-04-29', returnDate: null, fine: 15, status: 'overdue' },
  ];
}
// EVENT LISTENERS
function setupEventListeners() {
  // Form Submissions
  document.getElementById('addBookForm')?.addEventListener('submit', handleAddBook);
  document.getElementById('addMemberForm')?.addEventListener('submit', handleAddMember);
  document.getElementById('borrowBookForm')?.addEventListener('submit', handleBorrowBook);
  document.getElementById('returnBookForm')?.addEventListener('submit', handleReturnBook);
  
  // Search Functionality
  document.getElementById('bookSearch')?.addEventListener('input', debounce(filterBooks, 300));
  document.getElementById('memberSearch')?.addEventListener('input', debounce(filterMembers, 300));
  document.getElementById('transactionSearch')?.addEventListener('input', debounce(filterTransactions, 300));
  
  // Filter Changes
  document.getElementById('genreFilter')?.addEventListener('change', filterBooks);
  document.getElementById('statusFilter')?.addEventListener('change', filterBooks);
  document.getElementById('membershipFilter')?.addEventListener('change', filterMembers);
  document.getElementById('transactionTypeFilter')?.addEventListener('change', filterTransactions);
}

// MODAL MANAGEMENT
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    // Reset form if exists
    const form = modal.querySelector('form');
    if (form) form.reset();
  }
}

// Close modal on outside click
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}

// DASHBOARD RENDERING
function renderDashboard() {
  // Update statistics
  const totalBooks = libraryState.books.reduce((sum, book) => sum + book.copies, 0);
  const totalMembers = libraryState.members.length;
  const borrowedBooks = libraryState.transactions.filter(t => t.status === 'borrowed').length;
  const overdueBooks = libraryState.transactions.filter(t => t.status === 'overdue').length;
  
  document.getElementById('totalBooks').textContent = totalBooks;
  document.getElementById('totalMembers').textContent = totalMembers;
  document.getElementById('borrowedBooks').textContent = borrowedBooks;
  document.getElementById('overdueBooks').textContent = overdueBooks;
  
  // Render recent activity
  renderRecentActivity();
}

function renderRecentActivity() {
  const activityList = document.getElementById('activityList');
  if (!activityList) return;
  
  const recentTransactions = libraryState.transactions.slice(-5).reverse();
  
  activityList.innerHTML = recentTransactions.map(transaction => {
    const icon = transaction.status === 'returned' ? 'check-circle' : 'book';
    const iconColor = transaction.status === 'returned' ? 'green' : 'blue';
    const action = transaction.status === 'returned' ? 'returned by' : 'borrowed by';
    
    return `
      <div class="activity-item">
        <div class="activity-icon ${iconColor}">
          <i class="fas fa-${icon}"></i>
        </div>
        <div class="activity-details">
          <p><strong>${transaction.bookTitle}</strong> ${action} <strong>${transaction.memberName}</strong></p>
          <span class="activity-time">${formatTimeAgo(transaction.borrowDate)}</span>
        </div>
      </div>
    `;
  }).join('');
}

// BOOKS MANAGEMENT
function renderBooks() {
  const tbody = document.getElementById('bookTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = libraryState.books.map(book => {
    const status = book.available > 0 ? 'available' : 'borrowed';
    const statusText = book.available > 0 ? 'Available' : 'Borrowed';
    
    return `
      <tr>
        <td><img src="${book.cover}" alt="${book.title}"></td>
        <td>${book.isbn}</td>
        <td><strong>${book.title}</strong></td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.copies}</td>
        <td>${book.available}</td>
        <td><span class="status-badge ${status}">${statusText}</span></td>
        <td>
          <div class="table-actions">
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleAddBook(e) {
  e.preventDefault();
  
  const newBook = {
    id: 'B' + String(libraryState.books.length + 1).padStart(3, '0'),
    isbn: document.getElementById('bookISBN').value,
    title: document.getElementById('bookTitle').value,
    author: document.getElementById('bookAuthor').value,
    genre: document.getElementById('bookGenre').value,
    publisher: document.getElementById('bookPublisher').value,
    year: parseInt(document.getElementById('bookYear').value) || new Date().getFullYear(),
    copies: parseInt(document.getElementById('bookCopies').value),
    available: parseInt(document.getElementById('bookCopies').value),
    location: document.getElementById('bookLocation').value,
    cover: document.getElementById('bookCover').value || 'https://cdn.pixabay.com/photo/2015/09/05/22/46/reading-925589_960_720.jpg'
  };
  
  libraryState.books.push(newBook);
  renderBooks();
  closeModal('addBookModal');
  showToast('Book added successfully!', 'success');
  
  // Update dashboard
  renderDashboard();
}

function filterBooks() {
  const searchTerm = document.getElementById('bookSearch')?.value.toLowerCase() || '';
  const genreFilter = document.getElementById('genreFilter')?.value || '';
  const statusFilter = document.getElementById('statusFilter')?.value || '';
  
  const tbody = document.getElementById('bookTableBody');
  if (!tbody) return;
  
  const filteredBooks = libraryState.books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
                         book.author.toLowerCase().includes(searchTerm) ||
                         book.isbn.toLowerCase().includes(searchTerm) ||
                         book.genre.toLowerCase().includes(searchTerm);
    
    const matchesGenre = !genreFilter || book.genre === genreFilter;
    
    const bookStatus = book.available > 0 ? 'available' : 'borrowed';
    const matchesStatus = !statusFilter || bookStatus === statusFilter;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });
  
  tbody.innerHTML = filteredBooks.map(book => {
    const status = book.available > 0 ? 'available' : 'borrowed';
    const statusText = book.available > 0 ? 'Available' : 'Borrowed';
    
    return `
      <tr>
        <td><img src="${book.cover}" alt="${book.title}"></td>
        <td>${book.isbn}</td>
        <td><strong>${book.title}</strong></td>
        <td>${book.author}</td>
       
        <td>${book.copies}</td>
        <td>${book.available}</td>
        <td><span class="status-badge ${status}">${statusText}</span></td>
        <td>
          <div class="table-actions">
            
          </div>
        </td>
      </tr>
    `;
  }).join('');
}




function exportBooks() {
  showToast('Export functionality will be implemented', 'info');
}

// MEMBERS MANAGEMENT
function renderMembers() {
  const tbody = document.getElementById('memberTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = libraryState.members.map(member => {
    return `
      <tr>
        <td><strong>${member.id}</strong></td>
        <td>${member.name}</td>
        <td>${member.email}</td>
        <td>${member.phone}</td>
        <td><span class="status-badge ${member.membership}">${capitalizeFirst(member.membership)}</span></td>
        <td>${member.booksBorrowed}</td>
        <td>${formatDate(member.joinDate)}</td>
        <td><span class="status-badge ${member.status}">${capitalizeFirst(member.status)}</span></td>
        <td>
          <div class="table-actions">
            
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleAddMember(e) {
  e.preventDefault();
  
  const newMember = {
    id: 'M' + String(libraryState.members.length + 1).padStart(3, '0'),
    name: document.getElementById('memberName').value,
    email: document.getElementById('memberEmail').value,
    phone: document.getElementById('memberPhone').value,
    membership: document.getElementById('membershipType').value,
    booksBorrowed: 0,
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active'
  };
  
  libraryState.members.push(newMember);
  renderMembers();
  closeModal('addMemberModal');
  showToast('Member registered successfully!', 'success');
  renderDashboard();
}

function filterMembers() {
  const searchTerm = document.getElementById('memberSearch')?.value.toLowerCase() || '';
  const membershipFilter = document.getElementById('membershipFilter')?.value || '';
  
  const tbody = document.getElementById('memberTableBody');
  if (!tbody) return;
  
  const filteredMembers = libraryState.members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm) ||
                         member.email.toLowerCase().includes(searchTerm) ||
                         member.id.toLowerCase().includes(searchTerm);
    
    const matchesMembership = !membershipFilter || member.membership === membershipFilter;
    
    return matchesSearch && matchesMembership;
  });
  
  tbody.innerHTML = filteredMembers.map(member => {
    return `
      <tr>
        <td><strong>${member.id}</strong></td>
        <td>${member.name}</td>
        <td>${member.email}</td>
        <td>${member.phone}</td>
        <td><span class="status-badge ${member.membership}">${capitalizeFirst(member.membership)}</span></td>
        <td>${member.booksBorrowed}</td>
        <td>${formatDate(member.joinDate)}</td>
        <td><span class="status-badge ${member.status}">${capitalizeFirst(member.status)}</span></td>
        <td>
          <div class="table-actions">
            
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// TRANSACTIONS MANAGEMENT
function renderTransactions() {
  const tbody = document.getElementById('transactionTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = libraryState.transactions.map(transaction => {
    const statusClass = transaction.status === 'overdue' ? 'overdue' : 
                       transaction.status === 'returned' ? 'available' : 'borrowed';
    
    return `
      <tr>
        <td><strong>${transaction.id}</strong></td>
        <td>${transaction.bookTitle}</td>
        <td>${transaction.memberName}</td>
        <td>${formatDate(transaction.borrowDate)}</td>
        <td>${formatDate(transaction.dueDate)}</td>
        <td>${transaction.returnDate ? formatDate(transaction.returnDate) : '-'}</td>
        <td>$${transaction.fine.toFixed(2)}</td>
        <td><span class="status-badge ${statusClass}">${capitalizeFirst(transaction.status)}</span></td>
        <td>
      </tr>
    `;
  }).join('');
}

function handleBorrowBook(e) {
  e.preventDefault();
  
  const newTransaction = {
    id: 'T' + String(libraryState.transactions.length + 1).padStart(3, '0'),
    bookId: document.getElementById('borrowBookISBN').value,
    bookTitle: 'Sample Book', // In real app, fetch from book ID
    memberId: document.getElementById('borrowMemberId').value,
    memberName: 'Sample Member', // In real app, fetch from member ID
    borrowDate: document.getElementById('borrowDate').value,
    dueDate: document.getElementById('dueDate').value,
    returnDate: null,
    fine: 0,
    status: 'borrowed'
  };
  
  libraryState.transactions.push(newTransaction);
  renderTransactions();
  closeModal('borrowModal');
  showToast('Book issued successfully!', 'success');
  renderDashboard();
}

function handleReturnBook(e) {
  e.preventDefault();
  
  const transactionId = document.getElementById('returnTransactionId').value;
  const transaction = libraryState.transactions.find(t => t.id === transactionId);
  
  if (transaction) {
    transaction.returnDate = document.getElementById('returnDate').value;
    transaction.status = 'returned';
    transaction.fine = parseFloat(document.getElementById('fineAmount').value) || 0;
    
    renderTransactions();
    closeModal('returnModal');
    showToast('Book returned successfully!', 'success');
    renderDashboard();
  } else {
    showToast('Transaction not found!', 'error');
  }
}

function filterTransactions() {
  const searchTerm = document.getElementById('transactionSearch')?.value.toLowerCase() || '';
  const typeFilter = document.getElementById('transactionTypeFilter')?.value || '';
  
  const tbody = document.getElementById('transactionTableBody');
  if (!tbody) return;
  
  const filteredTransactions = libraryState.transactions.filter(transaction => {
    const matchesSearch = transaction.bookTitle.toLowerCase().includes(searchTerm) ||
                         transaction.memberName.toLowerCase().includes(searchTerm) ||
                         transaction.id.toLowerCase().includes(searchTerm);
    
    const matchesType = !typeFilter || 
                       (typeFilter === 'borrow' && transaction.status === 'borrowed') ||
                       (typeFilter === 'return' && transaction.status === 'returned') ||
                       (typeFilter === 'overdue' && transaction.status === 'overdue');
    
    return matchesSearch && matchesType;
  });
  
  tbody.innerHTML = filteredTransactions.map(transaction => {
    const statusClass = transaction.status === 'overdue' ? 'overdue' : 
                       transaction.status === 'returned' ? 'available' : 'borrowed';
    
    return `
      <tr>
        <td><strong>${transaction.id}</strong></td>
        <td>${transaction.bookTitle}</td>
        <td>${transaction.memberName}</td>
        <td>${formatDate(transaction.borrowDate)}</td>
        <td>${formatDate(transaction.dueDate)}</td>
        <td>${transaction.returnDate ? formatDate(transaction.returnDate) : '-'}</td>
        <td>$${transaction.fine.toFixed(2)}</td>
        <td><span class="status-badge ${statusClass}">${capitalizeFirst(transaction.status)}</span></td>
      </tr>
    `;
  }).join('');
}

function viewTransaction(transactionId) {
  showToast('Transaction details will be shown in a modal', 'info');
}

// UTILITY FUNCTIONS
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInDays === 1) return '1 day ago';
  return `${diffInDays} days ago`;
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// EXPOSE FUNCTIONS TO GLOBAL SCOPE
window.openModal = openModal;
window.closeModal = closeModal;
window.viewTransaction = viewTransaction;
window.generateReport = generateReport;
window.changePage = changePage;

console.log('All functions loaded successfully!');

document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const book = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    isbn: document.getElementById("isbn").value
  };

  await fetch("http://localhost:5000/api/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });

  loadBooks();
});

async function loadBooks() {
  const res = await fetch("http://localhost:5000/api/books");
  const books = await res.json();

  const table = document.getElementById("bookTable");
  table.innerHTML = "";

  books.forEach(b => {
    table.innerHTML += `
      <tr>
        <td>${b.title}</td>
        <td>${b.author}</td>
        <td>${b.isbn}</td>
      </tr>
    `;
  });
}

loadBooks();

async function renderBooks() {
  const tbody = document.getElementById('bookTableBody');
  if (!tbody) return;

  const res = await fetch("http://localhost:5000/api/books");
  const books = await res.json();

  tbody.innerHTML = books.map(book => {
    const available = book.copies > 0 ? book.copies : 0;
    const status = available > 0 ? 'available' : 'borrowed';
    const statusText = available > 0 ? 'Available' : 'Borrowed';

    return `
      <tr>
        
        <td>${book.isbn || '-'}</td>
        <td><strong>${book.title}</strong></td>
        <td>${book.author}</td>
   
        <td>${book.copies}</td>
        <td>${available}</td>
        <td>
          <span class="status-badge ${status}">
            ${statusText}
          </span>
        </td>
        <td>
          <div class="table-actions">
            
            
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

async function handleAddBook(e) {
  e.preventDefault();

  const book = {
    title: document.getElementById('bookTitle').value,
    author: document.getElementById('bookAuthor').value,
    isbn: document.getElementById('bookISBN').value,
    copies: parseInt(document.getElementById('bookCopies').value)
  };

  await fetch("http://localhost:5000/api/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });

  closeModal('addBookModal');
  renderBooks(); // 🔥 table yahin update hogi
}
document
  .getElementById('addBookForm')
  .addEventListener('submit', handleAddBook);


document.addEventListener('DOMContentLoaded', () => {
  renderBooks();
});


// Add member
async function handleAddMember(e) {
  e.preventDefault();
  
  const member = {
    name: document.getElementById('memberName').value,
    email: document.getElementById('memberEmail').value,
    phone: document.getElementById('memberPhone').value,
    membership: document.getElementById('membershipType').value
  };

  await fetch("http://localhost:5000/api/members", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member)
  });

  renderMembers(); // table refresh
}
