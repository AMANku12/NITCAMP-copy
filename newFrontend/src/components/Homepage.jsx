import React from 'react'
import nitImage from '../assets/nitc.webp'
import "../styles/Homepage.css" // Assuming you have a CSS file for styling the Homepage

const Homepage = () => {
  return (
    <div className="homepage">
      <img src={nitImage} alt="Description of image" className='main-img'/>

      <div className="about1">
        <h4 className="about-heading">What is this program about?</h4>
        <p className="about-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque pariatur eveniet impedit ex, ducimus quis recusandae dolores saepe minima eius necessitatibus officia unde fugiat velit sed ratione earum veritatis amet voluptate sint nisi fuga minus veniam. Dolore impedit quis natus, nesciunt eos molestiae architecto. Voluptatem et minus inventore repellat alias.</p>
      </div>

      <div className="about2">
        <h4 className="about-heading">Who is it for?</h4>
        <p className="about-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque pariatur eveniet impedit ex, ducimus quis recusandae dolores saepe minima eius necessitatibus officia unde fugiat velit sed ratione earum veritatis amet voluptate sint nisi fuga minus veniam. Dolore impedit quis natus, nesciunt eos molestiae architecto. Voluptatem et minus inventore repellat alias.</p>
      </div>

      <div className="about3">
        <h4 className="about-heading">Who are mentors?</h4>
        <p className="about-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque pariatur eveniet impedit ex, ducimus quis recusandae dolores saepe minima eius necessitatibus officia unde fugiat velit</p>

        <h4 className="about-heading">Who are mentees?</h4>
        <p className="about-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae maiores magni vel in ea non sunt, voluptates aspernatur quidem nisi modi dicta iste repudiandae cupiditate laboriosam cum porro, reprehenderit odio.</p>
      </div>

      <div className="about4">
        <h4 className="about-heading">What will you get as a mentee?</h4>
        <p className="about-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam nihil autem quia tenetur possimus natus consequuntur consequatur expedita id perferendis optio sequi nostrum, iure, sunt aspernatur modi, nobis doloremque molestiae?</p>

        <h4 className="about-heading">What will you get as a mentor?</h4>
        <p className="about-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quasi quos expedita suscipit ex quod perferendis, ea atque non earum autem in mollitia quia repellendus architecto facere nostrum animi ratione?</p>
      </div>

      <div className="about5">
        <h4 className="about-heading">How do I get started?</h4>
        <ul className="steps-list">
          <li className="step-item">
            Step1: Sign in with Google:-
            <button className="signin-button">Sign in</button>
          </li>
          <li className="step-item">Step2: Fill out your profile information</li>
          <li className="step-item">Step3: Then leave the rest to us we will connect you to your mentor or mentee</li>
        </ul>
      </div>
    </div>
  )
}

export default Homepage
