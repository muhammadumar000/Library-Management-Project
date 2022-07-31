// getting data from local storage 

let bookData = JSON.parse(localStorage.getItem("booksData"));

// this func return an array of books by the publisher which is passed in arguments

const publisherCheck = (publisher) => {
    return bookData.filter(book => book.publisherName === publisher).map(book => book.bookName);
}

// array which holds the data of author and books written by them
let booksByPublisher = [];

// function to get the data of authors and books written by them

const toGetBooksByPublisher = () => {
    let dummyVar = bookData.map(book => book.publisherName);
    let publisherName = [...new Set(dummyVar)];

    for(let i=0;i<publisherName.length;i++){
        let booksArray = publisherCheck(publisherName[i]);

        booksByPublisher.push(
            {
            publisherName:publisherName[i],
            books: booksArray   
            }
            );
    }

   
}

toGetBooksByPublisher();

// function for output of the books written by different authors in DOM
const outputBooks = (index) => {
    let toAdd = "";
    for(let i=0;i<booksByPublisher[index].books.length;i++){
        toAdd += `
          <h2> <span>${i+1}.</span> ${booksByPublisher[index].books[i]} </h2>
        `
    }

    return toAdd;
}

const outputData = () => {

    let toAdd = "";
    for(let i=0;i<booksByPublisher.length;i++){
        
        let book = outputBooks(i);
        toAdd += `
        <div class="publisher_data">
        <h2>Publisher Name: <span> ${booksByPublisher[i].publisherName} </span> </h2>
        <h2>Books Published</h2>
        <hr>
        <div class="books" id = "book">
           ${book}
        </div>
        <button class = "deleteBook" onclick = "deletePublisher(${i})" > Delete Publisher </button>
    </div>
        
        `
        
    }
    document.getElementById('publisher').innerHTML = toAdd;
    
}

outputData();

// function to delete publisher

const deletePublisher = (index) => {

    bookData = bookData.filter(books => booksByPublisher[index].publisherName!==books.publisherName);
    localStorage.setItem("booksData",JSON.stringify(bookData));
    booksByPublisher = booksByPublisher.filter((books,i) => index!==i);
    outputData();
   
}  
