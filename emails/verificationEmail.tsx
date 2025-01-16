import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export const VerificationEmail = ({
  username, otp
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verification code</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={text}>Hello {username},</Text>
            <Text style={text}>
              Thank you for registering. Please use the following verification code to complete the registration
            </Text>
           
            <Text style={text}>
                {otp}
            </Text>
          
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: '5px',
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
};

const button = {
  backgroundColor: '#000',
  borderRadius: '5px',
  color: '#fff',
  display: 'inline-block',
  padding: '12px 24px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '20px 0',
};

export default VerificationEmail;
