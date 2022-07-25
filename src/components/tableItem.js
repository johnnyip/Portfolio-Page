import { Button, Badge, Group } from '@mantine/core';
import parse from 'html-react-parser'

export default function TableItem(props) {
    let data = props.data
    let i = props.index
    let setShowDetail = props.setShowDetail
    let setDetailItem = props.setDetailItem

    let color = {
        "React.js": ["#008DE2", "#E5F5FD"],
        "Java": ["#008DE2", "#E5F5FD"],
        "Hyperledger Fabric": ["#008DE2", "#E5F5FD"],
        "Spring Boot": ["#008DE2", "#E5F5FD"],
        "JWT": ["#008DE2", "#E5F5FD"],
        "Jenkins": ["#008DE2", "#E5F5FD"],
        "MySQL": ["#008DE2", "#E5F5FD"],
    }


    // console.log(data)
    console.log(data.links)

    if (data !== undefined) {

        return (
            <tr style={{ backgroundColor: data.themeColor }}>
                <td>
                    {data.name}<br />
                    {(data.thumbnail != undefined) ?
                        <img src={data.thumbnail} width={150} />
                        : <></>
                    }
                </td>
                <td>{parse(data.shortDescription)}</td>
                <td>
                    <Group spacing="xs" >
                        {[...data.keywords].map((item, i) => {
                            return <Badge
                                style={{
                                    color: (color[item] !== undefined) ? color[item][0] : "#008DE2",
                                    backgroundColor: (color[item] !== undefined) ? color[item][1] : "#E5F5FD",
                                }}
                                size="lg">{item}</Badge>
                        })}
                    </Group>
                </td>
                <td>
                    <Button
                        onClick={() => {
                            setShowDetail(true);
                            setDetailItem(data)
                        }}
                    >
                        Detail
                    </Button>
                </td>
            </tr>
        );

    }
}
