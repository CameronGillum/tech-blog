const newPostButtonHandler = () => {
    document.querySelector('#post-form').style.display = 'block';
  };
  
  const editPostHandler = async (event) => {
    if (event.target.classList.contains('edit-btn')) {
      const id = event.target.getAttribute('data-id');
      const title = prompt('Enter new title:');
      const content = prompt('Enter new content:');
  
      if (title && content) {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to update post.');
        }
      }
    }
  };
  
  const deletePostHandler = async (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post.');
      }
    }
  };
  
  document.querySelector('#new-post').addEventListener('click', newPostButtonHandler);
  document.querySelector('#post-list').addEventListener('click', editPostHandler);
  document.querySelector('#post-list').addEventListener('click', deletePostHandler);
  