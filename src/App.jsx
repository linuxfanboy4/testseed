import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from './EditorPage';
import PublishedSite from './PublishedSite';
import ShellInterface from './ShellInterface';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShellInterface />} />
        <Route path="/edit/:websiteId" element={<EditorPage />} />
        <Route path="/:websiteId/*" element={<PublishedSite />} />
      </Routes>
    </BrowserRouter>
  );
}
