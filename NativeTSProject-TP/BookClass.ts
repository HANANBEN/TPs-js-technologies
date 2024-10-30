export enum BookStatus {
    Read = "Read",
    ReRead = "Re-read",
    DNF = "DNF",
    CurrentlyReading = "Currently reading",
    ReturnedUnread = "Returned Unread",
    WantToRead = "Want to read"
}

export enum BookFormat {
    Print = "Print",
    PDF = "PDF",
    Ebook = "Ebook",
    AudioBook = "AudioBook"
}




export default class Book {


    title: string;
    author: string;
    pages: number;
    status: BookStatus;
    format: BookFormat;
    pagesRead: number;
    suggestedBy: string;
    finished: boolean;

    constructor(title, author, pages, status, format, pagesRead, suggestedBy) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.format = format;
        this.pagesRead = pagesRead || 0;
        this.suggestedBy = suggestedBy;
        this.finished = false;
        this.checkFinished();
    }

    currentlyAt(pagesRead: number): void {
        this.pagesRead = pagesRead;
        this.checkFinished();
    }

    // Check if the book is finished
    private checkFinished(): void {
        if (this.pagesRead >= this.pages) {
            this.finished = true;
            this.status = BookStatus.Read;
        }
    }

    // Delete book (using an index approach)
    static deleteBook(bookList: Book[], book: Book): Book[] {
        return bookList.filter(b => b !== book);
    }

}