import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import './App.scss';
import styles from './styles.module.scss';
import { getStats, getTotalStats } from './services/stats';

const options = {
  options: {
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
    }
  }
};

const keys = [
  'total_cases',
  'total_recoveries',
  'total_deaths'
];

const headerKeys = [
  'total_cases',
  'total_recovered',
  'total_deaths',
  'total_new_cases_today',
  'total_new_deaths_today'
]

function App() {
  const [series, setSeries] = useState([] as any);
  const [totalStats, setTotalStats] = useState({} as any);
  const { t } = useTranslation();
  useEffect(() => {
    getStats().then(response => {
      if (response.ok) {
        setSeries(keys.map(key => ({ name: t(`home:${key}`), type: 'line', data: Object.keys(response.data.timelineitems[0]).map(date => ({ x: moment(date).format('d/MM/YY'), y: response.data.timelineitems[0][date][key] })) })))
      }
    })
    getTotalStats().then(response => {
      if(response.ok) setTotalStats(response.data.countrydata[0])
    })
  }, []);
  return (
    <div className="App">
      <div className={styles.header}>
        {headerKeys.map(key => <h2 key={key}>{t(`home:${key}`)}: {totalStats[key]}</h2>)}
      </div>
      {!!series.length && <ApexCharts type="area" options={options} series={series} height="300" />}
    </div>
  );
}

export default App;
