import { logEvent, analytics } from '../auth/firebase';
import reportWebVitals from './reportWebVitals';
import type { ReportCallback } from 'web-vitals';
const sendToGoogleAnalytics: ReportCallback = ({ name, delta, id }) => {
  logEvent(analytics, 'web_vitals', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventLabel: id,
    eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
    nonInteraction: true,
    transport: 'beacon',
  });
};

// 開発環境ではログに。本番環境ではグーグル アナリティクスに出力。
// const isDevevelopServe = import.meta.env.MODE === 'development'; // import.meta.env.DEV
const isDevevelopServe = location.host.includes('localhost'); // Jestのテスト実行時にimport.meta.envが原因でエラーになるため、hostがローカルホストかで判断
const reportTo = isDevevelopServe ? console.log : sendToGoogleAnalytics;
export const initReport = () => reportWebVitals(reportTo);
