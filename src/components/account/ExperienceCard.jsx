import { Alert, Button, Card, Col, Row, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTools } from '@fortawesome/free-solid-svg-icons';
import useApi from '../../hooks/useApi';
import {
  addExperience,
  deleteExperience,
  getExperience,
  updateExperience,
} from '../../api/userApi';
import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '../../utils/errorUtils';
import ExperienceModal from './ExperienceModal';
import { getCompanies } from '../../api/rateMyCoopApi';
import JobExperience from './JobExperience';

const deleteMappings = {
  EXPERIENCE_NOT_FOUND: "We couldn't find that experience, try refreshing and trying again.",
  EXPERIENCE_NOT_OWN:
    "We couldn't delete that experience, please try logging out and logging back in.",
};

const ExperienceCard = () => {
  const { error: experienceError, data, request: loadExperienceCallback } = useApi(getExperience);
  const { loading: isDeleteLoading, request: deleteExperienceCallback } = useApi(deleteExperience);
  const {
    error: companiesError,
    data: companiesData,
    request: getCompaniesCallback,
  } = useApi(getCompanies);
  const companies = companiesData?.companies;

  const [showModal, setShowModal] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState({});
  const [deleteError, setDeleteError] = useState('');

  const loadExperiences = useCallback(async () => {
    try {
      await loadExperienceCallback();
    } catch (error) {
      console.log('Failed to load user experiences, is the server down?', getErrorMessage(error));
    }
  }, [loadExperienceCallback]);

  const onCreateClick = () => {
    onEditClick();
  };

  const onEditClick = (experience) => {
    setExperienceToEdit({
      ...experience,
      company: companies?.find((c) => c.companyId === experience?.companyId),
    });
    setShowModal(true);
  };

  const handleDeleteExperience = async (experience) => {
    try {
      await deleteExperienceCallback({ experienceId: experience.experienceId });
    } catch (error) {
      const message = getErrorMessage(error, deleteMappings);
      setDeleteError(message);
    }
    loadExperiences();
  };

  const handleModalSubmit = async (experience) => {
    if (experience.experienceId) {
      await updateExperience(experience);
    } else {
      await addExperience(experience);
    }
    setShowModal(false);
    loadExperiences();
  };

  useEffect(() => {
    const callback = async () => {
      try {
        await getCompaniesCallback();
      } catch (error) {
        console.log('Failed to load company list, is the server down?', getErrorMessage(error));
      }
    };
    callback();
  }, [getCompaniesCallback]);

  useEffect(() => {
    loadExperiences();
  }, [loadExperiences]);

  return (
    <Card className="shadow-sm border-0">
      <ExperienceModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        companies={companies}
        defaultValues={experienceToEdit}
        submitCallback={handleModalSubmit}
        key={!showModal || experienceToEdit?.experienceId || 'new'}
      />
      <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 px-4">
        <h4 className="mb-0">
          <FontAwesomeIcon
            icon={faTools}
            className="me-2 text-primary"
          />
          Manage my experiences
        </h4>
      </Card.Header>
      <Card.Body className="p-4">
        {(companiesError || experienceError) && (
          <Alert variant="danger">
            We're having some troubles loading your data right now, please try again later.
          </Alert>
        )}

        {deleteError && <Alert variant="danger">{deleteError}</Alert>}

        {data ? (
          <>
            {data?.experience?.map((experience) => {
              return (
                <JobExperience
                  key={experience.experienceId}
                  experience={experience}
                  companies={companies}
                  isLoading={isDeleteLoading}
                  onDeleteClick={() => {
                    handleDeleteExperience(experience);
                  }}
                  onEditClick={() => {
                    onEditClick(experience);
                  }}
                />
              );
            })}
          </>
        ) : (
          <>{!companiesError && !experienceError && <Spinner />}</>
        )}

        <Row>
          <Col>
            {data?.experience?.length >= 10 ? (
              <div className="text-muted font-italic pt-3">
                If you wish to add more new experiences, you'll have to delete some older ones
                first.
              </div>
            ) : (
              <Button
                onClick={onCreateClick}
                className="mt-3">
                <FontAwesomeIcon icon={faPlus} />
                Add new experience
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ExperienceCard;
