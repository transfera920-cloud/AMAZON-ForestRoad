export type RoadStatus = 
  | 'open'         // 全線通行
  | 'partial'      // 部分封閉
  | 'regulated'    // 交通管制
  | 'closed'       // 全線封閉
  | 'unconfirmed'; // 未確認

export type ForestryBranch = 
  | '宜蘭分署'
  | '新竹分署'
  | '臺中分署'
  | '南投分署'
  | '嘉義分署'
  | '屏東分署'
  | '臺東分署'
  | '花蓮分署'
  | '清單外/地方道路';

export type ElevationBand = 
  | 'low'      // 低海拔 (<1,000m)
  | 'mid'      // 中海拔 (1,000m ~ 2,000m)
  | 'high'     // 高海拔 (2,000m ~ 3,000m)
  | 'alpine';  // 超高海拔 (>3,000m)

export type VehicleStatus = {
  car4wd: 'passable' | 'difficult' | 'impassable'; // 四驅/高底盤
  motorcycle: 'passable' | 'difficult' | 'impassable'; // 機車/越野二輪
  bicycle: 'passable' | 'difficult' | 'impassable'; // 登山單車/電輔車
  hiking: 'passable' | 'difficult' | 'impassable'; // 步行徒步
};

export interface Waypoint {
  name: string;
  km: number;
  elevation: number;
  lat: number;
  lng: number;
  description?: string;
  isControlPoint?: boolean;
  hasCellSignal?: boolean;
}

export interface ForestryRoad {
  id: string;
  name: string;
  aliases?: string[];
  branch: ForestryBranch;
  status: RoadStatus;
  statusNote: string;
  lastInspectedDate: string;
  accuracyRate: number; // e.g. 96 (%)
  reportsCount: number; // e.g. 18 reviews recently
  
  // Coordinates (WGS84)
  startCoord: { lat: number; lng: number; label: string };
  endCoord: { lat: number; lng: number; label: string };
  
  // Distance & Drivable
  totalLengthKm: number;
  drivableKm: number;
  passableUpToKm: number; // 可通行至幾 K
  controlPointNote?: string;

  // Elevation & Profile
  elevationBand: ElevationBand;
  elevationBandLabel: string;
  startElevationM: number;
  maxElevationM: number;
  cumulativeAscentM: number;
  profileDescription: string;
  waypoints: Waypoint[];

  // Difficulty & Rules
  difficultyLevel: 1 | 2 | 3 | 4 | 5; // 1-5 級
  difficultyDescription: string;
  permitsRequired: {
    mountainEntry: boolean; // 入山許可證
    parkEntry: boolean;     // 國家公園入園許可證
    natureReserve: boolean; // 自然保護/保留區
    note?: string;
  };

  // Vehicles
  vehicles: VehicleStatus;

  // Infrastructure & Safety
  officialPhone: string;
  dispatchOffice: string;
  cellSignalSpotsCount: number; // 收訊點數量
  cellSignalProviders: string[]; // ['中華電信', '遠傳', '台灣大哥大']
  disasterInquiryUrl: string; // 農業部水保署災害潛勢
  cwbWeatherUrl: string; // 氣象署天氣預報
  hazardsSummary: string; // 邊坡落石/崩塌地/溪水暴漲風險
  highlights: string[];
}

export interface FilterState {
  searchQuery: string;
  branch: string; // 'all' or branch name
  status: string; // 'all' or RoadStatus
  elevationBand: string; // 'all' or ElevationBand
  difficulty: string; // 'all' or '1'..'5'
  vehicle: string; // 'all', 'car4wd', 'motorcycle', 'bicycle', 'hiking'
  permitOnly: string; // 'all', 'free', 'needPermit'
  sortBy: 'update' | 'length' | 'elevation' | 'difficulty';
}
