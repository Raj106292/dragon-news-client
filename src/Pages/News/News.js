import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const News = () => {

    const news = useLoaderData();
    const { category_id, author, details, title, image_url } = news;

    return (
        <div>
            <Card>
                <Card.Img variant="top" src={image_url} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <div>
                        <p>Author Name: {author.name}</p>
                        <p>Published Date: {author.published_date}</p>
                    </div>
                    <Card.Text>
                        {details}
                    </Card.Text>
                    <Link to={`/category/${category_id}`}>
                        <Button variant="primary">Go to the news category</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default News;