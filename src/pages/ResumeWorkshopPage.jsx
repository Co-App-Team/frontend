import {
  Badge,
  Col,
  Container,
  OverlayTrigger,
  Placeholder,
  Row,
  Spinner,
  Tooltip,
} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import AIPromptForm from '../components/resumeWorkshop/AIPromptForm';
import useApi from '../hooks/useApi';
import { getQuota, sendPrompt } from '../api/resumeWorkshopApi';
import { getErrorMessage } from '../utils/errorUtils';
import { getApplications } from '../api/jobApplicationsApi';
import { useEffect, useState } from 'react';
import { ReactSelectBootstrap } from 'react-select-bootstrap';

const promptErrorMappings = {
  OVER_LIMIT_CHATBOT_REQUEST:
    'You have hit your chatbot quota for this month. Please wait for it to renew before sending more prompts.',
};

const ResumeWorkshopPage = () => {
  const { data: promptResponse, loading, request: sendPromptCallback } = useApi(sendPrompt);
  const {
    data: applicationsResponse,
    request: getApplicationsCallback,
    error: applicationsError,
  } = useApi(getApplications);
  const { data: quotaResponse, error: quotaError, request: getQuotaCallback } = useApi(getQuota);

  const aiResponse = promptResponse?.response;
  const applications = applicationsResponse?.applications;
  const userQuota = quotaResponse?.remainingQuota;

  const [promptError, setPromptError] = useState('');
  const [selectedApplication, setSelectedApplication] = useState({});

  const generatePrompt = ({ goal, content }) => {
    const objective = goal?.trim() || 'General professional polish and impact.';
    return `
---
### USER-SPECIFIED PARAMETERS
**Primary Objective:** ${objective}

### RESUME CONTENT TO REVIEW
${content}

### FINAL INSTRUCTION
Please ensure that "Section 1: Key Feedback" and "Section 2: Improved Version" specifically prioritize the **Primary Objective** and **Student's Specific Focus** listed above.
---
`;
  };

  const validateUserPrompt = ({ goal, content }) => {
    if (generatePrompt({ goal, content }).length > 5000) {
      return (
        'Prompt exceeds limit by ' +
        (generatePrompt({ goal, content }).length - 5000) +
        ' characters'
      );
    } else {
      return '';
    }
  };

  const handleSendPrompt = async ({ goal, content }) => {
    const userPrompt = generatePrompt({ goal, content });

    try {
      await sendPromptCallback({ userPrompt, applicationId: selectedApplication?.applicationId });
      return true;
    } catch (error) {
      const message = getErrorMessage(error, promptErrorMappings);
      setPromptError(message);
      return false;
    }
  };

  useEffect(() => {
    const request = async () => {
      try {
        await getApplicationsCallback({
          status: 'NOT_APPLIED,APPLIED,INTERVIEW_SCHEDULED,INTERVIEWING,OFFER_RECEIVED',
        });
      } catch (error) {
        console.log('Failed to load applications. Is the server down?', error);
      }

      try {
        await getQuotaCallback();
      } catch (error) {
        console.log('Failed to load user quota. Is the server down?', error);
      }
    };
    request();
  }, [getApplicationsCallback]);

  const onApplicationChange = (e) => {
    setSelectedApplication(e.value);
  };

  const getQuotaBackgroundColour = () => {
    if (quotaError) {
      return 'danger';
    } else if (userQuota == null) {
      return 'info';
    } else if (userQuota > 5) {
      return 'secondary';
    } else {
      return 'danger';
    }
  };

  const quotaBadge = () => {
    return (
      <>
        You have
        {userQuota == null ? (
          <>
            {' '}
            <Placeholder xs={1} />{' '}
          </>
        ) : (
          <>{' ' + userQuota + ' '}</>
        )}
        prompts left
      </>
    );
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

          <ReactSelectBootstrap
            isLoading={!applications}
            options={
              applicationsError
                ? null
                : applications?.map((application) => {
                    return { value: application, label: application.jobTitle };
                  })
            }
            className="ms-2 mt-2"
            onChange={onApplicationChange}
            value={
              selectedApplication?.applicationId
                ? { value: selectedApplication, label: selectedApplication.jobTitle }
                : null
            }
            isDisabled={applicationsError || loading}
            placeholder={
              applicationsError
                ? 'Error loading applications try again'
                : 'Select an application...'
            }
            isInvalid={applicationsError}
          />
        </Col>
      </Row>

      <Row>
        <div className="text-end">
          <Badge bg={getQuotaBackgroundColour()}>
            {quotaError ? <>Error loading your prompt quota</> : <>{quotaBadge()}</>}
          </Badge>
        </div>
      </Row>

      <Row className="mt-1">
        <Col md={6}>
          <AIPromptForm
            onSubmit={handleSendPrompt}
            loading={loading}
            validatePrompt={validateUserPrompt}
            promptError={promptError}
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

          {loading && (
            <>
              <p className="text-muted">Generating suggestions...</p>
              <Spinner />
            </>
          )}

          {aiResponse && !loading && (
            <div className="text-start">
              <ReactMarkdown>{aiResponse}</ReactMarkdown>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ResumeWorkshopPage;
