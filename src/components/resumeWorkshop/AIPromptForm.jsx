import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AIPromptForm = ({ loading, onSubmit, validatePrompt }) => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ goal: '', content: '' });

  const handleSubmit = () => {
    if (onSubmit(formData)) {
      setFormData({ goal: '', content: '' });
    }
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setError(validatePrompt(newFormData));
  };

  return (
    <Form>
      <Form.Group className="mb-3 text-start">
        <Form.Label>What do you want help with?</Form.Label>

        <Form.Control
          name="goal"
          type="text"
          placeholder="Example: Improve wording, add metrics, make this more concise..."
          value={formData?.goal}
          onChange={handleUpdate}
        />
      </Form.Group>

      <div className="mb-3">
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() => setFormData({ ...formData, goal: 'Improve wording' })}>
          Improve wording
        </Button>

        <Button
          size="sm"
          variant="outline-secondary"
          className="ms-2"
          onClick={() => setFormData({ ...formData, goal: 'Add measurable achievements' })}>
          Add metrics
        </Button>

        <Button
          size="sm"
          variant="outline-secondary"
          className="ms-2"
          onClick={() => setFormData({ ...formData, goal: 'Make this more concise' })}>
          Make concise
        </Button>
      </div>

      <Form.Group className="text-start">
        <Form.Label>Paste your resume content</Form.Label>

        <Form.Control
          name="content"
          as="textarea"
          rows={10}
          value={formData?.content}
          onChange={handleUpdate}
          placeholder="Paste a section of your resume or describe what you'd like improved..."
          style={{ resize: 'none' }}
          isInvalid={error}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>

      <Button
        className="m-3"
        disabled={loading || !formData?.content}
        onClick={handleSubmit}>
        {loading ? 'Generating...' : 'Generate Feedback'}
      </Button>
    </Form>
  );
};

export default AIPromptForm;
