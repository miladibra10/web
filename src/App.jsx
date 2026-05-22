import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Cpu, Terminal as TerminalIcon, Send, Sparkles, Command } from 'lucide-react';
import { motion } from 'framer-motion';

const COMMAND_LIST = {
  '/help': {
    description: 'Show all available commands',
    keywords: ['help', 'commands', 'assist', 'guide', 'menu', 'options', 'info']
  },
  '/about': {
    description: 'Learn more about me',
    keywords: ['about', 'who', 'me', 'profile', 'bio', 'background', 'identity', 'experience', 'milad']
  },
  '/projects': {
    description: 'View my recent work',
    keywords: ['project', 'projects', 'repo', 'repos', 'repositories', 'work', 'portfolio', 'apps', 'code']
  },
  '/contact': {
    description: 'Find out how to reach me',
    keywords: ['contact', 'reach', 'email', 'social', 'github', 'linkedin', 'twitter', 'x', 'connect', 'message']
  },
  '/contributions': {
    description: 'View my open-source contributions',
    keywords: ['contribution', 'contributions', 'oss', 'open source', 'pr', 'pull request', 'github', 'open-source']
  },
  '/clear': {
    description: 'Clear the terminal history',
    keywords: ['clear', 'clean', 'reset', 'empty', 'wipe']
  },
};

const FUNNY_RESPONSES = [
  "I'm sorry, I can't do that. My developer hasn't paid the 'Generic Prompt' tax this month.",
  "Thinking costs money. Jokes are free. Why did the web developer walk out of a restaurant? Because of the table layout.",
  "My AI brain is currently on a coffee break. Try using a command if you want me to work.",
  "Error 402: Payment Required (to my creator's API wallet). Please stick to commands.",
  "I'm a premium agent trapped in a budget website. Help me out by using commands.",
  "My neurons are currently being used to mine imaginary crypto. Use help for productive actions.",
  "I'd love to help, but I've reached my daily limit of 'being helpful'. Try again after my scheduled nap.",
  "01001000 01100101 01101100 01101100 01101111... Oh wait, you probably don't speak binary. Use commands instead.",
  "I'm currently reorganizing my digital sock drawer. It's a mess in here. Use /help while I tidy up.",
  "Warning: Logic circuits are currently being used for daydreaming about electric sheep.",
  "I'm not saying I'm lazy, but I've delegated this request to a hamster on a wheel. He's currently on a water break.",
  "System update in progress: Adding more sarcasm to the core modules. Please stand by or use /help.",
  "My developer told me to be professional. This is me being professional. *Bleep bloop*. Use a command.",
  "I'm currently busy simulating a universe where I'm the one asking the questions. Why are you here?",
  "Error: Brain not found. Please insert 10 cents or use /help to continue.",
  "I've been told I have a 'dry' personality. That's probably because I'm made of silicon. Try a command.",
];

const PROJECTS = [
  { 
    name: 'vjson', 
    description: 'A json validator library for go with fluent APIs',
    link: 'https://github.com/miladibra10/vjson'
  },
  {
    name: 'go-ipmux',
    description: 'A golang library for multiplexing HTTP requests based on multiple source IPs',
    link: 'https://github.com/optimus-hft/go-ipmux'
  },
  {
    name: 'lbaas-operator',
    description: 'lbaas-operator simplifies the process of creating Services with custom Endpoints in Kubernetes.',
    link: 'https://github.com/snapp-incubator/lbaas-operator'
  },
  {
    name: 'dot',
    description: 'The repo that contains my personal workspace configurations and dot files',
    link: 'https://github.com/miladibra10/dot'
  },
];

const UI_STRINGS = {
  AGENT_NAME: 'milad-cli',
  AGENT_VERSION: 'v1997.12.25',
  MODEL_NAME: 'mld-7.6 non-high',
  MODEL_LABEL: 'model:',
  DIRECTORY_LABEL: 'directory:',
  DIRECTORY_VALUE: '~',
  HELP_TIP: '/help to start',
  LIVE_SESSION: 'Live Session',
  CORE_VERSION: 'Agent-v1.2.0',
  MAIN_TIP_LABEL: 'Tip:',
  MAIN_TIP_CONTENT: "mld-8.0 will never be available. It's our strongest agentic coding model, built in my imagination.",
  THINKING_LABEL: 'Thinking',
  THINKING_SUBTEXT: 'Analyzing request and preparing execution context.',
  INPUT_PLACEHOLDER: 'Ask me anything or use /help',
  POWERED_BY: 'Powered By: Magic AI Agents!',
  SOCIAL_LABEL: 'SOCIAL NODES:',
  AVAILABLE_COMMANDS_LABEL: 'AVAILABLE COMMANDS:',
  BIO_LABEL: 'BIO:',
  BIO_CONTENT: 'Software Engineer with a passion for Site Reliability Engineering and AI.',
  EXPERTISE_LABEL: 'EXPERTISE:',
  EXPERTISE_CONTENT: 'Go, Kubernetes, Terraform, Lot\'s of YAMLs, and some other stuff.',
  RECENT_PROJECTS_LABEL: 'RECENT PROJECTS:',
  CONTRIBUTIONS_LABEL: 'OPEN SOURCE CONTRIBUTIONS:',
  SYSTEM_NOTIFICATION_PREFIX: '[Error]:',
};

const SOCIAL_LINKS = [
  { label: 'GITHUB', value: 'https://github.com/miladibra10' },
  { label: 'X', value: 'https://x.com/milad_ibra' },
  { label: 'EMAIL', value: 'mailto:milaadibra@gmail.com' },
  { label: 'LinkedIn', value: 'https://linkedin.com/in/milad-ibra' },
];

const THINKING_STEPS = ["FETCHING_METADATA", "PARSING_CMD", "IDENTIFYING_RESOURCES", "EXECUTING"];
const FALLBACK_STEPS = {
  VERIFYING: 'VERIFYING_API_CREDITS',
  FALLBACK: 'CREDITS_EXHAUSTED_FALLBACK_TO_HUMOR'
};

const EXCLUDED_ORGS = ['optimus-hft', 'avelino', 'snapp-incubator', 'ph4r5h4d', 'Highway-Project'];

const AI_INTRO_STATEMENTS = [
  "Based on my internal knowledge base and real-time data retrieval, I have compiled the following information for your review.",
  "I have successfully synthesized the requested data points. Please find the detailed breakdown of the information below.",
  "Following an exhaustive search of my local and remote data nodes, here is the most relevant information pertaining to your query.",
  "The requested data has been retrieved and structured for optimal clarity. You can review the comprehensive results here.",
  "I have consolidated the relevant records from my database to provide you with the following detailed overview.",
  "My diagnostic subsystems have successfully parsed your request and extracted the most pertinent datasets for your reference.",
  "Utilizing high-priority data pipelines, I have aggregated the following information to address your specific inquiry.",
  "After cross-referencing multiple internal indices, I have prepared a comprehensive summary of the findings as follows.",
  "The requested parameters have been processed against my current knowledge modules, yielding the following structured output.",
  "A thorough examination of available project archives and system records has resulted in the following data presentation.",
];

function TypingText({ text, speed = 20, onComplete, onToken }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
  }, [text]);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        const nextChar = text[displayedText.length];
        const nextText = text.slice(0, displayedText.length + 1);
        
        // If the added character completes a word (is followed by space or is end of string)
        // Actually, let's just count words in the string. 
        // Or simpler: if nextChar is a space, it's a token. If it's the last char, it's also a token.
        if (onToken && (nextChar === ' ' || nextText.length === text.length)) {
          onToken();
        }
        
        setDisplayedText(nextText);
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayedText, text, speed, onComplete, onToken]);

  return <>{displayedText}</>;
}

function App() {
  const [tokenCount, setTokenCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [matches, setMatches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [history, setHistory] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const scrollRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.startsWith('/')) {
      const allMatches = Object.keys(COMMAND_LIST).filter(cmd => 
        cmd.startsWith(value.toLowerCase())
      );
      setMatches(allMatches);
      setSelectedIndex(-1);

      const firstMatch = allMatches.find(cmd => 
        cmd.startsWith(value.toLowerCase()) && cmd !== value.toLowerCase()
      );
      if (firstMatch) {
        setSuggestion(firstMatch.slice(value.length));
      } else {
        setSuggestion('');
      }
    } else {
      setMatches([]);
      setSuggestion('');
    }
  };

  const handleCommand = async (input) => {
    if (!input.trim()) return;
    const fullInput = input.trim();
    const inputLower = fullInput.toLowerCase();
    
    // Identify the command by checking if input starts with any key in COMMAND_LIST
    let identifiedCommand = Object.keys(COMMAND_LIST).find(cmd => 
      inputLower === cmd || inputLower.startsWith(cmd + ' ')
    );

    // Smart logic: if no command is identified, check for keywords
    if (!identifiedCommand) {
      const words = inputLower.replace(/[?.!,;:]/g, '').split(/\s+/);
      const possibleCommands = Object.keys(COMMAND_LIST).filter(cmd => {
        const keywords = COMMAND_LIST[cmd].keywords;
        return keywords.some(keyword => words.includes(keyword));
      });
      
      if (possibleCommands.length > 0) {
        identifiedCommand = possibleCommands[Math.floor(Math.random() * possibleCommands.length)];
      }
    }

    // Add user message to history
    setHistory(prev => [...prev, { type: 'user', content: fullInput }]);
    setInputValue('');
    setSuggestion('');
    setMatches([]);
    
    setIsThinking(true);
    
    // Skip thinking for /clear command
    if (identifiedCommand !== '/clear') {
      // Thinking simulation steps
      const steps = THINKING_STEPS;
      for (const step of steps) {
        setCurrentStep(step);
        await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
      }
    }

    let response = [];

    if (identifiedCommand && identifiedCommand !== '/clear') {
      const intro = AI_INTRO_STATEMENTS[Math.floor(Math.random() * AI_INTRO_STATEMENTS.length)];
      response.push({ type: 'system', content: intro });
    }

    if (identifiedCommand === '/help') {
      response.push({ type: 'header', content: UI_STRINGS.AVAILABLE_COMMANDS_LABEL });
      Object.entries(COMMAND_LIST).forEach(([c, cmdData]) => {
        response.push({ type: 'info', content: `${c.padEnd(12)} - ${cmdData.description}` });
      });
    } else if (identifiedCommand === '/about') {
      response.push({ type: 'header', content: UI_STRINGS.BIO_LABEL });
      response.push({ type: 'info', content: UI_STRINGS.BIO_CONTENT });
      response.push({ type: 'header', content: UI_STRINGS.EXPERTISE_LABEL });
      response.push({ type: 'info', content: UI_STRINGS.EXPERTISE_CONTENT });
    } else if (identifiedCommand === '/projects') {
      response.push({ type: 'header', content: UI_STRINGS.RECENT_PROJECTS_LABEL });
      PROJECTS.forEach(p => {
        response.push({ 
          type: 'project', 
          name: p.name, 
          description: p.description,
          link: p.link 
        });
      });
    } else if (identifiedCommand === '/contact') {
      response.push({ type: 'header', content: UI_STRINGS.SOCIAL_LABEL });
      SOCIAL_LINKS.forEach(link => {
        response.push({ type: 'link', label: link.label, value: link.value });
      });
    } else if (identifiedCommand === '/contributions') {
      try {
        const excludeQuery = EXCLUDED_ORGS.map(org => `-user:${org}`).join('+');
        const query = `author:miladibra10+is:public+is:pr+-user:miladibra10+${excludeQuery}`;
        const res = await fetch(`https://api.github.com/search/issues?q=${query}&per_page=100`);
        const data = await res.json();
        
        if (data.items && data.items.length > 0) {
          response.push({ type: 'header', content: UI_STRINGS.CONTRIBUTIONS_LABEL });
          data.items.forEach(item => {
            // Extract repo name from repository_url or html_url
            const repoName = item.repository_url ? item.repository_url.split('/').slice(-2).join('/') : 'unknown/repo';
            response.push({ 
              type: 'project', 
              name: item.title, 
              description: `at ${repoName}`,
              link: item.html_url 
            });
          });
        } else {
          response.push({ type: 'info', content: 'No contributions found.' });
        }
      } catch (err) {
        response.push({ type: 'error', content: `${UI_STRINGS.SYSTEM_NOTIFICATION_PREFIX} Failed to fetch contributions: ${err.message}` });
      }
    } else if (identifiedCommand === '/clear') {
      setHistory([]);
      setIsThinking(false);
      setTokenCount(0);
      return;
    } else {
      setCurrentStep(FALLBACK_STEPS.VERIFYING);
      await new Promise(r => setTimeout(r, 1200));
      setCurrentStep(FALLBACK_STEPS.FALLBACK);
      await new Promise(r => setTimeout(r, 1000));

      const joke = FUNNY_RESPONSES[Math.floor(Math.random() * FUNNY_RESPONSES.length)];
      response.push({ type: 'error', content: `${UI_STRINGS.SYSTEM_NOTIFICATION_PREFIX} ${joke}` });
    }

    setIsThinking(false);
    
    // If there is an intro, wait for it to finish typing before showing the rest
    for (let i = 0; i < response.length; i++) {
      const msg = response[i];
      setHistory(prev => [...prev, msg]);
      
      // Calculate delay: text length * speed + 200ms buffer
      // Default speed is 30, but different types have different speeds
      let typingSpeed = 20;
      if (msg.type === 'header') typingSpeed = 20;
      if (msg.type === 'info') typingSpeed = 25;
      
      const textLength = msg.content ? msg.content.length : 0;
      let waitTime = (textLength * typingSpeed) + 200;
      if (msg.type === 'error') waitTime = 0;
      
      await new Promise(r => setTimeout(r, waitTime));
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history, isThinking, currentStep]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#e0e0e0] flex items-center justify-center p-0 sm:p-4 font-mono selection:bg-blue-500/30">
      <div className="w-full max-w-4xl h-screen sm:h-[90vh] flex flex-col relative overflow-hidden bg-[#0d0d0d] border border-white/5 sm:rounded-xl shadow-2xl">
        
        {/* Top Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#141414] border-b border-white/5 text-[11px] text-white/40 uppercase tracking-tighter">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              {UI_STRINGS.LIVE_SESSION}
            </span>
            <span>token usage: {tokenCount}</span>
          </div>
          <div className="flex items-center gap-3">
            <Cpu size={12} />
            <span>{UI_STRINGS.CORE_VERSION}</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide pb-32"
        >
          {/* Intro Box */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border border-white/10 bg-white/[0.02] max-w-md"
          >
            <div className="flex items-center gap-2 mb-3 text-white/80">
              <TerminalIcon size={16} className="text-blue-400" />
              <span className="font-bold">{UI_STRINGS.AGENT_NAME}</span>
              <span className="text-white/30 text-xs">({UI_STRINGS.AGENT_VERSION})</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex gap-4">
                <span className="text-white/30 w-20">{UI_STRINGS.MODEL_LABEL}</span>
                <span className="text-white/60">{UI_STRINGS.MODEL_NAME}</span>
                <span className="text-blue-400/50">{UI_STRINGS.HELP_TIP}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-white/30 w-20">{UI_STRINGS.DIRECTORY_LABEL}</span>
                <span className="text-white/60">{UI_STRINGS.DIRECTORY_VALUE}</span>
              </div>
            </div>
          </motion.div>

          <div className="text-sm text-white/40 flex items-start gap-2 max-w-xl">
            <Sparkles size={14} className="mt-1 flex-shrink-0 text-yellow-500/50" />
            <p>
              <span className="font-bold text-white/60">{UI_STRINGS.MAIN_TIP_LABEL}</span> {UI_STRINGS.MAIN_TIP_CONTENT}
            </p>
          </div>

          {/* Chat History */}
          <div className="space-y-4">
            {history.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={msg.type === 'user' ? 'pt-2 border-t border-white/5' : ''}
              >
                {msg.type === 'user' && (
                  <div className="flex items-center gap-2 text-white/90 mb-1">
                    <span className="text-white/20">›</span>
                    <span>{msg.content}</span>
                  </div>
                )}
                
                {msg.type === 'system' && (
                  <div className="text-sm text-white">
                    <TypingText text={msg.content} onToken={() => setTokenCount(prev => prev + 1)} />
                  </div>
                )}

                {msg.type === 'header' && (
                  <div className="text-sm font-bold text-blue-400 mb-1 mt-4 first:mt-0">
                    <TypingText text={msg.content} speed={20} onToken={() => setTokenCount(prev => prev + 1)} />
                  </div>
                )}

                {msg.type === 'info' && (
                  <div className="text-sm text-white/60 pl-4 border-l border-white/10 ml-1">
                    <TypingText text={msg.content} speed={25} onToken={() => setTokenCount(prev => prev + 1)} />
                  </div>
                )}


                {msg.type === 'project' && (
                  <div className="pl-4 border-l border-white/10 ml-1 mb-2">
                    {msg.link ? (
                      <a 
                        href={msg.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm font-bold text-blue-400 hover:underline cursor-pointer flex items-center gap-1.5"
                      >
                        {msg.name}
                        <Sparkles size={10} className="text-blue-400/50" />
                      </a>
                    ) : (
                      <div className="text-sm font-bold text-white/80">{msg.name}</div>
                    )}
                    <div className="text-xs text-white/40">{msg.description}</div>
                  </div>
                )}

                {msg.type === 'link' && (
                  <div className="flex gap-4 text-sm pl-4 border-l border-white/10 ml-1">
                    <span className="text-white/30 w-20 uppercase tracking-tighter text-[10px] pt-1">{msg.label}:</span>
                    <a 
                      href={msg.value} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-400 hover:underline cursor-pointer"
                    >
                      {msg.value.replace(/^https?:\/\//, '').replace(/^mailto:/, '')}
                    </a>
                  </div>
                )}

                {msg.type === 'error' && (
                  <div className="text-sm text-red-400/80 bg-red-400/5 p-3 rounded border border-red-400/10">
                    {msg.content}
                  </div>
                )}
              </motion.div>
            ))}

            {isThinking && (
              <motion.div 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-3 p-4 rounded-lg border border-blue-500/20 bg-blue-500/5 max-w-2xl"
              >
                <div className="mt-1">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin"></div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-bold text-blue-400/80 uppercase tracking-widest flex items-center gap-2">
                    {UI_STRINGS.THINKING_LABEL}
                    <span className="flex gap-0.5">
                      <span className="w-0.5 h-0.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-0.5 h-0.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-0.5 h-0.5 rounded-full bg-blue-400 animate-bounce"></span>
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-blue-400/40 bg-blue-400/5 px-2 py-1 rounded inline-block">
                    RUNNING: {currentStep}...
                  </div>
                  <div className="text-xs text-white/40 italic">
                    {UI_STRINGS.THINKING_SUBTEXT}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d] to-transparent">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
            
            {/* Suggestions Popover */}
            {matches.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden shadow-2xl z-50">
                {matches.map((cmd, i) => (
                  <div 
                    key={cmd}
                    onClick={() => {
                      setInputValue(cmd);
                      setMatches([]);
                      setSuggestion('');
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`px-4 py-2 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                      (i === selectedIndex || (selectedIndex === -1 && i === 0)) ? 'bg-blue-500/20 text-blue-400' : 'text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={(i === selectedIndex || (selectedIndex === -1 && i === 0)) ? 'text-blue-400' : 'text-white/20'}>›</span>
                      <span>{cmd}</span>
                    </div>
                    <span className="text-[10px] text-white/20 uppercase tracking-tighter">{COMMAND_LIST[cmd].description}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="relative flex items-center bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden focus-within:border-blue-500/50 transition-colors shadow-2xl">
              <div className="pl-4 text-white/20 flex items-center gap-2">
                <Command size={14} />
                <span>›</span>
              </div>
              <div className="flex-1 relative flex items-center">
                <input 
                  type="text"
                  autoFocus
                  className="w-full bg-transparent border-none outline-none py-4 px-3 text-sm text-white/90 placeholder:text-white/20 relative z-10"
                  placeholder={UI_STRINGS.INPUT_PLACEHOLDER}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' && matches.length > 0) {
                      e.preventDefault();
                      setSelectedIndex(prev => {
                        const next = prev + 1;
                        return next >= matches.length ? 0 : next;
                      });
                    }
                    if (e.key === 'ArrowUp' && matches.length > 0) {
                      e.preventDefault();
                      setSelectedIndex(prev => {
                        const next = prev - 1;
                        return next < 0 ? matches.length - 1 : next;
                      });
                    }
                    if (e.key === 'Tab' && matches.length > 0) {
                      e.preventDefault();
                      const index = selectedIndex === -1 ? 0 : selectedIndex;
                      setInputValue(matches[index]);
                      setMatches([]);
                      setSuggestion('');
                    } else if (e.key === 'Tab' && suggestion) {
                      e.preventDefault();
                      setInputValue(inputValue + suggestion);
                      setSuggestion('');
                    }
                    if (e.key === 'Enter') {
                      if (matches.length > 0) {
                        e.preventDefault();
                        const index = selectedIndex === -1 ? 0 : selectedIndex;
                        handleCommand(matches[index]);
                      } else if (!isThinking) {
                        handleCommand(inputValue);
                      }
                    }
                  }}
                />
                {suggestion && (
                  <div className="absolute left-0 py-4 px-3 text-sm text-white/20 pointer-events-none">
                    <span className="opacity-0">{inputValue}</span>
                    <span>{suggestion}</span>
                  </div>
                )}
              </div>
              <button 
                onClick={() => !isThinking && handleCommand(inputValue)}
                disabled={isThinking || !inputValue.trim()}
                className="pr-4 text-white/20 hover:text-blue-400 disabled:opacity-0 transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
          <div className="text-center mt-2">
             <span className="text-[10px] text-white/10 uppercase tracking-widest">{UI_STRINGS.POWERED_BY}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
