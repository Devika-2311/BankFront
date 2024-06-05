import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import CrudOperation from './crudOperation';
import { act } from 'react'; 

// Create a root container element
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

// Mock axios methods
jest.mock('axios');

describe('CrudOperation component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Post 1', body: 'Body 1' },
        { id: 2, title: 'Post 2', body: 'Body 2' },
      ],
    });
  });

  test('renders component with initial posts', async () => {
    render(<CrudOperation />);
    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
      expect(screen.getByText('Post 2')).toBeInTheDocument();
    });
  });

  test('creates a new post', async () => {
    axios.post.mockResolvedValueOnce({ data: { id: 3, title: 'New Post', body: 'New Body' } });
    render(<CrudOperation />);

    // Wrap state-updating code inside act
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Post' } });
      fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'New Body' } });
      fireEvent.click(screen.getByText('Add Post'));
    });

    await waitFor(() => {
      expect(screen.getByText('New Post')).toBeInTheDocument();
      expect(screen.getByText('New Body')).toBeInTheDocument();
    });
  });

//   test('updates an existing post', async () => {
//     axios.put.mockResolvedValueOnce({ data: { id: 1, title: 'Updated Post', body: 'Updated Body' } });
//     render(<CrudOperation />);

//     // Wrap state-updating code inside act
//     await act(async () => {
//       fireEvent.click(screen.getByRole('button', { name: /edit/i }));
//       fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Post' } });
//       fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'Updated Body' } });
//       fireEvent.click(screen.getByText('Update Post'));
//     });

//     await waitFor(() => {
//       expect(screen.getByText('Updated Post')).toBeInTheDocument();
//       expect(screen.getByText('Updated Body')).toBeInTheDocument();
//     });
//   });

//   test('deletes a post', async () => {
//     axios.delete.mockResolvedValueOnce();
//     render(<CrudOperation />);

//     // Wrap state-updating code inside act
//     await act(async () => {
//       fireEvent.click(screen.getByText('Delete'));
//     });

//     await waitFor(() => {
//       expect(screen.queryByText('Post 1')).not.toBeInTheDocument();
//     });
//   });
 });
