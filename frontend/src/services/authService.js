export const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  