import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  const siteName = "SpotHotel";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      <title>{fullTitle}</title>

      {description && (
        <meta name="description" content={description} />
      )}

      {keywords && (
        <meta name="keywords" content={keywords} />
      )}
    </Helmet>
  );
};

export default Meta;
