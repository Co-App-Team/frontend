import { Container, Row, Col, Card } from 'react-bootstrap';
import '../../styles/theme.scss';
const CompanyCard = () => {
  return (
    <>
      <Card className="p-0">
        <Card.Text>
          <span className="companyAccentCardColour"></span>
          Hi
        </Card.Text>
      </Card>
    </>
  );
};

export default CompanyCard;
