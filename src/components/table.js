import { useState } from 'react';
import { Table, Stack, Modal, Button } from '@mantine/core';

import TableItemDesktop from './tableItem-desktop'
import TableItemMobile from './tableItem-mobile'
import TableData from '../data/data.json'
import TableDetailMobile from './tableDetail-mobile'
import TableDetailDesktop from './tableDetail-desktop'

export default function MainTable() {
    const [showDetailDesktop, setShowDetailDesktop] = useState(false)
    const [showDetailMobile, setShowDetailMobile] = useState(false)
    const [showLearnedDetails, setShowLearnedDetails] = useState(false)
    const [detailItem, setDetailItem] = useState({})

    return (
        <div style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>

            <Stack align="center" >
                <Button
                    onClick={() => setShowLearnedDetails(true)}
                    size="lg"
                    style={{ marginLeft: "auto", marginRight: "auto" }} >
                    Show Summary of What I have learned
                </Button>


                <Table
                    striped highlightOnHover
                    style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
                    className="table-desktop"
                    fontSize="lg"
                    verticalSpacing="md">
                    <thead>
                        <tr><td colspan="4">                <hr /></td></tr>
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
                    striped highlightOnHover
                    className="table-mobile"
                    fontSize="lg"
                    verticalSpacing="md">

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


            </Stack>

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
            <Modal
                size="100%"
                opened={showLearnedDetails}
                centered={true}
                onClose={() => setShowLearnedDetails(false)}
                title={"What I've learned"}
            >
                <Table
                    striped highlightOnHover
                    style={{ width: "70%", marginLeft: "auto", marginRight: "auto", }}
                    fontSize="lg"
                    verticalSpacing="md">
                    <thead>
                        <tr>
                            <th style={{ width: "30%" }}>Name</th>
                            <th style={{ width: "70%" }}>What I have learned</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Java</b></td>
                            <td>- <b>Spring Boot</b> (REST API backend server, CRUD Operation with RDBMS by Hibernate)<br /><br />
                                - <b>Spring Security</b> (Basic username password, JWT token, Hashed and save to DB)</td>
                        </tr>
                        <tr>
                            <td><b>React.js</b></td>
                            <td>- <b>Redux-toolkit</b></td>
                        </tr>
                        <tr>
                            <td><b>Docker</b></td>
                            <td>- <b>Docker-compose</b><br /><br />
                                - Build custom images and deploy
                            </td>
                        </tr>
                        <tr>
                            <td><b>CI/CD (Jenkins)</b></td>
                            <td>- Pull and build the latest source code<br /><br />
                                - Build and upload Docker images<br /><br />
                                - Build and deploy Spring application to Tomcat Server
                            </td>
                        </tr>
                        <tr>
                            <td><b>Linux</b></td>
                            <td>- SSH and do some simple tasks<br /><br />
                                - Little bit of vim
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Modal>



        </div>
    );
}
