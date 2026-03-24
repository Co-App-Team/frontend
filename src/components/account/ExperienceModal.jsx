import { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import useApi from '../../hooks/useApi';
import { getErrorMessage } from '../../utils/errorUtils';
import ExperienceForm from './ExperienceForm';
import AddCompanyModal from '../rateMyCoop/AddCompanyModal';

const errorMappings = {
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Please resolve any errors in the form.',
  COMPANY_NOT_FOUND: "We couldn't find the company you picked. Try refreshing and trying again.",
};

const ExperienceModal = ({
  show,
  onHide,
  defaultValues,
  companies,
  submitCallback,
  refreshCompaniesCallback,
}) => {
  const [requestError, setRequestError] = useState('');

  const [isCreatingCompany, setIsCreatingCompany] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');

  const { loading: isLoading, request: onSubmitCallback } = useApi(submitCallback);

  const onSubmit = async (formData) => {
    try {
      await onSubmitCallback({
        experienceId: formData?.experienceId,
        companyId: formData?.company?.companyId,
        roleTitle: formData?.roleTitle,
        roleDescription: formData?.roleDescription,
        startDate: formData?.startDate,
        endDate: formData?.endDate,
      });
      return true;
    } catch (requestError) {
      const message = getErrorMessage(requestError, errorMappings);
      setRequestError(message);
      return false;
    }
  };

  const handleCancel = () => {
    setRequestError('');
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
        refreshCompanies={refreshCompaniesCallback}
        defaultValues={{ companyName: newCompanyName, location: '', website: '' }}
        key={newCompanyName}
      />
      <Modal
        show={show && !isCreatingCompany}
        onHide={onHide}
        centered>
        <Modal.Header closeButton>
          {defaultValues != null ? (
            <Modal.Title className="text-black">Edit experience</Modal.Title>
          ) : (
            <Modal.Title className="text-black">New experience</Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body>
          <ExperienceForm
            id="experience-form"
            defaultValues={defaultValues}
            companies={companies}
            isLoading={isLoading}
            onCompanyCreate={onCompanyCreate}
            submitCallback={onSubmit}
            onSubmitSuccess={() => {
              onHide();
            }}
          />
          {requestError && <span className="text-danger mt-3">{requestError}</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="info"
            onClick={handleCancel}
            disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            form="experience-form">
            {isLoading && <Spinner size="sm" />} Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExperienceModal;
