import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import Home from "@/pages/Home";
import HotelDetails from "@/pages/HotelDetails";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsConditions from "@/pages/TermsConditions";

export default [
    { index: true, Component: Home },
    { path: "hotels/:id", Component: HotelDetails },
    { path: "about", Component: AboutUs },
    { path: "contact", Component: ContactUs },
    { path: "terms-conditions", Component: TermsConditions },
    { path: "privacy-policy", Component: PrivacyPolicy },
];