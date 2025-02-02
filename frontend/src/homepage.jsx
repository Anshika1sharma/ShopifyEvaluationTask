
import React from 'react';
import './homepage.css';

const Homepage = () => {
  const contentData = [
    {
      imgSrc: 'https://i.pinimg.com/736x/30/1f/6e/301f6ef8de61bfe7496af596ffa94d04.jpg',
    },
    {
      imgSrc: 'data:image/png;base64,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',
    
    },
    {
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8tJh8baFC1gh5YnepQPf4qyX2pd9syA9zA&s',
    },
    {
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-goTXWBfTkS0m5mosUh8YIAZH0bbKhjf_ow&s',
    },
    {
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWvL7G0qvqqFsSYKv4gpAgsSQiu9xlKJmPFg&s',
    },
    {
      imgSrc: 'https://dev.powerslides.com/wp-content/uploads/2021/01/Customer-Lifetime-Value-Template-1.jpg',
    },
  ];

  return (
    <div>
      <header className="header">
        <nav>
          <ul className="nav-list">
            <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="#contact" className="nav-link">Contact Us</a></li>
            <li className="nav-item"><a href="/aboutus" className="nav-link">About Us</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>Shopify Insights Dashboard</h1>
          <p>Unlock the full potential of your Shopify store’s data with our advanced data visualization web application. This dashboard provides comprehensive insights into your e-commerce performance, helping you make data-driven decisions.</p>
          <a href="/viewAnalytics" className="hero-button">View Analytics</a>
        </div>
      </section>

      <section className="content">
        {contentData.map((item, index) => (
          <div key={index} className="content-item">
            <img src={item.imgSrc} alt={`Section ${index + 1}`} className="image" />
            </div>
        )
    )}; 
      </section>

      <footer className="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage; 