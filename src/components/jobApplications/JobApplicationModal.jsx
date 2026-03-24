import { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import styles from '../styling/jobApplications/JobApplications.module.css';
import useApi from '../../hooks/useApi';
import { addApplication, editApplication } from '../../api/jobApplicationsApi';
import { getErrorMessage } from '../../utils/errorUtils';
import JobApplicationForm from './JobApplicationForm';
import AddCompanyModal from '../rateMyCoop/AddCompanyModal';

function JobApplicationModal({ show, onHide, companies, data, onSaved }) {
  const oldCompany = data ? companies.find((c) => c.companyId === data.companyId) : null;

  const [error, setError] = useState(false);
  const [isCreatingCompany, setIsCreatingCompany] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const errorMappings = {
    DUPLICATE_APPLICATION:
      'A job application with the same job title for the same company already exists. Please try again!',
    BAD_REQUEST:
      'Please ensure all of the mandatory fields (job title, company name, and deadline date) are filled in.',
    COMPANY_NOT_FOUND: 'The provided company name does not exist. Please try again!',
  };

  const { request: addJobApplicationCallback, loading: isAddLoading } = useApi(addApplication);
  const { request: editJobApplicationCallback, loading: isEditLoading } = useApi(editApplication);

  const submit = async (formData) => {
    try {
      if (data) {
        let finalFormData = {
          ...formData,
          companyId: formData.company?.companyId,
          applicationId: data.applicationId,
          dateCreated: today,
        };
        if (!formData.sourceLink) {
          finalFormData.sourceLink = null;
        }

        await editJobApplicationCallback(finalFormData, finalFormData.applicationId);
        await onSaved();
        handleHide();
      } else {
        await addJobApplicationCallback({ ...formData, companyId: formData.company?.companyId });
        handleHide();
      }
    } catch (error) {
      const message = getErrorMessage(error, errorMappings);
      setError(message);
    }
  };

  const handleHide = () => {
    setError(false);
    onHide();
  };

  const onCompanyCreate = (inputValue) => {
    setNewCompanyName(inputValue);
    setIsCreatingCompany(true);
  };

  return (
    <>
      <AddCompanyModal
        showModal={isCreatingCompany && show}
        hideModal={() => {
          setIsCreatingCompany(false);
        }}
        refreshCompanies={() => {}} // TODO
        defaultValues={{ companyName: newCompanyName, location: '', website: '' }}
        key={newCompanyName}
      />
      <Modal
        show={show && !isCreatingCompany}
        onHide={handleHide}
        centered>
        <Modal.Header closeButton>
          {data != null ? (
            <Modal.Title className={styles['black-text']}>Edit Job Application</Modal.Title>
          ) : (
            <Modal.Title className={styles['black-text']}>New Job Application</Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body>
          <JobApplicationForm
            id="job-application-form"
            onSubmitCallback={submit}
            isLoading={isAddLoading || isEditLoading}
            companies={companies}
            onCompanyCreate={onCompanyCreate}
            oldCompany={oldCompany}
            data={data}
          />
          {error && <span className="text-danger mt-3">{error}</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="info"
            onClick={handleHide}
            disabled={isAddLoading || isEditLoading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="job-application-form"
            disabled={isAddLoading || isEditLoading}>
            {(isAddLoading || isEditLoading) && <Spinner size="sm" />} Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default JobApplicationModal;
