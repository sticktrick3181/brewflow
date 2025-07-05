import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Typography, 
  Avatar,
  Paper,
  Button,
  Divider,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    tokens?: number;
    characters?: number;
    price?: string;
    model?: string;
    input?: string;
  };
}

// Model pricing per 1M tokens (input/output may vary)
const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  'deepseek-r1-distill-llama-70b': { input: 0.5, output: 1.5 },
  'llama-3.1-8b-instant': { input: 0.3, output: 0.4 },
  'llama-3.3-70b-versatile': { input: 0.7, output: 0.9 },
  'meta-llama/llama-4-maverick-17b-128e-instruct': { input: 0.6, output: 0.8 },
  'meta-llama/llama-4-scout-17b-16e-instruct': { input: 0.6, output: 0.8 },
  'qwen/qwen3-32b': { input: 0.4, output: 0.6 },
  'gemma2-9b-it': { input: 0.2, output: 0.3 },
};

// Rough estimation of tokens (4 chars ≈ 1 token for English text)
const estimateTokens = (text: string): number => {
  return Math.ceil(text.length / 4);
};

// Calculate price based on model and token count
const calculatePrice = (model: string, inputTokens: number, outputTokens: number): string => {
  const pricing = MODEL_PRICING[model] || { input: 0, output: 0 };
  const inputCost = (pricing.input * inputTokens) / 1000000;
  const outputCost = (pricing.output * outputTokens) / 1000000;
  return (inputCost + outputCost).toFixed(8);
};

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama-3.3-70b-versatile');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const availableModels = [
    'deepseek-r1-distill-llama-70b',
    'llama-3.1-8b-instant',
    'llama-3.3-70b-versatile',
    'meta-llama/llama-4-maverick-17b-128e-instruct',
    'meta-llama/llama-4-scout-17b-16e-instruct',
    'qwen/qwen3-32b',
    'gemma2-9b-it'
  ];

  const handleModelChange = (event: SelectChangeEvent) => {
    setSelectedModel(event.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      metadata: {
        tokens: estimateTokens(input),
        characters: input.length,
        model: selectedModel
      }
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response with metadata only
    setTimeout(() => {
      const responseText = `This is a simulated response to: "${input}"`;
      const inputTokens = estimateTokens(input);
      const outputTokens = estimateTokens(responseText);
      const price = calculatePrice(selectedModel, inputTokens, outputTokens);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        metadata: {
          tokens: outputTokens,
          characters: responseText.length,
          price: price,
          model: selectedModel,
          input: input
        }
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const examplePrompts = [
    "Explain quantum computing",
    "Write a poem about AI",
    "How do I make a website?"
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: 'calc(100vh - 128px)',
      maxWidth: '1200px',
      margin: '0 auto',
      bgcolor: 'background.default',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 3
    }}>
      {/* Model Selection */}
      <Box sx={{ 
        p: 2, 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.paper'
      }}>
        <FormControl size="small" sx={{ minWidth: 300, mr: 2 }}>
          <InputLabel 
            id="model-select-label"
            sx={{
              color: 'text.primary',
              '&.Mui-focused': {
                color: 'primary.main',
              },
            }}
          >
            Model
          </InputLabel>
          <Select
            labelId="model-select-label"
            value={selectedModel}
            label="Model"
            onChange={handleModelChange}
            size="small"
            sx={{
              color: 'text.primary',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.dark',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '& .MuiSvgIcon-root': {
                color: 'text.primary',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: 'background.paper',
                  '& .MuiMenuItem-root': {
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                    '&.Mui-selected': {
                      bgcolor: 'action.selected',
                      '&:hover': {
                        bgcolor: 'action.selected',
                      },
                    },
                  },
                },
              },
            }}
          >
            {availableModels.map((model) => (
              <MenuItem key={model} value={model}>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {model}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Selected: {selectedModel}
        </Typography>
      </Box>
      {/* Messages Area */}
      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto',
        p: 2,
        bgcolor: '#fcfafa',
      }}>
        {messages.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            color: '#767676',
            textAlign: 'center',
            p: 3,
            bgcolor: '#fcfafa',
            borderRadius: 2
          }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#f74e35', mb: 2 }}>
              How can I help you today?
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Ask me anything or try one of these example prompts:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              {examplePrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outlined"
                  onClick={() => setInput(prompt)}
                  sx={{ 
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: '#f74e35',
                    },
                  }}
                >
                  {prompt}
                </Button>
              ))}
            </Box>
          </Box>
        ) : (
          <Box>
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                  px: 1
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    maxWidth: '80%',
                    bgcolor: message.role === 'user' ? '#f74e35' : '#fcfafa',
                    color: message.role === 'user' ? 'white' : '#767676',
                    borderRadius: 2,
                    position: 'relative',
                    border: '1px solid',
                    borderColor: message.role === 'user' ? '#f74e35' : '#767676',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: message.role === 'user' ? 'primary.main' : 'secondary.main',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}
                    >
                      {message.role === 'user' ? 'U' : 'AI'}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      {message.role === 'user' ? (
                        <pre style={{
                          margin: 0,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'monospace',
                          fontSize: '0.9em',
                          color: 'text.primary',
                          lineHeight: 1.6,
                          marginBottom: '8px'
                        }}>
                          {message.content}
                        </pre>
                      ) : message.role === 'assistant' && message.metadata && (
                        <pre style={{
                          margin: 0,
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'monospace',
                          fontSize: '0.9em',
                          color: 'text.primary',
                          lineHeight: 1.6
                        }}>
{`Input: "${message.metadata.input}"

Model: ${message.metadata.model}
Tokens: ${message.metadata.tokens?.toLocaleString()}
Characters: ${message.metadata.characters?.toLocaleString()}
Price: $${message.metadata.price}`}
                        </pre>
                      )}
                      {message.role === 'user' && message.metadata && (
                        <Box sx={{ 
                          mt: 1, 
                          fontSize: '0.75rem',
                          color: 'text.secondary',
                          display: 'flex',
                          gap: 2,
                          flexWrap: 'wrap'
                        }}>
                          <span>Tokens: {message.metadata.tokens?.toLocaleString()}</span>
                          <span>Characters: {message.metadata.characters?.toLocaleString()}</span>
                        </Box>
                      )}
                    </Box>
                    {message.role === 'assistant' && (
                      <Tooltip title="Copy to clipboard">
                        <IconButton 
                          size="small" 
                          onClick={() => handleCopy(message.content)}
                          sx={{ 
                            alignSelf: 'flex-start',
                            color: 'text.secondary',
                            '&:hover': {
                              color: 'primary.main',
                              bgcolor: 'action.hover'
                            }
                          }}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      textAlign: 'right',
                      mt: 0.5,
                      color: message.role === 'user' ? 'primary.contrastText' : 'text.secondary',
                      opacity: 0.8
                    }}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Paper>
              </Box>
            ))}
            {isLoading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2 }}>
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  bgcolor: 'primary.main',
                  animation: 'pulse 1.5s infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 0.5 },
                    '50%': { opacity: 1 }
                  }
                }} />
                <Typography variant="body2" color="text.secondary">
                  AI is thinking...
                </Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>
        )}
      </Box>

      {/* Input Area */}
      <Box 
        component="form"
        onSubmit={handleSend}
        sx={{ 
          p: 2, 
          borderTop: '1px solid', 
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            multiline
            maxRows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.default',
                '&:hover': {
                  bgcolor: 'background.default',
                },
                '&.Mui-focused': {
                  bgcolor: 'background.default',
                },
                '& textarea': {
                  color: 'primary.main',
                  '&::placeholder': {
                    color: 'text.secondary',
                    opacity: 0.7
                  }
                },
                '& fieldset': {
                  borderColor: 'divider',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                }
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!input.trim() || isLoading}
            sx={{ 
              minWidth: '48px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              p: 0,
              '&:hover': {
                transform: 'scale(1.05)',
              },
              transition: 'transform 0.2s',
            }}
          >
            <SendIcon />
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
          Press Enter to send, Shift+Enter for new line
        </Typography>
      </Box>
    </Box>
  );
};

export default Chat;
