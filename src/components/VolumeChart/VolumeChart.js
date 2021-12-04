import React from 'react'
import {Bar} from 'react-chartjs-2'
import { CircularProgress } from '@mui/material'
import moment from 'moment'

export const VolumeChart = ({historicalVolumes, days}) => {
    return (
        <div>
            {!historicalVolumes ? (
                <CircularProgress
                  style={{ color: "gold" }}
                  size={250}
                  thickness={1}
                />
              ) : (
                <>
                  <Bar
                    data={{
                      labels: historicalVolumes.map((vol) => {
                        let date = new Date(vol[0]);
                        let time = moment(date).format("hh:mm a");
                        return days === 1 ? time : date.toLocaleDateString();
                      }),
    
                      datasets: [
                        {
                          label: "Volume",
                          data: historicalVolumes.map((vol) => vol[1]),
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                      ],
                    }}
                  />
                </>
              )}
        </div>
        )
}
