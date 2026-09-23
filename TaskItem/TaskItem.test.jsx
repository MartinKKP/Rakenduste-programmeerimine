import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskItem } from './TaskItem';

describe('TaskItem Component', () => {
  const sampleTask = { id: 101, title: 'Learn Component Testing', completed: false };

  it('renders the task title correctly', () => {
    render(<TaskItem task={sampleTask} onToggle={() => {}} />);
    
    // Assert that the task title appears in the document
    expect(screen.getByText('Learn Component Testing')).toBeInTheDocument();
  });

  it('calls the onToggle callback with the correct task ID when the button is clicked', () => {
    const handleToggle = vi.fn(); // Create a mock function spy
    
    render(<TaskItem task={sampleTask} onToggle={handleToggle} />);
    
    // Find the toggle button and simulate a click event
    const button = screen.getByRole('button', { name: /toggle status/i });
    fireEvent.click(button);
    
    // Verify the callback was called with the task ID
    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith(101);
  });
});