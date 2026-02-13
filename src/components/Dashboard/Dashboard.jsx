import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext'
import * as userService from '../../services/userService'
import { Container, Col, Row, Card } from 'react-bootstrap';

const Dashboard = () => {
    const { user } = useContext(UserContext)
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.index()
                setUsers(fetchedUsers)
            } catch (err) {
                console.log(err)
            }
        }
        if (user) fetchUsers()
    }, [user])

    return (
        <Container className='mt-4'>
            <h2 className='mb-4'>Dashboard</h2>
            <Row className='g-4'>
                {/* GRID 1: my most recent post */}
                <Col md={6}>
                    <Card className='h-100 shadow-sm border-0'>
                        <Card.Header className='bg-primary text-white'>My Latest Post:</Card.Header>
                        <Card.Body>

                        </Card.Body>
                    </Card>
                </Col>
                {/* GRID 2: recent activity (commented thread) */}
                <Col md={6}>
                    <Card className='h-100 shadow-sm border-0'>
                        <Card.Header className='bg-primary text-white'>Recent Conversation:</Card.Header>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                </Col>
                {/* GRID 3: friend's most recent post */}
                <Col md={6}>
                    <Card className='h-100 shadow-sm border-0'>
                        <Card.Header className='bg-primary text-white'>Friend Activity:</Card.Header>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                </Col>
                {/* GRID 4: friends list link */}
                <Col md={6}>
                    <Card className='h-100 shadow-sm border-0'>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default Dashboard
