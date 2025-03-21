import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { FiCode, FiLayout, FiTerminal } from 'react-icons/fi';
import styled from 'styled-components';

const EditorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  background: #1a1a1a;
`;

const EditorPane = styled.div`
  padding: 1rem;
  border-right: 2px solid #333;
`;

const PreviewPane = styled.iframe`
  width: 100%;
  height: 100vh;
  border: none;
  background: white;
`;

const FileTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? '#333' : '#222'};
  border: none;
  color: ${props => props.active ? '#fff' : '#666'};
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function EditorPage() {
  const { websiteId } = useParams();
  const [files, setFiles] = useState({
    'index.html': { content: '<div class="container"></div>', type: 'html' },
    'style.css': { content: '.container { padding: 2rem; }', type: 'css' },
    'app.js': { content: 'console.log("SEED")', type: 'javascript' }
  });
  const [currentFile, setCurrentFile] = useState('index.html');
  const [previewContent, setPreviewContent] = useState('');

  useEffect(() => {
    const blob = new Blob([
      `<html>
        <style>${files['style.css'].content}</style>
        <body>${files['index.html'].content}</body>
        <script>${files['app.js'].content}</script>
      </html>`
    ], { type: 'text/html' });
    setPreviewContent(URL.createObjectURL(blob));
  }, [files]);

  const handleEditorChange = (value) => {
    setFiles(prev => ({
      ...prev,
      [currentFile]: { ...prev[currentFile], content: value }
    }));
  };

  return (
    <EditorContainer>
      <EditorPane>
        <FileTabs>
          {Object.keys(files).map(file => (
            <TabButton
              key={file}
              active={currentFile === file}
              onClick={() => setCurrentFile(file)}
            >
              {file.endsWith('.html') && <FiCode />}
              {file.endsWith('.css') && <FiLayout />}
              {file.endsWith('.js') && <FiTerminal />}
              {file}
            </TabButton>
          ))}
        </FileTabs>
        <Editor
          height="90vh"
          language={files[currentFile].type}
          value={files[currentFile].content}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            automaticLayout: true,
            scrollBeyondLastLine: false
          }}
        />
      </EditorPane>
      <PreviewPane src={previewContent} />
    </EditorContainer>
  );
                   }
