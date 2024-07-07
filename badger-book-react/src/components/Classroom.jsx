import { Button, Pagination, Container, Form, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Student from "./Student";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

const Classroom = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [name, setName] = useState('');
    const [major, setMajor] = useState('');
    const [interest, setInterest] = useState('');
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                setStudents(data)
                setFilteredStudents(data)
            })
    }, [])

    function updateStudent() {
        const filtered = students.filter(student => {
            const studentName = student.name.first + ' ' + student.name.last;
            const nameMatch = studentName.toLowerCase().includes(name.toLowerCase());
            const majorMatch = student.major.toLowerCase().includes(major.toLowerCase());
            const interestsMatch = student.interests.some(a => a.toLowerCase().includes(interest.toLowerCase()));
            return nameMatch && majorMatch && interestsMatch;
        });
        setFilteredStudents(filtered);
    }

    function resetQuery() {
        setName('');
        setMajor('');
        setInterest('');
        updateStudent();
    }

    useEffect(() => {
        updateStudent();
      }, [filteredStudents]); 

    const handlePrevious = () => {
        if (activePage > 1) {
            setActivePage(activePage - 1);
        }
    };

    const handleNext = () => {
        if (activePage < totalPages) {
            setActivePage(activePage + 1);
        }
    };

    const handlePageClick = (page) => {
        setActivePage(page);
    };

    const totalPages = Math.ceil(filteredStudents.length / 24);
    const buildPaginator = () => {
        let pages = [];
        const num_students = Math.ceil(filteredStudents.length / 24);
        for(let i = 1; i <= num_students; i++) {
            pages.push(
                <Pagination.Item 
                    key={i}
                    active={activePage === i}
                    onClick={() => setActivePage(i)}
                >
                    {i}
                </Pagination.Item>
            )
        }
        return pages;
    }

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control 
                id="searchName"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
            />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control 
                id="searchMajor"
                value={major}
                onChange={(e) => {
                    setMajor(e.target.value)
                }}
            />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control 
                id="searchInterest"
                value={interest}
                onChange={(e) => {
                    setInterest(e.target.value)
                }}
            />
            <br />
            <Button variant="neutral" onClick={resetQuery}>Reset Search
            </Button>
            <p>There are {filteredStudents.length} student(s) matching your search.</p>
        </Form>
        <Container fluid>
            <Row>
                {
                    filteredStudents.slice(24 * (activePage - 1), 24 * activePage).map(s => <Col key={s.id} xs={12} sm={12} md={6} lg={4} xl={3}><Student {...s}/></Col>)
                }
            </Row>
        </Container>
            
        <Pagination>
            <Pagination.Prev onClick={handlePrevious} disabled={activePage === 1}>
                Previous
            </Pagination.Prev>
            {buildPaginator()}
            <Pagination.Next onClick={handleNext} disabled={activePage === totalPages}>
                Next
            </Pagination.Next>
        </Pagination>
            
    </div>

}

export default Classroom;