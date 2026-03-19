import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  MultiSelect,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowRight, IconBrandGithub, IconCpu, IconNetwork, IconServer } from '@tabler/icons-react';

import CardDetail from './cardDetail';
import projectData from '../../data/data.json';

const projectMeta = {
  'Cloud Computing Course Project': {
    categories: ['Backend', 'Infra'],
    purpose: 'Rebuild a streaming-oriented cloud architecture with open-source components.',
  },
  'Search Engine Course Project': {
    categories: ['Backend', 'Utility'],
    purpose: 'Crawl, index, and query documents through a custom search workflow.',
  },
  'Spatial Database Course Project': {
    categories: ['Backend', 'Infra'],
    purpose: 'Serve and visualize geospatial data with containerized tooling.',
  },
  'Google Form Prefill Link Generator': {
    categories: ['Utility'],
    purpose: 'Generate reusable prefilled form links from arbitrary Google Forms.',
  },
  'AR System': {
    categories: ['Backend', 'Utility'],
    purpose: 'Replace manual spreadsheet-heavy workflows with a report automation platform.',
  },
  'ORCAS Platform': {
    categories: ['Backend', 'Utility'],
    purpose: 'Deliver a searchable content platform with approval and publishing workflows.',
  },
  'Supply Chain Finance Operation Platform': {
    categories: ['Backend', 'Infra'],
    purpose: 'Track logistics workflows and synchronize records into a blockchain-backed system.',
  },
  'Tour Booking System': {
    categories: ['Backend', 'Utility'],
    purpose: 'Implement booking, host management, complaints, and content workflows.',
  },
  'HKJC Health Declaration Form Generator': {
    categories: ['Utility'],
    purpose: 'Automate repetitive form filling for a daily internal workflow.',
  },
  'JetBrains Academy projects': {
    categories: ['Backend'],
    purpose: 'A collection of Java-focused implementation exercises and technical practice projects.',
  },
  DateGrasp: {
    categories: ['Utility'],
    purpose: 'Build a collaborative date countdown and reminder app for iOS.',
  },
  TransportGrasp: {
    categories: ['Utility'],
    purpose: 'Expose transport ETA data through a lightweight iOS utility.',
  },
  MuseumPlus: {
    categories: ['Utility'],
    purpose: 'Prototype an interaction-focused museum experience for mobile.',
  },
  'Introduction to Cryptocurrency (5:04)': {
    categories: ['Utility'],
    purpose: 'A technical explainer project on core blockchain concepts for a public audience.',
  },
};

const preferredQuickFilters = ['Docker', 'Java', 'Jenkins', 'React.js', 'Spring Boot', 'Spring Security', 'Hibernate', 'MySQL'];

const homelabPillars = [
  {
    title: 'Compute',
    icon: IconServer,
    lines: ['Mac mini (M1 / M4)', 'Intel NUC', 'Raspberry Pi nodes', 'MSI EdgeXpert GB10 (Ubuntu ARM64)'],
  },
  {
    title: 'Observability',
    icon: IconNetwork,
    lines: ['Prometheus-style exporters', 'Grafana dashboards', 'node-exporter + GPU metrics', 'Consistent host labeling'],
  },
  {
    title: 'AI Lab',
    icon: IconCpu,
    lines: ['vLLM endpoints', 'ComfyUI', 'DGX Dashboard proxy', 'Local text / vision experiments'],
  },
];

const homelabHighlights = [
  '<strong>MSI EdgeXpert GB10</strong> runs Docker, NVIDIA Container Toolkit, Portainer Agent, ComfyUI, DGX dashboard proxy, and GPU metrics export.',
  '<strong>Mac mini (M1 / M4)</strong> and <strong>Intel NUC</strong> workloads are monitored with stable host labels for clean Grafana series.',
  '<strong>Prometheus + Grafana</strong> style monitoring is used across multi-node systems for operational visibility and resource tracking.',
  '<strong>Local model serving</strong> is part of the lab stack, with smoke testing and integration validation built into the workflow.',
  '<strong>Nightly automation and backup</strong> support repeatable operations across homelab services and workspace assets.',
];

const architectureFlow = ['Internet', 'Firewall', 'Internal Network', 'Monitoring & Services', 'Servers'];

export default function PortfolioPage() {
  const [filters, setFilters] = useState([]);

  const projects = useMemo(
    () =>
      projectData.map((item) => ({
        ...item,
        categories: projectMeta[item.name]?.categories || ['Utility'],
        purpose: projectMeta[item.name]?.purpose || 'Technical project showcase.',
      })),
    []
  );

  const filterOptions = useMemo(() => {
    const unique = [...new Set(projects.flatMap((item) => item.keywords || []))];
    return unique.sort((a, b) => a.localeCompare(b)).map((item) => ({ value: item, label: item }));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!filters.length) return projects;
    return projects.filter((item) => filters.every((filter) => (item.keywords || []).includes(filter)));
  }, [filters, projects]);

  const topKeywords = useMemo(() => {
    return preferredQuickFilters.filter((keyword) => filterOptions.some((item) => item.value === keyword));
  }, [filterOptions]);

  const toggleQuickFilter = (keyword) => {
    setFilters((current) => (current.includes(keyword) ? current.filter((item) => item !== keyword) : [...current, keyword]));
  };

  return (
    <div className="portfolio-shell technical-portfolio light-mode">
      <Container size="xl" className="portfolio-container">
        <Stack gap={36}>
          <section id="home" className="technical-hero">
            <div className="technical-hero-copy">
              <Badge variant="light" radius="xl" color="gray" size="md">
                Technical Portfolio
              </Badge>
              <Title order={1} className="technical-hero-title">
                Backend systems, homelab infrastructure, observability, and self-hosted tooling.
              </Title>
              <Text className="technical-hero-text">
                A focused collection of technical projects, public-safe implementation work, and hands-on infrastructure experiments.
                The emphasis is on proof of technical ability through build quality, architecture, and operational thinking.
              </Text>
              <Group gap="sm" wrap="wrap">
                <Button component="a" href="#projects" radius="xl" className="primary-cta" rightSection={<IconArrowRight size={16} />}>
                  View Projects
                </Button>
                <Button component="a" href="#homelab" radius="xl" variant="default" className="secondary-cta">
                  View Homelab
                </Button>
                <Button
                  component="a"
                  href="https://github.com/johnnyip"
                  target="_blank"
                  rel="noreferrer"
                  radius="xl"
                  variant="default"
                  className="secondary-cta"
                  leftSection={<IconBrandGithub size={16} />}
                >
                  GitHub
                </Button>
              </Group>
            </div>
          </section>

          <section id="projects">
            <SectionHeading kicker="Projects" title="Technical projects" />

            <Card className="filter-panel technical-panel" radius="xl" padding="lg">
              <Stack gap="md">
                <Group justify="space-between" wrap="wrap" gap="md">
                  <MultiSelect
                    placeholder="Filter by tech stack"
                    data={filterOptions}
                    value={filters}
                    onChange={setFilters}
                    clearable
                    searchable
                    radius="lg"
                    size="md"
                    className="category-filter"
                    nothingFoundMessage="No matching stack"
                  />
                  <Text className="results-text">
                    Showing <span>{filteredProjects.length}</span> / {projects.length} projects
                  </Text>
                </Group>
                <Group gap="sm" className="quick-filter-row">
                  {topKeywords.map((keyword) => {
                    const active = filters.includes(keyword);
                    return (
                      <Button
                        key={keyword}
                        variant={active ? 'filled' : 'light'}
                        radius="xl"
                        size="sm"
                        color="blue"
                        className={`quick-filter-chip ${active ? 'is-active' : ''}`}
                        onClick={() => toggleQuickFilter(keyword)}
                      >
                        {keyword.toUpperCase()}
                      </Button>
                    );
                  })}
                </Group>
              </Stack>
            </Card>

            <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing="xl" mt="lg">
              {filteredProjects.map((item, index) => (
                <CardDetail data={item} key={`${item.name}-${index}`} categories={item.categories} purpose={item.purpose} />
              ))}
            </SimpleGrid>
          </section>

          <section id="homelab">
            <SectionHeading kicker="Homelab" title="Architecture, operations, and self-hosted systems" />

            <Card className="technical-panel grafana-preview-card" radius="xl" padding="xl">
              <Stack gap="sm">
                <Text className="panel-eyebrow">Grafana dashboard</Text>
                <Title order={4} className="panel-title">Dashboard preview</Title>
                <div className="grafana-sample-frame">
                  <img src="/grafana-sample.png" alt="Grafana dashboard sample" className="grafana-sample-image" />
                </div>
              </Stack>
            </Card>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mt="lg">
              {homelabPillars.map((area) => {
                const Icon = area.icon;
                return (
                  <Card key={area.title} className="technical-panel homelab-pillar-card" radius="xl" padding="lg">
                    <Stack gap="sm">
                      <Group gap="sm">
                        <div className="section-icon-wrap compact-icon-wrap">
                          <Icon size={18} />
                        </div>
                        <Title order={4} className="panel-title compact-panel-title">
                          {area.title}
                        </Title>
                      </Group>
                      <Stack gap={6}>
                        {area.lines.map((line) => (
                          <Text key={line} className="panel-copy bullet-copy compact-bullet-copy">
                            {line}
                          </Text>
                        ))}
                      </Stack>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" mt="xl">
              <Card className="technical-panel architecture-card" radius="xl" padding="xl">
                <Stack gap="md">
                  <Title order={4} className="panel-title">
                    Current setup highlights
                  </Title>
                  <Stack gap="sm">
                    {homelabHighlights.map((item) => (
                      <Text key={item} className="panel-copy bullet-copy" dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </Stack>
                </Stack>
              </Card>

              <Card className="technical-panel architecture-card diagram-card refined-diagram-card" radius="xl" padding="xl">
                <Stack gap="md">
                  <Title order={4} className="panel-title">
                    Homelab architecture diagram
                  </Title>
                  <div className="refined-flow-diagram">
                    {architectureFlow.map((item, index) => (
                      <div key={item} className="refined-flow-step">
                        <div className="refined-flow-node">{item}</div>
                        {index < architectureFlow.length - 1 ? <div className="refined-flow-connector" /> : null}
                      </div>
                    ))}
                  </div>
                </Stack>
              </Card>
            </SimpleGrid>
          </section>

          <section id="about">
            <SectionHeading kicker="About" title="Brief technical profile" />

            <Card className="technical-panel about-card" radius="xl" padding="xl">
              <Text className="panel-copy about-copy">
                I am a Java / Spring Boot developer with strong interest in backend engineering, platform infrastructure,
                observability, self-hosted services, and AI tooling experiments. I prefer demonstrating technical ability through
                working systems, architecture decisions, lab builds, and implementation details.
              </Text>
            </Card>
          </section>
        </Stack>
      </Container>
    </div>
  );
}

function SectionHeading({ kicker, title }) {
  return (
    <Group justify="space-between" align="end" wrap="wrap" gap="md">
      <div>
        <Text className="section-kicker">{kicker}</Text>
        <Title order={2} className="section-title">
          {title}
        </Title>
      </div>
    </Group>
  );
}
