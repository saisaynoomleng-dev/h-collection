import {
  Html,
  Head,
  Preview,
  Container,
  Body,
  Section,
  Text,
  Heading,
} from '@react-email/components';

const contactEmailTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you so much! Your message has reached us!</Preview>
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
            <Heading style={h1}>Thank You! {name}</Heading>
            <Text style={text}>
              You&apos;ve reached us! Our team will be in touch with you
              shortly!
            </Text>
          </Section>

          <Section
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'between',
              alignItems: 'center',
            }}
          >
            <Section>
              <Heading style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                H Collection
              </Heading>
              <Text>7860 Beechmont Ave, Cicinnati</Text>
              <Text>Ohio, 45255</Text>
              <Text>513 474 2282</Text>
            </Section>

            <Section>
              <Text>contact@hcollection.com</Text>
              <Text>I love haru!</Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default contactEmailTemplate;

// inline classes
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
