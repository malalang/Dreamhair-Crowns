const MapEmbed = () => (
  <div className="w-full h-96 rounded-lg overflow-hidden mt-8">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115133.00762923506!2d29.08721995820312!3d-26.49504799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee8376997412705%3A0x6734187216a57502!2sEvander%2C%202280!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-lg"
    />
  </div>
);

export default MapEmbed;