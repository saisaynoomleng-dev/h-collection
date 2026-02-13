import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Preview,
} from '@react-email/components';
import { NewsletterEmailTemplateProps } from '@/types/types';

export const NewsletterEmailTemplate = ({
  name,
}: NewsletterEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the H Collection Journal</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Text style={logoText}>H COLLECTION</Text>
          </Section>

          <Section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Heading style={h1}>Thank you, {name}!</Heading>
            <Text style={text}>
              Discover H-Collections: A curated destination for premium global
              brands and exclusive in-house designer labels.
            </Text>
            <Text style={text}>
              You are officially subscribed to the H-Journal. We&apos;ll be
              sending you updates, seasonal lookbooks, and exclusive sales
              throughout the year.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewsletterEmailTemplate;

// Inline styles are required for email reliability
const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Jost, "Helvetica Neue", Helvetica, Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const h1 = {
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  color: '#1a1a1a',
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#444',
};

const logoContainer = {
  display: 'flex',
  justifyContent: 'center',
  padding: '30px 0',
};

const logoText = {
  fontSize: '32px',
  fontWeight: 'bold',
  letterSpacing: '4px',
};
