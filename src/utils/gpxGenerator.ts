import { ForestryRoad } from '../types/forestryRoad';

export function generateGpxString(road: ForestryRoad): string {
  const now = new Date().toISOString();
  
  const waypointsXml = road.waypoints.map(wp => `
    <wpt lat="${wp.lat}" lon="${wp.lng}">
      <ele>${wp.elevation}</ele>
      <name>${escapeXml(wp.name)}</name>
      <desc>${escapeXml(wp.description || '')} (里程: ${wp.km}K, 收訊: ${wp.hasCellSignal ? '有信號' : '無信號'})</desc>
      <sym>${wp.isControlPoint ? 'Flag, Red' : 'Trail Head'}</sym>
    </wpt>`).join('');

  // Interpolate intermediate track points between waypoints for smooth display
  const trackPointsXml = road.waypoints.map(wp => `
      <trkpt lat="${wp.lat}" lon="${wp.lng}">
        <ele>${wp.elevation}</ele>
        <time>${now}</time>
      </trkpt>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="亞馬遜國家山岳協會 - 台灣林道通行狀況資料庫" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>${escapeXml(road.name)} GPX 軌跡</name>
    <desc>${escapeXml(road.statusNote)} | 管理單位: ${escapeXml(road.branch)} | 最新巡查: ${road.lastInspectedDate}</desc>
    <author>
      <name>亞馬遜國家山岳協會 (Amazon Mountain Association)</name>
      <link href="https://ais-pre-y7soux2x7uc7d5lwi45yh6-440065623013.asia-northeast1.run.app">
        <text>台灣林道通行狀況資料庫</text>
      </link>
    </author>
    <time>${now}</time>
  </metadata>
  ${waypointsXml}
  <trk>
    <name>${escapeXml(road.name)} 全線航跡</name>
    <desc>總長: ${road.totalLengthKm}km, 可通車里程: ${road.passableUpToKm}km, 最高海拔: ${road.maxElevationM}m, 難度: ${road.difficultyLevel}級</desc>
    <trkseg>
      ${trackPointsXml}
    </trkseg>
  </trk>
</gpx>`;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export function downloadGpxFile(road: ForestryRoad) {
  const gpxContent = generateGpxString(road);
  const blob = new Blob([gpxContent], { type: 'application/gpx+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${road.name.replace(/[/\\?%*:|"<>]/g, '_')}_亞馬遜國家山岳協會.gpx`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
