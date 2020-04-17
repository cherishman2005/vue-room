// use to set user region
export const getRegions = () => {
  const regionList = [ 'cn', 'ap_southeast', 'ap_south', 'us', 'me_east', 'sa_east', 'CN-TEST' ];
  let regions = [];
  for (let region of regionList) {
    regions.push({value: region, label: region});
  }
  return regions;
}

export const getRegionRoomId = (region, roomId) => {
  return `${region}:${roomId}`;
}

export function getAppids() {
  const appidList = [ 1504984159, 1350626568 ];
  let appids = [];
  for (let appid of appidList) {
    appids.push({value: appid, label: appid.toString()});
  }
  return appids;
}

export const areas = [
    {
      value: 'cn',
      label: 'cn'
    }, {
      value: 'ap_southeast',
      label: 'ap_southeast'
    }, {
      value: 'ap_south',
      label: 'ap_south'
    }, {
      value: 'us',
      label: 'us'
    }, {
      value: 'me_east',
      label: 'me_east'
    }, {
      value: 'sa_east',
      label: 'sa_east'
    }, {
      value: 'CN',
      label: 'CN'
    }, {
      value: 'CN-TEST',
      label: 'shenzhen/test/2'
    }, {
      value: 'CN-TEST1',
      label: 'shenzhen/test/1'
    }, {
      value: 'CN-INNER',
      label: 'inner'
    }, {
      value: 'CN-INNER1',
      label: 'inner1'
    }, {
      value: 'chn',
      label: 'chn'
    }, {
      value: 'idn',
      label: 'idn'
    }, {
      value: 'ind',
      label: 'ind'
    }, {
      value: 'are',
      label: 'are'
    }, {
      value: 'usa',
      label: 'usa'
    }, {
      value: 'bra',
      label: 'bra'
    }
  ];
