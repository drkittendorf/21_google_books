import React, { useState } from "react";
import API from "../utils/API";
// import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";


function Books() {
  // Setting our component's initial values
const initialFormObjectState = {
    title: "",
    author: "",
    synopsis: ""
  };
// Setting up the state
const [formObject, setFormObject] = useState({...initialFormObjectState})
 
  const clearState = () => {
    console.log(formObject);
    setFormObject(initialFormObjectState);
        console.log("reset triggered")
    console.log(formObject);
  };

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
    //   .then(res => setBooks(res.data))
      .then(clearState)
      .catch(err => console.log(err));
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(e) {
    e.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(console.log("book has been submitted to list") ) 
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };
   
   // Handles updating component state when the user types into the input field
   function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
    // console.log(formObject)
  };

    return (
    //   <Container fluid>
    //     <Row>
    //       <Col size="sm-6" align='center' >
            <div className='container'>
              <h2>What book title would you like to add to your list?</h2>
           
            <form className='card-container3' align='center'>
           
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="title (required)"
                value={formObject.title}
              />
              <Input
                onChange={handleInputChange}
                name="author"
                placeholder="author (required)"
                value={formObject.author}
              />
              <TextArea
                // className='synopsis'
                onChange={handleInputChange}
                name='synopsis'
                placeholder='synopsis(Optional)'
                value= {formObject.synopsis}
              />
               <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={handleFormSubmit}> Submit Book
                </FormBtn>
            </form>
            </div>
    //       </Col>
    //     </Row>
    //   </Container>
    );
  }


export default Books;
