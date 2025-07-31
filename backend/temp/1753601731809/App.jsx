// backend/template/src/App.jsx
const App = () => {
  return (
    <div>
      <h1>{{fullName}}</h1>
      <p>Email: {{email}}</p>
      <p>GitHub: {{githubUsername}}</p>
    </div>
  );
};

export default App;
