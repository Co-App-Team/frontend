import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import useApi from '../hooks/useApi';
import { sendPrompt } from '../api/resumeWorkshopApi';
import { getErrorMessage } from '../utils/errorUtils';

const errorMappings = {};

const ResumeWorkshopPage = () => {
  const { data: aiResponse, loading, request: sendPromptCallback } = useApi(sendPrompt);

  const generatePrompt = ({ goal, content }) => {
    // TODO: Generate formatted prompt
    return '' + goal + content;
  };

  const handleSendPrompt = async ({ goal, content }) => {
    const userPrompt = generatePrompt({ goal, content });

    try {
      await sendPromptCallback({ userPrompt, applicationId: undefined });
      return true;
    } catch (error) {
      const message = getErrorMessage(error, errorMappings);
      console.log(message);
      return false;
    }
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

          {/* TODO: Dropdown options */}
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
            onSubmit={handleSendPrompt}
            loading={loading}
          />
        </Col>

        {/* TODO: Loading spinner? */}
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

          {aiResponse && !loading && <ReactMarkdown>{aiResponse?.response}</ReactMarkdown>}
        </Col>
      </Row>
    </Container>
  );
};

export default ResumeWorkshopPage;
