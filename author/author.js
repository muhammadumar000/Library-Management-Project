// getting data from local storage 

let bookData = JSON.parse(localStorage.getItem("booksData"));

// this func return an array of books by the author which is passed in arguments

const authorCheck = (author) => {
    return bookData.filter(book => book.authorName === author).map(book => book.bookName);
}

// array which holds the data of author and books written by them
let booksByAuthor = [];

// function to get the data of authors and books written by them

const toGetBooksByAuthor = () => {
    let dummyVar = bookData.map(book => book.authorName);
    let authorName = [...new Set(dummyVar)];

    for(let i=0;i<authorName.length;i++){
        let booksArray = authorCheck(authorName[i]);

        booksByAuthor.push(
            {
            authorName:authorName[i],
            books: booksArray   
            }
            );
    }

   
}

toGetBooksByAuthor();

// function for output of the books written by different authors in DOM
const outputBooks = (index) => {
    let toAdd = "";
    for(let i=0;i<booksByAuthor[index].books.length;i++){
        toAdd += `
          <h2> <span>${i+1}.</span> ${booksByAuthor[index].books[i]} </h2>
        `
    }

    return toAdd;
}

// function for output of the author data in DOM

const outputData = () => {

    let toAdd = "";
    for(let i=0;i<booksByAuthor.length;i++){
        
          let book = outputBooks(i);
        toAdd += `
        <div class="author_data">
        <h2>Author Name: <span> ${booksByAuthor[i].authorName} </span> </h2>
        <h2>Books Written</h2>
        <hr>
        <div class="books" id = "book">
           ${book}
        </div>
        <button class = "deleteBook" onclick = "deleteAuthor(${i})" > Delete Author </button>
    </div>
        
        `
        
    }
    document.getElementById('author').innerHTML = toAdd;
    
}

outputData();


// function to delete author

const deleteAuthor = (index) => {

    bookData = bookData.filter(books => booksByAuthor[index].authorName!==books.authorName);
    localStorage.setItem("booksData",JSON.stringify(bookData));
    booksByAuthor = booksByAuthor.filter((books,i) => index!==i);
    outputData();
   
}  

// for hamburger 

const toggle = () => {
    document.getElementById('hamburger').classList.toggle('show');
 }
 