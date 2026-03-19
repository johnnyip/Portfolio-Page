import { Badge, Button, Card, Group, Image, Stack, Text, Title } from '@mantine/core';
import { IconArrowUpRight, IconCalendarEvent, IconCodeDots } from '@tabler/icons-react';

export default function CardDetail({ data, categories = [], purpose = '' }) {
  if (!data) return null;

  return (
    <Card className="project-card" radius="xl" padding="lg">
      <Card.Section>
        <div className="project-image-wrap">
          <Image src={data.thumbnail} alt={data.name} className="project-image" />
          <div className="project-image-overlay" />
          <Badge className="project-date-badge" radius="xl" size="md" leftSection={<IconCalendarEvent size={13} />}>
            {data.date}
          </Badge>
        </div>
      </Card.Section>

      <Stack gap="md" className="project-card-body">
        <div>
          <Group gap="xs" mb={10}>
            {categories.map((item) => (
              <Badge key={item} variant="light" radius="xl" color={categoryColor(item)} size="sm">
                {item}
              </Badge>
            ))}
          </Group>

          <Title order={3} className="project-title">
            {data.name}
          </Title>

          {purpose ? <Text className="project-purpose">{purpose}</Text> : null}

          <Text className="project-description">{truncateText(stripHtml(data.shortDescription), 170)}</Text>
        </div>

        <div>
          <Text className="project-stack-label">Tech stack</Text>
          <Group gap="xs">
            {(data.keywords || []).slice(0, 8).map((item, i) => (
              <Badge key={`${item}-${i}`} variant="light" radius="xl" color={keywordColor(item)} size="sm">
                {item}
              </Badge>
            ))}
          </Group>
        </div>

        <div className="project-divider" />

        <Stack gap="xs">
          <Group gap={8}>
            <IconCodeDots size={18} className="project-section-icon" />
            <Text className="project-links-label">Links</Text>
          </Group>

          <Stack gap="sm">
            {(data.links || []).map((item, i) => (
              <Button
                key={`${item[0]}-${i}`}
                component="a"
                href={item[1]}
                target="_blank"
                rel="noreferrer"
                variant="light"
                radius="lg"
                justify="space-between"
                rightSection={<IconArrowUpRight size={16} />}
                className="project-link-button"
              >
                {item[0]}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

function stripHtml(text = '') {
  return text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncateText(text = '', maxLength = 170) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

function categoryColor(category) {
  const palette = {
    Backend: 'blue',
    Infra: 'cyan',
    Observability: 'teal',
    'AI Tooling': 'indigo',
    Utility: 'slate',
  };
  return palette[category] || 'gray';
}

function keywordColor(keyword) {
  const palette = {
    // Backend / framework
    Java: 'blue',
    'Spring Boot': 'blue',
    'Spring Security': 'blue',
    Hibernate: 'blue',
    JWT: 'blue',
    Flask: 'blue',
    'Open API': 'blue',

    // Infra / platform
    Docker: 'blue',
    Kubernetes: 'cyan',
    OpenFaaS: 'cyan',
    Jenkins: 'slate',
    Kafka: 'cyan',
    'Kafka Connect': 'cyan',

    // Runtime / app
    'Node.js': 'indigo',
    'Node.JS': 'indigo',
    NodeJS: 'indigo',
    JavaScript: 'indigo',
    'React.js': 'indigo',
    Swift: 'grape',
    iOS: 'grape',
    'Thymeleaf (HTML+js)': 'indigo',

    // Data / storage / geo
    MongoDB: 'green',
    MySQL: 'green',
    Redis: 'green',
    PostGIS: 'teal',
    QGIS: 'teal',
    Firebase: 'teal',

    // AI / blockchain / specialized
    Blockchain: 'violet',
    'Hyperledger Fabric': 'violet',
    Cryptocurreny: 'violet',
    Python: 'orange',
    AWS: 'yellow',
    'AWS S3': 'yellow',
  };

  return palette[keyword] || 'gray';
}
