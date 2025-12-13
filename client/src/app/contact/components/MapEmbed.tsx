const MapEmbed = () => (
  <div className="w-full h-96 rounded-lg overflow-hidden mt-8">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14332.61331718817!2d28.0886617!3d-26.0945785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9572d2c14041d7%3A0x6b49e630800684f!2sMarlboro%20Gardens%2C%20Sandton%2C%202063!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza"
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