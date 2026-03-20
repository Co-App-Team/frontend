import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AIPromptForm = ({ loading, handleGenerate }) => {
  const [goal, setGoal] = useState('');
  const [content, setContent] = useState('');

  return (
    <Form>
      <Form.Group className="mb-3 text-start">
        <Form.Label>What do you want help with?</Form.Label>

        <Form.Control
          type="text"
          placeholder="Example: Improve wording, add metrics, make this more concise..."
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </Form.Group>

      <div className="mb-3">
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() => setGoal('Improve wording')}>
          Improve wording
        </Button>

        <Button
          size="sm"
          variant="outline-secondary"
          className="ms-2"
          onClick={() => setGoal('Add measurable achievements')}>
          Add metrics
        </Button>

        <Button
          size="sm"
          variant="outline-secondary"
          className="ms-2"
          onClick={() => setGoal('Make this more concise')}>
          Make concise
        </Button>
      </div>

      <Form.Group className="text-start">
        <Form.Label>Paste your resume content</Form.Label>

        <Form.Control
          as="textarea"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste a section of your resume or describe what you'd like improved..."
          style={{ resize: 'none' }}
        />
      </Form.Group>

      <Button
        className="m-3"
        disabled={loading || !content}
        onClick={() => handleGenerate({ goal, content })}>
        {loading ? 'Generating...' : 'Generate Feedback'}
      </Button>
    </Form>
  );
};

export default AIPromptForm;
