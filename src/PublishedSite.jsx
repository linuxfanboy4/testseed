import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Frame = styled.iframe`
  width: 100%;
  height: 100vh;
  border: none;
`;

export default function PublishedSite() {
  const { websiteId } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadContent = async () => {
      const savedData = localStorage.getItem(websiteId);
      if (savedData) {
        const { files } = JSON.parse(savedData);
        const blob = new Blob([
          `<html>
            <style>${files['style.css'].content}</style>
            <body>${files['index.html'].content}</body>
            <script>${files['app.js'].content}</script>
          </html>`
        ], { type: 'text/html' });
        setContent(URL.createObjectURL(blob));
      }
    };
    loadContent();
  }, [websiteId]);

  return <Frame src={content} title={websiteId} />;
    }
