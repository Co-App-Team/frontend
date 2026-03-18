import { Button, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus, faTools, faTrash } from '@fortawesome/free-solid-svg-icons';
import useApi from '../../hooks/useApi';
import {
  addExperience,
  deleteExperience,
  getExperience,
  updateExperience,
} from '../../api/userApi';
import { useEffect, useState } from 'react';
import { getErrorMessage } from '../../utils/errorUtils';
import ExperienceModal from './ExperienceModal';
import { getCompanies } from '../../api/rateMyCoopApi';

const ExperienceCard = () => {
  const { data, request: loadExperienceCallback } = useApi(getExperience);
  const { request: deleteExperienceCallback } = useApi(deleteExperience);

  const { data: companiesData, request: getCompaniesCallback } = useApi(getCompanies);
  const companies = companiesData?.companies;

  useEffect(() => {
    const callback = async () => {
      try {
        await getCompaniesCallback();
      } catch (error) {
        const message = getErrorMessage(error);
        // TODO: Display error
        console.log('Bonk:', message);
      }
    };
    callback();
  }, [getCompaniesCallback]);

  const [showModal, setShowModal] = useState(false);

  const [experienceToEdit, setExperienceToEdit] = useState({});

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

  const onEditClick = (experience) => {
    setExperienceToEdit({
      ...experience,
      company: companies?.find((c) => c.companyId === experience.companyId),
    });
    setShowModal(true);
  };

  const handleDeleteExperience = async (experience) => {
    console.log('Deleting', JSON.stringify(experience));
    try {
      await deleteExperienceCallback({ experienceId: experience.experienceId });

      await loadExperienceCallback();
    } catch (error) {
      const message = getErrorMessage(error);
      console.log(message, 'bonk'); // TODO
    }
  };

  const handleModalSubmit = async (experience) => {
    console.log('Handling: ' + JSON.stringify(experience));
    if (experience.experienceId) {
      await updateExperience(experience);
    } else {
      await addExperience(experience);
    }
    setShowModal(false);
    // TODO: Reload experiences
  };

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
      />
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
          data.experience.map((experience, index) => {
            return (
              <Row
                key={index}
                className="mb-3">
                <Col
                  xs={12}
                  md={8}
                  lg={9}>
                  <div className="text-start">
                    {/* TODO: Inefficient */}
                    <h4>
                      {
                        companies?.find((company) => company.companyId === experience.companyId)
                          .companyName
                      }
                    </h4>
                    <h5 className="text-muted">{experience.roleTitle}</h5>
                    <div>{experience.roleDescription}</div>
                    <div className="text-muted">
                      {experience.startDate} to{' '}
                      {experience.endDate ? experience.endDate : 'Present'}
                    </div>
                  </div>
                </Col>
                <Col
                  xs={12}
                  md={4}
                  lg={3}
                  className="d-flex justify-content-end align-items-center">
                  <div className="d-flex">
                    <Button
                      className="me-2 d-flex align-items-center"
                      onClick={() => onEditClick(experience)}>
                      Edit
                      <FontAwesomeIcon
                        icon={faPencil}
                        className="ms-2"
                      />
                    </Button>
                    <Button
                      variant="danger"
                      className="d-flex align-items-center"
                      onClick={() => handleDeleteExperience(experience)}>
                      Delete
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="ms-2"
                      />
                    </Button>
                  </div>
                </Col>
              </Row>
            );
          })}

        <Row>
          <Col>
            <Button
              onClick={onCreate}
              className="mt-3">
              <FontAwesomeIcon icon={faPlus} />
              Add new experience
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// TODO: Move into a component
// const ExperienceEditor = ({ experience, index }) => {
//   return (
//     <Row
//       key={index}
//       className="mb-3 text-start">
//       <Col
//         xs={12}
//         md={8}
//         lg={9}>
//         <Form>
//           <Form.Group
//             className="mb-2"
//             controlId={`company-${index}`}>
//             <Form.Label>Company</Form.Label>
//             <Form.Control
//               type="text"
//               defaultValue={experience.companyId}
//               placeholder="Enter company"
//             />
//           </Form.Group>

//           <Form.Group
//             className="mb-2"
//             controlId={`role-${index}`}>
//             <Form.Label>Role Title</Form.Label>
//             <Form.Control
//               type="text"
//               defaultValue={experience.roleTitle}
//               placeholder="Enter role title"
//             />
//           </Form.Group>

//           <Form.Group
//             className="mb-2"
//             controlId={`description-${index}`}>
//             <Form.Label>Role Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               defaultValue={experience.roleDescription}
//               placeholder="Enter role description"
//             />
//           </Form.Group>

//           <Row className="mb-2">
//             <Col xs={6}>
//               <Form.Group controlId={`startDate-${index}`}>
//                 <Form.Label>Start Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   defaultValue={experience.startDate}
//                 />
//               </Form.Group>
//             </Col>
//             <Col xs={6}>
//               <Form.Group controlId={`endDate-${index}`}>
//                 <Form.Label>End Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   defaultValue={experience.endDate || ''}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
//       </Col>

//       <Col
//         xs={12}
//         md={4}
//         lg={3}
//         className="d-flex justify-content-end align-items-center mt-2 mt-md-0">
//         <div className="">
//           <Button
//             className="me-2 d-flex align-items-center"
//             variant="success">
//             Save
//             <FontAwesomeIcon
//               icon={faSave}
//               className="ms-2"
//             />
//           </Button>
//           <Button
//             className="d-flex align-items-center"
//             variant="secondary">
//             Cancel
//             <FontAwesomeIcon
//               icon={faTimes}
//               className="ms-2"
//             />
//           </Button>
//         </div>
//       </Col>
//     </Row>
//   );
// };

export default ExperienceCard;
