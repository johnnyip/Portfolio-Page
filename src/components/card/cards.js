import { useState, useEffect } from 'react';
import { Table, Stack, Modal, Button, Select, Badge, Grid } from '@mantine/core';

import CardDetail from './cardDetail'
import TableData from '../../data/data.json'

export default function Cards() {

  const [fullKeywords, setFullKeywords] = useState([])
  const [filters, setFilters] = useState([])
  const [filteredData, setFilteredData] = useState(TableData)

  useEffect(() => {
    let fullKeywords_tmp = [];

    for (let item of TableData) {
      for (let key of item.keywords) {
        if (!fullKeywords_tmp.includes(key)) {
          fullKeywords_tmp.push(key)
        }
      }
    }

    let fullKeywords_tmp2 = [];
    for (let item of fullKeywords_tmp) {
      fullKeywords_tmp2.push({ label: item, value: item })
    }

    setFullKeywords(fullKeywords_tmp2)

    if (filters.length === 0) {
      setFilteredData(TableData)
    } else {
      let filteredData_tmp = [];
      for (let item of TableData) {
        for (let key of item.keywords) {
          if (filters.includes(key)) {
            filteredData_tmp.push(item)
            break;
          }
        }
      }
      setFilteredData(filteredData_tmp)
    }
  }, [filters])


  return (
    <div style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>

      <Stack align="center" >
        <a href="https://github.com/johnnyip" rel="noreferrer" target="_blank">
          <Button
            color="grape">
            Github Profile (johnnyip)
          </Button>
        </a>

        <Select
          data={fullKeywords}
          value={filters}
          onChange={setFilters}
          label="Filter Related Projects by Keywords"
          placeholder="Keywords"
        />

        <h2>Showing <Badge size="xl">{filteredData.length}</Badge> Projects</h2>


        <hr style={{ width: '100%' }} />

        {/* Split the data into 2 columns */}

        <Grid>
          {[...filteredData].map((item, i) => {
            return (
              <Grid.Col span={4}>
                <CardDetail
                  data={item}
                  key={i}
                  index={i}
                />
              </Grid.Col>
            )
          })}
        </Grid>

      </Stack>

    </div>
  );
}