function MenteeCard(props) {
  return (
    <div class="grid-item">
      <img src={props.img} alt={props.name} class="contact-image" />
      <div class="contact-details">
        <h2>{props.name}</h2>
        <p>Email: {props.email}</p>
        <p>Phone: {props.num}</p>
      </div>
    </div>
  );
}

export default MenteeCard;
