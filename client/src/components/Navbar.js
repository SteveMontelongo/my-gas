import {Navbar, Nav, Container} from 'react-bootstrap';

function AppNavbar(){
    return(
        <Navbar bg="light" expand='md'>
            <Container>
                <Navbar.Brand href="/"></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id= "basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href= "/signin">Sign In</Nav.Link>
                        <Nav.Link href= "/signup">Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;