import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import MainLayout from "./pages/MainPage/MainLayout";

function App() {
  return (
    <>
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href='/'>
                    Star Wars Search
                </Navbar.Brand>
            </Container>
        </Navbar>
        <MainLayout/>
    </>
  );
}

export default App;
