import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Container,
  Dropdown,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import AIPromptForm from '../components/resumeWorkshop/AIPromptForm';

const ResumeWorkshopPage = () => {
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = ({ goal, content }) => {
    setLoading(true);

    console.log(goal, content);

    // placeholder mock response
    setTimeout(() => {
      setAiResponse(
        `Hello **Aidan**

### Suggestions

• Use stronger action verbs  
• Add measurable results  
• Reduce filler wording

Example rewrite:

> Developed an internal inventory dashboard used by 5+ departments, improving tracking efficiency by 30%.
height test

height test

height test

height test

height test

height test

height test

height test

# height test

# height test

# height test

# height test

# height test

# height test

# height test

# height test

# height test

# height test

# height test

# height test

# height test

# height test

# height test

# height test

# height test

# height test
`,
      );
      setLoading(false);
    }, 800);
  };

  return (
    <Container
      fluid="sm"
      className="mt-3">
      <Row className="text-start align-bottom d-flex align-items-end my-1 py-1">
        <Col>
          <h2 className="m-0">Resume Workshop</h2>
        </Col>

        <Col className="d-flex justify-content-end align-items-center pe-0">
          <OverlayTrigger
            placement="left"
            delay={{ show: 100, hide: 200 }} // Show/hide delay
            overlay={
              <Tooltip id="button-tooltip">
                Choose an application as context for the AI to tailor your resume.
              </Tooltip>
            }
            trigger={['hover', 'focus']}>
            <Badge
              pill
              bg="secondary"
              className="mt-2">
              ?
            </Badge>
          </OverlayTrigger>

          <Dropdown
            align="end"
            className="ms-2 mt-2">
            <Dropdown.Toggle as={Button}>
              <FontAwesomeIcon
                className="me-1"
                icon={faPen}
              />
              Select an application...
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ padding: '0.5rem', width: 'max-content' }}>
              Options
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <AIPromptForm
            handleGenerate={handleGenerate}
            loading={loading}
          />
        </Col>

        <Col
          md={6}
          className="border rounded p-3 overflow-auto bg-light"
          style={{ maxHeight: '80vh' }}>
          {!aiResponse && !loading && (
            <p className="text-muted">
              Paste a section of your resume and describe what you'd like to improve. Suggestions
              will appear here.
            </p>
          )}

          {loading && <p className="text-muted">Generating suggestions...</p>}

          {aiResponse && !loading && <ReactMarkdown>{aiResponse}</ReactMarkdown>}
        </Col>
      </Row>
    </Container>
  );
};

export default ResumeWorkshopPage;
