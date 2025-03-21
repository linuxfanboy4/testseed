import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ShellContainer = styled.div`
  background: #000;
  color: #0f0;
  height: 100vh;
  padding: 2rem;
  font-family: 'Courier New', monospace;
`;

const CommandLine = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Prompt = styled.span`
  color: #0f0;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: #0f0;
  font-family: inherit;
  font-size: inherit;
  width: 60%;
  outline: none;
`;

const Output = styled.div`
  white-space: pre-wrap;
  margin-bottom: 1rem;
`;

export default function ShellInterface() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const handleCommand = (e) => {
    e.preventDefault();
    const [cmd, ...args] = command.split(' ');
    
    let output;
    switch(cmd) {
      case 'create':
        const websiteId = args[0] || Math.random().toString(36).substr(2, 9);
        navigate(`/edit/${websiteId}`);
        break;
      case 'help':
        output = `Available commands:
create [name] - Start new project
open [name] - Open existing project
list - Show all projects
config [key] [value] - Change settings`;
        break;
      default:
        output = `Command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, { command, output }]);
    setCommand('');
  };

  return (
    <ShellContainer>
      {history.map((entry, i) => (
        <div key={i}>
          <Prompt>$ {entry.command}</Prompt>
          {entry.output && <Output>{entry.output}</Output>}
        </div>
      ))}
      <form onSubmit={handleCommand}>
        <CommandLine>
          <Prompt>$</Prompt>
          <Input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            autoFocus
          />
        </CommandLine>
      </form>
    </ShellContainer>
  );
                          }
