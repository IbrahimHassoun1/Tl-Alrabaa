import React from 'react'

const Features = () => {
  return (
    <div className='bg-tertiary min-h-screen flex justify-center align-middle'>
      <ul className='text-3xl m-auto text-start text-primary flex flex-col gap-4'>
        <li><span className='font-extrabold text-secondary'>Login System</span> – Allows users to create an account and log in securely.</li>
        <li><span className='font-extrabold text-secondary'>Authentication Feature</span>  – Ensures only authorized users can access certain parts of the site (JWT based).</li>
        <li><span className='font-extrabold text-secondary'>Cart Feature</span> – Lets users add, remove, and manage items before checkout.</li>
        <li><span className='font-extrabold text-secondary'>Full CRUD Control for Manager</span> – The manager can Create, Read, Update, and Delete products, orders, and user data.</li>
        <li><span className='font-extrabold text-secondary'>Online Ordering System</span> – Users can browse items, add them to their cart, and complete purchases.</li>
        <li><span className='font-extrabold text-secondary'>Search & Filtering</span> – Users can search for tobacco, shisha, and parts by name.</li>
        <li><span className='font-extrabold text-secondary'>Image Upload & Management</span>– Allows adding/editing product images, with automatic removal of old images.</li>
      </ul>
    </div>
  )
}

export default Features
