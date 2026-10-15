export interface GlossaryItem {
  id: string;
  term: string;
  enTerm: string;
  category: '制度與法規' | '地形與工程' | '裝備與導航' | '安全與應變';
  shortDesc: string;
  fullDesc: string;
  practicalTips: string;
}

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'forestry-road',
    term: '林道 (Forest Road)',
    enTerm: 'Forest Road',
    category: '制度與法規',
    shortDesc: '主要供林業經營、森林保育、造林、護管及森林遊樂等用途之專用道路。',
    fullDesc: '依據農業部林業及自然保育署（前林務局）林道管理要點定義，林道是為森林經營與國土保育而開闢的專用通道。早期多供伐木集材使用，現代則兼具森林護管、治山防砂、巡山防汛、學術調查以及民眾親山休閒之功能。林道並非公路法所管轄之省道或縣道，路基維護標準與天候抵禦力較公路脆弱。',
    practicalTips: '林道路幅狹窄、多盲彎且欠缺護欄，會車請先禮讓上坡車與公務巡護車輛。'
  },
  {
    id: 'unlisted-road',
    term: '清單外林道',
    enTerm: 'Unlisted Forestry Road',
    category: '制度與法規',
    shortDesc: '未列入林保署正式編號管轄名冊，但實質存在並具通行機能的山區路徑。',
    fullDesc: '指因早年歷史開闢、台電水利施工、早前礦業開採或民間部落自力闢建，未被林業及自然保育署納入官方80多條列管林道清單的深山道路。管理主體經常落於地方鄉鎮公所、台電、農水署或無專責養護單位，維護預算不定期，路況變異極為劇烈。',
    practicalTips: '清單外林道坍方後往往無常態工程搶修，出發前務必確認最近3天之山友輪跡與空拍紀錄，切勿單車盲進。'
  },
  {
    id: 'decommissioned-road',
    term: '解編林道',
    enTerm: 'Decommissioned / De-listed Road',
    category: '制度與法規',
    shortDesc: '經林保署評估無林業經營需求或地質極端不穩，已公告廢止正式維護之林道。',
    fullDesc: '由於長期邊坡大規模順向坡滑動、土石流反覆沖毀，修復成本不符生態與經濟效益，由官方依程序公告解除林道編制。解編後國家不再常態撥款搶通車道，路面多逐漸自然演替為登山步道或原始荒野芒草路段。',
    practicalTips: '解編林道一般禁止一般機動車輛駛入，僅適合作為全自主登山探勘路線，需具備高階開路與溯溪脫困能力。'
  },
  {
    id: 'industrial-road',
    term: '產業道路 / 農路',
    enTerm: 'Agricultural & Industrial Road',
    category: '制度與法規',
    shortDesc: '主要供農業運輸、果園巡查、水土保持之鄉村與山坡道路，多由地方公所管轄。',
    fullDesc: '主管機關通常為農業部農村發展及水土保持署或各縣市政府農業局、各鄉鎮市公所。通常鋪設混凝土（水泥路面）或簡易瀝青，特點是坡度極陡（常超過20%~30%）、急轉彎多、青苔覆蓋濕滑，雨季容易有排水溝溢流與泥流堆積。',
    practicalTips: '行駛陡峭水泥農路，自排車請切換低速檔（L/1檔），下坡切忌長踩煞車避免來令片熱衰竭。'
  },
  {
    id: 'kilometer-post',
    term: 'K (里程標樁 / 里程數)',
    enTerm: 'Kilometer Post (K)',
    category: '裝備與導航',
    shortDesc: '林道沿線以起點0K為基準，每隔1公里或數百公尺設立之路程距離標記。',
    fullDesc: '林道上最關鍵的定位語言。山區通報路況、落石點、崩塌阻斷、管制鐵門或救援座標時，皆以「幾K」為依據（例如：丹大林道5.5K鋼便橋、郡大林道23K望鄉工作站、霞喀羅清泉端0K）。在野外通報時，精確報出K數能讓搜救與搶修人員精準抵達。',
    practicalTips: '車行時請隨時注意路旁木樁或反光牌之K數；遇無標樁處，可利用離線地圖App紀錄軌跡里程點。'
  },
  {
    id: 'gpx-track',
    term: 'GPX (GPS交換格式軌跡檔)',
    enTerm: 'GPS Exchange Format (.gpx)',
    category: '裝備與導航',
    shortDesc: '紀錄經緯度座標、海拔高程與時間戳記的通用開放XML地圖檔案。',
    fullDesc: '山友及越野騎士必備的數位導航資產。GPX檔案可匯入各類手機離線地圖App（如Hikingbook、綠野遊蹤、Carto/OruxMaps、Garmin戶外手錶）。在深山無行動網路環境下，透過GPS晶片即可精準對照自身位置是否偏離林道正軌、前方是否有斷崖或崩壁標記。',
    practicalTips: '出發前請在家中完整下載林道GPX軌跡與「離線等高線地圖圖資」，切勿依賴即時Google Maps。'
  },
  {
    id: 'elevation-gain',
    term: '累積爬升 (Elevation Gain)',
    enTerm: 'Cumulative Elevation Gain',
    category: '地形與工程',
    shortDesc: '沿途所有上坡路段高度差的加總總和，最能真實反映體能與車輛負荷。',
    fullDesc: '不同於「最高海拔減去起點海拔」的淨落差，林道常因翻越山稜、繞過溪谷而有連續的起伏上下。累積爬升是將路段中每一次上升的垂直公尺數全數累計，對於徒步登山、越野單車（MTB/e-MTB）的續航消耗，以及老舊高底盤車的引擎散熱負荷具有決定性參考價值。',
    practicalTips: '若一條林道總長15公里但累積爬升超過1,200公尺，代表平均坡度陡峭且連續推力大，需特別注意燃油與電池配比。'
  },
  {
    id: 'difficulty-levels',
    term: '路況難度分級 (Lv 1～5)',
    enTerm: 'Road Difficulty Scale',
    category: '安全與應變',
    shortDesc: '亞馬遜國家山岳協會建立之五級專業林道路況綜合評量系統。',
    fullDesc: '【1級-休旅平整】：全段鋪裝或碎石平整，一般低底盤轎車均可抵達。\n【2級-輕度碎石】：有坑洞、落葉泥濘，需高底盤休旅車（SUV）或一般檔車。\n【3級-越野挑戰】：深溝橫切、巨石碎裂、涉溪水深超過半輪，需真正具備加力箱或4WD高低速檔越野車。\n【4級-極限險路】：單面深淵斷崖、巨石盲區、需絞盤自救能力，極度危險。\n【5級-荒廢斷橋】：完全中斷坍塌，僅允許徒步探勘或高山重裝背負。',
    practicalTips: '切莫越級駕駛，尤其是天候不良或午後雷雨後，林道難度往往會瞬間提升1～2個級別！'
  },
  {
    id: 'mountain-permit',
    term: '入山許可證',
    enTerm: 'Mountain Entry Permit',
    category: '制度與法規',
    shortDesc: '依《國家安全法》向內政部警政署或沿線分駐所申請之山地經常管制區核准文件。',
    fullDesc: '針對台灣部分屬於山地經常管制區的山區（例如丹大山域、部分原住民保留林區），民眾進入前依法必須向警政署全球資訊網或管轄警察局/派出所辦理線上或現場入山申請，記載人員名冊與預定進出時間，供緊急搜救清查之用。',
    practicalTips: '目前多數非管制山域已全面開放親山，但如遇管制哨或特殊警署公告區域，請務必先備妥紙本或電子入山證。'
  },
  {
    id: 'park-permit',
    term: '入園許可證 (生態保護區)',
    enTerm: 'National Park Ecological Reserve Permit',
    category: '制度與法規',
    shortDesc: '進入玉山、雪霸、太魯閣等國家公園生態保護區前必須向國家公園署申請之核准證。',
    fullDesc: '依據《國家公園法》，若林道終點或沿線穿越國家公園劃定之生態保護區（例如大雪山林道深處銜接雪山西稜、郡大林道登山口銜接玉山國家公園園區），必須於入園日前向「台灣國家公園入園線上申請服務網」遞交申請，並遵守承載量管制與無痕山林原則。',
    practicalTips: '入園證與入山證為不同法規核發之兩張證件，若路線重疊，兩者皆需分別辦理完成。'
  },
  {
    id: 'emergency-contact',
    term: '留守人 (留守單機制)',
    enTerm: 'Designated Base Camp Contact',
    category: '安全與應變',
    shortDesc: '不參與本次行程、在平地維持通訊並持有完整登山計畫的關鍵安全代理人。',
    fullDesc: '隊伍進入沒有基地台訊號之深山林道時最核心的生命防線。留守人持有隊伍的「詳細時程表、撤退判定點、人員健康狀況、車牌與通訊裝備、緊急聯絡人家屬名冊」。隊伍抵達指定節點必須回報；若逾越「失聯逾時警戒時間」，留守人有權並負責向當地消防局119發動山難搜救。',
    practicalTips: '出發前務必確認留守人清楚知道「若幾點幾分沒收到回報，該打給誰」，切忌找容易慌亂或無法聯絡的親友擔任。'
  }
];
