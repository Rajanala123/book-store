import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];
  modalOpen: boolean = false;
  selectedBook: Book | null = null;
  inputValue: number = 0;
  isPriceMatched: boolean = false;
  isDropdownVisible = false;
  searchQuery: string = ''; 

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
    const currentUserEmail = localStorage.getItem('currentUserEmail'); 
    if (currentUserEmail) {
      const storedBooks = JSON.parse(localStorage.getItem(`${currentUserEmail}_books`) || '[]');
      this.books.forEach((book, index) => {
        if (storedBooks[index]) {
          book.isPricePaid = storedBooks[index].isPricePaid;
        }
      });
    }
  }

  get filteredBooks(): Book[] {
    if (!this.searchQuery) {
      return this.books;
    }
    return this.books.filter((book) =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openPaymentModal(book: Book): void {
    this.selectedBook = book;
    this.inputValue = book.price;
    this.isPriceMatched = false;
    this.modalOpen = true;
  }

  validatePrice(): void {
    if (this.selectedBook && this.inputValue === this.selectedBook.price) {
      this.isPriceMatched = true;
      this.selectedBook.isPricePaid = true;
      this.saveBooksToLocalStorage();
      this.viewDescriptionAsPdf(this.selectedBook);
      this.closeModal();
    } else {
      this.isPriceMatched = false;
    }
  }

  closeModal(): void {
    this.modalOpen = false;
    this.inputValue = 0;
  }

  private saveBooksToLocalStorage(): void {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
      const booksToStore = this.books.map((book) => ({
        id: book.id,
        isPricePaid: book.isPricePaid,
      }));
      localStorage.setItem(`${currentUserEmail}_books`, JSON.stringify(booksToStore));
    }
  }

  viewDescriptionAsPdf(book: Book): void {
    // Check if the price has been paid
    if (book.isPricePaid) {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(book.title, 10, 10);
      doc.setFontSize(12);
      doc.text(`Price: ${book.price}`, 10, 20);

      const descriptionText = `Description: ${book.description}`;
      const descriptionLines = doc.splitTextToSize(descriptionText, 180);
      doc.text(descriptionLines, 10, 30);

      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const newTab = window.open(pdfUrl, '_blank');
      if (!newTab) {
        console.error('Failed to open a new tab. Pop-up might be blocked.');
      }
    } else {
      this.openPaymentModal(book);
    }
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  logout() {
    this.router.navigate(['']);
  }
}
