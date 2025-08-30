import AppleIcon from '@mui/icons-material/Apple';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation('common');

  return ( 
    <Stack className={"footer-container"}>
      <Stack className={"main"}>
        <Stack className={"left"}>
          <Box component={"div"} className={"footer-box"}>
            <p className={"join-title"}>{t("joinTitle")}</p>
            <span>{t("joinSubtitle")}</span>
          </Box>

          <Box component={"div"} className={"footer-box"}>
            <p className={'mobile-title'}>{t("mobileApp")}</p>

            <Box className={"logo"}>
              <Box className={'icon'}>
                <AppleIcon />
                <Box>
                  <span>{t("apple.downloadOn")}</span>
                  <p>{t("apple.store")}</p>
                </Box>
              </Box>
            </Box>

            <Box className={"logo"}>
              <Box className={'icon'}>
                <SportsEsportsIcon/>
                <Box>
                  <span>{t("google.getItOn")}</span>
                  <p>{t("google.play")}</p>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box component={"div"} className={"footer-box"}>
            <p className={'mobile-title'}>{t("connect")}</p>
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
            <strong>{t("newsletter.title")}</strong>
            <div>
              <input type="text" placeholder={t("newsletter.placeholder")}/>
              <span>{t("newsletter.button")}</span>
            </div>
          </Box>

          <Box component={"div"} className={"bottom"}>
            <div>
              <strong>{t("company.title")}</strong>
              <span>{t("company.about")}</span>
              <span>{t("company.blog")}</span>
              <span>{t("company.services")}</span>
              <span>{t("company.faqs")}</span>
              <span>{t("company.terms")}</span>
              <span>{t("company.contact")}</span>
            </div>

            <div>
              <strong>{t("quick.title")}</strong>
              <span>{t("quick.touch")}</span>
              <span>{t("quick.privacy")}</span>
              <span>{t("quick.pricing")}</span>
              <span>{t("quick.help")}</span>
              <span>{t("quick.chat")}</span>
              <span>{t("quick.how")}</span>
            </div>

            <div>
              <strong>{t("brands.title")}</strong>
              <span>{t("brands.toyota")}</span>
              <span>{t("brands.porsche")}</span>
              <span>{t("brands.audi")}</span>
              <span>{t("brands.bmw")}</span>
              <span>{t("brands.ford")}</span>
              <span>{t("brands.nissan")}</span>
              <span>{t("brands.peugeot")}</span>
              <span>{t("brands.chevrolet")}</span>
            </div>

            <div>
              <strong>{t("vehicles.title")}</strong>
              <span>{t("vehicles.sedan")}</span>
              <span>{t("vehicles.hatchback")}</span>
              <span>{t("vehicles.suv")}</span>
              <span>{t("vehicles.hybrid")}</span>
              <span>{t("vehicles.electric")}</span>
              <span>{t("vehicles.coupe")}</span>
              <span>{t("vehicles.truck")}</span>
              <span>{t("vehicles.convertible")}</span>
            </div>

            <div>
              <strong>{t("sales.title")}</strong>
              <span>{t("sales.weekdays")}</span>
              <span>{t("sales.saturday")}</span>
              <span>{t("sales.sunday")}</span>
            </div>
          </Box>
        </Stack>
      </Stack>

      <Stack className={"second"}>
        <span>{t("copyright")}</span>
        <span>{t("termsPrivacy")}</span>
      </Stack>
    </Stack>
  )
}

export default Footer
