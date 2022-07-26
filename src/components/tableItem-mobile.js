import { Button, Badge, Group } from '@mantine/core';
import parse from 'html-react-parser'

export default function TableItem(props) {
    let data = props.data
    let setShowDetail = props.setShowDetail
    let setDetailItem = props.setDetailItem

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
        "Docker": ["#0098E8", "#FFFFFF"],

        "Swift": ["#F77C47", "#FFFFFF"],
        "iOS": ["#F77C47", "#FFFFFF"],
    }


    // console.log(data)
    console.log(data.links)

    if (data !== undefined) {

        return (
            <tr style={{ backgroundColor: data.themeColor }}>
                <td>
                    <b>{data.name}</b><br /><br />
                    {(data.thumbnail !== undefined) ?
                        <img src={data.thumbnail} alt="" width={150} />
                        : <></>
                    }
                    <br />
                    {parse(data.shortDescription)}
                    <br />
                    <Group spacing="xs" >
                        {[...data.keywords].map((item, i) => {
                            return <Badge
                                color="gray"
                                style={{
                                    color: (color[item] !== undefined) ? color[item][0] : "",
                                    backgroundColor: (color[item] !== undefined) ? color[item][1] : "",
                                }}
                                size="lg">{item}</Badge>
                        })}
                    </Group>
                    <br/>
                    <Group grow>
                        <Button
                            onClick={() => {
                                setShowDetail(true);
                                setDetailItem(data)
                            }}
                        >
                            Detail
                        </Button>
                    </Group>
                </td>
            </tr>
        );

    }
}
