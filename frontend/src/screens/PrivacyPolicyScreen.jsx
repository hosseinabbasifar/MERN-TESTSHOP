import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  alpha,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Security as SecurityIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const PrivacyPolicyScreen = () => {
  const theme = useTheme();

  const sections = [
    {
      title: 'Information We Collect',
      items: [
        'Personal identification information (Name, email address, phone number)',
        'Billing and shipping addresses',
        'Payment information (processed securely through third-party providers)',
        'Order history and preferences',
        'Device and browser information',
      ],
    },
    {
      title: 'How We Use Your Information',
      items: [
        'Process and fulfill your orders',
        'Communicate with you about your orders',
        'Send promotional materials (with your consent)',
        'Improve our services and user experience',
        'Prevent fraud and ensure security',
      ],
    },
    {
      title: 'Data Protection',
      items: [
        'All data is encrypted using industry-standard SSL technology',
        'We never sell or rent your personal information to third parties',
        'Regular security audits and updates',
        'Strict access controls for employee data access',
        'Compliance with international data protection regulations',
      ],
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
          background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.light} 100%)`,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <SecurityIcon sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </Paper>

      {/* Introduction */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="body1"
            paragraph
            sx={{ lineHeight: 1.8, color: 'text.secondary' }}
          >
            At MERN-TESTSHOP, we take your privacy seriously. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or make a purchase.
          </Typography>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, color: 'text.secondary' }}
          >
            By using our service, you agree to the collection and use of
            information in accordance with this policy.
          </Typography>
        </CardContent>
      </Card>

      {/* Sections */}
      {sections.map((section, index) => (
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
              variant="h5"
              fontWeight={700}
              gutterBottom
              color="primary"
            >
              {section.title}
            </Typography>
            <List>
              {section.items.map((item, itemIndex) => (
                <ListItem key={itemIndex} sx={{ py: 1 }}>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}

      {/* Contact */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: alpha(theme.palette.info.main, 0.05),
          border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <InfoIcon color="info" />
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Questions about our Privacy Policy?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact us at: hossein.abbasifar@gmail.com
            </Typography>
          </Box>
        </Stack>
      </Card>
    </Container>
  );
};
export default PrivacyPolicyScreen;
