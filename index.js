
const newBookInput = `

<label for="">
Book Name
<input type="text" id="bookName" placeholder="Enter Book Name">
</label>

<label for="">
Author Name
<input type="text" id="authorName" placeholder="Enter Author Name">
</label>

<label for="">
Publisher Name
<input type="text" id="publisherName" placeholder="Enter Publisher Name">
</label>

<label for="">
Publication Date
<input type="date" id="publicationDate"placeholder="Enter Publication Date">
</label>

<button id="Submit" type="submit" onclick= "saveData()">Add Book</button>

`;

let bookData = [

    {
        bookName : "War and Peace",
        authorName : "Leo Tolstoy",
        publisherName : "David Campbell",
        publicationDate : "09-03-2003"
    }
    ,
    {
        bookName : "Middle March",
        authorName : "George ELiot",
        publisherName : "Ursula Martin",
        publicationDate : "12-03-2000"
    }
    ,
    {
        bookName : "Nineteen Eighty-Four",
        authorName : "George Orwell",
        publisherName : "D J Taylor",
        publicationDate : "04-04-1993"
    }
    ,
    {
        bookName : "The Confessions",
        authorName : "Augustine",
        publisherName : "Simon Yarrow",
        publicationDate : "10-04-2009"
    }
];



document.getElementById('book_input').innerHTML = newBookInput;

 

// getdata from local storage

const getData = () => {
    let data = localStorage.getItem("booksData");
    if(data){
        bookData = JSON.parse(data);
    }
    else{
       setData();
    }
}

const setData = () => {
   localStorage.setItem("booksData",JSON.stringify(bookData));
}


getData();

const duplicateCheck = (bookName,authorName,publisherName,publicationDate) => {
    let flag = true;
    for(let i=0; i<bookData.length;i++){
       if(bookName === bookData[i].bookName && publisherName === bookData[i].publisherName && authorName === bookData[i].authorName && publicationDate === bookData[i].publicationDate)
       {
        flag = false;
       }
       else {
        flag = true;
       }
    }
    console.log(flag)
    return flag;
}

const saveData = () => {

    let newBookName = document.getElementById('bookName');
    let newAuthorName = document.getElementById('authorName');
    let newPublisherName = document.getElementById('publisherName');
    let newPublicationDate = document.getElementById('publicationDate');

    console.log(newBookName.value,newAuthorName.value,newPublisherName.value,newPublicationDate.value);

    if(newBookName.value || newAuthorName.value || newPublicationDate.value || newPublisherName.value)
    {
        if(duplicateCheck(newBookName.value,newAuthorName.value,newPublisherName.value,newPublicationDate.value))
        {

            let bookDetails = {
                bookName : newBookName.value,
                authorName: newAuthorName.value,
                publisherName: newPublisherName.value,
                publicationDate: newPublicationDate.value
            }
        
            console.log(bookDetails)
            bookData.push(bookDetails);
            console.log(bookData)
        
            outputData()
    
            setData();
        
            newBookName.value = "";
            newAuthorName.value = "";
            newPublisherName.value = "";
            newPublicationDate.value = "";
        }

        else{
            alert("Book Already exists");
            
            newBookName.value = "";
            newAuthorName.value = "";
            newPublisherName.value = "";
            newPublicationDate.value = "";
        }
    }

    else{
        alert("Plz Input Valid Credentials")

        newBookName.value = "";
        newAuthorName.value = "";
        newPublisherName.value = "";
        newPublicationDate.value = "";
    }

}

const outputData = () => {

    let dataToAdd = `<table class="table table-borderless">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Book Name</th>
        <th scope="col">Author Name</th>
        <th scope="col">Publisher Name</th>
        <th scope="col">Publication Date</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>`;

    for(let i=0;i<bookData.length;i++){
       dataToAdd += `
    <tr>
       <th scope="row">${i+1}</th>
       <td>${bookData[i].bookName}</td>
       <td>${bookData[i].authorName}</td>
       <td>${bookData[i].publisherName}</td>
       <td>${bookData[i].publicationDate}</td>
       <td><button class= "grid_item" id="edit" onclick="editData(${i})">Edit</button></td>
       <td>  <button class= "grid_item" id="delete" onclick = "deleteData(${i})">Delete</button> </td>
    </tr>
       `;
    }

    dataToAdd = dataToAdd + `</tbody>
    </table>`;
    document.getElementById('allBooks').innerHTML = dataToAdd;

}

outputData();

const deleteData = (index) => {
 bookData=bookData.filter((books,i) => i !==index);
 document.getElementById('book_input').innerHTML = newBookInput;
   setData();
   outputData();
}

const editData = (index) => {

    const editInput =  `

    <label for="">
    Book Name
    <input type="text" id="newBookName" placeholder="Enter Book Name" value = "${bookData[index].bookName}">
    </label>

    <label for="">
    Author Name
    <input type="text" id="newAuthorName" placeholder="Enter Author Name" value = "${bookData[index].authorName}">
    </label>

    <label for="">
    Publisher Name
    <input type="text" id="newPublisherName" placeholder="Enter Publisher Name" value = "${bookData[index].publisherName}">
    </label>

    <label for="">
    Publication Date
    <input type="date" id="newPublicationDate" placeholder="Enter Publication Date" value = "${bookData[index].publicationDate}">
    </label>

    <button id="Submit" type="submit" onclick= "updateData(${index})">Update Book</button>

    `;
    document.getElementById('book_input').innerHTML = editInput;
}

const updateData = (index) => {
 
    let newBookName = document.getElementById('newBookName');
    let newAuthorName = document.getElementById('newAuthorName');
    let newPublisherName = document.getElementById('newPublisherName');
    let newPublicationDate = document.getElementById('newPublicationDate');
    
    if(duplicateCheck(newBookName.value,newAuthorName.value,newPublisherName.value,newPublicationDate.value))
    {
        bookData[index] = {
    
            bookName: newBookName.value,
            authorName: newAuthorName.value,
            publisherName: newPublisherName.value,
            publicationDate: newPublicationDate.value
        }
        setData();
        outputData();

        newBookName.value = "";
        newAuthorName.value = "";
        newPublisherName.value = "";
        newPublicationDate.value = "";
    
        document.getElementById('book_input').innerHTML = newBookInput;

    }

    else{
        alert("Book Already exists");
            
        newBookName.value = "";
        newAuthorName.value = "";
        newPublisherName.value = "";
        newPublicationDate.value = "";
    }


}

// for hamburger 

const toggle = () => {
   document.getElementById('hamburger').classList.toggle('show');
}



