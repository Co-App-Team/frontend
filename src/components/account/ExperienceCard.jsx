import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTools } from '@fortawesome/free-solid-svg-icons';
import useApi from '../../hooks/useApi';
import { getExperience } from '../../api/userApi';
import { useEffect } from 'react';
import { getErrorMessage } from '../../utils/errorUtils';

const ExperienceCard = () => {
  const { data, request: loadExperienceCallback } = useApi(getExperience);

  useEffect(() => {
    const request = async () => {
      try {
        await loadExperienceCallback();
      } catch (error) {
        const message = getErrorMessage(error);
        console.log('BOnk ', message);
      }
    };
    request();
  }, [loadExperienceCallback]);

  const onCreate = () => {
    console.log('Implement me');
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 px-4">
        <h5 className="mb-0">
          <FontAwesomeIcon
            icon={faTools}
            className="me-2 text-primary"
          />
          Manage my experiences
        </h5>
      </Card.Header>
      <Card.Body className="p-4">
        {data?.experience &&
          data.experience.map((experience) => {
            return (
              <>
                <div className="d-flex ">
                  <h4 className="m-0">{experience.companyId}</h4>
                  {/* TODO: This overflows horizontally on small screens */}
                  <h4 className="text-muted ps-2 m-0">- {experience.roleTitle}</h4>
                </div>
                <div className="text-start">{experience.roleDescription}</div>
                <div className="text-start text-muted">
                  {/* TODO: End date optional */}
                  {experience.startDate} to {experience.endDate}
                </div>
              </>
            );
          })}

        <div>
          <Button onClick={onCreate}>
            <FontAwesomeIcon icon={faPlus} />
            Add new entry
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ExperienceCard;
