import './styles/App.scss';
import {
  AboutMe,
  GithubRepos,
  CurrentDateTime,
  CodeAnimation,
  DraggableGif
} from './components';

function App() {
  return (
    <>
      <div className="hyprland-container">
        <AboutMe />
        <GithubRepos />
        <CurrentDateTime />
        <CodeAnimation />
      </div>
      <DraggableGif />
    </>
  )
}

export default App;
