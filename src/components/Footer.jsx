const Footer = () => {
  const getYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {getYear} George Hatzi</p>
    </footer>
  );
};

export default Footer;
