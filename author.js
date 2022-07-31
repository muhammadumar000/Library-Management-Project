alert('hello');
let bookData = JSON.parse(localStorage.getItem("booksData"));
console.log(bookData)

// function for extracting author name from bookData array

let withSameName = [];

const authorName = () => {
    let authorData = bookData.map(book => book.authorName);
    // filtering the repeated names
    
    let x = [...new Set(authorData)];
    console.log(x) 
    let toadd = "";
    for(let i=0;i<x.length;i++){
        toadd += `
        <div class="author_data">
                <h2>Author Name: ${x[i]}</h2>
                <h2>Books Written</h2>
                <hr>

                <div class="books" id = "books"  >
                 
                <h2>Hello</h2>

                </div>
        </div>
        `;
    }
    document.getElementById('author').innerHTML = toadd;

    for(let i=0;i<x.length;i++){
       withSameName.push(bookData.filter(author => author.authorName === x[i]))
    }
    console.log(withSameName)

  
}
authorName();

// function for books from diff authors 

// const books = () => {

//     let bookdata = "";
//     for(let i=0;i<withSameName[1].length;i++){
//             bookdata += `

//                 <h2>${i+1} ${withSameName[1][i].bookName}</h2>
    
//             `
       
       

//     }

//     document.getElementById('books').innerHTML = bookdata;

    
// }
//  books();

{/* <div class="author_data">
<h2>Author Name: withSameName[0][0].author</h2>
<h2>Books Written</h2>
<hr>

</div> */}