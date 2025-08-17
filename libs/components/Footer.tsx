import AppleIcon from '@mui/icons-material/Apple';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Stack } from '@mui/material';

const Footer = () => {
  return ( 
    <Stack className={"footer-container"}>
      <Stack className={"main"}>
        <Stack className={"left"}>
          <Box component={"div"} className={"footer-box"}>
            <p className={"join-title"}>Join AxisAuto</p>
            <span>Receive pricing updates, shopping tips & more!</span>
          </Box>
          <Box component={"div"} className={"footer-box"}>
            <p className={'mobile-title'}>Our Mobile App</p>
            <Box className={"logo"}>
              <Box className={'icon'}>
                <AppleIcon />
                <Box>
                  <span>Download on the</span>
                  <p>Apple Store</p>
                </Box>
              </Box>
            </Box>

            <Box className={"logo"}>
              <Box className={'icon'}>
                < SportsEsportsIcon/>
                <Box>
                  <span>Get it on</span>
                  <p>Google Play</p>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box component={"div"} className={"footer-box"}>
            <p className={'mobile-title'}>Connect With Us</p>
            <div className={"media-box"}>
              <FacebookOutlinedIcon />
              <TelegramIcon />
              <InstagramIcon />
              <TwitterIcon />
            </div>
          </Box>
        </Stack>
        <Stack className={"right"}>
          <Box component={"div"} className={"top"}>
            <strong>keep yourself up to date</strong>
            <div>
              <input type="text" placeholder={"Your Email Address"}/>
              <span>Sign Up</span>
            </div>
          </Box>
          <Box component={"div"} className={"bottom"}>
            <div>
              <strong>Company</strong>
              <span>About us</span>
              <span>Blog</span>
              <span>Services</span>
              <span>FAQs</span>
              <span>Terms</span>
              <span>Contact us</span>
            </div>
            <div>
              <strong>Quick Links</strong>
              <span>Get in Touch</span>
              <span>Privacy Policy</span>
              <span>Pricing Plans</span>
              <span>Help center</span>
              <span>Live chat</span>
              <span>How it works</span>
            </div>
            <div>
              <strong>Our Brands</strong>
              <span>Toyota</span>
              <span>Porsche</span>
              <span>Audi</span>
              <span>BMW</span>
              <span>Ford</span>
              <span>Nissan</span>
              <span>Peugeot</span>
              <span>Chevrolet</span>
            </div>
            <div>
              <strong>Vehicles Type</strong>
              <span>Sedan</span>
              <span>Hatchback</span>
              <span>SUV</span>
              <span>Hybrid</span>
              <span>Electric</span>
              <span>Coupe</span>
              <span>Truck</span>
              <span>Convertible</span>
            </div>
            <div>
              <strong>Sales Hours</strong>
              <span>Monday - Friday: 09:00 AM - 09:00 PM</span>
              <span>Saturday: 09:00AM - 07:00PM</span>
              <span>Sunday: Closed</span>
            </div>
          </Box>
        </Stack>
      </Stack>
      <Stack className={"second"}>
        <span>© AxisAuto - All rights reserved. AxisAuto 2025 </span>
        <span>Terms & Conditions  ·  Privacy Notice</span>
      </Stack>
    </Stack>
  )
}

export default Footer