import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Alert,
  alpha,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Gavel as GavelIcon } from '@mui/icons-material';

const TermsConditionsScreen = () => {
  const theme = useTheme();

  const terms = [
    {
      title: '1. Acceptance of Terms',
      content:
        'By accessing and using MERN-TESTSHOP, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service.',
    },
    {
      title: '2. Use License',
      content:
        'Permission is granted to temporarily access the materials on MERN-TESTSHOP for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.',
    },
    {
      title: '3. Product Information',
      content:
        'We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free.',
    },
    {
      title: '4. Account Responsibilities',
      content:
        'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.',
    },
    {
      title: '5. Order Acceptance',
      content:
        'We reserve the right to refuse or cancel any order for any reason including limitations on quantities available for purchase, inaccuracies in product or pricing information, or problems identified by our fraud detection systems.',
    },
    {
      title: '6. Payment Terms',
      content:
        'All payments must be received before we dispatch your order. We accept various payment methods including credit cards, PayPal, and other secure payment options.',
    },
    {
      title: '7. Intellectual Property',
      content:
        'All content on this website, including text, graphics, logos, images, and software, is the property of MERN-TESTSHOP and is protected by international copyright laws.',
    },
    {
      title: '8. Limitation of Liability',
      content:
        'MERN-TESTSHOP shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.',
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
          background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.light} 100%)`,
          color: theme.palette.warning.contrastText,
          textAlign: 'center',
        }}
      >
        <GavelIcon sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Terms & Conditions
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Effective Date: {new Date().toLocaleDateString()}
        </Typography>
      </Paper>

      {/* Alert */}
      <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
        Please read these terms and conditions carefully before using our
        service.
      </Alert>

      {/* Terms */}
      {terms.map((term, index) => (
        <Card
          key={index}
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              gutterBottom
              color="primary"
            >
              {term.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.8, color: 'text.secondary' }}
            >
              {term.content}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {/* Footer Note */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: alpha(theme.palette.warning.main, 0.05),
          border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: 'italic' }}
        >
          These terms and conditions are subject to change without notice. We
          encourage you to review this page periodically for any updates. Your
          continued use of the service following any changes constitutes
          acceptance of those changes.
        </Typography>
      </Card>
    </Container>
  );
};
export default TermsConditionsScreen;
