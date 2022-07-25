import { useState } from 'react';
import { Table, Group, Modal } from '@mantine/core';

import TableItem from './tableItem'
import TableData from '../data/data.json'
import TableDetail from './tableDetail'

export default function MainTable() {
    const [showDetail, setShowDetail] = useState(false)
    const [detailItem, setDetailItem] = useState({})

    return (
        <div style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>
            <Group position="center">
                <Table  
                fontSize="lg"
                verticalSpacing="md">
                    <thead>
                        <tr>
                            <th style={{width:"20%"}}>Name</th>
                            <th style={{width:"50%"}}>Description</th>
                            <th style={{width:"20%"}}>Keywords</th>
                            <th style={{width:"10%"}}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {[...TableData].map((item, i) => {
                            return <TableItem
                                data={item}
                                setShowDetail={setShowDetail}
                                setDetailItem={setDetailItem}
                                key={i}
                                index={i}
                            />
                        })}
                    </tbody>
                </Table>

            </Group>

            <Modal
                size="70%"
                opened={showDetail}
                centered={true}
                onClose={() => setShowDetail(false)}
                title={detailItem.name}
            >
                <TableDetail data={detailItem} />
            </Modal>

        </div>
    );
}
