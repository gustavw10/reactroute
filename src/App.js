import './App.css';
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";


function App(props) {
  
  const bookFacade = props.bookFacade;
  
  return (
    <div>
    <Header />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/products" >
        <Products bookFacade = {bookFacade} />
      </Route>
      <Route path="/add-book">
        <AddBook bookFacade = {bookFacade} />
      </Route> 
      <Route path="/find-book">
        <FindBook bookFacade = {bookFacade} />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  </div>
  );
}

const Header = () => {
  return (
<div><ul className="header">
  <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
  <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
  <li><NavLink activeClassName="active" to="/add-book">Add Book</NavLink></li>
  <li><NavLink activeClassName="active" to="/find-book">Find Book</NavLink></li>
</ul>
      <hr />
</div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}


function Products(props) {
  const books = props.bookFacade.getBooks();   
  const bookFacade = props.bookFacade;
  let { path, url } = useRouteMatch();

  const listItems = books.map((book, index) => (
    <li key={index}>{book.title}  
    <Link to={`${url}/` + book.id}> * details</Link></li>
  ));

  return (
    <div>
      <h2>Products:</h2>
      <ul>{listItems}</ul>

      <Switch>
        <Route exact path="/products">
          Select a book for details.
        </Route>
        <Route path={`${path}/:topicId`}>
          <Details bookFacade = {bookFacade}/>
        </Route>
      </Switch>
    </div>
  )
}

function Details(props) {
  let { topicId } = useParams();
  let foundBook = props.bookFacade.findBook(topicId);

  return (
    <div>
      Title: {foundBook.title}
      <br></br>
      Info: {foundBook.info}
      <br></br>
      Id: {topicId}
    </div>
  );
}

function FindBook(props) {
  const [bookId, setBookId] = useState("Enter book ID.");
  let bookFacade = props.bookFacade;

  function DeleteBook(){
    bookFacade.deleteBook(parseInt(bookId));
  }

  function SearchBook(){
      if(bookFacade.findBook(bookId)){
         let foundBook = bookFacade.findBook(bookId)
      
      return (
        <div>
          Title: {foundBook.title}
        <br></br>
          Info: {foundBook.info}
        <br></br>
          <button onClick={() => DeleteBook()}>
        Delete
      </button> 
        </div>
        
      )
      }
     return (
       <div>Enter valid ID and your book will appear here.</div>
     )
  }

  return (
    <div>
      <h2>Enter id to search for: </h2>
      <input type="text" id="id" placeholder="ID" onChange={(event) => setBookId(event.target.value)}/>
      <br></br>
      <br></br>
      <SearchBook />
      <br></br>
    </div>
  );
}

function AddBook(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function CreateBook(){
    let book = {title: title, info: description}
    props.bookFacade.addBook(book);
  }

  //Se react paint mappen for en anden måde at gøre det på med forms
  return (
    <div>
      <h2>Add book: </h2>
      <input type="text" id="title" placeholder="Title" value ={title} onChange={(event) => setTitle(event.target.value)}/>
      <br></br>
      <input type="text" id="info" placeholder="Info" value ={description} onChange={(event) => setDescription(event.target.value)}/>
      {title} 
      {description}
      <br></br>
      <button onClick={() => CreateBook()}>
        Click me
      </button> 
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>No match for this URL</h2>
    </div>
  );
}

export default App;
