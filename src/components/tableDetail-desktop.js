import { Group, Button } from '@mantine/core';
import parse from 'html-react-parser'

export default function TableDetail(props) {
    let data = props.data

    if (data.name !== undefined && data.links.length > 0) {

        return (
            <div className="table-desktop">
                <Group
                    style={{ paddingLeft: 30, paddingRight: 30 }}
                    grow>
                    {
                        [...data.links].map((item, i) => {
                            // console.log("item")
                            // console.log(item)
                            return (
                                <Button
                                    onClick={() => { window.open(item[1]) }}
                                    size="lg">
                                    {(item[0])}
                                </Button>
                            )
                        })
                    }
                </Group><br />

                {(data.image !== "") ?
                    <img src={data.image}
                        alt=""
                        width="100%"
                        style={{}} />
                    : ""}



                <div style={{ paddingTop: 20 }} />
                <hr />
                <h2 >Description</h2>
                <p style={{ fontSize: 20 }}>
                    {parse(data.longDescription)}
                </p>

            </div>
        )

    }
}