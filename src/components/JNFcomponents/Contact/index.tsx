import React from 'react'
import '../index.scss'

function ContactPage() {
  // Define contact information for three people
  const contacts = [
    {
      name: 'Dr. Somesh Sharma',
      desc: 'Faculty Incharge (Training & Placement)',
      phoneNumber: '01972-254591',
      email: 'tpo@nith.ac.in',
    },
    {
      name: 'Rahul Verma',
      desc: 'Training and Placement Office',
      phoneNumber: '111-1111-111',
      email: 'rahulverma@example.com',
    },
    {
      name: 'Ronak Lamba [Student Contact]',
      desc: 'Head of Training & Placement Representatives',
      phoneNumber: '99290-36622',
      email: 'ronakLamba@example.com',
    },
  ]

  return (
    <div className="contact-page">
      <h2 className="title">POINT OF CONTACT</h2>
      <div className="contact-list">
        {contacts.map((contact) => (
          <div className="contact" key={contact.email}>
            <h3 className="contact_name">{contact.name}</h3>
            <p className="contact_desc">{contact.desc}</p>
            <p className="contact_phone">Phone: {contact.phoneNumber}</p>
            <p className="contact_email">Email: {contact.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContactPage
