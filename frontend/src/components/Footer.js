const Footer = () =>{
  const year = new Date().getFullYear();

  return(
    <footer className="p-2 bg-green-500">
      <p className="text-white text-center my-3">Copyright {year} &copy;  All rights reserved</p>
    </footer>
  )
 }
 
 export default Footer;