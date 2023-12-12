import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import parse from 'html-react-parser'

export default function CardDetail(props) {
  let data = props.data

  let color = {
    "React.js": ["#008DE2", "#E5F5FD"],

    "Java": ["#ED6D1F", "#E5F5FD"],
    "Spring Security": ["#ED6D1F", "#E5F5FD"],
    "Spring Boot": ["#ED6D1F", "#E5F5FD"],
    "JWT": ["#ED6D1F", "#E5F5FD"],
    "Hibernate": ["#ED6D1F", "#E5F5FD"],
    "Thymeleaf (HTML+js)": ["#ED6D1F", "#E5F5FD"],

    "Jenkins": ["#000000", "#E5F5FD"],
    "Hyperledger Fabric": ["#8BDEDB", "#742124"],
    "Docker": ["#0098E8", "#F5F5F5"],

    "Swift": ["#F77C47", "#F5F5F5"],
    "iOS": ["#F77C47", "#F5F5F5"],
  }

  if (data !== undefined) {

    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={data.thumbnail} width={"100%"}
          />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{data.name}</Text>
          <Badge color="blue" size="lg">{data.date}</Badge>
        </Group>
        <hr style={{ width: '100%' }} />

        <Text size="md">
          {parse(data.shortDescription)}
        </Text>

        <hr style={{ width: '100%' }} />
        <Group spacing="xs" >
          {[...data.keywords].map((item, i) => {
            return <Badge
              key={i}
              color="gray"
              style={{
                color: (color[item] !== undefined) ? color[item][0] : "",
                backgroundColor: (color[item] !== undefined) ? color[item][1] : "",
              }}
              size="lg"
              radius="s">{item}</Badge>
          })}
        </Group>
        <br /><hr style={{ width: '100%' }} />

        <Group
          grow>
          {
            [...data.links].map((item, i) => {
              return (
                <Button fullWidth
                  rightSection={<IconExternalLink size={20} />}
                  onClick={() => { window.open(item[1]) }}>
                  {(item[0])}
                </Button>
              )
            })
          }
        </Group><br />
      </Card>
    );
  }
}