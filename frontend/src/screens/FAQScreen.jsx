import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  alpha,
  TextField,
  InputAdornment,
  Card,
  Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  ExpandMore as ExpandIcon,
  Help as HelpIcon,
  Search as SearchIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';

const FAQScreen = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: 'How do I place an order?',
      answer:
        'Browse our products, add items to your cart, proceed to checkout, enter your shipping information, and complete payment. You will receive an order confirmation email.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept Visa, Mastercard, PayPal, Stripe, and other major credit/debit cards. All transactions are secured with SSL encryption.',
    },
    {
      question: 'How long does shipping take?',
      answer:
        'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery. International orders may take longer depending on customs.',
    },
    {
      question: 'Can I track my order?',
      answer:
        'Yes! Once your order ships, you will receive a tracking number via email. You can also track your order by logging into your account.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy for most items. Products must be unused and in original packaging. Contact our support team to initiate a return.',
    },
    {
      question: 'Do you ship internationally?',
      answer:
        'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can reach us via email at hossein.abbasifar@gmail.com, call us at +98-930-330-3361, or use our live chat feature during business hours.',
    },
    {
      question: 'Are my personal details secure?',
      answer:
        'Absolutely. We use industry-standard SSL encryption to protect your data. We never share your personal information with third parties.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const contactMethods = [
    {
      icon: <EmailIcon />,
      title: 'Email Support',
      detail: 'hossein.abbasifar@gmail.com',
      color: theme.palette.primary.main,
    },
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      detail: '+98-930-330-3361',
      color: theme.palette.success.main,
    },
    {
      icon: <ChatIcon />,
      title: 'Live Chat',
      detail: 'Available 9 AM - 6 PM',
      color: theme.palette.info.main,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.light} 100%)`,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <HelpIcon sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Find answers to common questions about our service
        </Typography>
      </Paper>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search for answers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            bgcolor: 'background.paper',
          },
        }}
      />

      {/* FAQs */}
      <Box sx={{ mb: 4 }}>
        {filteredFaqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            elevation={0}
            sx={{
              mb: 2,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              '&:before': { display: 'none' },
              '&.Mui-expanded': {
                boxShadow: `0 4px 12px ${alpha(
                  theme.palette.primary.main,
                  0.1
                )}`,
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandIcon />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  my: 2,
                },
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Contact Methods */}
      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
        Still have questions?
      </Typography>
      <Grid container spacing={3}>
        {contactMethods.map((method, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 24px ${alpha(method.color, 0.15)}`,
                },
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(method.color, 0.1),
                  color: method.color,
                  mb: 2,
                }}
              >
                {method.icon}
              </Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {method.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {method.detail}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default FAQScreen;
