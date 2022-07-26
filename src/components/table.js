import { useState } from 'react';
import { Table, Group, Modal } from '@mantine/core';

import TableItemDesktop from './tableItem-desktop'
import TableItemMobile from './tableItem-mobile'
import TableData from '../data/data.json'
import TableDetailMobile from './tableDetail-mobile'
import TableDetailDesktop from './tableDetail-desktop'

export default function MainTable() {
    const [showDetailDesktop, setShowDetailDesktop] = useState(false)
    const [showDetailMobile, setShowDetailMobile] = useState(false)
    const [detailItem, setDetailItem] = useState({})

    return (
        <div style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>
            <Group position="center">
                <Table
                    style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
                    className="table-desktop"
                    fontSize="lg"
                    verticalSpacing="md">
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>Name</th>
                            <th style={{ width: "50%" }}>Description</th>
                            <th style={{ width: "20%" }}>Keywords</th>
                            <th style={{ width: "10%" }}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {[...TableData].map((item, i) => {
                            return <TableItemDesktop
                                data={item}
                                setShowDetail={setShowDetailDesktop}
                                setDetailItem={setDetailItem}
                                key={i}
                                index={i}
                            />
                        })}
                    </tbody>
                </Table>

                <Table
                    className="table-mobile"
                    fontSize="lg"
                    verticalSpacing="md">
                    {/* <thead>
                        <tr>
                            <th style={{ width: "20%" }}>Name</th>
                            <th style={{ width: "50%" }}>Description</th>
                            <th style={{ width: "20%" }}>Keywords</th>
                            <th style={{ width: "10%" }}></th>
                        </tr>
                    </thead> */}

                    <tbody>
                        {[...TableData].map((item, i) => {
                            return <TableItemMobile
                                data={item}
                                setShowDetail={setShowDetailMobile}
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
                opened={showDetailDesktop}
                centered={true}
                onClose={() => setShowDetailDesktop(false)}
                title={detailItem.name}
            >
                <TableDetailDesktop
                    data={detailItem} />
            </Modal>
            <Modal
                size="100%"
                opened={showDetailMobile}
                centered={true}
                onClose={() => setShowDetailMobile(false)}
                title={detailItem.name}
            >
                <TableDetailMobile
                    data={detailItem} />
            </Modal>

        </div>
    );
}
