import React from 'react';
import CallToAction from './CallToAction';

const Specials = () => {
  const specialItems = [
    {
      title: "Greek salad",
      price: "$12.99",
      description: "Fresh Greek salad with feta cheese...",
    },
    {
      title: "Bruschetta",
      price: "$10.99",
      description: "Classic Italian appetizer...",
    },
    {
      title: "Lemon Dessert",
      price: "$8.99",
      description: "Sweet and tangy lemon dessert...",
    }
  ];

  return (
    <section className="specials">
      <div className="section-header">
        <h2>Specials</h2>
        <CallToAction text="Online Menu" link="/menu" />
      </div>
      <div className="specials-grid">
        {specialItems.map((item, index) => (
          <div key={index} className="special-card">
            <h3>{item.title}</h3>
            <p className="price">{item.price}</p>
            <p>{item.description}</p>
            <CallToAction text="Order a delivery" link="/order" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Specials;
